import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button } from '@material-ui/core';
import { useToasts } from "react-toast-notifications";

import { ApplicationState } from '../../store';
import * as RoomsStore from '../../store/rooms'


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

export const RoomForm = (props: PropsType) => {

    const roomsData = useSelector<ApplicationState, RoomsStore.RoomsState>(state => state.rooms);
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
            dispatch(RoomsStore.Create(values, onSuccess));
        }
        else {
            dispatch(RoomsStore.Update(props.currentId, values, onSuccess))
        }
    }

    React.useEffect(() => {
        if (props.currentId !== 0) {
            const currentRoom = roomsData.rooms.find(x => x.id === props.currentId);
            setValue("name", currentRoom ? currentRoom.name : "")
        }
    }, [props.currentId])

    return (
        <form onSubmit={handleSubmit(OnSubmit)}>
            <div>
                <h1 id="facultyName">Аудиторії</h1>
                <label id="FacName">Номер аудиторії</label>
                <div>

                    <input name="name" id="Facname_input" ref={register}></input>
                    {errors.name && <p>This field is required</p>}
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

export default RoomForm;