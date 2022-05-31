import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// sentry error tracking
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";

// process.env.NODE_ENV === "production" &&          (Only for production mode)
Sentry.init({
  dsn: "https://384eb2069f7e4a01a4264cdc98203404@o1269186.ingest.sentry.io/6458891",
  integrations: [new BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  //To reduce the volume of performance data captured, we can change tracesSampleRate to a value between 0 and 1.
  tracesSampleRate: 1.0,   
});


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
