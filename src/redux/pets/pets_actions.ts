import {IPet} from '@utils/Types';
import {Dispatch} from 'redux';
import PetsService from '@services/PetsService';
export enum PetsActionTypes {
  PETS_LOADING = 'petsLoading',
  PET_ERROR_FETCH = 'petsErrorFetch',
  PETS_SUCCESS = 'petsSuccess',
  SEND_PETS_SUCCESS = 'sendPetsSuccess',
  SEND_PETS_ERROR = 'sendPetsError',
  UPDATE_PET_SUCCESS = 'updatePetsSuccess',
  UPDATE_PETS_ERROR = 'updatePetsError',
  DELETE_PETS_SUCCESS = 'deletePetsSuccess',
  DELETE_PETS_ERROR = 'deletePetsError',
  CLEAR_ERROR = 'clearError',
}

interface PetsLoadingAction {
  type: PetsActionTypes.PETS_LOADING;
}

interface PetsErrorAction {
  type: PetsActionTypes.PET_ERROR_FETCH;
  payload: any;
}

interface PetsSuccessAction {
  type: PetsActionTypes.PETS_SUCCESS;
  payload: {pets: IPet[]};
}

interface SendPetsSuccessAction {
  type: PetsActionTypes.SEND_PETS_SUCCESS;
  payload: {pet: IPet};
}

interface SendPetError {
  type: PetsActionTypes.SEND_PETS_ERROR;
  payload: any;
}

interface UpdatePetsSuccessAction {
  type: PetsActionTypes.UPDATE_PET_SUCCESS;
  payload: {pet: IPet};
}
interface UpdatePetError {
  type: PetsActionTypes.UPDATE_PETS_ERROR;
  payload: any;
}

interface DeletePetsSuccessAction {
  type: PetsActionTypes.DELETE_PETS_SUCCESS;
  payload: {pet: IPet};
}
interface DeletePetError {
  type: PetsActionTypes.DELETE_PETS_ERROR;
  payload: any;
}

interface ClearErrorAction {
  type: PetsActionTypes.CLEAR_ERROR;
}

export type PetsAction =
  | PetsLoadingAction
  | PetsErrorAction
  | PetsSuccessAction
  | ClearErrorAction
  | SendPetsSuccessAction
  | SendPetError
  | UpdatePetsSuccessAction
  | UpdatePetError
  | DeletePetsSuccessAction
  | DeletePetError;

export const fetchPets = () => async (dispatch: Dispatch<PetsAction>) => {
  try {
    dispatch({
      type: PetsActionTypes.PETS_LOADING,
    });
    const res = await PetsService.fetchPets();
    const pets = res.data;
    dispatch({
      type: PetsActionTypes.PETS_SUCCESS,
      payload: {pets},
    });
    dispatch({
      type: PetsActionTypes.CLEAR_ERROR,
    });
    return pets;
  } catch (e) {
    console.log(e);
    dispatch({
      type: PetsActionTypes.PET_ERROR_FETCH,
      payload: {msg: e.response.data.message},
    });
  }
};

export const sendPet = (pet: any) => async (dispatch: Dispatch<PetsAction>) => {
  try {
    dispatch({
      type: PetsActionTypes.PETS_LOADING,
    });
    const res = await PetsService.sendPet(pet);
    const createdPet = res.data;
    dispatch({
      type: PetsActionTypes.SEND_PETS_SUCCESS,
      payload: {pet: createdPet},
    });
    dispatch({
      type: PetsActionTypes.CLEAR_ERROR,
    });
    return createdPet;
  } catch (e) {
    console.log(e);
    dispatch({
      type: PetsActionTypes.SEND_PETS_ERROR,
      payload: {msg: e.response.data.message},
    });
  }
};

export const updatePet =
  (petId: string, pet: any) => async (dispatch: Dispatch<PetsAction>) => {
    try {
      dispatch({
        type: PetsActionTypes.PETS_LOADING,
      });
      const res = await PetsService.updatePet(petId, pet);
      const updatedPet = res.data;
      dispatch({
        type: PetsActionTypes.UPDATE_PET_SUCCESS,
        payload: {pet: updatedPet},
      });
      dispatch({
        type: PetsActionTypes.CLEAR_ERROR,
      });
      return updatedPet;
    } catch (e) {
      console.log(e);
      dispatch({
        type: PetsActionTypes.UPDATE_PETS_ERROR,
        payload: {msg: e.response.data.message},
      });
    }
  };

export const deletePet =
  (petId: string) => async (dispatch: Dispatch<PetsAction>) => {
    try {
      dispatch({
        type: PetsActionTypes.PETS_LOADING,
      });
      const res = await PetsService.deletePet(petId);
      const deletedPet = res.data;
      console.log(res);
      dispatch({
        type: PetsActionTypes.DELETE_PETS_SUCCESS,
        payload: {pet: deletedPet},
      });
      dispatch({
        type: PetsActionTypes.CLEAR_ERROR,
      });
      return deletedPet;
    } catch (e) {
      console.log(e);
      dispatch({
        type: PetsActionTypes.DELETE_PETS_ERROR,
        payload: {msg: e.response.data.message},
      });
    }
  };

export const clearErrorPet = () => (dispatch: Dispatch<PetsAction>) => {
  dispatch({
    type: PetsActionTypes.CLEAR_ERROR,
  });
};
