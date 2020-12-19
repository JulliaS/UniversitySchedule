import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button } from '@material-ui/core';
import { useToasts } from "react-toast-notifications";

import { ApplicationState } from '../../store';
import * as GroupsStore from '../../store/Groups'
import { Faculty } from '../../store/Faculties';


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

export const GroupForm = (props: PropsType) => {

    const groupsData = useSelector<ApplicationState, GroupsStore.GroupsState>(state => state.groups);
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
            addToast("Додано успішно", { appearance: 'success' })
        }
        if (props.currentId === 0) {
            dispatch(GroupsStore.Create({ ...values, facultyId: currentFaculty?.id }, onSuccess));
        }
        else {
            dispatch(GroupsStore.Update(props.currentId, { ...values, facultyId: currentFaculty?.id }, onSuccess))
        }
    }

    React.useEffect(() => {
        if (props.currentId !== 0) {
            const currentGroup = groupsData.groups.find(x => x.id === props.currentId);
            setValue("name", currentGroup ? currentGroup.name : "")
        }
    }, [props.currentId])

    return (
        <form onSubmit={handleSubmit(OnSubmit)}>
            <h1 id="facultyName">{currentFaculty?.name}</h1>
            <div>
                <label id="FacName">Назва групи</label>
                <div>

                    <input name="name" id="Facname_input" ref={register}></input>
                    {errors.name && <p>Це поле є необхідним</p>}
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

export default GroupForm;