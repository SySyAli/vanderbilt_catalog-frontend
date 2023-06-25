import NavBar from './components/Navbar';
import { FullView } from './components/FullView';

// TODO: FIX UP DISPLAY (MAKE IT A GRID AND IMPROVE UI)
// TODO: Once fully tested ADD local storage persistence
// TODO: Add github (about page)

export function Home({}: any) {
  return (
    <div>
      <NavBar />
      <FullView />
    </div>
  );
}
