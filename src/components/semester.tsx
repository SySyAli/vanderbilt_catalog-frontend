import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { CourseSearchDialog } from './CourseSearchDialog';

export function Semester() {
  return (
    <div>
      <Box sx={{ backgroundColor: '#DCDCDC' }}>
        <Stack direction="column" alignItems="center" justify="center">
          <h1>Semester Date</h1>
          <CourseSearchDialog />
        </Stack>
      </Box>
    </div>
  );
}
