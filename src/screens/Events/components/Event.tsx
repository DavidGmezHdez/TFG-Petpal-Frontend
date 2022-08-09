import React, {Dispatch, SetStateAction} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {Text} from '@components/TextWrapper';
import {IEvent, IUser} from 'utils/Types';
import {format} from 'date-fns';
import {useDispatch, useSelector} from 'react-redux';
import {getUser} from '@redux/user/user_reducer';
import {updateEvent} from '@redux/events/events_actions';
import {updateUser} from '@redux/user/user_actions';
import {hasPermissions} from '@utils/Helpers';

type Props = {
  event: IEvent;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  setSelectedEvent: Dispatch<SetStateAction<string>>;
};

export const Event = ({event, setShowModal, setSelectedEvent}: Props) => {
  const dispatch = useDispatch<any>();
  const user = useSelector(getUser);
  const joinedByUser = event.attendants?.some(usr => usr._id === user._id);
  const ownedByUser = event.host._id === user._id;
  const canDelete = ownedByUser || hasPermissions(user);

  const _joinEvent = async (joined: boolean) => {
    const attendingEvents = joinedByUser
      ? user.attendingEvents?.filter(evt => evt !== event._id)
      : [...(user.attendingEvents ?? []), event._id];

    const attendants = joined
      ? event.attendants?.filter(us => us._id !== user._id)
      : [...(event.attendants ?? []), user._id];

    await dispatch(updateEvent(event._id, {attendants}));
    await dispatch(updateUser(user._id, {attendingEvents}, user.rol));
  };

  const _deleteEvent = async () => {
    setShowModal(true);
    setSelectedEvent(event._id);
  };

  return (
    <View style={styles.container}>
      <Text large>Event: {event.title}</Text>
      <Text large>Creador: {event.host.name}</Text>
      <Text large>Lugar: {event.place}</Text>
      <Text large>
        Precio: {event.price || event.price > 0 ? event.price : 'Gratis'}
      </Text>
      <Text large>Fecha: {format(new Date(event.date), 'dd-MM-yy hh:mm')}</Text>
      <Text large>Descripcion: {event.description}</Text>
      <Text large>Provincia: {event.region}</Text>
      <Text large>Apuntados: </Text>
      {event.attendants && event.attendants.length ? (
        event.attendants?.map((att: IUser) => {
          return (
            <Text large key={att._id}>
              Usuario: {att.name}
            </Text>
          );
        })
      ) : (
        <Text large>No hay nadie apuntado</Text>
      )}

      {!ownedByUser ? (
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => _joinEvent(joinedByUser)}>
          {joinedByUser ? (
            <Text large style={styles.textStyle}>
              Desapuntarse
            </Text>
          ) : (
            <Text large style={styles.textStyle}>
              Apuntarse
            </Text>
          )}
        </Pressable>
      ) : null}

      {canDelete ? (
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={_deleteEvent}>
          <Text large style={styles.textStyle}>
            Borrar quedada
          </Text>
        </Pressable>
      ) : null}
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
