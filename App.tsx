import {Provider} from 'react-redux';
import React from 'react';
import {ActivityIndicator} from 'react-native';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from 'redux/store';
import {Navigation} from 'navigation';

export const App = () => {
  return (
    <Provider store={store}>
      <Navigation />
      <PersistGate
        loading={<ActivityIndicator size="large" color="#00ff00" />}
        persistor={persistor}></PersistGate>
    </Provider>
  );
};

export default App;
