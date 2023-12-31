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
import { useRecoilState } from 'recoil';

import { semesterArray } from './atoms';
import { CourseSearchDialog } from './CourseSearchDialog';
import { CourseViewDialog } from './CourseViewDialog';
import {stringToASCII} from './FullView';

export function Possibility({ possibilityId, semesterId }: any) {
  console.log('rendering possibility:' + ' ' + possibilityId);
  const [semesterArrayView, setSemesterArrayView] = useRecoilState(semesterArray);

  // Find the current semester object based on the semester ID
  const semester = semesterArrayView.find((semester: any) => semester.id === semesterId);

  // Find the current possibility object based on the possibility ID
  const possibility = semester
    ? semester.possibilities.find((p: any) => p.id === possibilityId)
    : null;
  console.log(possibility);

  const handleSelectedCourse = (course: any) => {
    console.log('adding course: ' + course.name + 'to ' + possibilityId);

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
        p.id === possibilityId ? updatedPossibility : p,
      );

      // Update the semester array
      setSemesterArrayView((oldArray: any) => {
        const updatedArray = oldArray.map((s: any) =>
          s.id === semesterId ? { ...semester, possibilities: updatedPossibilities } : s,
        );
        return updatedArray;
      });

      console.log(semesterArrayView);
    }
  };

  const handleRemoveCourse = (removeCourse: any) => {
    // Check if the semester and possibility exist
    if (semester && possibility) {
      // Update the possibility's courses array
      const updatedPossibility = {
        ...possibility,
        courses: possibility.courses.filter((course: any) => course !== removeCourse),
      };

      // Update the semester's possibilities array
      const updatedPossibilities = semester.possibilities.map((p: any) =>
        p.id === possibilityId ? updatedPossibility : p,
      );

      // Update the semester array
      setSemesterArrayView((oldArray: any) => {
        const updatedArray = oldArray.map((s: any) =>
          s.id === semesterId ? { ...semester, possibilities: updatedPossibilities } : s,
        );
        return updatedArray;
      });
    }
  };

  const removePossibility = () => {
    console.log('removing possibility: ' + possibilityId);
    // Update the semester's possibilities array
    const updatedPossibilities = semester.possibilities.filter((p: any) => p.id !== possibilityId);

    // Update the semester array
    setSemesterArrayView((oldArray: any) => {
      const updatedArray = oldArray.map((s: any) =>
        s.id === semesterId ? { ...semester, possibilities: updatedPossibilities } : s,
      );
      return updatedArray;
    });
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',

        pt: 1,
        pb: 1,
        mt: 0,
      }}
      m={1}
      p={1}
    >
      <Stack
        direction="column"
        alignItems="center"
        justify="center"
        wrap="nowrap"
        spacing={2}
        sx={{ overflowY: 'scroll', height: '20rem' }}
      >
        <List alignItems="center" justify="center">
          <Typography variant="body1" component="div" sx={{ flexGrow: 1, fontWeight: 'bold', fontFamily: 'Monospace'  }}>
            <IconButton
              onClick={() => {
                removePossibility();
              }}
            >
              <CloseIcon />
            </IconButton>
            Possibility {stringToASCII(possibilityId)}
          </Typography>
          <List
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <CourseSearchDialog
              possibilityId={possibilityId}
              semesterId={semesterId}
              handleSelectedCourse={handleSelectedCourse}
            />
          </List>
          {possibility.courses.length > 0 ? (
            possibility.courses.map((course: any) => {
              console.log('rendering course: ' + course.name + 'to' + possibilityId);
              return (
                <ListItem key={course._id} sx={{ fontFamily: 'Monospace' }}>
                  <CourseViewDialog course={course} />
                  <IconButton
                    onClick={() => {
                      handleRemoveCourse(course);
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                </ListItem>
              );
            })
          ) : (
            <ListItem>
              <Typography variant="body1" component="div" sx={{ flexGrow: 1, fontWeight: 'bold', fontFamily: 'Monospace'  }}>
                No courses selected
              </Typography>
            </ListItem>
          )}
        </List>
      </Stack>
    </Box>
  );
}
