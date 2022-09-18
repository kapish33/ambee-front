import { Box } from '@mui/material';
import AddATable from './components/AddATable';
import TableData from './components/TableData';

const App = () => {
  return (
    <div>
      <Box
        sx={{
          flexDirection: 'row',
          p: 1,
          m: 1,
          bgcolor: 'background.paper',
          borderRadius: 1,
        }}>
        <AddATable />
        <TableData />
      </Box>
    </div>
  );
};

export default App;
