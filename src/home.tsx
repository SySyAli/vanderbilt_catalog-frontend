import NavBar from './components/Navbar';
import { FullView } from './components/FullView';
import {CssBaseline} from '@mui/material';

// TODO: FIX UP DISPLAY (MAKE IT A GRID AND IMPROVE UI)
// TODO: Once fully tested ADD local storage persistence
// TODO: Add github (about page)

export function Home({}: any) {
  return (
    <div style={{height:'100vh'}}>
      <CssBaseline/>
      <NavBar />
      <FullView />
    </div>
  );
}
