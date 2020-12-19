import { type } from "os";
import { Room } from "./rooms";
import { Subject } from "./Subjects";
import { Teacher } from "./Teachers";
import { Group } from "./Groups";
import { Action, Reducer } from 'redux';
import { AppThunkAction } from '.';
import { InferActionsTypes } from './configureStore';
import api from './api';



export interface Schedule {
    id: number
    numberDay: number
    lesson: Lesson
    lessonid: number
    teacher: Teacher
    teacherid: number
    subject: Subject
    subjectid: number
    room: Room
    roomid: number
    group: Group
    groupid: number
    semester: Semester
    semesterid: number
}

export interface Availability {
    id: number
    name: string
}

export interface Semester {
    id: number
    startdate: Date
    enddate: Date
}

export interface SchedulesState {
    isLoading: boolean
    schedules: Schedule[]
    currentSchedule: Schedule | undefined
}
export interface Lesson {
    id: number
    number: number
    minute: number
    hour: number
}

//type actions
const REQUEST_SCHEDULES = 'REQUEST_SCHEDULES'
const RECEIVE_SCHEDULES = 'RECEIVE_SCHEDULES'
const REQUEST_ADD_SCHEDULE = 'REQUEST_ADD_SCHEDULE'
const RECEIVE_ADD_SCHEDULE = 'RECEIVE_ADD_SCHEDULE'
const REQUEST_DELETE_SCHEDULE = 'REQUEST_DELETE_SCHEDULE'
const RECEIVE_DELETE_SCHEDULE = 'RECEIVE_DELETE_SCHEDULE'
const REQUEST_UPDATE_SCHEDULE = 'REQUEST_UPDATE_SCHEDULE'
const RECEIVE_UPDATE_SCHEDULE = 'RECEIVE_UPDATE_SCHEDULE'
const REQUEST_SCHEDULE_BY_ID = 'REQUEST_SCHEDULE_BY_ID'
const RECEIVE_SCHEDULE_BY_ID = 'RECEIVE_SCHEDULE_BY_ID'

export const actionCreators = {
    requestSchedules: () => ({
        type: REQUEST_SCHEDULES
    } as const),
    receiveSchedules: (schedules: Schedule[]) => ({
        type: RECEIVE_SCHEDULES,
        payload: schedules
    } as const),
    requestAddSchedule: () => ({
        type: REQUEST_ADD_SCHEDULE
    } as const),
    receiveAddSchedule: (schedule: Schedule) => ({
        type: RECEIVE_ADD_SCHEDULE,
        payload: schedule
    } as const),
    requestDeleteSchedule: () => ({
        type: REQUEST_DELETE_SCHEDULE
    } as const),
    receiveDeleteSchedule: (id: number) => ({
        type: RECEIVE_DELETE_SCHEDULE,
        payload: id
    } as const),
    requestUpdateSchedule: () => ({
        type: REQUEST_UPDATE_SCHEDULE
    } as const),
    receiveUpdateSchedule: (id: number, newData: Schedule) => ({
        type: RECEIVE_UPDATE_SCHEDULE,
        payload: { ...newData, id }
    } as const),
    requestScheduleById: () => ({
        type: REQUEST_SCHEDULE_BY_ID
    } as const),
    receiveScheduleById: (schedule: Schedule) => ({
        type: RECEIVE_SCHEDULE_BY_ID,
        payload: schedule
    } as const)
};

type KnownAction = InferActionsTypes<typeof actionCreators>

const API = api.RestAPI<Schedule>('api/schedule/')

export const GetAll = (): AppThunkAction<KnownAction> => async (dispatch) => {

    dispatch(actionCreators.requestSchedules());

    //const response = await API.fetchAll();
    const response = await api.RestAPI<Schedule>('api/schedule/with/properties?property=Subject&property=Room&property=Lesson&property=Teacher').fetchAll();


    dispatch(actionCreators.receiveSchedules(response))
}
export const Create = (newSchedule: any, onSuccess: () => void): AppThunkAction<KnownAction> => async (dispatch) => {

    dispatch(actionCreators.requestAddSchedule());

    const response = await API.create(newSchedule)

    onSuccess();
    dispatch(actionCreators.receiveAddSchedule(response))
}

export const Update = (id: number, newData: any, onSuccess: () => void): AppThunkAction<KnownAction> => async (dispatch) => {

    dispatch(actionCreators.requestUpdateSchedule());

    const response = await API.update(id, newData)

    onSuccess()
    dispatch(actionCreators.receiveUpdateSchedule(id, newData))
}

export const Delete = (id: number, onSuccess: () => void): AppThunkAction<KnownAction> => async (dispatch) => {

    dispatch(actionCreators.requestDeleteSchedule())

    const response = await API.delete(id)

    if (response) {
        onSuccess()
        dispatch(actionCreators.receiveDeleteSchedule(id))
    }
}
export const GetScheduleById = (id: number): AppThunkAction<KnownAction> => async (dispatch, getState) => {

    if (getState().faculties.currentFaculty?.id !== id) {

        dispatch(actionCreators.requestScheduleById())
        const response = await API.fetchById(id)
        dispatch(actionCreators.receiveScheduleById(response))
    }
}

//reducer
const unloadedState: SchedulesState = {
    isLoading: false,
    schedules: [],
    currentSchedule: undefined
}

export const reducer: Reducer<SchedulesState> = (state: SchedulesState | undefined, incomingAction: Action): SchedulesState => {

    if (state === undefined) {
        return unloadedState;
    }

    const action = incomingAction as KnownAction;

    switch (action.type) {
        case REQUEST_SCHEDULES:
            return {
                ...state, isLoading: true
            };
        case RECEIVE_SCHEDULES:
            return {
                ...state,
                isLoading: false,
                schedules: action.payload
            }
        case RECEIVE_ADD_SCHEDULE:
            return {
                ...state,
                isLoading: false,
                schedules: [...state.schedules, action.payload]
            }
        case RECEIVE_UPDATE_SCHEDULE:
            return {
                ...state,
                isLoading: false,
                schedules: state.schedules.map(x => x.id === action.payload.id ? action.payload : x)
            }
        case RECEIVE_DELETE_SCHEDULE:
            return {
                ...state,
                isLoading: false,
                schedules: state.schedules.filter(x => x.id !== action.payload)
            }
        case REQUEST_SCHEDULE_BY_ID:
            return {
                ...state,
                isLoading: true
            }
        case RECEIVE_SCHEDULE_BY_ID:
            return {
                ...state,
                isLoading: false,
                currentSchedule: action.payload
            }
    }
    return {
        ...state
    }
}