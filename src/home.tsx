import NavBar from './components/navbar';
import { Semester } from './components/semester';

export function Home({}:any) {
  return (
    <div>
      <NavBar />
      <Semester/>
    </div>
  );
}
