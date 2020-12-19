import { Room } from "./rooms";
import { Subject } from "./Subjects";
import { Teacher } from "./Teachers";

export interface Schedule{
    id:number
    numberDay: number
    lesson:Lesson
    teacher: Teacher
    subject: Subject
    room: Room
}

export interface Lesson{
    id:number
    number:number
    startDate: Date
    endDate: Date
}