import React, {useState} from 'react';
import {ActivityIndicator, Button, StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Text} from '@components/Text';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParam} from 'navigation/navigation.types';
import {getEvents, getLoadingEvents} from '@redux/events/events_reducer';
import {Event} from './components/Event';
import {IEvent} from '@utils/Types';
import {fetchEvents} from '@redux/events/events_actions';
import {CreateEventModal} from '@modals/CreateEvent';
import {clearErrorUser} from '@redux/user/user_actions';
import {FlashList, ListRenderItemInfo} from '@shopify/flash-list';

type NavigationStackProp = NativeStackScreenProps<RootStackParam, 'events'>;

type Props = {
  navigation: NavigationStackProp['navigation'];
};

export const Events = ({}: Props) => {
  const dispatch = useDispatch<any>();
  const events = useSelector(getEvents);
  const isLoading = useSelector(getLoadingEvents);
  const [showModal, setShowModal] = useState<boolean>(false);

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
      <CreateEventModal showModal={showModal} setShowModal={setShowModal} />
      <Text>Quedadas</Text>

      <FlashList
        renderItem={(event: ListRenderItemInfo<IEvent>) => (
          <Event key={event.item._id} event={event.item} />
        )}
        estimatedItemSize={200}
        data={events}
      />
      <Button title="Actualizar" onPress={_handleUpdate} />
      <Button
        title="Crear evento"
        onPress={() => {
          dispatch(clearErrorUser());
          setShowModal(true);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
});
