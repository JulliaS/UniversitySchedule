import { Action, Reducer } from 'redux';
import { AppThunkAction } from '.';
import { InferActionsTypes } from './configureStore';
import api from './api';

//type actions
const REQUEST_ROOMS = 'REQUEST_ROOMS'
const RECEIVE_ROOMS = 'RECEIVE_ROOMS'
const REQUEST_ADD_ROOM = 'REQUEST_ADD_ROOM'
const RECEIVE_ADD_ROOM = 'RECEIVE_ADD_ROOM'
const REQUEST_DELETE_ROOM = 'REQUEST_DELETE_ROOM'
const RECEIVE_DELETE_ROOM = 'RECEIVE_DELETE_ROOM'
const REQUEST_UPDATE_ROOM = 'REQUEST_UPDATE_ROOM'
const RECEIVE_UPDATE_ROOM = 'RECEIVE_UPDATE_ROOM'


export interface RoomsState {
    isLoading: boolean
    rooms: Room[]
}

export interface Room {
    id: number
    name: string
}

//creators
export const actionCreators = {
    requestRooms: () => ({
        type: REQUEST_ROOMS
    } as const),
    receiveRooms: (rooms: Room[]) => ({
        type: RECEIVE_ROOMS,
        payload: rooms
    } as const),
    requestAddRoom: () => ({
        type: REQUEST_ADD_ROOM
    } as const),
    receiveAddRoom: (room: Room) => ({
        type: RECEIVE_ADD_ROOM,
        payload: room
    } as const),
    requestDeleteRoom: () => ({
        type: REQUEST_DELETE_ROOM
    } as const),
    receiveDeleteRoom: (id: number) => ({
        type: RECEIVE_DELETE_ROOM,
        payload: id
    } as const),
    requestUpdateRoom: () => ({
        type: REQUEST_UPDATE_ROOM
    } as const),
    receiveUpdateRoom: (id: number, newData: Room) => ({
        type: RECEIVE_UPDATE_ROOM,
        payload: { ...newData, id }
    } as const)
};

type KnownAction = InferActionsTypes<typeof actionCreators>


const API = api.RestAPI<Room>('api/room/');

export const GetAll = (): AppThunkAction<KnownAction> => async (dispatch) => {

    dispatch(actionCreators.requestRooms());

    const response = await API.fetchAll();

    dispatch(actionCreators.receiveRooms(response))
}
export const Create = (newRoom: any, onSuccess: () => void): AppThunkAction<KnownAction> => async (dispatch) => {

    dispatch(actionCreators.requestAddRoom());

    const response = await API.create(newRoom)

    console.log(response)

    onSuccess();
    dispatch(actionCreators.receiveAddRoom(response))
}

export const Update = (id: number, newData: any, onSuccess: () => void): AppThunkAction<KnownAction> => async (dispatch) => {

    dispatch(actionCreators.requestUpdateRoom());

    await API.update(id, newData)

    onSuccess()
    dispatch(actionCreators.receiveUpdateRoom(id, newData))
}

export const Delete = (id: number, onSuccess: () => void): AppThunkAction<KnownAction> => async (dispatch) => {

    dispatch(actionCreators.requestDeleteRoom())

    await API.delete(id)

    onSuccess()
    dispatch(actionCreators.receiveDeleteRoom(id))
}



//reducer

const unloadedState: RoomsState = {
    isLoading: false,
    rooms: []
}

export const reducer: Reducer<RoomsState> = (state: RoomsState | undefined, incomingAction: Action): RoomsState => {

    if (state === undefined) {
        return unloadedState;
    }

    const action = incomingAction as KnownAction;

    switch (action.type) {
        case REQUEST_ROOMS:
            return {
                ...state, isLoading: true
            };
        case RECEIVE_ROOMS:
            return {
                ...state,
                isLoading: false,
                rooms: action.payload
            }
        case RECEIVE_ADD_ROOM:
            return {
                ...state,
                isLoading: false,
                rooms: [...state.rooms, action.payload]
            }
        case RECEIVE_UPDATE_ROOM:
            return {
                ...state,
                isLoading: false,
                rooms: state.rooms.map(x => x.id === action.payload.id ? action.payload : x)
            }
        case RECEIVE_DELETE_ROOM:
            return {
                ...state,
                isLoading: false,
                rooms: state.rooms.filter(x => x.id !== action.payload)
            }  
    }
    return {
        ...state
    }
}