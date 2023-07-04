import NavBar from './Components/Navbar';
import { FullView } from './Components/FullView';
import { CssBaseline } from '@mui/material';

// TODO: Add a CRON Job for the database
// TODO: START HOSTING

export function Home({}: any) {
  return (
    <div style={{ height: '100vh' }}>
      <CssBaseline />
      <NavBar />
      <FullView />
    </div>
  );
}
