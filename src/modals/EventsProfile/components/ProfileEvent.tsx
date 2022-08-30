import React, {Dispatch, SetStateAction} from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from '@components/TextWrapper';
import {IEvent} from 'utils/Types';
import {format} from 'date-fns';
import {useSelector} from 'react-redux';
import {getUser} from '@redux/user/user_reducer';
import {generalStyles} from '@utils/Styles';
import {hasPermissions} from '@utils/Helpers';
import {colors} from '@utils/Colors';
import {Pressable} from '@components/Pressable';

type Props = {
  event: IEvent;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  setSelectedEvent: Dispatch<SetStateAction<string>>;
};

export const ProfileEvent = ({
  event,
  setShowModal,
  setSelectedEvent,
}: Props) => {
  const user = useSelector(getUser);
  const ownedByUser = (event.host as unknown as string) === user._id;
  const canDelete = ownedByUser || hasPermissions(user);

  const deleteEvent = async () => {
    setShowModal(true);
    setSelectedEvent(event._id);
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
          {canDelete ? (
            <Pressable style={styles.deletePressable} onPress={deleteEvent}>
              <Text large center style={generalStyles.textStyle}>
                Borrar quedada
              </Text>
            </Pressable>
          ) : null}
        </View>
      </View>

      <View style={styles.bodyEvent}>
        <View style={styles.eventBody}>
          {event.attendants && event.attendants.length ? (
            <Text large>{`Apuntados: ${event.attendants.length}`}</Text>
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
  deletePressable: {
    backgroundColor: colors.secondary,
  },
});
