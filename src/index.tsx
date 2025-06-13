import React from 'react';
import ReactDOM from 'react-dom/client';
import { CriteriaProvider } from 'shared/contexts/criteria-context';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider } from './shared/contexts/theme-context';
import { ViewportProvider } from './shared/contexts/viewport-context';

import './index.scss';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <ViewportProvider>
        <CriteriaProvider>
          <App />
        </CriteriaProvider>
      </ViewportProvider>
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
