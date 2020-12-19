import { Action, Reducer } from 'redux';
import { AppThunkAction } from '.';
import { InferActionsTypes } from './configureStore';
import api from './api';
import { Faculty } from './Faculties';

//type actions
const REQUEST_TEACHERS = 'REQUEST_TEACHERS'
const RECEIVE_TEACHERS = 'RECEIVE_TEACHERS'
const REQUEST_ADD_TEACHER = 'REQUEST_ADD_TEACHER'
const RECEIVE_ADD_TEACHER = 'RECEIVE_ADD_TEACHER'
const REQUEST_DELETE_TEACHER = 'REQUEST_DELETE_TEACHER'
const RECEIVE_DELETE_TEACHER = 'RECEIVE_DELETE_TEACHER'
const REQUEST_UPDATE_TEACHER = 'REQUEST_UPDATE_TEACHER'
const RECEIVE_UPDATE_TEACHER = 'RECEIVE_UPDATE_TEACHER'


export interface TeachersState {
    isLoading: boolean
    teachers: Teacher[]
}

export interface Teacher {
    id: number
    firstName: string
    lastName: string
    reference: string
    facultyId: number
    faculty: Faculty | null
}

//creators
export const actionCreators = {
    requestTeachers: () => ({
        type: REQUEST_TEACHERS
    } as const),
    receiveTeachers: (subjects: Teacher[]) => ({
        type: RECEIVE_TEACHERS,
        payload: subjects
    } as const),
    requestAddTeacher: () => ({
        type: REQUEST_ADD_TEACHER
    } as const),
    receiveAddTeacher: (teacher: Teacher) => ({
        type: RECEIVE_ADD_TEACHER,
        payload: teacher
    } as const),
    requestDeleteTeacher: () => ({
        type: REQUEST_DELETE_TEACHER
    } as const),
    receiveDeleteTeacher: (id: number) => ({
        type: RECEIVE_DELETE_TEACHER,
        payload: id
    } as const),
    requestUpdateTeacher: () => ({
        type: REQUEST_UPDATE_TEACHER
    } as const),
    receiveUpdateTeacher: (id: number, newData: Teacher) => ({
        type: RECEIVE_UPDATE_TEACHER,
        payload: { ...newData, id }
    } as const)
};

type KnownAction = InferActionsTypes<typeof actionCreators>


const API = api.RestAPI<Teacher>('api/teacher/');

export const GetAllByFacultyId = (facultyId: number): AppThunkAction<KnownAction> => async (dispatch) => {

    dispatch(actionCreators.requestTeachers());

    const response = await api.RestAPI<Teacher>("api/teacher/teachers/" + facultyId).fetchAll();

    dispatch(actionCreators.receiveTeachers(response))
}
export const Create = (newTeacher: any, onSuccess: () => void): AppThunkAction<KnownAction> => async (dispatch) => {

    dispatch(actionCreators.requestAddTeacher());

    const response = await API.create(newTeacher)
    console.log(response)
    onSuccess();
    dispatch(actionCreators.receiveAddTeacher(response))
}

export const Update = (id: number, newData: any, onSuccess: () => void): AppThunkAction<KnownAction> => async (dispatch) => {

    dispatch(actionCreators.requestUpdateTeacher());

    await API.update(id, newData)

    onSuccess()
    dispatch(actionCreators.receiveUpdateTeacher(id, newData))
}

export const Delete = (id: number, onSuccess: () => void): AppThunkAction<KnownAction> => async (dispatch) => {

    dispatch(actionCreators.requestDeleteTeacher())

    await API.delete(id)

    onSuccess()
    dispatch(actionCreators.receiveDeleteTeacher(id))
}



//reducer
const unloadedState: TeachersState = {
    isLoading: false,
    teachers: []
}

export const reducer: Reducer<TeachersState> = (state: TeachersState | undefined, incomingAction: Action): TeachersState => {

    if (state === undefined) {
        return unloadedState;
    }

    const action = incomingAction as KnownAction;

    switch (action.type) {
        case REQUEST_TEACHERS:
            return {
                ...state, isLoading: true
            };
        case RECEIVE_TEACHERS:
            return {
                ...state,
                isLoading: false,
                teachers: action.payload
            }
        case RECEIVE_ADD_TEACHER:
            return {
                ...state,
                isLoading: false,
                teachers: [...state.teachers, action.payload]
            }
        case RECEIVE_UPDATE_TEACHER:
            return {
                ...state,
                isLoading: false,
                teachers: state.teachers.map(x => x.id === action.payload.id ? action.payload : x)
            }
        case RECEIVE_DELETE_TEACHER:
            return {
                ...state,
                isLoading: false,
                teachers: state.teachers.filter(x => x.id !== action.payload)
            }
    }
    return {
        ...state
    }
}