import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'preact-router/match';
import { useRecoilState } from 'recoil';
import { aboutModalStatus } from './atoms';

export default function NavBar() {
  const [aboutModal, setAboutModal] = useRecoilState(aboutModalStatus);
  /*
  const handleOpenAboutModal = () => {
    console.log(aboutModal);
    setAboutModal(true);
  };
  */
  return (
    // create a header that uses a flexbox to display the title and buttons without using MUI
    <div style="padding-top: 10px; padding-left: 30px; padding-bottom: 10px; background-color: #222222; color: #E0D5C0;">
      <nav style={{ width: '100%', display: 'flex', flexDirection: 'row', textDecoration: 'none' }}>
        <Button color="inherit">
          <Link href="/" style={{ textDecoration: 'none', color: '#E0D5C0' }}>
            <Typography
              variant="h5"
              component="div"
              sx={{
                flexGrow: 1,
                fontWeight: 'bold',
                fontFamily: 'Monospace',
                textDecoration: 'none',
              }}
            >
              Vanderbilt Course Catalog Planner
            </Typography>
          </Link>
        </Button>

        <Button color="inherit">
          <Link href="/about" style={{ textDecoration: 'none', color: '#E0D5C0' }}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontFamily: 'Monospace' }}>
              About
            </Typography>
          </Link>
        </Button>

        <Button color="inherit">
          <Link href="/search" style={{ textDecoration: 'none', color: '#E0D5C0' }}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontFamily: 'Monospace' }}>
              Search
            </Typography>
          </Link>
        </Button>
      </nav>
    </div>
  );
}
