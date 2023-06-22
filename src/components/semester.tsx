import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { CourseSearchDialog } from './CourseSearchDialog';
import Typography from '@mui/material/Typography';
import { useState } from 'preact/hooks';
import { IconButton, List, ListItem } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export function Semester() {
  const [coursesSelected, setCoursesSelected] = useState<any>([]);

  const handleSelectedCourse = (course: any) => {
    console.log('PARENT');
    console.log(handleSelectedCourse);
    setCoursesSelected([...coursesSelected, course]);
  };

  const handleRemoveCourse = (removeCourse: any) => {
    // remove course from coursesSelected
    setCoursesSelected((oldValues: any) => {
      return oldValues.filter((course: any) => course !== removeCourse);
    });
  };

  // TODO: add same course dialog box to this as well (make it a component)
  // TODO: Prevent Duplicates
  // TODO: Add hours
  return (
    <div>
      <Box sx={{ backgroundColor: '#DCDCDC' }} m={1} pt={1} pb={1}>
        <Stack direction="column" alignItems="center" justify="center" spacing={2}>
          <Typography variant="h4" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            Semester Date
          </Typography>

          <List>
            <Typography variant="h5" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
              Course Selection
            </Typography>

            {coursesSelected ? (
              coursesSelected.map((course: any) => {
                return (
                  <ListItem key={course._id}>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                      {course.code + ': ' + course.name}
                    </Typography>
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
