import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Button,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Text} from '@components/TextWrapper';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParam} from 'navigation/navigation.types';
import {getEvents, getLoadingEvents} from '@redux/events/events_reducer';
import {Event} from './components/Event';
import {IEvent} from '@utils/Types';
import {fetchEvents} from '@redux/events/events_actions';
import {CreateEventModal} from '@modals/CreateEvent';
import {clearErrorUser} from '@redux/user/user_actions';
import {FlashList, ListRenderItemInfo} from '@shopify/flash-list';
import {Pressable} from '@components/Pressable';

type NavigationStackProp = NativeStackScreenProps<RootStackParam, 'events'>;

type Props = {
  navigation: NavigationStackProp['navigation'];
};

export const Events = ({}: Props) => {
  const dispatch = useDispatch<any>();
  const events = useSelector(getEvents);
  const isLoading = useSelector(getLoadingEvents);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [title, setTitle] = useState<string | undefined>();

  const handleUpdate = useCallback(() => {
    dispatch(fetchEvents(title));
  }, [dispatch, title]);

  console.log(events);
  useEffect(() => {
    handleUpdate();
  }, [handleUpdate]);

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
      <Text large>Buscar Evento</Text>

      <TextInput
        onChangeText={(t: string) => setTitle(t)}
        value={title}
        placeholder={'Buscar quedada...'}
        maxLength={20}
      />
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={handleUpdate}>
        <Text large style={styles.textStyle}>
          Buscar
        </Text>
      </Pressable>

      {events.length ? (
        <FlashList
          renderItem={(event: ListRenderItemInfo<IEvent>) => (
            <Event key={event.item._id} event={event.item} />
          )}
          estimatedItemSize={200}
          data={events}
        />
      ) : (
        <Text large>No existen eventos con ese título</Text>
      )}

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
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    margin: 10,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
});
