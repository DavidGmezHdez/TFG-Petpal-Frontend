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
import {colors} from '@utils/Colors';
import {px} from '@utils/Constants';
import {generalStyles} from '@utils/Styles';

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
      <View style={styles.buttonFilters}>
        <Pressable style={styles.updatePressable} onPress={handleUpdate}>
          <Text large style={generalStyles.textStyle}>
            Buscar
          </Text>
        </Pressable>
      </View>
      {events.length ? (
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
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <Text large center color={colors.error}>
          No existen eventos con esos parámetros de búsqueda
        </Text>
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
  header: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: colors.lightBlue,
    height: '10%',
  },
  input: {
    width: '90%',
    backgroundColor: colors.white,
    margin: '2%',
    padding: '2%',
    textAlign: 'center',
    borderRadius: 8,
    borderColor: colors.primary,
    borderWidth: 2,
    fontSize: 48 * px,
  },

  filters: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },

  buttonFilters: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%',
  },
  updatePressable: {
    backgroundColor: colors.blue,
    width: '45%',
  },
});
