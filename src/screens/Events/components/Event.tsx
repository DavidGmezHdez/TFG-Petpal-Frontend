import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {Text} from '@components/Text';
import {IEvent, IUser} from 'utils/Types';
import {format} from 'date-fns';
import {useDispatch, useSelector} from 'react-redux';
import {getUser} from '@redux/user/user_reducer';
import {deleteEvent, updateEvent} from '@redux/events/events_actions';
import {updateUser} from '@redux/user/user_actions';

type Props = {
  event: IEvent;
};

export const Event = ({event}: Props) => {
  const dispatch = useDispatch<any>();
  const user = useSelector(getUser);
  const joinedByUser = event.attendants?.some(usr => usr._id === user._id);

  const _joinEvent = async (joined: boolean) => {
    const attendingEvents = joinedByUser
      ? user.attendingEvents?.filter(evt => evt !== event._id)
      : [...(user.attendingEvents ?? []), event._id];

    const attendants = joined
      ? event.attendants?.filter(us => us._id !== user._id)
      : [...(event.attendants ?? []), user._id];

    await dispatch(updateEvent(event._id, {attendants}));
    await dispatch(updateUser(user._id, {attendingEvents}));
  };

  const _deleteEvent = async () => {
    const events = user.hostEvents?.filter(evt => evt !== event._id);
    await dispatch(deleteEvent(event._id));
    await dispatch(updateUser(user._id, {events}));
  };

  return (
    <View style={styles.container}>
      <Text>Event: {event.title}</Text>
      <Text>Creador: {event.host.name}</Text>
      <Text>Lugar: {event.place}</Text>
      <Text>
        Precio: {event.price || event.price > 0 ? event.price : 'Gratis'}
      </Text>
      <Text>Descripcion: {event.description}</Text>
      <Text>Apuntados: </Text>
      {event.attendants && event.attendants.length ? (
        event.attendants?.map((att: IUser) => {
          return <Text key={att._id}>Usuario: {att.name}</Text>;
        })
      ) : (
        <Text>No hay nadie apuntado</Text>
      )}

      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => (joinedByUser ? _joinEvent(true) : _joinEvent(false))}>
        {joinedByUser ? (
          <Text style={styles.textStyle}>Desapuntarse</Text>
        ) : (
          <Text style={styles.textStyle}>Apuntarse</Text>
        )}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-around',
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
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
