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
import { decodeSemester, randomID } from './FullView';
// add functionality to remove possibility

export function Semester({ id }: any) {
  console.log('rendering semester: ' + id);

  const [semesterArrayView, setSemesterArrayView] = useRecoilState(semesterArray);

  // Find the current semester object based on the ID
  const semester = semesterArrayView.find((semester: any) => semester.id === id);
  console.log(semester);
  // find the index of the semester
  const semesterIndex = semesterArrayView.findIndex((semester: any) => semester.id === id);

  const handleAddPossibility = () => {
    const updatedArray = [...semesterArrayView]; // Create a copy of the array

    // Find the index of the semester object based on the ID
    const semesterIndex = updatedArray.findIndex((semester: any) => semester.id === id);

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
      console.log('ADD POSSIBILITY');
      console.log(semesterArrayView);
    }
  };

  const removeSemester = () => {
    setSemesterArrayView((oldArray: any) => oldArray.filter((semester: any) => semester.id !== id));
  };

  return (
    <div>
      <Box sx={{ backgroundColor: '#E0D5C0', width: 'fit-content' }} m={1} p={1}>
        <Stack direction="column" alignItems="center" justify="center" spacing={2}>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            {semesterIndex === 0 || semesterIndex === semesterArrayView.length - 1 ? (
              <IconButton
                onClick={() => {
                  removeSemester();
                }}
              >
                <CloseIcon />
              </IconButton>
            ) : <></>}

            {decodeSemester(semester.num)}
          </Typography>
          {semester && semester.possibilities
            ? semester.possibilities.map((possibilityObj: any) => (
                <Possibility possibilityId={possibilityObj.id} semesterId={id} />
              ))
            : null}
          <Button
            onClick={() => {
              handleAddPossibility();
            }}
            variant="outlined"
          >
            <AddIcon />
            Add Possibility
          </Button>
        </Stack>
      </Box>
    </div>
  );
}
