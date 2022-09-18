import {
  DialogTitle,
  DialogActions,
  DialogContent,
  Dialog,
  Button,
  Grid,
  TextField,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Swal from 'sweetalert2';
import { Box } from '@mui/system';
import axios from 'axios';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearState, paginatedEntities, setTable } from '../redux/dataSlice';

export default function AddATable() {
  const [open, setOpen] = useState(false);
  const { page, limit } = useSelector((state) => state?.data?.tabelData);
  const { currentTableState } = useSelector((state) => state.data);
  const dispatch = useDispatch();
  const [data, setData] = useState(currentTableState);
  const isVAlid =
    !!data.name && !!data.user && !isNaN(data.changes) && !!data.changes;
  const handleClickOpen = () => setOpen(true);

  const handelChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  const handleClose = () => {
    dispatch(setTable(data));
    setOpen(false);
  };
  const handelSubmit = () => {
    axios.post('/table', data).then((res) => {
      if (res?.data?.success === true) {
        // alert someting up
        dispatch(
          paginatedEntities({
            page: page ? page : 1,
            rowsPerPage: limit ? limit : 25,
          })
        );
        dispatch(clearState());
        Swal.fire('Entity Updated!', 'You Can See It On First Page', 'success');
        setOpen(false);
        setData({
          name: '',
          user: '',
          changes: '',
        });
      } else {
        // show error Message
        Swal.fire('Entity Updated!', res.message, 'error');
      }
    });
  };

  return (
    <div>
      <Button
        sx={{ margin: '10px 0px' }}
        variant='outlined'
        onClick={handleClickOpen}>
        Add A New Entity
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'>
        <DialogTitle id='alert-dialog-title'>
          <AddIcon />
          {'  Add a New Entity'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ flexGrow: 1 }}>
            <Grid
              container
              spacing={2}
              sx={{ width: '500px', padding: '1em 0em' }}>
              <Grid item xs={12}>
                <TextField
                  id='outlined-basic'
                  fullWidth
                  label='User'
                  variant='outlined'
                  name='user'
                  helperText={data.user === '' ? 'Please Enter User' : ' '}
                  error={!data.user}
                  value={data.user}
                  onChange={handelChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id='outlined-basic'
                  fullWidth
                  label='Name'
                  variant='outlined'
                  name='name'
                  error={!data.name}
                  value={data.name}
                  onChange={handelChange}
                  helperText={data.name === '' ? 'Please Enter Name' : ' '}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id='outlined-basic'
                  fullWidth
                  label='Changes'
                  variant='outlined'
                  name='changes'
                  error={isNaN(data.changes)}
                  value={data.changes}
                  onChange={handelChange}
                  helperText={
                    data.changes === '' || isNaN(data.changes)
                      ? 'Please Fill A Valid Number'
                      : ' '
                  }
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button disabled={!isVAlid} onClick={handelSubmit} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
