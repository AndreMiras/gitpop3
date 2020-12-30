import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';
import { version } from '../../package.json';

const setupSentry = () => {
  if (process.env.NODE_ENV !== 'production') {
    return;
  }
  Sentry.init({
    dsn: process.env.REACT_APP_SENTRY_DSN,
    release: version,
    autoSessionTracking: true,
    integrations: [
      new Integrations.BrowserTracing(),
    ],
    tracesSampleRate: 1.0,
  });
};

export default setupSentry;
