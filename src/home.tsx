import NavBar from './components/Navbar';
import { FullView } from './components/FullView';

// TODO: Figure out way to display and generate multiple semesters (semester option button)
// TODO: Figure out way to generate semester (F22, S22, F23, S23, etc.)
// TODO: maybe remove possibilities and just have one course list per semester
// TODO: Once fully tested ADD local storage persistence
// TODO: Maybe change course catalog button to my own catalog?
// TODO: Add 'To CSV' Button
// TODO: Add 'To PDF' Button?
// TODO: Add github (about page)


export function Home({}: any) {
  return (
    <div>
      <NavBar />
      <FullView/>
    </div>
  );
}
