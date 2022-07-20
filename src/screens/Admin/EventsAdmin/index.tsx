import React, {useState} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {Text} from '@components/TextWrapper';
import {IEvent} from '@utils/Types';
import {FlashList, ListRenderItemInfo} from '@shopify/flash-list';
import {Pressable} from '@components/Pressable';
import EventsService from 'services/EventsService';
import {EventAdmin} from './components/EventAdmin';

export const EventsAdmin = () => {
  const [events, setEvents] = useState<IEvent[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleUpdate = async () => {
    setIsLoading(true);
    const fetchedEvents = await (
      await EventsService.fetchEvents(undefined)
    ).data;

    setEvents(fetchedEvents);
    setIsLoading(false);
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
            <EventAdmin key={event.item._id} event={event.item} />
          )}
          estimatedItemSize={200}
          data={events}
        />
      ) : (
        <Text large>No existen eventos</Text>
      )}
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
