import 'preact/debug';
import { render } from 'preact';
import Router from 'preact-router';
import { RecoilRoot } from 'recoil';

import { Home } from './home.tsx';
import About from './about.tsx';
import { Search } from './search.tsx';

const Main = () => (
  <div id="app">
    <RecoilRoot>
      <Router>
        <Home path="/" />
        <About path="/about" />
        <Search path="/search" />
      </Router>
    </RecoilRoot>
  </div>
);

render(<Main />, document.getElementById('app') as HTMLElement);
