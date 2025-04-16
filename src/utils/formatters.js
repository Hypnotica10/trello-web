export const generatePlaceholderCard = (column) => {
    return {
        _id: `${column._id}-placeholer-card`,
        boardId: column.boardId,
        columnId: column._id,
        FE_PlaceholderCard: true
    }
}