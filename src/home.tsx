import { FullView } from './components/FullView';
import { CssBaseline } from '@mui/material';

// TODO: ADD HOW TO IN THE ABOUT PAGE

export function Home({}: any) {
  return (
    <div style={{ height: '100vh' }}>
      <CssBaseline />

      <FullView />
    </div>
  );
}
