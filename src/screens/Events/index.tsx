import React, {useCallback, useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet, TextInput, View} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import {useDispatch, useSelector} from 'react-redux';
import {Text} from '@components/TextWrapper';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParam} from 'navigation/navigation.types';
import {getEvents, getLoadingEvents} from '@redux/events/events_reducer';
import {Event} from './components/Event';
import {IEvent} from '@utils/Types';
import {fetchEvents} from '@redux/events/events_actions';
import {CreateEventModal} from '@modals/CreateEvent';
import {clearErrorUser} from '@redux/user/user_actions';
import {FlashList, ListRenderItemInfo} from '@shopify/flash-list';
import {Pressable} from '@components/Pressable';
import {provinces, px} from '@utils/Constants';
import {ConfirmationEventDelete} from '@modals/ConfirmationEventDelete';
import {generalStyles, pickerSelectStyles} from '@utils/Styles';
import {colors} from '@utils/Colors';

type NavigationStackProp = NativeStackScreenProps<RootStackParam, 'events'>;

type Props = {
  navigation: NavigationStackProp['navigation'];
};

export const Events = ({navigation}: Props) => {
  const dispatch = useDispatch<any>();
  const events = useSelector(getEvents);
  const isLoading = useSelector(getLoadingEvents);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showModalConfirmation, setShowModalConfirmation] =
    useState<boolean>(false);
  const [eventId, setEventId] = useState<string>('');
  const [title, setTitle] = useState<string | undefined>();
  const [region, setRegion] = useState<string | null>(null);

  const handleUpdate = useCallback(() => {
    const realTitle = title?.length ? title : undefined;
    dispatch(fetchEvents({title: realTitle, region}));
  }, [dispatch, region, title]);

  useEffect(() => {
    handleUpdate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return (
      <View style={generalStyles.loadingContainer}>
        <ActivityIndicator size={'large'} color={colors.springGreen} />
      </View>
    );
  }

  // TODO: Make this infinite scroller
  return (
    <View style={styles.container}>
      <CreateEventModal showModal={showModal} setShowModal={setShowModal} />
      <ConfirmationEventDelete
        showModal={showModalConfirmation}
        setShowModal={setShowModalConfirmation}
        eventId={eventId}
      />
      <View style={styles.header}>
        <Text xxlarge center>
          Eventos
        </Text>
      </View>
      <View style={styles.filters}>
        <Pressable
          style={generalStyles.mainPressable}
          onPress={() => {
            dispatch(clearErrorUser());
            navigation.navigate('createEvents');
          }}>
          <Text large style={generalStyles.textStyle}>
            Crear Evento
          </Text>
        </Pressable>
      </View>
      <View style={styles.filters}>
        <Text xlarge center>
          Buscar por título
        </Text>
        <TextInput
          onChangeText={(t: string) => setTitle(t)}
          value={title}
          placeholder={'Buscar quedada...'}
          maxLength={20}
          style={styles.input}
        />
        <Text xlarge center>
          Buscar por provincia
        </Text>
        <RNPickerSelect
          onValueChange={value => setRegion(value)}
          items={provinces}
          placeholder={{label: 'Cualquier provincia', value: null}}
          value={region}
          style={pickerSelectStyles}
        />
        <Pressable style={generalStyles.mainPressable} onPress={handleUpdate}>
          <Text large style={generalStyles.textStyle}>
            Buscar
          </Text>
        </Pressable>
      </View>
      {events.length ? (
        <FlashList
          renderItem={(event: ListRenderItemInfo<IEvent>) => (
            <Event
              key={event.item._id}
              event={event.item}
              setShowModal={setShowModalConfirmation}
              setSelectedEvent={setEventId}
            />
          )}
          estimatedItemSize={200}
          data={events}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <Text large>No existen eventos con esos parámetros de búsqueda</Text>
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
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
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
});
