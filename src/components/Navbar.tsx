import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'preact-router/match';
import { useRecoilState } from 'recoil';
import { aboutModalStatus } from './atoms';

export default function NavBar() {
  const [aboutModal, setAboutModal] = useRecoilState(aboutModalStatus);

  const handleOpenAboutModal = () => {
    console.log(aboutModal);
    setAboutModal(true);
  };

  return (
    // create a header that uses a flexbox to display the title and buttons without using MUI
    <div style="padding-top: 10px; padding-left: 30px; padding-bottom: 10px; background-color: #222222; color: #E0D5C0;">
      <nav style={{width:'100%', display: 'flex', flexDirection: 'row'}}>
        <Link href="/" > 
          <Typography
            variant="h5"
            component="div"
            sx={{ flexGrow: 1, fontWeight: 'bold', fontFamily: 'Monospace' }}
          >
            Vanderbilt Course Catalog Planner
          </Typography>
        </Link>
        <Button onClick={handleOpenAboutModal} color="inherit">
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontFamily: 'Monospace' }}>
            About
          </Typography>
        </Button>
        <Link href="/search">
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontFamily: 'Monospace' }}>
            Search
          </Typography>
        </Link>
      </nav>
    </div>
  );
}
