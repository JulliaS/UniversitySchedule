import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import { EditingState, AppointmentModel, ViewState, SchedulerDateTime, AppointmentForm, AppointmentTooltip, Appointment } from '@devexpress/dx-react-scheduler';
import {
  Scheduler, DayView, WeekView, Appointments, Resources,
} from '@devexpress/dx-react-scheduler-material-ui';
import { useToasts } from "react-toast-notifications";
import '../../custom.css'
import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from '../../store'
import * as SchedulesStore from '../../store/Schedules'

const resources = [{
  fieldName: 'type',
    title: 'Type',
    
  instances: [
    { id: 'subject', text: 'Subject', color: '#7E57C2' }
  ],
}];

function GetEndOfLesson(year: number, month: number, day: number, hour: number, minute: number) {
    ++hour; minute += 20;
    if (minute >= 60)
    {
        return new Date(year, month, day, ++hour, minute - 60);
    }
    else return new Date(year, month, day, hour, minute);
}

function FormatToString(date: Date) {
    return date.getFullYear().toString() + "-" + (date.getMonth() < 10 ? "0" + date.getMonth().toString() : date.getMonth().toString())
        + "-0" + date.getDay().toString() + "T" + (date.getHours() < 10 ? "0" + date.getHours().toString() : date.getHours().toString())
        + ":" + (date.getMinutes() < 10 ? "0" + date.getMinutes().toString() : date.getMinutes().toString());
}

const Schedules: React.FC = () => {
    const [currentDate, setCurrentDate] = React.useState<SchedulerDateTime>('2021-02-01');
    const schedulesData = useSelector<ApplicationState, SchedulesStore.SchedulesState>(state => state.schedules);
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(SchedulesStore.GetAll())
    }, [])
    const { addToast } = useToasts()

    const onDelete = (id: number) => {
        dispatch(SchedulesStore.Delete(id,
            () => addToast("Deleted successfully", { appearance:'info' })))
    }

    const appointments: Array<AppointmentModel> = (

        schedulesData.schedules.map((schedule, index) => {

            return ({
                title: schedule.subject.name.toString() + ", " + "Room " + schedule.room.name.toString() ,
                teacher: schedule.teacher.firstName.charAt(0) + ". " + schedule.teacher.lastName,
                //startDate: "2021-02-0" + schedule.numberDay.toString() + "T" + schedule.lesson.hour.toString() + ":" + schedule.lesson.minute.toString(),
                //endDate: "2021-02-0" + schedule.numberDay.toString() + "T" + GetEndOfLesson(schedule.lesson.hour, schedule.lesson.minute),
                startDate: FormatToString(new Date(2021, 2, schedule.numberDay, schedule.lesson.hour, schedule.lesson.minute)),
                endDate: FormatToString(GetEndOfLesson(2021, 2, schedule.numberDay, schedule.lesson.hour, schedule.lesson.minute)),
                id: schedule.id,
                type:"subject",
                
            })
        }));
    //alert(appointments.length.toString());

    return (
        <Paper >
            <h1>Week Schedule</h1>
            <hr/>
            <Scheduler
                firstDayOfWeek={1}
                data={appointments}
            >
                <ViewState
                    currentDate={currentDate}
                    onCurrentDateChange={setCurrentDate}
                />
                <WeekView displayName={"Week Schedule"}
                    startDayHour={8}
                    endDayHour={22}
                />

                <Appointments />
                <Resources
                    data={resources}
                />
            </Scheduler>
        </Paper>
    );
};

export default Schedules;