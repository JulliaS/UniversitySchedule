import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, ButtonGroup, Button } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { useToasts } from "react-toast-notifications";

import { ApplicationState } from '../../store'
import * as RoomsStore from '../../store/rooms'
import { RoomForm } from './RoomForm'

const Rooms = () => {

    const roomsData = useSelector<ApplicationState, RoomsStore.RoomsState>(state => state.rooms);
    const dispatch = useDispatch();

    const [currentId, setCurrentId] = React.useState<number>(0)

    React.useEffect(() => {
        dispatch(RoomsStore.GetAll())
    }, [])

    const { addToast } = useToasts()

    const onDelete = (id: number) => {
        dispatch(RoomsStore.Delete(id,
            () => addToast("Deleted successfully", { appearance: 'info' })))
    }

    return (
        <Paper elevation={6}>
            <div id="listofFac">

                <Grid container direction="row"
                    justify="center"
                    alignItems="baseline">

                    <RoomForm {...({ currentId, setCurrentId })} />


                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Назва</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {
                                    roomsData.rooms.map((room, index) => {
                                        return (<TableRow key={index} hover>
                                            <TableCell>{room.name}</TableCell>
                                            <TableCell>
                                                <ButtonGroup variant="text">
                                                    <Button><EditIcon color="primary"
                                                        onClick={() => { setCurrentId(room.id) }} /></Button>
                                                    <Button><DeleteIcon color="secondary"
                                                        onClick={() => onDelete(room.id)} /></Button>
                                                </ButtonGroup>
                                            </TableCell>
                                        </TableRow>)
                                    })
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>

                </Grid>
            </div>

        </Paper>
    )
}

export default Rooms;