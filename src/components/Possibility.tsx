/*
 * Possibility.tsx
 * Description: This component is a possibility component that is used to display the courses that the user has selected
 * and to allow the user to search for courses to add to the possibility.
 */

import Stack from '@mui/material/Stack';
import { IconButton, List, ListItem } from '@mui/material';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import { useState } from 'preact/hooks';
import { useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil';

import { possibilityArray, coursesSelectedArray, idFORPossibility } from './atoms';
import { CourseSearchDialog } from './CourseSearchDialog';
import { CourseViewDialog } from './CourseViewDialog';

export function Possibility({ id, handleRemovePossibility }: any) {
  const [possibilityArraySem, setPossibilityArray] = useRecoilState(possibilityArray);
  const [coursesSelected, setCoursesSelected] = useState<any>([]);

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

  const removePossibility = () => {
    setPossibilityArray((oldArray: any) => oldArray.filter((possibility: number) => possibility !== id));
    handleRemovePossibility(id);
  };

  return (
    <div>
      <Box sx={{ backgroundColor: '#E4E4E4', width: 'fit-content' }} m={1} p={1}>
        <Stack direction="column" alignItems="center" justify="center" spacing={2}>
          <List>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
              <IconButton onClick={removePossibility}>
                <CloseIcon />
              </IconButton>
              Possibility {id}
            </Typography>

            {coursesSelected ? (
              coursesSelected.map((course: any) => {
                return (
                  <ListItem key={course._id}>
                    <CourseViewDialog course={course} />
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
