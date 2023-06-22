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

export function Possibility({ id }: any) {
  const setPossibillityArray = useSetRecoilState(possibilityArray);
  const possibillityArray = useRecoilValue(possibilityArray);
  // making this into recoil state breaks everything
  const [ID, setID] = useState<any>(id);
  const [coursesSelected, setCoursesSelected] = useState<any>([]);
  //const setCoursesSelected = useSetRecoilState(coursesSelectedArray);
  //const coursesSelected = useRecoilValue(coursesSelectedArray);

  setID(id);

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

  // TODO: THIS DOES NOT WORK
  const handleRemovePossibility = () => {
    // get index of current possibility
    console.log(ID);

    const currIndex = possibillityArray.findIndex(
      (possibility: any) => possibility.props.id === ID,
    );
    console.log(possibillityArray);
    console.log(currIndex);
    console.log(possibillityArray[currIndex]);

    // remove current possibility from possibilities
    const newArray = removeItemAtIndex(possibillityArray, currIndex);
    // update possibilities
    //setPossibillityArray(newArray);
    // remove current possibility from possibilities based upon ID
    setPossibillityArray((oldValues: any) => {
      return oldValues.filter((possibility: any) => possibility.props.id !== ID);
    });
  };

  const removeItemAtIndex = (arr: any, index: any) => {
    return [...arr.slice(0, index), ...arr.slice(index + 1)];
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
