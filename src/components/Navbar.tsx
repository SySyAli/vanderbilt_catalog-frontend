import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function NavBar() {
  return (
    <div>
      <AppBar
        position="sticky"
        sx={{
          backgroundColor: '#CFAE70',
          overflow: 'hidden',
          overflowX: 'auto',
          fontWeight: 'bold',
          
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
  );
}