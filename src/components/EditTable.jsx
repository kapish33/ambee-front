import {
  DialogTitle,
  DialogActions,
  DialogContent,
  Dialog,
  Button,
  Box,
  Grid,
  TextField,
} from '@mui/material';
import Swal from 'sweetalert2';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { rerender } from '../redux/dataSlice';

export default function EditTable({ _id, name, user, changes }) {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const [data, setData] = useState({
    name: name,
    user: user,
    changes: changes,
  });
  const isVAlid =
    !!data.name && !!data.user && !isNaN(data.changes) && !!data.changes;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handelChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleClose = () => {
    setOpen(false);
  };
  // rerender
  const handelPatch = (_id) => {
    axios.patch(`table?id=${_id}`, data).then((res) => {
      if (res?.data?.success === true) {
        // alert someting up
        dispatch(rerender());
        Swal.fire('Entity Updated!', 'You Can See It On First Page', 'success');
      } else {
        // show error Message res.message would be too big but only for demonstration i had putted it
        Swal.fire('Entity Updated!', res.message, 'error');
      }
      setOpen(false);
    });
  };

  return (
    <div>
      <Button variant='outlined' onClick={handleClickOpen}>
        Edit Entity
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'>
        <DialogTitle id='alert-dialog-title'>
          <EditIcon />
          {' Edit A Entity'}
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
          <Button
            disabled={!isVAlid}
            onClick={() => handelPatch(_id)}
            autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
