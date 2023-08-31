/*
 * Semester.tsx
 * Description: This component is used to create a semester object. It contains a semester date and a list of possibilities.
 */
import { Typography, Button, Stack, IconButton, Divider } from '@mui/material';
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

      // check if the generated id is unique, if not generate another one
      let generatedID = randomID();
      while (semester.possibilities.some((possibility: any) => possibility.id === generatedID)) {
        generatedID = randomID();
      }

      // Create a new semester object with the updated possibilities array
      const updatedSemester = {
        ...semester,
        possibilities: [...semester.possibilities, { id: generatedID, courses: [] }],
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
  /*
  old title code
  <Typography variant="h5" pt={1} component="div" sx={{ fontWeight: 'bold' }}>
          {semesterIndex === 0 || semesterIndex === semesterArrayView.length - 1 ? (
            <IconButton
              onClick={() => {
                removeSemester();
              }}
              sx={{
                opacity: 0,
                '&:hover': {
                  color: 'red',
                  opacity: 1,
                  textAlign: 'right',
                },
              }}
            >
              <CloseIcon />
            </IconButton>
          ) : (
            <IconButton
              sx={{
                opacity: 0,
              }}
            >
              <CloseIcon />
            </IconButton>
          )}

          {decodeSemester(semester.num)}
        </Typography>
*/
  return (
    <div
      style={{
        border: '1px solid #E4E4E4',
      }}
    >
      <Stack
        direction="column"
        alignItems="stretch"
        justify="center"
        wrap="nowrap"
        divider={<Divider orientation="horizontal" flexItem />}
        spacing={2}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          height: ' 100%',
          flexGrow: 1,
          width: '18rem',
          overflow: 'auto',
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
          sx={{
            width: '100%',
            flexWrap: 'wrap',
          }}
        >
          <Typography variant="h5" pt={1} component="div" sx={{ fontWeight: 'bold', fontFamily: 'Monospace'  }} pl={1}>
            {decodeSemester(semester.num)}
          </Typography>
          {semesterIndex === 0 || semesterIndex === semesterArrayView.length - 1 ? (
            <IconButton
              pr={1}
              onClick={() => {
                removeSemester();
              }}
              sx={{
                opacity: 1,
                '&:hover': {
                  color: 'red',
                  opacity: 1,
                  textAlign: 'right',
                },
              }}
            >
              <CloseIcon />
            </IconButton>
          ) : (
            <IconButton
              pr={1}
              sx={{
                opacity: 0,
              }}
            >
              <CloseIcon />
            </IconButton>
          )}
        </Stack>

        {semester && semester.possibilities ? (
          semester.possibilities.map((possibilityObj: any) => (
            <Possibility possibilityId={possibilityObj.id} semesterId={id} />
          ))
        ) : (
          <Typography variant="body2" component="div" sx={{fontFamily: 'Monospace' }}>
            No possibilities
          </Typography>
        )}
        <Button
          onClick={() => {
            handleAddPossibility();
          }}
          variant="outlined"
          startIcon={<AddIcon />}
          pt={1}
          sx={{ mt: 'auto', width: 'fit-content', justifyContent: 'flex-start', borderColor: 'rgb(228, 228, 228)', border: '1px solid #222222', color:'#302b21', fontFamily: 'Monospace' }}
        >
          Add Possibility
        </Button>
      </Stack>
    </div>
  );
}
