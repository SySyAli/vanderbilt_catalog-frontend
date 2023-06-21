import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function NavBar() {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Button color="inherit" href="/">
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Vanderbilt Course Catalog Planner
          </Typography>
        </Button>
        <Button href="/about" color="inherit">
          About
        </Button>
        <Button
          href="https://more.app.vanderbilt.edu/more/SearchCourses!input.action"
          target="_blank"
          color="inherit"
        >
          Course Catalog
        </Button>
      </Toolbar>
    </AppBar>
  );
}
