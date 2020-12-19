import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, ButtonGroup, Button } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { useToasts } from "react-toast-notifications";
import { RouteComponentProps } from 'react-router-dom';

import { ApplicationState } from '../../store'
import * as FacultiesStore from '../../store/Faculties'
import * as TeachersStore from '../../store/Teachers'
import { TeacherForm } from './TeacherForm'
import { Faculty } from '../../store/Faculties';

type TParams = { id: string };

const Teachers = ({ match }: RouteComponentProps<TParams>) => {

    const teachersData = useSelector<ApplicationState, TeachersStore.TeachersState>(state => state.teachers);
    const currentFaculty = useSelector<ApplicationState, Faculty | undefined>(state => state.faculties.currentFaculty)

    const dispatch = useDispatch();

    const [currentId, setCurrentId] = React.useState<number>(0)
    const { addToast } = useToasts()

    const onDelete = (id: number) => {
        dispatch(TeachersStore.Delete(id,
            () => addToast("Deleted successfully", { appearance: 'info' })))
    }

    React.useEffect(() => {
        dispatch(FacultiesStore.GetFacultyById(parseInt(match.params.id)))
    }, [])

    React.useEffect(() => {
        if (currentFaculty?.id) {
            dispatch(TeachersStore.GetAllByFacultyId(currentFaculty.id))
        }
    }, [currentFaculty?.id])

    return (
        <Paper elevation={6}>
            <div id="listofFac">

                <Grid container direction="row"
                    justify="center"
                    alignItems="baseline">

                    <TeacherForm {...({ currentId, setCurrentId })} />

                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Прізвище</TableCell>
                                    <TableCell>Ім'я</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {
                                    teachersData.teachers.map((teacher, index) => {
                                        return (<TableRow key={index} hover>
                                            <TableCell>{teacher.firstName}</TableCell>
                                            <TableCell>{teacher.lastName}</TableCell>
                                            <TableCell>
                                                <ButtonGroup variant="text">
                                                    <Button><EditIcon color="primary"
                                                        onClick={() => { setCurrentId(teacher.id) }} /></Button>
                                                    <Button><DeleteIcon color="secondary"
                                                        onClick={() => onDelete(teacher.id)} /></Button>
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

export default Teachers;