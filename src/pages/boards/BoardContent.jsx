import Card from '@components/Card';
import Column from '@components/Column';
import ListColumns from '@components/ListColumns';
import { closestCorners, defaultDropAnimationSideEffects, DndContext, DragOverlay, getFirstCollision, MouseSensor, pointerWithin, rectIntersection, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import Box from '@mui/material/Box';
import { sortObjectByOrder } from '@utils/algorithm';
import { generatePlaceholderCard } from '@utils/formatters';
import { cloneDeep, isEmpty } from 'lodash';
import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

const ITEM_TYPE = {
    COLUMN: 'column',
    CARD: 'CARD'
}

const BoardContent = ({ board }) => {
    const mouseSensor = useSensor(MouseSensor, {
        activationConstraint: {
            distance: 10
        }
    });

    // press, hold 250ms and tolerance = 5px 
    const touchSencor = useSensor(TouchSensor, {
        activationConstraint: {
            delay: 250,
            tolerance: 5
        }
    });
    const sensors = useSensors(mouseSensor, touchSencor);
    const [activeDragItemData, setActiveDragItemData] = useState(null);
    const [oldColumn, setOldColumn] = useState(null);
    const [orderedColumns, setOrderedColumns] = useState([]);
    const [itemDragType, setItemDragType] = useState(null);
    const lastOverId = useRef(null)
    useEffect(() => {
        setOrderedColumns(sortObjectByOrder(board?.columns, board?.columnOrderIds, '_id'));
    }, [])

    const findColumnByCardId = (cardId) => {
        return orderedColumns.find(column => column.cards.map(card => card._id)?.includes(cardId));
    }

    const moveCardBetweenDifferentColumns = (
        overColumn,
        overCardId,
        active,
        over,
        activeColumn,
        activeCardId,
        activeCardData
    ) => {
        setOrderedColumns(orderedColumns => {
            const overCardIndex = overColumn?.cards.findIndex(card => card._id === overCardId);

            // calculate new index in over column
            let newCardIndex;
            const isBelowOverItem = active.rect.current.translated &&
                active.rect.current.translated.top >
                over.rect.top + over.rect.height;
            const modifier = isBelowOverItem ? 1 : 0;
            newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier : overColumn?.cards.length + 1;
            const newColumns = cloneDeep(orderedColumns);
            const newActiveColumn = newColumns.find(column => column._id === activeColumn._id);
            const newOverColumn = newColumns.find(column => column._id === overColumn._id);
            if (newActiveColumn) {
                newActiveColumn.cards = newActiveColumn.cards.filter(card => card._id !== activeCardId);
                if (isEmpty(newActiveColumn.cards)) {
                    newActiveColumn.cards = [generatePlaceholderCard(newActiveColumn)];
                }
                newActiveColumn.cardOrderIds = newActiveColumn.cards.map(card => card._id);
            }
            if (newOverColumn) {
                newOverColumn.cards = newOverColumn.cards.filter(card => card._id !== activeCardId);
                newOverColumn.cards = newOverColumn.cards.toSpliced(newCardIndex, 0, {
                    ...activeCardData,
                    columnId: newOverColumn._id
                });
                newOverColumn.cards = newOverColumn.cards.filter(card => !card.FE_PlaceholderCard)
                newOverColumn.cardOrderIds = newOverColumn.cards.map(card => card._id);
            }

            return newColumns;
        })
    }

    const handleDragStart = (e) => {
        setItemDragType(e?.active?.data?.current?.columnId ? ITEM_TYPE.CARD : ITEM_TYPE.COLUMN);
        setActiveDragItemData(e?.active?.data.current);
        if (e?.active?.data?.current?.columnId) {
            setOldColumn(findColumnByCardId(e?.active?.id))
        }
    }

    const handleDragOver = (e) => {

        // If drag column return
        if (itemDragType === ITEM_TYPE.COLUMN) return;

        const { active, over } = e;
        if (!over || !active) {
            return;
        }

        const { id: activeCardId, data: { current: activeCardData } } = active;
        const { id: overCardId } = over;

        const activeColumn = findColumnByCardId(activeCardId);
        const overColumn = findColumnByCardId(overCardId);

        if (!activeColumn || !overColumn) {
            return;
        }

        if (activeColumn._id !== overColumn._id) {
            moveCardBetweenDifferentColumns(
                overColumn,
                overCardId,
                active,
                over,
                activeColumn,
                activeCardId,
                activeCardData
            )
        }
    }

    const handleDragEnd = (e) => {
        const { active, over } = e;
        if (!over || !active) {
            return;
        }

        if (itemDragType === ITEM_TYPE.CARD && active.id !== over.id) {
            const { id: activeCardId, data: { current: activeCardData } } = active;
            const { id: overCardId } = over;

            const activeColumn = findColumnByCardId(activeCardId);
            const overColumn = findColumnByCardId(overCardId);

            if (!activeColumn || !overColumn) {
                return
            };

            if (oldColumn._id !== overColumn._id) {
                moveCardBetweenDifferentColumns(
                    overColumn,
                    overCardId,
                    active,
                    over,
                    activeColumn,
                    activeCardId,
                    activeCardData
                )
            } else {
                // old coordinate
                const oldIndex = oldColumn?.cards.findIndex(card => card._id === activeDragItemData._id);
                // new coordinate
                const newIndex = overColumn?.cards.findIndex(card => card._id === overCardId);
                const dndOrderedCards = arrayMove(oldColumn.cards, oldIndex, newIndex);
                setOrderedColumns(orderedColumns => ({
                    ...orderedColumns,
                    [overColumn]: {
                        cards: dndOrderedCards,
                        cardOrderIds: dndOrderedCards.map(card => card._id)
                    }
                }))
            }
        }

        // active is id of column drag and over is id of column drop 
        if (itemDragType === ITEM_TYPE.COLUMN && active.id !== over.id) {
            // old coordinate
            const oldIndex = orderedColumns.findIndex(column => column._id === active.id);
            // new coordinate
            const newIndex = orderedColumns.findIndex(column => column._id === over.id);
            // new order
            const dndOrderedColumns = arrayMove(orderedColumns, oldIndex, newIndex);
            // const dndOrderedColumnsIds = dndOrderedColumns.map(column => column._id);            
            setOrderedColumns(dndOrderedColumns);
        }
        setActiveDragItemData(null);
        setOldColumn(null)
    }

    const dropAnimation = {
        sideEffects: defaultDropAnimationSideEffects({
            styles: {
                active: {
                    opacity: '0.5'
                }
            }
        })
    }

    const collisionDetectionStrategy = useCallback((args) => {
        if (itemDragType === ITEM_TYPE.COLUMN) {
            return closestCorners({
                ...args
            });
        }

        const pointerIntersections = pointerWithin(args);
        if (!pointerIntersections.length) return;
        const intersections = pointerIntersections.length ? pointerIntersections : rectIntersection(args);
        let overId = getFirstCollision(intersections, 'id');
        if (overId) {
            const checkColumn = orderedColumns.find(column => column._id === overId);
            if (checkColumn) {
                overId = closestCorners({
                    ...args,
                    droppableContainers: args.droppableContainers.filter(container => {
                        return (container.id !== overId) && (checkColumn?.cardOrderIds?.includes(container.id));
                    })[0]?.id
                });
            }
            lastOverId.current = overId;
            return [{ id: overId }];
        }

        return lastOverId.current ? [{ id: lastOverId.current }] : []
    }, [itemDragType, orderedColumns])

    return (
        <DndContext
            // collisionDetection={closestCorners}
            collisionDetection={collisionDetectionStrategy}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
            sensors={sensors}
        >
            <Box sx={{
                backgroundColor: 'primary.main',
                width: '100%',
                height: (theme) => theme.trello.boardContentHeight,
                padding: '10px 0',
            }}>
                <ListColumns columns={orderedColumns} />

                {createPortal(
                    <DragOverlay dropAnimation={dropAnimation}>
                        {!activeDragItemData && null}
                        {(activeDragItemData && itemDragType === ITEM_TYPE.COLUMN) ? (
                            <Column column={activeDragItemData} />
                        ) : (
                            <Card card={activeDragItemData} />
                        )}

                    </DragOverlay>,
                    document.body
                )}
            </Box>
        </DndContext>
    );
};

export default BoardContent;