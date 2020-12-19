import { Action, Reducer } from 'redux';
import { AppThunkAction } from '.';
import { InferActionsTypes } from './configureStore';
import api from './api';

//type actions
const REQUEST_FACULTIES = 'REQUEST_FACULTIES'
const RECEIVE_FACULTIES = 'RECEIVE_FACULTIES'
const REQUEST_ADD_FACULTY = 'REQUEST_ADD_FACULTY'
const RECEIVE_ADD_FACULTY = 'RECEIVE_ADD_FACULTY'
const REQUEST_DELETE_FACULTY = 'REQUEST_DELETE_FACULTY'
const RECEIVE_DELETE_FACULTY = 'RECEIVE_DELETE_FACULTY'
const REQUEST_UPDATE_FACULTY = 'REQUEST_UPDATE_FACULTY'
const RECEIVE_UPDATE_FACULTY = 'RECEIVE_UPDATE_FACULTY'
const REQUEST_FACULTY_BY_ID = 'REQUEST_FACULTY_BY_ID'
const RECEIVE_FACULTY_BY_ID = 'RECEIVE_FACULTY_BY_ID'

export interface FacultiesState {
    isLoading: boolean
    faculties: Faculty[]
    currentFaculty: Faculty | undefined
}

export interface Faculty {
    id: number,
    name: string
}

//creators
export const actionCreators = {
    requestFaculties: () => ({
        type: REQUEST_FACULTIES
    } as const),
    receiveFaculties: (faculties: Faculty[]) => ({
        type: RECEIVE_FACULTIES,
        payload: faculties
    } as const),
    requestAddFaculty: () => ({
        type: REQUEST_ADD_FACULTY
    } as const),
    receiveAddFaculty: (faculty: Faculty) => ({
        type: RECEIVE_ADD_FACULTY,
        payload: faculty
    } as const),
    requestDeleteFaculty: () => ({
        type: REQUEST_DELETE_FACULTY
    } as const),
    receiveDeleteFaculty: (id: number) => ({
        type: RECEIVE_DELETE_FACULTY,
        payload: id
    } as const),
    requestUpdateFaculty: () => ({
        type: REQUEST_UPDATE_FACULTY
    } as const),
    receiveUpdateFaculty: (id: number, newData: Faculty) => ({
        type: RECEIVE_UPDATE_FACULTY,
        payload: { ...newData, id }
    } as const),
    requestFacultyById: () => ({
        type: REQUEST_FACULTY_BY_ID
    } as const),
    receiveFacultyById: (faculty: Faculty) => ({
        type: RECEIVE_FACULTY_BY_ID,
        payload: faculty
    } as const)
};

type KnownAction = InferActionsTypes<typeof actionCreators>


const API = api.RestAPI<Faculty>('api/faculty/');

export const GetAll = (): AppThunkAction<KnownAction> => async (dispatch) => {

    dispatch(actionCreators.requestFaculties());

    const response = await API.fetchAll();

    dispatch(actionCreators.receiveFaculties(response))
}
export const Create = (newFaculty: any, onSuccess: () => void): AppThunkAction<KnownAction> => async (dispatch) => {

    dispatch(actionCreators.requestAddFaculty());

    const response = await API.create(newFaculty)

    onSuccess();
    dispatch(actionCreators.receiveAddFaculty(response))
}

export const Update = (id: number, newData: any, onSuccess: () => void): AppThunkAction<KnownAction> => async (dispatch) => {

    dispatch(actionCreators.requestUpdateFaculty());

    const response = await API.update(id, newData)

    onSuccess()
    dispatch(actionCreators.receiveUpdateFaculty(id, newData))
}

export const Delete = (id: number, onSuccess: () => void): AppThunkAction<KnownAction> => async (dispatch) => {

    dispatch(actionCreators.requestDeleteFaculty())

    const response = await API.delete(id)

    if (response) {
        onSuccess()
        dispatch(actionCreators.receiveDeleteFaculty(id))
    }
}
export const GetFacultyById = (id: number): AppThunkAction<KnownAction> => async (dispatch, getState) => {

    if (getState().faculties.currentFaculty?.id !== id) {

        dispatch(actionCreators.requestFacultyById())
        const response = await API.fetchById(id)
        dispatch(actionCreators.receiveFacultyById(response))
    }
}


//reducer
const unloadedState: FacultiesState = {
    isLoading: false,
    faculties: [],
    currentFaculty: undefined
}

export const reducer: Reducer<FacultiesState> = (state: FacultiesState | undefined, incomingAction: Action): FacultiesState => {

    if (state === undefined) {
        return unloadedState;
    }

    const action = incomingAction as KnownAction;

    switch (action.type) {
        case REQUEST_FACULTIES:
            return {
                ...state, isLoading: true
            };
        case RECEIVE_FACULTIES:
            return {
                ...state,
                isLoading: false,
                faculties: action.payload
            }
        case RECEIVE_ADD_FACULTY:
            return {
                ...state,
                isLoading: false,
                faculties: [...state.faculties, action.payload]
            }
        case RECEIVE_UPDATE_FACULTY:
            return {
                ...state,
                isLoading: false,
                faculties: state.faculties.map(x => x.id === action.payload.id ? action.payload : x)
            }
        case RECEIVE_DELETE_FACULTY:
            return {
                ...state,
                isLoading: false,
                faculties: state.faculties.filter(x => x.id !== action.payload)
            }
        case REQUEST_FACULTY_BY_ID:
            return {
                ...state,
                isLoading: true
            }
        case RECEIVE_FACULTY_BY_ID:
            return {
                ...state,
                isLoading: false,
                currentFaculty: action.payload
            }
    }
    return {
        ...state
    }
}