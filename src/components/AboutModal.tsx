import { Dialog, DialogTitle, DialogContent, Typography, Avatar, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { aboutModalStatus } from './atoms';
import { useRecoilState } from 'recoil';

const AboutModal = () => {
  const [aboutModalStatusView, setAboutModalStatusView] = useRecoilState(aboutModalStatus);

  const handleCloseModal = () => {
    setAboutModalStatusView(false);
  };

  return (
    <div>
      <Dialog
        open={aboutModalStatusView}
        onClose={() => {
          handleCloseModal();
        }}
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
        fullWidth
      >
        <DialogTitle id="dialog-title" sx={{ pb: 2, fontFamily: 'Monospace', display: 'flex', flexDirection:'row'  }}>
          <IconButton
            onClick={() => {
                handleCloseModal();
            }}
            aria-label="close-dialog"
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h3" sx={{ fontWeight: 'bold', fontFamily: 'Monospace' }}>
            About
          </Typography>
        </DialogTitle>

        <DialogContent id="dialog-description" sx={{display: 'flex', flexDirection:'column', justifyContent: 'center'}}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', fontFamily: 'Monospace', display: 'flex', flexDirection:'row' }}> 
            <Avatar sx={{ bgcolor: '#027148', p:2, m: 2 }}>S</Avatar>  
            Hi! I'm Syed, class of 2026. Thank you for using my app!
          </Typography>

          <Typography variant="body1" sx={{ fontFamily: 'Monospace', pt:2 }}>
            This is a course planner for Vanderbilt University. I created it after seeing the amount
            of '4 year plans' people made for their time at Vandy. I wanted to make a tool that
            would allow people to plan their courses in a more interactive way.
          </Typography>
          <Typography variant="h6" sx={{ fontFamily: 'Monospace', pb:2, pt:2  }}>
            Contact Me
          </Typography>
          <Typography variant="body1" sx={{ fontFamily: 'Monospace' }}>
            Send me an email at{' '}
            <a href={'mailto:syed.a.ali@vanderbilt.edu'} target="_blank">
              syed.a.ali@vanderbilt.edu
            </a>
            {'. '}
            If there is an issue with the app, please add the issue to Github Issues. Feel free to
            fork the repo and make a pull request if you want to add a feature.
          </Typography>
          <Typography variant="h6" sx={{ fontFamily: 'Monospace', pt: 2, pb:2 }}>
            Tech Stack
          </Typography>
          <Typography variant="body1" sx={{ fontFamily: 'Monospace' }}>
            This app uses Vite, Preact, and Typescript. For the design and interface, I used
            Material UI. I used RecoilJS for global state management. See the source code on Github:{' '}
            <a href={'https://github.com/SySyAli/vanderbilt_catalog-frontend'} target="_blank">
              vanderbilt_catalog-frontend.
            </a>
          </Typography>
          <Typography variant="h6" sx={{ fontFamily: 'Monospace', pt:2}}>
            Course Data
          </Typography>
          <Typography variant="body1" sx={{ fontFamily: 'Monospace' }}>
            The course data for this is recieved from the /search endpoint of my Vanderbilt Catalog
            API. There is also a GraphQL endpoint. See its source code and documentation on Github:{' '}
            <a href={'https://github.com/SySyAli/vanderbilt_catalog-api'} target="blank">
              vanderbilt_catalog-api.
            </a>
          </Typography>
        </DialogContent>
      </Dialog>
    </div>
  );
};


export {AboutModal};