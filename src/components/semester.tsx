/*
 * Semester.tsx
 * Description: This component is used to create a semester object. It contains a semester date and a list of possibilities.
 */
import { Typography, Button, Box, Stack, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { useRecoilState } from 'recoil';

import { semesterArray } from './atoms';
import { Possibility } from './Possibility';
// add functionality to remove possibility

export function Semester({ id, handleRemoveSemester }: any) {
  console.log('rendering semester: ' + id.id);
  const [semesterArrayView, setSemesterArrayView] = useRecoilState(semesterArray);

  // Find the current semester object based on the ID
  const semester = semesterArrayView.find((semester: any) => semester.id === id.id);

  /*
  // Extract the possibilities list from the semester object
  const possibilityArraySem = semester ? semester.possibilities : [];
  */

  console.log(semester);

  // random id generator for possibility
  const randomID = () => {
    return Math.floor(Math.random() * 1000000000);
  };

  const handleAddPossibility = () => {
    const updatedArray = [...semesterArrayView]; // Create a copy of the array

    // Find the index of the semester object based on the ID
    const semesterIndex = updatedArray.findIndex((semester: any) => semester.id === id.id);

    if (semesterIndex !== -1) {
      const semester = updatedArray[semesterIndex];

      // Create a new semester object with the updated possibilities array
      const updatedSemester = {
        ...semester,
        possibilities: [...semester.possibilities, { id: randomID(), courses: [] }],
      };

      // Replace the old semester object with the updated one in the array
      updatedArray[semesterIndex] = updatedSemester;

      // Update the semesterArrayView state with the updated array
      setSemesterArrayView(updatedArray);
      console.log(semesterArrayView);
    }
  };
  const handleRemovePossibility = (possibilityId: number) => {
    setSemesterArrayView((oldArray: any) => {
      const updatedArray = oldArray.map((semester: any) => {
        if (semester.id === id) {
          const updatedPossibilities = semester.possibilities.filter(
            (possibility: any) => possibility.id !== possibilityId,
          );
          return { ...semester, possibilities: updatedPossibilities };
        }
        return semester;
      });

      return updatedArray;
    });
  };

  const removeSemester = () => {
    setSemesterArrayView((oldArray: any) => oldArray.filter((semester: number) => semester !== id));
    handleRemoveSemester(id);
  };

  return (
    <div>
      <Box sx={{ backgroundColor: '#E0D5C0', width: 'fit-content' }} m={1} p={1}>
        <Stack direction="column" alignItems="center" justify="center" spacing={2}>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            <IconButton onClick={removeSemester}>
              <CloseIcon />
            </IconButton>
            Semester {Math.trunc(id.id / 100000)}
          </Typography>
          {semester && semester.possibilities
            ? semester.possibilities.map((possibilityObj: any) => (
                <Possibility
                  possibilityId={possibilityObj.id}
                  semesterId={id.id}
                  handleRemovePossibility={handleRemovePossibility}
                />
              ))
            : null}
          <Button onClick={handleAddPossibility} variant="outlined">
            <AddIcon />
            Add Possibility
          </Button>
        </Stack>
      </Box>
    </div>
  );
}
