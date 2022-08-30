import React, {Dispatch, SetStateAction} from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from '@components/TextWrapper';
import {IEvent, IUser} from 'utils/Types';
import {format} from 'date-fns';
import {useDispatch, useSelector} from 'react-redux';
import {getUser} from '@redux/user/user_reducer';
import {updateEvent} from '@redux/events/events_actions';
import {updateUser} from '@redux/user/user_actions';
import {hasPermissions} from '@utils/Helpers';
import {colors} from '@utils/Colors';
import {generalStyles} from '@utils/Styles';
import {Pressable} from '@components/Pressable';

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
  const joinText = joinedByUser ? 'Apuntarse' : 'Desapuntarse';

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

  const renderAttendants = () => {
    const dataForDisplay =
      event.attendants.length <= 2
        ? event.attendants
        : event.attendants.slice(0, 2);
    const restOfUserS = event.attendants.length - 2;
    if (event.attendants.length <= 2) {
      return dataForDisplay.map((att: IUser) => (
        <Text large key={att._id}>
          {att.name}
        </Text>
      ));
    } else {
      return (
        <>
          {dataForDisplay.map((att: IUser) => (
            <Text large key={att._id}>
              {att.name}
            </Text>
          ))}
          <Text large>{`Y ${restOfUserS} ${
            restOfUserS === 1 ? 'usuario' : 'usuarios'
          } más`}</Text>
        </>
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerEvent}>
        <View style={styles.title}>
          <Text xxxlarge center>
            {event.title}
          </Text>
        </View>
        <View style={styles.title}>
          <Text xxxlarge center>
            {event.host.name}
          </Text>
        </View>
        <View style={styles.title}>
          <Text xxxlarge center>
            {format(new Date(event.date), 'dd-MM-yy hh:mm')}
          </Text>
        </View>
      </View>

      <View style={styles.bodyEvent}>
        <View style={styles.eventBody}>
          <Text xxlarge>{event.description}</Text>
          <Text xlarge>
            Precio: {event.price || event.price > 0 ? event.price : 'Gratis'}
          </Text>
          <Text xlarge>
            {event.place} en {event.region}
          </Text>
        </View>
        <View style={styles.eventBody}>
          {canDelete ? (
            <Pressable style={styles.deletePressable} onPress={_deleteEvent}>
              <Text large center style={generalStyles.textStyle}>
                Borrar quedada
              </Text>
            </Pressable>
          ) : null}
          {!ownedByUser ? (
            <Pressable
              style={styles.updatePressable}
              onPress={() => _joinEvent(joinedByUser)}>
              <Text large style={generalStyles.textStyle}>
                {joinText}
              </Text>
            </Pressable>
          ) : null}
        </View>
      </View>

      <View style={styles.bodyEvent}>
        <View style={styles.eventBody}>
          <Text xlarge center>
            Apuntados
          </Text>
        </View>
        <View style={styles.eventBody}>
          {event.attendants && event.attendants.length ? (
            renderAttendants()
          ) : (
            <Text large>No hay nadie apuntado</Text>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-around',
    display: 'flex',
    borderColor: colors.green,
    borderWidth: 5,
    flexDirection: 'column',
  },
  headerEvent: {
    alignItems: 'center',
    justifyContent: 'space-between',
    display: 'flex',
    flexDirection: 'row',
    width: '90%',
    margin: '2%',
  },
  title: {
    width: '35%',
  },
  bodyEvent: {
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'row',
    width: '90%',
  },
  eventBody: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column',
    padding: '2%',
    margin: '2%',
    width: '50%',
  },
  updatePressable: {
    backgroundColor: colors.primaryLight,
  },
  deletePressable: {
    backgroundColor: colors.secondary,
  },
});
