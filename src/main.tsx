import { render } from 'preact';
import { Home } from './home.tsx';
import Router from 'preact-router';
import { About } from './about.tsx';
import { RecoilRoot } from 'recoil';

const Main = () => (
  <div id="app">
    <RecoilRoot>
      <Router>
        <Home path="/" />
        <About path="/about" />
      </Router>
    </RecoilRoot>
  </div>
);

render(<Main />, document.getElementById('app') as HTMLElement);
