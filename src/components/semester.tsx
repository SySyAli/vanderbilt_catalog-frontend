/*
 * Semester.tsx
 * Description: This component is used to create a semester object. It contains a semester date and a list of possibilities.
 */
import { Typography, Button, Box, Stack } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useSetRecoilState, useRecoilValue } from 'recoil';

import { possibilityArray } from './atoms';
import { Possibility } from './Possibility';
// add functionality to remove possibility

export function Semester() {
  const setPossibilityArray = useSetRecoilState(possibilityArray);
  const possibilityArraySem = useRecoilValue(possibilityArray);

  // random id generator for possibility
  const randomID = () => {
    return Math.floor(Math.random() * 1000000000);
  };

  const handleAddPossibility = () => {
    setPossibilityArray((oldArray: any) => [...oldArray, randomID()]);
  };

  const handleRemovePossibility = (id: number) => {
    setPossibilityArray((oldArray: any) =>
      oldArray.filter((possibility: number) => possibility !== id),
    );
  };

  return (
    <div>
      <Box sx={{ backgroundColor: '#E0D5C0', width: 'fit-content' }} m={1} p={1}>
        <Stack direction="column" alignItems="center" justify="center" spacing={2}>
          <Typography variant="h4" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            Semester Date
          </Typography>
          {possibilityArraySem.map((id: number) => (
            <Possibility key={id} id={id} handleRemovePossibility={handleRemovePossibility} />
          ))}
          <Button onClick={handleAddPossibility} variant="outlined">
            <AddIcon />
            Add Possibility
          </Button>
        </Stack>
      </Box>
    </div>
  );
}
