import * as React from 'react'

export default ()=> {
    return (
        <div id="adminpanel">

           <div className="adminItem"><a href={"/faculties"}>Факультети</a></div>
            <div className="adminItem"><a href={"/groups"}>Групи</a></div>
            <div className="adminItem"><a href={"/rooms"}>Аудиторії</a></div>
            <div className="adminItem"><a href={"/schedules"}>Розклад</a></div>
        </div>
    );
}