import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button } from '@material-ui/core';
import { useToasts } from "react-toast-notifications";

import { ApplicationState } from '../../store';
import * as TeachersStore from '../../store/Teachers'
import { Faculty } from '../../store/Faculties';


const ValidateSchema = yup.object().shape({
    firstName: yup.string().required(),
    lastName: yup.string().required()
})

type FormType = {
    firstName: string,
    lastName: string
}

type PropsType = {
    currentId: number,
    setCurrentId: React.Dispatch<React.SetStateAction<number>>
}

export const TeacherForm = (props: PropsType) => {

    const teachersData = useSelector<ApplicationState, TeachersStore.TeachersState>(state => state.teachers);
    const currentFaculty = useSelector<ApplicationState, Faculty | undefined>(state => state.faculties.currentFaculty)

    const dispatch = useDispatch();

    const { handleSubmit, errors, register, reset, setValue } = useForm<FormType>({
        resolver: yupResolver(ValidateSchema)
    })

    const { addToast } = useToasts()

    const OnSubmit = (values: FormType) => {
        const onSuccess = () => {

            reset();
            props.setCurrentId(0)
            addToast("Submitted successfully", { appearance: 'success' })
        }
        if (props.currentId === 0) {
            dispatch(TeachersStore.Create({ ...values, facultyId: currentFaculty?.id }, onSuccess));
        }
        else {
            dispatch(TeachersStore.Update(props.currentId, { ...values, facultyId: currentFaculty?.id }, onSuccess))
        }
    }

    React.useEffect(() => {
        if (props.currentId !== 0) {
            const currentTeacher = teachersData.teachers.find(x => x.id === props.currentId)

            setValue("firstName", currentTeacher ? currentTeacher.firstName : "")
            setValue("lastName", currentTeacher ? currentTeacher.lastName : "")
        }
    }, [props.currentId])

    return (
        <form onSubmit={handleSubmit(OnSubmit)}>
            <h1 id="facultyName">{currentFaculty?.name}</h1>
            <div>
                <label id="FacName">Прізвище</label>
                <div>

                    <input name="firstName" id="Facname_input" ref={register}></input>
                    {errors.firstName && <p>This field is required</p>}
                </div>
                <label id="FacName">Ім'я</label>
                <div>

                    <input name="lastName" id="Facname_input" ref={register}></input>
                    {errors.lastName && <p>This field is required</p>}
                </div>
                <div id="buttns">
                    <div>
                        <Button id="submit" type="submit" color="primary" variant="contained">
                            Submit
                    </Button>
                    </div>
                    <div>
                        <Button
                            variant="contained"
                            onClick={() => { reset(); props.setCurrentId(0) }}
                        >Reset</Button>
                    </div>
                </div>
            </div>
        </form>)
}

export default TeacherForm;