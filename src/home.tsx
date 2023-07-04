import NavBar from './components/Navbar';
import { FullView } from './components/FullView';
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
