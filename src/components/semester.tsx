import { Typography, Button, Box, Stack } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'preact/hooks';
import { Possibility } from './possibility';

// add functionality to remove possibility

export function Semester() {
  const [possibillityArray, setPossibillityArray] = useState<any>([]);

  // random id generator for possibility
  const randomID = () => {
    return Math.floor(Math.random() * 1000000000);
  };

  const removePossibility = (removePossibility: any) => {
    // remove possibility from possibillityArray based upon ID from state in the possibility component
    setPossibillityArray((oldValues: any) => {
      return oldValues.filter((possibility: any) => possibility.props.id !== removePossibility);
    });
  };

  const handleAddPossibility = () => {
    setPossibillityArray([
      ...possibillityArray,
      <Possibility id={randomID()} removePossibility={removePossibility} />,
    ]);
    console.log(possibillityArray);
  };

  return (
    <div>
      <Box sx={{ backgroundColor: '#E0D5C0', width: 'fit-content' }} m={1} p={1}>
        <Stack direction="column" alignItems="center" justify="center" spacing={2}>
          <Typography variant="h4" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            Semester Date
          </Typography>
          {possibillityArray}
          <Button onClick={handleAddPossibility} variant="outlined">
            <AddIcon />
            Add Possibility
          </Button>
        </Stack>
      </Box>
    </div>
  );
}
