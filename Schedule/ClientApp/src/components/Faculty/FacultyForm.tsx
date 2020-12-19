import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button } from '@material-ui/core';
import { useToasts } from "react-toast-notifications";

import { ApplicationState } from '../../store';
import * as FacultiesStore from '../../store/Faculties'


const ValidateSchema = yup.object().shape({
    name: yup.string().required()
})

type FormType = {
    name: string
}

type PropsType = {
    currentId: number,
    setCurrentId: React.Dispatch<React.SetStateAction<number>>
}


export const FacultyForm = (props: PropsType) => {

    const facultiesData = useSelector<ApplicationState, FacultiesStore.FacultiesState>(state => state.faculties);
    const dispatch = useDispatch();

    const { handleSubmit, errors, register, reset, setValue } = useForm<FormType>({
        resolver: yupResolver(ValidateSchema)
    })

    const { addToast } = useToasts()


    const OnSubmit = (values: FormType) => {
        const onSuccess = () => {

            reset();
            props.setCurrentId(0)
            addToast("Додано успішно", { appearance: 'success' })
        }
        if (props.currentId === 0) {
            dispatch(FacultiesStore.Create(values, onSuccess));
        }
        else {
            dispatch(FacultiesStore.Update(props.currentId, values, onSuccess))
        }
    }

    React.useEffect(() => {
        if (props.currentId !== 0) {
            const currentFaculty = facultiesData.faculties.find(x => x.id === props.currentId);
            setValue("name", currentFaculty ? currentFaculty.name : "")
        }
    }, [props.currentId])

    return (
        <form onSubmit={handleSubmit(OnSubmit)}>
            <div>
                <h1 id="facultyName">Факультети</h1>
                <label id="FacName">Назва факультету</label>
                <div>

                    <input name="name" id="Facname_input" ref={register}></input>
                    {errors.name && <p>Порожнє поле</p>}
                </div>
                <div id="buttns">
                    <div>
                        <Button id="submit" type="submit" color="primary" variant="contained">
                            Додати
                    </Button>
                    </div>
                    <div>
                        <Button
                            variant="contained"
                            onClick={() => { reset(); props.setCurrentId(0) }}
                        >Скинути</Button>
                    </div>
                </div>
            </div>
        </form>)
}

export default FacultyForm;