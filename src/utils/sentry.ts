import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import { version } from "../../package.json";

const setupSentry = (): boolean => {
  if (process.env.NODE_ENV !== "production") {
    return false;
  }
  Sentry.init({
    dsn: import.meta.env.VITE_SENTRY_DSN,
    release: version,
    autoSessionTracking: true,
    integrations: [new Integrations.BrowserTracing()],
    tracesSampleRate: 1.0,
  });
  return true;
};

export default setupSentry;
