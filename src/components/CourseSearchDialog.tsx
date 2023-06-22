import Button from '@mui/material/Button';
import { Dialog, DialogTitle, DialogContent, TextField, ListItemButton } from '@mui/material';
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  CircularProgress,
  IconButton,
  DialogActions,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import { useState, useEffect } from 'preact/hooks';
/*
interface Course {
  _id: String;
  code: String;
  name: String;
  department: String;
  departmentAbbreviation: String;
  hours: String;
  description: String;
}
*/
export function CourseSearchDialog() {
  const [open, setOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [apiResults, setApiResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [courseDialogOpen, setCourseDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleSearchTextChange = (event: any) => {
    setSearchText(event.target.value);
  };

  const handleResultClick = (course: any) => {
    setSelectedCourse(course);
    setCourseDialogOpen(true);
  };

  const handleCloseCourseDialog = () => {
    setCourseDialogOpen(false);
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

  // add the selected course to a semester list

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
        <DialogTitle id="dialog-title">
          <IconButton onClick={handleCloseDialog} aria-label="close-dialog">
            <CloseIcon />
          </IconButton>
          Add a Course
        </DialogTitle>

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
                  <ListItemButton>
                    <IconButton
                      onClick={handleCloseDialog}
                      variant="outlined"
                      aria-label="add-course"
                    >
                      <AddIcon />
                    </IconButton>
                  </ListItemButton>

                  <ListItemButton onClick={() => handleResultClick(result)}>
                    <ListItemText primary={result.code + ': ' + result.name} />
                  </ListItemButton>

                  {selectedCourse && (
                    <Dialog open={courseDialogOpen} onClose={handleCloseCourseDialog} spacing={2}>
                      <DialogTitle>Course Information</DialogTitle>
                      <DialogContent>
                        <Typography
                          variant="h5"
                          component="div"
                          sx={{ flexGrow: 1, fontWeight: 'bold' }}
                        >
                          {selectedCourse.code + ': ' + selectedCourse.name}
                        </Typography>
                        <Typography
                          variant="h6"
                          component="div"
                          sx={{ flexGrow: 1}}
                        >
                          {'Department: ' + selectedCourse.department}
                        </Typography>
                        <Typography
                          variant="h6"
                          component="div"
                          sx={{ flexGrow: 1}}
                        >
                          {'Hours: ' + selectedCourse.hours}
                        </Typography>
                        <Typography
                          variant="body1"
                          component="div"
                          sx={{ flexGrow: 1}}
                        >
                          {'Description: ' + selectedCourse.description}
                        </Typography>
                        {/* Display additional course information here */}
                      </DialogContent>
                      <DialogActions>
                        <Button variant="outlined" onClick={handleCloseCourseDialog}>
                          Close
                        </Button>
                      </DialogActions>
                    </Dialog>
                  )}

                </ListItem>
              ))}
            </List>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
