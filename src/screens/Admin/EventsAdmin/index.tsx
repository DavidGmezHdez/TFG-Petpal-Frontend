import React, {useCallback, useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {Text} from '@components/TextWrapper';
import {IEvent} from '@utils/Types';
import {FlashList, ListRenderItemInfo} from '@shopify/flash-list';
import {Pressable} from '@components/Pressable';
import EventsService from '@services/EventsService';
import {EventAdmin} from './components/EventAdmin';
import {useDispatch} from 'react-redux';
import {deleteEvent} from '@redux/events/events_actions';

export const EventsAdmin = () => {
  const dispatch = useDispatch<any>();
  const [events, setEvents] = useState<IEvent[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleUpdate = useCallback(async () => {
    setIsLoading(true);
    try {
      const fetchedEvents = await (
        await EventsService.fetchEvents(undefined)
      ).data;
      setEvents(fetchedEvents);
    } catch (error) {
      setEvents([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const removeEvent = async (eventId: string) => {
    try {
      setIsLoading(true);
      const deletedEvent: IEvent = await dispatch(deleteEvent(eventId));
      const newEvents = events.filter(
        (ev: IEvent) => ev._id !== deletedEvent._id,
      );
      setEvents(newEvents);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

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

  return (
    <View style={styles.container}>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={handleUpdate}>
        <Text large style={styles.textStyle}>
          Buscar
        </Text>
      </Pressable>

      {events && events.length ? (
        <FlashList
          renderItem={(event: ListRenderItemInfo<IEvent>) => (
            <EventAdmin
              key={event.item._id}
              event={event.item}
              removeEvent={removeEvent}
            />
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
