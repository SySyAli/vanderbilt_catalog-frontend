import { useState } from 'preact/hooks';
import vanderbiltLogo from '/vanderbilt_logo.png';
import './app.css';

export function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <a href="https://vanderbilt.edu/" target="_blank">
          <img src={vanderbiltLogo} class="logo" alt="Vanderbilt Logo" />
        </a>
      </div>
      <h1>Vite + Preact</h1>
      <div class="card">
        <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
        <p>
          Edit <code>src/app.tsx</code> and save to test HMR
        </p>
      </div>
    </>
  );
}
