import 'preact/debug';
import { render } from 'preact';
// import Router from 'preact-router';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import { Home } from './home.tsx';
import { AboutModal } from './components/AboutModal.tsx';
import NavBar from './components/Navbar.tsx';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Search } from './search.tsx';

const theme = createTheme({
  typography: {
    allVariants: {
      fontFamily: 'monospace',
    },
  },
});

const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/search', element: <Search /> },
]);

/*

        <Router>
          <Home path="/" />
          <Search path="/search" />
        </Router>
*/

const Main = () => (
  <div id="app" style={{ backgroundColor: '#E0D5C0', minHeight: '100vh', height: '100%' }}>
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <NavBar />
        <RouterProvider router={router} />
        <AboutModal />
      </ThemeProvider>
    </RecoilRoot>
  </div>
);

render(<Main />, document.getElementById('app') as HTMLElement);
