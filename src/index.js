import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

class SChart extends React.Component {
  render() {
    return (
      <div>Testing</div>
    )
  }
}

ReactDOM.render(
  <SChart />,
  document.getElementById('root')
)


