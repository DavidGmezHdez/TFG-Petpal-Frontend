import React from 'react';
import {
  ActivityIndicator,
  Button,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Text} from '@components/Text';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParam} from 'navigation/navigation.types';
import {getEvents, getLoadingEvents} from '@redux/events/events_reducer';
import {Event} from './components/Event';
import {IEvent} from '@utils/Types';
import {fetchEvents} from '@redux/events/events_actions';

type NavigationStackProp = NativeStackScreenProps<RootStackParam, 'search'>;

type Props = {
  navigation: NavigationStackProp['navigation'];
};

export const Events = ({navigation}: Props) => {
  const dispatch = useDispatch<any>();
  const events = useSelector(getEvents);
  const isLoading = useSelector(getLoadingEvents);

  const _handleUpdate = () => {
    dispatch(fetchEvents());
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size={'large'} />
      </View>
    );
  }

  // TODO: Make this infinite scroller
  return (
    <View style={styles.container}>
      <Text>Quedadas</Text>
      <ScrollView>
        {events && events.length ? (
          events.map((event: IEvent) => <Event key={event._id} event={event} />)
        ) : (
          <Text>No hay ningún evento. Actualiza</Text>
        )}
      </ScrollView>
      <Button title="Actualizar" onPress={_handleUpdate} />
      {/* <Button title="Crear post" onPress={() => setShowModal(true)} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});
