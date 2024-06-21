import {
  AUTH_URL,
  CLIENT_ID,
  RANDOM_STRING,
  REDIRECT_URI,
  RESPONSE_TYPE,
  SCOPE,
} from './const';

const searchParams = new URLSearchParams('');

searchParams.append('client_id', CLIENT_ID);
searchParams.append('response_type', RESPONSE_TYPE);
searchParams.append('state', RANDOM_STRING);
searchParams.append('redirect_uri', REDIRECT_URI);
searchParams.append('scope', SCOPE);

export const authString = `${AUTH_URL}?${searchParams.toString()}`;
