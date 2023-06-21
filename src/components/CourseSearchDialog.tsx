import Button from '@mui/material/Button';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from '@mui/material';
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  CircularProgress,
} from '@mui/material';

import { useState, useEffect } from 'preact/hooks';

export function CourseSearchDialog() {
  const [open, setOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [apiResults, setApiResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleSearchTextChange = (event: any) => {
    setSearchText(event.target.value);
  };


  useEffect(() => {
    const fetchData = async () => {
      if (searchText !== '') {
        setLoading(true);
        try {
          const url = `http://localhost:3000/search/` + searchText;
          const response = await fetch(url);
          const data = await response.json();
          setApiResults(data.courses.hits);
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          setLoading(false);
        }
      } else {
        setApiResults([]);
      }
    };

    fetchData();
  }, [searchText]);

  return (
    <div>
      <Button onClick={handleOpenDialog} variant="outlined">
        Add a Course
      </Button>

      <Dialog
        open={open}
        onClose={handleCloseDialog}
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
        fullWidth
      >
        <DialogTitle id="dialog-title">Add a Course</DialogTitle>

        <DialogContent id="dialog-description">
          <TextField
            label="Search"
            value={searchText}
            onChange={handleSearchTextChange}
            fullWidth
          />
          {loading ? (
            <CircularProgress />
          ) : (
            <List>
              {apiResults.map((result: any) => (
                <ListItem key={result._id}>
                  <ListItemText primary={result.code + ': ' + result.name} />
                  <ListItemSecondaryAction>
                    {/* Additional actions for each result */}
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
