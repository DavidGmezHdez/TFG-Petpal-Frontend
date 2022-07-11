import {IPet} from '@utils/Types';
import {RootState} from '@redux/store';
import {PetsState} from '@redux/types';
import {PetsAction, PetsActionTypes} from './pets_actions';

const initialState: PetsState = {
  pets: [],
  isLoading: false,
  error: false,
  msg: '',
};

const reducer = (state: PetsState = initialState, action: PetsAction) => {
  switch (action.type) {
    case PetsActionTypes.PETS_LOADING:
      return {
        ...state,
        isLoading: true,
      };

    case PetsActionTypes.PET_ERROR_FETCH:
      return {
        ...state,
        isLoading: false,
        error: true,
        pets: [],
        msg: action.payload.msg,
      };

    case PetsActionTypes.CLEAR_ERROR:
      return {
        ...state,
        error: false,
        msg: '',
      };

    case PetsActionTypes.PETS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        pets: action.payload.pets,
      };
    case PetsActionTypes.SEND_PETS_SUCCESS:
      const createdPet = action.payload.pet;
      return {
        ...state,
        isLoading: false,
        pets: [createdPet, ...state.pets],
      };
    case PetsActionTypes.SEND_PETS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: true,
        msg: action.payload.msg,
      };

    case PetsActionTypes.UPDATE_PET_SUCCESS:
      const updatedPet = action.payload.pet;
      return {
        ...state,
        isLoading: false,
        pets: [
          ...state.pets.map((pet: IPet) =>
            pet._id === updatedPet._id ? updatedPet : pet,
          ),
        ],
      };

    case PetsActionTypes.UPDATE_PETS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: true,
        msg: action.payload.msg,
      };

    case PetsActionTypes.DELETE_PETS_SUCCESS:
      const deletedPet = action.payload.pet;
      return {
        ...state,
        isLoading: false,
        pets: state.pets.filter((pet: IPet) => pet._id !== deletedPet._id),
      };

    case PetsActionTypes.DELETE_PETS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: true,
        msg: action.payload.msg,
      };

    default:
      return state;
  }
};

export const getPets = (state: RootState) => state.pets.pets;
export const getLoadingPets = (state: RootState) => state.pets.isLoading;
export const getErrorPets = (state: RootState) => state.pets.error;
export const getMessagePets = (state: RootState) => state.pets.msg;
export default reducer;
