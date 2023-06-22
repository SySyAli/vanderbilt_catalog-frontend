import Stack from '@mui/material/Stack';
import { Dialog, DialogTitle, DialogContent } from '@mui/material';
import { IconButton, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';

import { CourseSearchDialog } from './CourseSearchDialog';
import { useState } from 'preact/hooks';

export function Possibility({id, removePossibility}: any) {
  const [ID, setID] = useState<any>(id)
  const [coursesSelected, setCoursesSelected] = useState<any>([]);
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [courseDialogOpen, setCourseDialogOpen] = useState(false);

  const handleSelectedCourse = (course: any) => {
    console.log(course);
    // prevent duplicates
    if (coursesSelected.some((c: any) => c._id === course._id)) {
      return;
    } else {
      setCoursesSelected([...coursesSelected, course]);
    }
  };

  const handleRemoveCourse = (removeCourse: any) => {
    // remove course from coursesSelected
    setCoursesSelected((oldValues: any) => {
      return oldValues.filter((course: any) => course !== removeCourse);
    });
  };

  const handleResultClick = (course: any) => {
    setSelectedCourse(course);
    setCourseDialogOpen(true);
  };

  const handleCloseCourseDialog = () => {
    setCourseDialogOpen(false);
  };

  const handleRemovePossibility = () => {
    // remove possibility from parent component by passing component itself to removePossibility function
    removePossibility(ID)
  };

  return (
    <div>
      <Box sx={{ backgroundColor: '#E4E4E4', width: 'fit-content' }} m={1} p={1}>
        <Stack direction="column" alignItems="center" justify="center" spacing={2}>
          <List>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
              <IconButton onClick={handleRemovePossibility}>
                <CloseIcon />
              </IconButton>
              Possibility {ID}
            </Typography>

            {coursesSelected ? (
              coursesSelected.map((course: any) => {
                return (
                  <ListItem key={course._id}>
                    <ListItemButton
                      onClick={() => {
                        handleResultClick(course);
                      }}
                    >
                      <ListItemText primary={course.code + ': ' + course.name} />
                    </ListItemButton>

                    {selectedCourse && (
                      <Dialog open={courseDialogOpen} onClose={handleCloseCourseDialog} spacing={2}>
                        <DialogTitle id="dialog-title">
                          <IconButton onClick={handleCloseCourseDialog} aria-label="close-dialog">
                            <CloseIcon />
                          </IconButton>
                          Course Information
                        </DialogTitle>
                        <DialogContent>
                          <Typography
                            variant="h5"
                            component="div"
                            sx={{ flexGrow: 1, fontWeight: 'bold' }}
                          >
                            {selectedCourse.code + ': ' + selectedCourse.name}
                          </Typography>
                          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            {'Department: ' + selectedCourse.department}
                          </Typography>
                          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            {'Hours: ' + selectedCourse.hours}
                          </Typography>
                          <Typography variant="body1" component="div" sx={{ flexGrow: 1 }}>
                            {'Description: ' + selectedCourse.description}
                          </Typography>
                          {/* Display additional course information here */}
                        </DialogContent>
                      </Dialog>
                    )}
                    <IconButton onClick={() => handleRemoveCourse(course)}>
                      <CloseIcon />
                    </IconButton>
                  </ListItem>
                );
              })
            ) : (
              <ListItem>
                <Typography variant="h5" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
                  No courses selected
                </Typography>
              </ListItem>
            )}
          </List>
          <CourseSearchDialog handleSelectedCourse={handleSelectedCourse} />
        </Stack>
      </Box>
    </div>
  );
}
