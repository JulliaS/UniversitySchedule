import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, ButtonGroup, Button } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { useToasts } from "react-toast-notifications";

import { ApplicationState } from '../../store'
import * as FacultiesStore from '../../store/Faculties'
import { FacultyForm } from './FacultyForm'
import { Link } from 'react-router-dom';

const Faculties = () => {

    const facultiesData = useSelector<ApplicationState, FacultiesStore.FacultiesState>(state => state.faculties);
    const dispatch = useDispatch();

    const [currentId, setCurrentId] = React.useState<number>(0);

    React.useEffect(() => {
        dispatch(FacultiesStore.GetAll())
    }, [])

    const { addToast } = useToasts()

    const onDelete = (id: number) => {
        dispatch(FacultiesStore.Delete(id,
            () => addToast("Видалено успішно", { appearance: 'info' })))
    }

    return (
        <Paper elevation={6}>
            <div id="listofFac">

                <Grid container direction="row"
                    justify="center"
                    alignItems="baseline">

                    <FacultyForm {...({ currentId, setCurrentId })} />

                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Назва</TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {
                                    facultiesData.faculties.map((faculty, index) => {
                                        return (<TableRow key={index} hover>
                                            <TableCell>{faculty.name}</TableCell>
                                            <TableCell>
                                                <ButtonGroup variant="text">
                                                    <Button><EditIcon color="primary"
                                                        onClick={() => { setCurrentId(faculty.id) }} /></Button>
                                                    <Button><DeleteIcon color="secondary"
                                                        onClick={() => onDelete(faculty.id)} /></Button>
                                                </ButtonGroup>
                                            </TableCell>
                                            <TableCell>
                                                <Button>
                                                    <Link to={`/faculties/${faculty.id}/groups`}>Гpупи</Link>
                                                </Button>
                                            </TableCell>
                                            <TableCell>
                                                <Button>
                                                    <Link to={`/faculties/${faculty.id}/teachers`}>Bикладачі</Link>
                                                </Button>
                                            </TableCell>
                                            <TableCell>
                                                <Button>
                                                    <Link to={`/faculties/${faculty.id}/subjects`}>Пpедмети</Link>
                                                </Button>
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

export default Faculties;