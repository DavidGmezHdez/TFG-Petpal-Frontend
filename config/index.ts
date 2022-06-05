import Config from 'react-native-config';
const env = Config.ENV || 'local';

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

export default config[env as keyof typeof config];
