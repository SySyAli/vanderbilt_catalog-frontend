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

import { CourseViewDialog } from '../Components/CourseViewDialog';
import {
  openCourseDialog,
  searchTextDialog,
  apiResultsDialog,
  loadingDialog,
  currIDs,
  semesterArray,
} from '../Components/atoms';

export function CourseSearchDialog({ possibilityId, semesterId }: any) {
  const [open, setOpen] = useRecoilState(openCourseDialog);
  const [searchText, setSearchText] = useRecoilState(searchTextDialog);
  const [apiResults, setApiResults] = useRecoilState(apiResultsDialog);
  const [loading, setLoading] = useRecoilState(loadingDialog);
  const [currIDsView, setCurrIDsView] = useRecoilState<any>(currIDs);
  const [semesterArrayView, setSemesterArrayView] = useRecoilState(semesterArray);

  const handleOpenDialog = () => {
    console.log('opening course search button of: ' + possibilityId + ' ' + semesterId);
    setCurrIDsView({ possibilityId: possibilityId, semesterId: semesterId });

    setOpen(true);
  };

  const handleCloseDialog = () => {
    console.log('closing course search button of: ' + possibilityId + ' ' + semesterId);
    setCurrIDsView({ possibilityId: null, semesterId: null });

    setOpen(true);
    setSearchText('');
    setApiResults([]);
    setLoading(false);
    setOpen(false);
  };

  const handleAddCourse = (course: any) => {
    console.log(
      'adding course: ' +
        course.code +
        ' to possibility: ' +
        currIDsView.possibilityId +
        ' and semester: ' +
        currIDsView.semesterId,
    );

    if (currIDsView) {
      // generating the correct semester and possibility objects based upon currIDsView
      const semester = semesterArrayView.find(
        (semester: any) => semester.id === currIDsView.semesterId,
      );
      const possibility = semester
        ? semester.possibilities.find((p: any) => p.id === currIDsView.possibilityId)
        : null;

      // Check if the semester and possibility exist
      if (semester && possibility) {
        // Check if the course is already in the possibility
        if (possibility.courses.some((c: any) => c._id === course._id)) {
          return;
        }

        // Update the possibility's courses array
        const updatedPossibility = {
          ...possibility,
          courses: [...possibility.courses, course],
        };

        // Update the semester's possibilities array
        const updatedPossibilities = semester.possibilities.map((p: any) =>
          p.id === possibility.id ? updatedPossibility : p,
        );

        // Update the semester array
        setSemesterArrayView((oldArray: any) => {
          const updatedArray = oldArray.map((s: any) =>
            s.id === semesterId ? { ...semester, possibilities: updatedPossibilities } : s,
          );
          return updatedArray;
        });
      }
    }
    console.log(semesterArrayView);

    // close the dialog
    handleCloseDialog();
  };

  const handleSearchTextChange = (event: any) => {
    setSearchText(event.target.value);
    console.log('searching for: (onChange)' + searchText);
    console.log('searching for: ' + event.target.value);
  };

  const generateRandomNum = () => {
    return Math.floor(Math.random() * 1000000);
  };

  useEffect(() => {
    let ignore = false;
    if (searchText === '') {
      setApiResults([]);
      return;
    } else {
      setLoading(true);
      fetch(`https://vanderbilt-catalog-api.onrender.com/search/${searchText}`).then((res) => {
        res.json().then((data) => {
          if (!ignore) {
            setApiResults(data.courses.hits);
            setLoading(false);
          }
        });
      });
      return () => {
        ignore = true;
      };
    }
  }, [searchText]);

  return (
    <div>
      <Button
        onClick={() => {
          handleOpenDialog();
        }}
        variant="outlined"
      >
        Add a Course
      </Button>

      <Dialog
        open={open}
        onClose={() => {
          handleCloseDialog();
        }}
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
        fullWidth
      >
        <DialogTitle id="dialog-title" sx={{ pb: 2 }}>
          <IconButton
            onClick={() => {
              handleCloseDialog();
            }}
            aria-label="close-dialog"
          >
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
                <ListItem
                  key={result._id}
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: 'fit-content',
                  }}
                >
                  <ListItemButton>
                    <IconButton
                      onClick={() => {
                        handleAddCourse(result);
                      }}
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

// old useEffect code
/*
  // create a useEffect hook to fetch data from the API that also has a cleanup function to prevent a race condition
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchData = async () => {
      console.log('searching for (useEffect): ' + searchText);
      if (searchText !== '') {
        setLoading(true);
        try {
          const url = `http://localhost:3000/search/` + searchText;
          const response = await fetch(url, { signal: signal });
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

    return () => {
      controller.abort();
    };
  }, [searchText]);

  
  useEffect(() => {
    const fetchData = async () => {
      console.log('searching for (useEffect): ' + searchText);
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
*/
