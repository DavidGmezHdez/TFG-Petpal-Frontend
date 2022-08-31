import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from '@components/TextWrapper';
import {IEvent, IUser} from '@utils/Types';
import {format} from 'date-fns';
import {colors} from '@utils/Colors';
import {generalStyles} from '@utils/Styles';
import {Pressable} from '@components/Pressable';

type Props = {
  event: IEvent;
  removeEvent: (eventId: string) => void;
};
export const EventAdmin = ({event, removeEvent}: Props) => {
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
          <Pressable
            style={styles.deletePressable}
            onPress={() => removeEvent(event._id)}>
            <Text large center style={generalStyles.textStyle}>
              Borrar quedada
            </Text>
          </Pressable>
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
