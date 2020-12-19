import * as Faculties from './Faculties';
import * as Groups from './Groups';
import * as Rooms from './rooms';
import * as Subjects from './Subjects';
import * as Teachers from './Teachers';
import * as Schedules from './Schedules';

// The top-level state object
export interface ApplicationState {
    faculties: Faculties.FacultiesState
    groups: Groups.GroupsState
    rooms: Rooms.RoomsState
    subjects: Subjects.SubjectsState
    teachers: Teachers.TeachersState
    schedules: Schedules.SchedulesState
}

// Whenever an action is dispatched, Redux will update each top-level application state property using
// the reducer with the matching name. It's important that the names match exactly, and that the reducer
// acts on the corresponding ApplicationState property type.
export const reducers = {
    faculties: Faculties.reducer,
    groups: Groups.reducer,
    rooms: Rooms.reducer,
    subjects: Subjects.reducer,
    teachers: Teachers.reducer,
    schedules: Schedules.reducer
};

// This type can be used as a hint on action creators so that its 'dispatch' and 'getState' params are
// correctly typed to match your store.
export interface AppThunkAction<TAction> {
    (dispatch: (action: TAction) => void, getState: () => ApplicationState): void;
}
