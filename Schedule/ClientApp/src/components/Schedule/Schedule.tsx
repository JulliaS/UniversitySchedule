

import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import { AppointmentModel, ViewState, SchedulerDateTime, AppointmentForm } from '@devexpress/dx-react-scheduler';
import {
  Scheduler, DayView, WeekView, Appointments, Resources,
} from '@devexpress/dx-react-scheduler-material-ui';

import '../../custom.css'
import { Grid } from '@material-ui/core';



const appointments: Array<AppointmentModel> = [ 
  {
  startDate: '2021-02-01T08:30',
  endDate: '2021-02-01T09:50',
  title: 'Функан'+'\n119a',
  type: 'subject',
},
{
  startDate: '2021-02-02T10:10',
  endDate: '2021-02-02T11:30',
  title: 'Функан'+'\n265',
  type: 'subject',
}
];


const resources = [{
  fieldName: 'type',
  title: 'Type',
  instances: [
    { id: 'subject', text: 'Subject', color: '#7E57C2' }
  ],
}];

const Schedules: React.FC = () => {
  const [currentDate, setCurrentDate] = React.useState<SchedulerDateTime>('2021-02-01');

  return (
    <Paper >
    <h1>Розклад</h1>
      <Scheduler
        firstDayOfWeek={1}
        data={appointments}
      >
        <ViewState
          currentDate={currentDate}
          onCurrentDateChange={setCurrentDate}
        />
        <WeekView
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