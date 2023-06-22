import { Stack } from '@mui/material';

import NavBar from './components/Navbar';
import { Semester } from './components/semester';

// TODO: Add State Management Library (TBD)
// TODO: Fix all of the states
// TODO: fix the remove possibility function
// TODO: Add hours to semester (user input)
// TODO: Figure out way to generate semester (F22, S22, F23, S23, etc.)
// TODO: Figure out way to display and generate multiple semesters (semester option button)
// TODO: Maybe change course catalog button to my own catalog?
// TODO: Add 'To CSV' Button
// TODO: Add 'To PDF' Button?
// TODO: Add github (about page)

export function Home({}: any) {
  return (
    <div>
      <NavBar />
      <Stack direction="column" alignItems="center" justify="center" spacing={2}>
        <Semester />
      </Stack>
    </div>
  );
}
