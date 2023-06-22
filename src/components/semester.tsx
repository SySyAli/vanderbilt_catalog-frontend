import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { CourseSearchDialog } from './CourseSearchDialog';
import Typography from '@mui/material/Typography';

export function Semester() {
  return (
    <div>
      <Box sx={{ backgroundColor: '#DCDCDC' }} m={1} pt={1}>
        <Stack direction="column" alignItems="center" justify="center" spacing={2}>
          <Typography variant="h4" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            Semester Date
          </Typography>
          <CourseSearchDialog />
        </Stack>
      </Box>
    </div>
  );
}
