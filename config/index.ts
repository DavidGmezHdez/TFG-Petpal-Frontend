import Config from 'react-native-config';
const env: string = process.env['ENV'] || 'local';

const dev = {
  apiUrl: Config.API_URL_STG,
};
const local = {
  apiUrl: Config.API_URL_LOCAL,
};

const config = {
  dev,
  local,
};

export default local;
