import { Typography, Stack, Avatar } from '@mui/material';
import NavBar from './components/Navbar';

const About = ({}: any) => {
  return (
    <div>
      <NavBar />
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        sx={{ flexGrow: 1, textAlign: 'center' }}
      >
        <Typography variant="h1" sx={{ fontWeight: 'bold' }}>
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
          }}
        >
          <Avatar sx={{ bgcolor: '#027148' }}>S</Avatar>
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
            Hi! I'm Syed, class of 2026. Thank you for using my app!
          </Typography>
        </Stack>
        <Typography variant="h5">
          This is a course planner for Vanderbilt University. I created it after seeing the amount
          of '4 year plans' people made for their time at Vandy. I wanted to make a tool that would
          allow people to plan their courses in a more interactive way.
        </Typography>
        <Typography variant="h2">Contact Me</Typography>
        <Typography variant="h5">
          Send me an email at{' '}
          <a href={'mailto:syed.a.ali@vanderbilt.edu'} target="_blank">
            syed.a.ali@vanderbilt.edu
          </a>
          {'. '}
          If there is an issue with the app, please add the issue to Github Issues. Feel free to
          fork the repo and make a pull request if you want to add a feature.
        </Typography>
        <Typography variant="h2">Tech Stack</Typography>
        <Typography variant="h5">
          This app uses Vite, Preact, and Typescript. For the design and interface, I used Material
          UI. I used RecoilJS for global state management. See the source code on Github:{' '}
          <a href={'https://github.com/SySyAli/vanderbilt_catalog-frontend'} target="_blank">
            vanderbilt_catalog-frontend.
          </a>
        </Typography>
        <Typography variant="h2">Course Data</Typography>
        <Typography variant="h5">
          The course data for this recieved from the /search endpoint of my Vanderbilt Catalog API.
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
