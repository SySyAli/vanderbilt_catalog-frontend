import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useRecoilState } from 'recoil';
import { aboutModalStatus, courseSearchDialogStatus } from './atoms';


export default function NavBar() {
  const [aboutModal, setAboutModal] = useRecoilState(aboutModalStatus);
  const [courseSearchDialogStatusView, setCourseSearchDialogStatusView] =
    useRecoilState(courseSearchDialogStatus);

  const handleOpenCourseSearchDialog = () => {
    console.log(courseSearchDialogStatusView)
    setCourseSearchDialogStatusView(true);
  };
  const handleOpenAboutModal = () => {
    console.log(aboutModal)
    setAboutModal(true);
  };

  return (
    // create a header that uses a flexbox to display the title and buttons without using MUI
    <div style='padding-top: 10px; padding-left: 30px; padding-bottom: 10px; background-color: #222222; color: #E0D5C0;'>
      <Button color="inherit" href="/">
            <Typography variant="h5" component="div" sx={{ flexGrow: 1, fontWeight: 'bold', fontFamily: 'Monospace'}}>
              Vanderbilt Course Catalog Planner
            </Typography>
          </Button>
          <Button onClick={handleOpenAboutModal} color="inherit">
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontFamily: 'Monospace' }}>
              About
            </Typography>
          </Button>
          <Button onClick={handleOpenCourseSearchDialog} color="inherit">
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontFamily: 'Monospace' }}>
              Search
            </Typography>
          </Button>
    </div>
  );
}
