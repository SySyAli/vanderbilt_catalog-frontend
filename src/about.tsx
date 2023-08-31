import { Typography, Stack, Avatar } from '@mui/material';
import NavBar from './components/Navbar';


const About = ({}: any) => {
  return (
    <div style='margin: 0px; width: full; height: full;'>
      <NavBar />
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        sx={{ flexGrow: 1, textAlign: 'center', fontFamily: 'Monospace', backgroundColor: '#fff5ed'}}
      >
        <Typography variant="h2" sx={{ fontWeight: 'bold', fontFamily: 'Monospace' }}>
          About
        </Typography>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="space-between"
          spacing={2}
          sx={{
            flexGrow: 1,
            textAlign: 'center', 
            fontFamily: 'Monospace'
          }}
        >
          <Avatar sx={{ bgcolor: '#027148' }}>S</Avatar>
          <Typography variant="h5" sx={{ fontWeight: 'bold', fontFamily: 'Monospace' }}>
            Hi! I'm Syed, class of 2026. Thank you for using my app!
          </Typography>
        </Stack>
        <Typography variant="h5" sx={{ fontFamily: 'Monospace' }}>
          This is a course planner for Vanderbilt University. I created it after seeing the amount
          of '4 year plans' people made for their time at Vandy. I wanted to make a tool that would
          allow people to plan their courses in a more interactive way.
        </Typography>
        <Typography variant="h2" sx={{ fontFamily: 'Monospace' }}>Contact Me</Typography>
        <Typography variant="h5" sx={{ fontFamily: 'Monospace' }}>
          Send me an email at{' '}
          <a href={'mailto:syed.a.ali@vanderbilt.edu'} target="_blank">
            syed.a.ali@vanderbilt.edu
          </a>
          {'. '}
          If there is an issue with the app, please add the issue to Github Issues. Feel free to
          fork the repo and make a pull request if you want to add a feature.
        </Typography>
        <Typography variant="h2" sx={{ fontFamily: 'Monospace' }}>Tech Stack</Typography>
        <Typography variant="h5" sx={{ fontFamily: 'Monospace' }}>
          This app uses Vite, Preact, and Typescript. For the design and interface, I used Material
          UI. I used RecoilJS for global state management. See the source code on Github:{' '}
          <a href={'https://github.com/SySyAli/vanderbilt_catalog-frontend'} target="_blank">
            vanderbilt_catalog-frontend.
          </a>
        </Typography>
        <Typography variant="h2" sx={{ fontFamily: 'Monospace' }}>Course Data</Typography>
        <Typography variant="h5" sx={{ fontFamily: 'Monospace' }}>
          The course data for this is recieved from the /search endpoint of my Vanderbilt Catalog API.
          There is also a GraphQL endpoint. See it's source code and documentation on Github:{' '}
          <a href={'https://github.com/SySyAli/vanderbilt_catalog-api'} target="blank">
            vanderbilt_catalog-api.
          </a>
        </Typography>
      </Stack>
    </div>
  );
};

export default About;
