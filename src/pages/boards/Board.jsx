import { mockData } from '@apis/mock-data.js';
import BoardBar from '@boards/BoardBar';
import BoardContent from '@boards/BoardContent';
import AppBar from '@components/AppBar';
import Container from '@mui/material/Container';

const Board = () => {
    return (
        <Container disableGutters maxWidth={false} sx={{ height: '100vh', background: 'primary.main' }}>
            <AppBar />
            <BoardBar board={mockData.board} />
            <BoardContent board={mockData.board} />
        </Container>
    );
};

export default Board;