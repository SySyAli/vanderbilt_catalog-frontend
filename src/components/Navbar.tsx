import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function NavBar() {
  return (
    // create a header that uses a flexbox to display the title and buttons without using MUI
    <div style='padding-top: 10px; padding-left: 30px; padding-bottom: 10px; background-color: #222222; color: #E0D5C0;'>
      <Button color="inherit" href="/">
            <Typography variant="h5" component="div" sx={{ flexGrow: 1, fontWeight: 'bold', fontFamily: 'Monospace'}}>
              Vanderbilt Course Catalog Planner
            </Typography>
          </Button>
          <Button href="/about" color="inherit">
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontFamily: 'Monospace' }}>
              About
            </Typography>
          </Button>
          <Button href="/search" color="inherit">
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontFamily: 'Monospace' }}>
              Search
            </Typography>
          </Button>
    </div>
  );
}

/*
<div>
      <AppBar
        position="sticky"
        sx={{
          backgroundColor: '#FFFFFF',
          color: '#000000',
          overflow: 'hidden',
          overflowX: 'auto',
          fontWeight: 'bold',
          border: '1px solid var(--accents-2)',
          
        }}
      >
        <Toolbar>
          <Button color="inherit" href="/">
            <Typography variant="body1" component="div" sx={{ flexGrow: 1, fontWeight: 'bold'  }}>
              Vanderbilt Course Catalog Planner
            </Typography>
          </Button>
          <Button href="/about" color="inherit">
            <Typography variant="body1" component="div" sx={{ flexGrow: 1 }}>
              About
            </Typography>
          </Button>
          <Button href="/search" color="inherit">
            <Typography variant="body1" component="div" sx={{ flexGrow: 1 }}>
              Search
            </Typography>
          </Button>
        </Toolbar>
      </AppBar>
    </div>
*/