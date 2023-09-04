import 'preact/debug';
import { render } from 'preact';
import { Router } from 'preact-router';
import { RecoilRoot } from 'recoil';

import { Home } from './home.tsx';
import { AboutModal } from './components/AboutModal.tsx';
import NavBar from './components/Navbar.tsx';
import { Search } from './search.tsx';

const Main = () => (
  <div id="app" style={{ backgroundColor: '#E0D5C0', minHeight: '100vh', height: '100%' }}>
    <RecoilRoot>
      <NavBar />
      <Router>
        <Home path="/" />
        <Search path="/search" />
      </Router>

      <AboutModal />
    </RecoilRoot>
  </div>
);

render(<Main />, document.getElementById('app') as HTMLElement);
