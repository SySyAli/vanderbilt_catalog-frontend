import 'preact/debug';
import { render } from 'preact';
import Router from 'preact-router';
import { RecoilRoot } from 'recoil';

import { Home } from './home.tsx';
import { AboutModal } from './components/AboutModal.tsx';
import { Search } from './search.tsx';
import NavBar from './components/Navbar.tsx';
import { SearchModal } from './components/SearchModal.tsx';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    allVariants: {
      fontFamily: 'monospace',
    },
  },
});

const Main = () => (
  <div id="app" style={{}}>
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <NavBar />
        <Router>
          <Home path="/" />
          <Search path="/search" />
        </Router>
        <AboutModal />
        <SearchModal />
      </ThemeProvider>
    </RecoilRoot>
  </div>
);

render(<Main />, document.getElementById('app') as HTMLElement);
