import { Action, Reducer } from 'redux';
import { AppThunkAction } from '.';
import { InferActionsTypes } from './configureStore';
import api from './api';
import { Faculty } from './Faculties';

//type actions
const REQUEST_SUBJECTS = 'REQUEST_SUBJECTS'
const RECEIVE_SUBJECTS = 'RECEIVE_SUBJECTS'
const REQUEST_ADD_SUBJECT = 'REQUEST_ADD_SUBJECT'
const RECEIVE_ADD_SUBJECT = 'RECEIVE_ADD_SUBJECT'
const REQUEST_DELETE_SUBJECT = 'REQUEST_DELETE_SUBJECT'
const RECEIVE_DELETE_SUBJECT = 'RECEIVE_DELETE_SUBJECT'
const REQUEST_UPDATE_SUBJECT = 'REQUEST_UPDATE_SUBJECT'
const RECEIVE_UPDATE_SUBJECT = 'RECEIVE_UPDATE_SUBJECT'


export interface SubjectsState {
    isLoading: boolean
    subjects: Subject[]
}

export interface Subject {
    id: number
    name: string
    facultyId: number
    faculty: Faculty | null
}

//creators
export const actionCreators = {
    requestSubjects: () => ({
        type: REQUEST_SUBJECTS
    } as const),
    receiveSubjects: (subjects: Subject[]) => ({
        type: RECEIVE_SUBJECTS,
        payload: subjects
    } as const),
    requestAddSubject: () => ({
        type: REQUEST_ADD_SUBJECT
    } as const),
    receiveAddSubject: (subject: Subject) => ({
        type: RECEIVE_ADD_SUBJECT,
        payload: subject
    } as const),
    requestDeleteSubject: () => ({
        type: REQUEST_DELETE_SUBJECT
    } as const),
    receiveDeleteSubject: (id: number) => ({
        type: RECEIVE_DELETE_SUBJECT,
        payload: id
    } as const),
    requestUpdateSubject: () => ({
        type: REQUEST_UPDATE_SUBJECT
    } as const),
    receiveUpdateSubject: (id: number, newData: Subject) => ({
        type: RECEIVE_UPDATE_SUBJECT,
        payload: { ...newData, id }
    } as const)
};

type KnownAction = InferActionsTypes<typeof actionCreators>


const API = api.RestAPI<Subject>('api/subject/');

export const GetAllByFacultyId = (facultyId: number): AppThunkAction<KnownAction> => async (dispatch) => {

    dispatch(actionCreators.requestSubjects());

    const response = await api.RestAPI<Subject>("api/subject/subjects/" + facultyId).fetchAll();

    dispatch(actionCreators.receiveSubjects(response))
}
export const Create = (newSubject: any, onSuccess: () => void): AppThunkAction<KnownAction> => async (dispatch) => {

    dispatch(actionCreators.requestAddSubject());

    const response = await API.create(newSubject)
    console.log(response)
    onSuccess();
    dispatch(actionCreators.receiveAddSubject(response))
}

export const Update = (id: number, newData: any, onSuccess: () => void): AppThunkAction<KnownAction> => async (dispatch) => {

    dispatch(actionCreators.requestUpdateSubject());

    await API.update(id, newData)

    onSuccess()
    dispatch(actionCreators.receiveUpdateSubject(id, newData))
}

export const Delete = (id: number, onSuccess: () => void): AppThunkAction<KnownAction> => async (dispatch) => {

    dispatch(actionCreators.requestDeleteSubject())

    await API.delete(id)

    onSuccess()
    dispatch(actionCreators.receiveDeleteSubject(id))
}



//reducer

const unloadedState: SubjectsState = {
    isLoading: false,
    subjects: []
}

export const reducer: Reducer<SubjectsState> = (state: SubjectsState | undefined, incomingAction: Action): SubjectsState => {

    if (state === undefined) {
        return unloadedState;
    }

    const action = incomingAction as KnownAction;

    switch (action.type) {
        case REQUEST_SUBJECTS:
            return {
                ...state, isLoading: true
            };
        case RECEIVE_SUBJECTS:
            return {
                ...state,
                isLoading: false,
                subjects: action.payload
            }
        case RECEIVE_ADD_SUBJECT:
            return {
                ...state,
                isLoading: false,
                subjects: [...state.subjects, action.payload]
            }
        case RECEIVE_UPDATE_SUBJECT:
            return {
                ...state,
                isLoading: false,
                subjects: state.subjects.map(x => x.id === action.payload.id ? action.payload : x)
            }
        case RECEIVE_DELETE_SUBJECT:
            return {
                ...state,
                isLoading: false,
                subjects: state.subjects.filter(x => x.id !== action.payload)
            }
    }
    return {
        ...state
    }
}