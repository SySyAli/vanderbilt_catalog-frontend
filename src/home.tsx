import { CssBaseline } from '@mui/material';
import { FullView } from './components/FullView';

// TODO: ADD HOW TO IN THE ABOUT PAGE

export function Home({}: any) {
  return (
    <div style={{ height: '100vh' }}>
      <CssBaseline />
      <FullView />
    </div>
  );
}
