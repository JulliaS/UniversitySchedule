import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import AdminPanel from './components/AdminPanel';
import Faculties from './components/Faculty/Faculties'
import Groups from './components/Group/Groups';
import Rooms from './components/Room/Rooms';
import Subjects from './components/Subject/Subjects';
import Teachers from './components/Teacher/Teachers';
import './custom.css'

export default () => (
    <main>
        <Switch>
            <Route exact path='/admin' component={AdminPanel} />
            <Route exact path="/faculties" component={Faculties} />
            <Route exact path="/rooms" component={Rooms} />
        
            <Route path="/faculties/:id/groups" component={Groups} />
            <Route path="/faculties/:id/teachers" component={Teachers} />
            <Route path="/faculties/:id/subjects" component={Subjects} />
            <Redirect from="/" to="/admin" />
        </Switch>
    </main>
);
