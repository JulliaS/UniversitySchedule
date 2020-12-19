import { Action, Reducer } from 'redux';
import { AppThunkAction } from '.';
import { InferActionsTypes } from './configureStore';
import api from './api';
import { Faculty } from './Faculties';

//type actions
const REQUEST_GROUPS = 'REQUEST_GROUPS'
const RECEIVE_GROUPS = 'RECEIVE_GROUPS'
const REQUEST_ADD_GROUP = 'REQUEST_ADD_GROUP'
const RECEIVE_ADD_GROUP = 'RECEIVE_ADD_GROUP'
const REQUEST_DELETE_GROUP = 'REQUEST_DELETE_GROUP'
const RECEIVE_DELETE_GROUP = 'RECEIVE_DELETE_GROUP'
const REQUEST_UPDATE_GROUP = 'REQUEST_UPDATE_GROUP'
const RECEIVE_UPDATE_GROUP = 'RECEIVE_UPDATE_GROUP'


export interface GroupsState {
    isLoading: boolean
    groups: Group[]
}

export interface Group {
    id: number
    name: string
    facultyId: number
    faculty: Faculty | null
}

//creators
export const actionCreators = {
    requestGroups: () => ({
        type: REQUEST_GROUPS
    } as const),
    receiveGroups: (groups: Group[]) => ({
        type: RECEIVE_GROUPS,
        payload: groups
    } as const),
    requestAddGroup: () => ({
        type: REQUEST_ADD_GROUP
    } as const),
    receiveAddGroup: (group: Group) => ({
        type: RECEIVE_ADD_GROUP,
        payload: group
    } as const),
    requestDeleteGroup: () => ({
        type: REQUEST_DELETE_GROUP
    } as const),
    receiveDeleteGroup: (id: number) => ({
        type: RECEIVE_DELETE_GROUP,
        payload: id
    } as const),
    requestUpdateGroup: () => ({
        type: REQUEST_UPDATE_GROUP
    } as const),
    receiveUpdateGroup: (id: number, newData: Group) => ({
        type: RECEIVE_UPDATE_GROUP,
        payload: { ...newData, id }
    } as const)
};

type KnownAction = InferActionsTypes<typeof actionCreators>


const API = api.RestAPI<Group>('api/group/');

export const GetAllByFacultyId = (id:number): AppThunkAction<KnownAction> => async (dispatch) => {

    dispatch(actionCreators.requestGroups());

    const response = await api.RestAPI<Group>("api/group/groups/"+id.toString()).fetchAll();

    dispatch(actionCreators.receiveGroups(response))
}
export const Create = (newGroup: any, onSuccess: () => void): AppThunkAction<KnownAction> => async (dispatch) => {

    dispatch(actionCreators.requestAddGroup());

    const response = await API.create(newGroup)

    onSuccess();
    dispatch(actionCreators.receiveAddGroup(response))
}

export const Update = (id: number, newData: any, onSuccess: () => void): AppThunkAction<KnownAction> => async (dispatch) => {

    dispatch(actionCreators.requestUpdateGroup());

    const response = await API.update(id, newData)

    onSuccess()
    dispatch(actionCreators.receiveUpdateGroup(id, newData))
}

export const Delete = (id: number, onSuccess: () => void): AppThunkAction<KnownAction> => async (dispatch) => {

    dispatch(actionCreators.requestDeleteGroup())

    const response = await API.delete(id)

    if (response) {
        onSuccess()
        dispatch(actionCreators.receiveDeleteGroup(id))
    }
}



//reducer
const unloadedState: GroupsState = {
    isLoading: false,
    groups: []
}

export const reducer: Reducer<GroupsState> = (state: GroupsState | undefined, incomingAction: Action): GroupsState => {

    if (state === undefined) {
        return unloadedState;
    }

    const action = incomingAction as KnownAction;

    switch (action.type) {
        case REQUEST_GROUPS:
            return {
                ...state, isLoading: true
            };
        case RECEIVE_GROUPS:
            return {
                ...state,
                isLoading: false,
                groups: action.payload
            }
        case RECEIVE_ADD_GROUP:
            return {
                ...state,
                isLoading: false,
                groups: [...state.groups, action.payload]
            }
        case RECEIVE_UPDATE_GROUP:
            return {
                ...state,
                isLoading: false,
                groups: state.groups.map(x => x.id === action.payload.id ? action.payload : x)
            }
        case RECEIVE_DELETE_GROUP:
            return {
                ...state,
                isLoading: false,
                groups: state.groups.filter(x => x.id !== action.payload)
            }
    }
    return {
        ...state
    }
}