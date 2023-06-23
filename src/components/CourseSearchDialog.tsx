/*
 * CourseSearchDialog.tsx
 * Description: This component is a dialog that allows the user to search for a course and send the selected course to the parent component
 */

import Button from '@mui/material/Button';
import { Dialog, DialogTitle, DialogContent, TextField, ListItemButton } from '@mui/material';
import { List, ListItem, CircularProgress, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import { useEffect } from 'preact/hooks';
import { useRecoilState } from 'recoil';

import { CourseViewDialog } from './CourseViewDialog';
import { openCourseDialog, searchTextDialog, apiResultsDialog, loadingDialog } from './atoms';

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
export function CourseSearchDialog({ handleSelectedCourse }: any) {
  const [open, setOpen] = useRecoilState(openCourseDialog);
  const [searchText, setSearchText] = useRecoilState(searchTextDialog);
  const [apiResults, setApiResults] = useRecoilState(apiResultsDialog);
  const [loading, setLoading] = useRecoilState(loadingDialog);

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setSearchText('');
    setApiResults([]);
    setLoading(false);
    setOpen(false);
  };
  // to be implemented using recoil...
  const handleAddCourse = (course: any) => {
    // send selected course to parent component
    handleSelectedCourse(course);
    // close the dialog
    handleCloseDialog();
  };

  const handleSearchTextChange = (event: any) => {
    setSearchText(event.target.value);
  };

  const generateRandomNum = () => {
    return Math.floor(Math.random() * 1000000);
  };

  useEffect(() => {
    if (!open) {
      setSearchText('');
      setApiResults([]);
      setLoading(false);
    }
  }, [open]);

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
            autoFocus
            id={generateRandomNum().toString()}
          />
          {loading ? (
            <CircularProgress />
          ) : (
            <List>
              {apiResults.map((result: any) => (
                <ListItem key={result._id}>
                  <ListItemButton>
                    <IconButton
                      onClick={() => handleAddCourse(result)}
                      variant="outlined"
                      aria-label="add-course"
                    >
                      <AddIcon />
                    </IconButton>
                  </ListItemButton>

                  <CourseViewDialog course={result} />
                </ListItem>
              ))}
            </List>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
