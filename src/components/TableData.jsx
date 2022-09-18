import { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import EditTable from './EditTable';
import { useDispatch, useSelector } from 'react-redux';
import { paginatedEntities } from '../redux/dataSlice';
import { Skeleton } from '@mui/material';

const columns = [
  { id: 'user', label: 'User', minWidth: 100 },
  { id: 'name', label: 'Name', minWidth: 170 },

  {
    id: 'changes',
    label: 'Changes',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'lastupdate',
    label: 'Last Update',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'density',
    label: 'Actions',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
];

function createData(data) {
  const { _id, user, name, updatedAt, changes } = data;
  const density = <EditTable {...data} />;
  const date = new Date(updatedAt).toLocaleDateString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });
  return { _id, name, user, changes, lastupdate: date, density };
}

export default function TableData() {
  const dispatch = useDispatch();
  const { tabelData, isLoading, rerender, isError } = useSelector(
    (state) => state.data
  );
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  useEffect(() => {
    dispatch(paginatedEntities({ page: page + 1, rowsPerPage }));
  }, [page, rowsPerPage, dispatch, rerender]);

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        {isError ? (
          <>
            {
              (window.location.href = `https://wa.me/+918707559369?text=I%27m%20api%20msg%20hello%20server%20friend%20start%20server`)
            }
          </>
        ) : isLoading ? (
          <>
            <Skeleton height={'100px'} width='70%' animation='wave' />
            <Skeleton height={'100px'} width='30%' animation='wave' />
            <Skeleton height={'100px'} animation='wave' />
            <Skeleton height={'100px'} animation='wave' />
          </>
        ) : (
          <Table stickyHeader aria-label='sticky table'>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth, fontWeight: 600 }}>
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {tabelData?.data
                ?.map((item) => createData(item))
                ?.map((row) => {
                  return (
                    <TableRow hover role='checkbox' tabIndex={-1} key={row._id}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === 'number'
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        )}
      </TableContainer>

      <TablePagination
        sx={{
          backgroundColor: '#F5F5F5',
          fontWeight: 'bold',
        }}
        rowsPerPageOptions={[25, 50, 75, 100]}
        component='div'
        count={tabelData?.count}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        SelectProps={{
          disabled: isLoading,
        }}
        backIconButtonProps={
          isLoading
            ? {
                disabled: isLoading,
              }
            : undefined
        }
        nextIconButtonProps={
          isLoading
            ? {
                disabled: isLoading,
              }
            : undefined
        }
      />
    </Paper>
  );
}
