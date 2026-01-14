import { defineEventHandler, proxyRequest, setResponseStatus } from 'h3';

const POSTHOG_API_HOST = 'https://eu.i.posthog.com';
const POSTHOG_ASSETS_HOST = 'https://eu-assets.i.posthog.com';
const LOCAL_PREFIX = '/posthog';

export default defineEventHandler(async (event) => {
  // proxy for local development only
  if (process.env.NODE_ENV !== 'development') {
    setResponseStatus(event, 404);
    return 'Not Found';
  }

  const url = event.node.req.url || '';
  const subUrl = url.startsWith(LOCAL_PREFIX) ? url.slice(LOCAL_PREFIX.length) : url;
  const normalizedSubUrl = subUrl.startsWith('/') ? subUrl : `/${subUrl}`;

  const targetBase = normalizedSubUrl.startsWith('/static/') ? POSTHOG_ASSETS_HOST : POSTHOG_API_HOST;
  const target = `${targetBase}${normalizedSubUrl}`;

  return proxyRequest(event, target);
});
