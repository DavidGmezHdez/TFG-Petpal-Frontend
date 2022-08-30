import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from '@components/TextWrapper';
import {IEvent} from 'utils/Types';
import {format} from 'date-fns';
import {useDispatch, useSelector} from 'react-redux';
import {getUser} from '@redux/user/user_reducer';
import {updateEvent} from '@redux/events/events_actions';
import {updateUser} from '@redux/user/user_actions';
import {generalStyles} from '@utils/Styles';
import {colors} from '@utils/Colors';
import {Pressable} from '@components/Pressable';

type Props = {
  event: IEvent;
};

export const ProfileJoinedEvent = ({event}: Props) => {
  const dispatch = useDispatch<any>();
  const user = useSelector(getUser);
  const quitEvent = async () => {
    try {
      const attendingEvents = user.attendingEvents?.filter(
        evt => evt._id !== event._id,
      );
      const attendants = event.attendants?.filter(
        us => (us as unknown as string) !== user._id,
      );
      const updatedEvent = await dispatch(updateEvent(event._id, {attendants}));
      if (updatedEvent) {
        await dispatch(updateUser(user._id, {attendingEvents}, user.rol));
      }
    } catch (error) {
      console.log(error);
    }

    console.log(user);
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
          <Pressable style={styles.updatePressable} onPress={quitEvent}>
            <Text large center style={generalStyles.textStyle}>
              Desapuntarse
            </Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.bodyEvent}>
        <View style={styles.eventBody}>
          {event.attendants && event.attendants.length ? (
            <Text large>{`Apuntados: Tu y ${
              event.attendants.length - 1
            } personas más`}</Text>
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
  },
  headerEvent: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
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
});
