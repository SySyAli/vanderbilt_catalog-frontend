import NavBar from './components/Navbar';
import { FullView } from './components/FullView';
import { CssBaseline } from '@mui/material';

// TODO: Once fully tested ADD local storage persistence
// TODO: Add github (about page)
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
