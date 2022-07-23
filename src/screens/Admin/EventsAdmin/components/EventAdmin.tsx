import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {Text} from '@components/TextWrapper';
import {IEvent, IUser} from '@utils/Types';
import {format} from 'date-fns';

type Props = {
  event: IEvent;
  removeEvent: (eventId: string) => void;
};
export const EventAdmin = ({event, removeEvent}: Props) => {
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

      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => removeEvent(event._id)}>
        <Text large style={styles.textStyle}>
          Borrar quedada
        </Text>
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
