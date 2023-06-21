import { render } from 'preact';
import { Home } from './home.tsx';
import Router from 'preact-router';
import { About } from './about.tsx';

const Main = () => (
  <div id="app">
    <Router>
      <Home path="/" />
      <About path="/about" />
    </Router>
  </div>
);

render(<Main />, document.getElementById('app') as HTMLElement);
