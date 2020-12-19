import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, ButtonGroup, Button } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { useToasts } from "react-toast-notifications";

import { ApplicationState } from '../../store'
import * as FacultyStore from '../../store/Faculties'
import * as SubjectsStore from '../../store/Subjects'
import { SubjectForm } from './SubjectForm'
import { RouteComponentProps } from 'react-router-dom';
import { Faculty } from '../../store/Faculties';

type TParams = { id: string };

const Subjects = ({ match }: RouteComponentProps<TParams>) => {

    const subjectsData = useSelector<ApplicationState, SubjectsStore.SubjectsState>(state => state.subjects);
    const currentFaculty = useSelector<ApplicationState, Faculty | undefined>(state => state.faculties.currentFaculty)
    
    const dispatch = useDispatch();

    const [currentId, setCurrentId] = React.useState<number>(0)
    const { addToast } = useToasts()

    const onDelete = (id: number) => {
        dispatch(SubjectsStore.Delete(id,
            () => addToast("Deleted successfully", { appearance: 'info' })))
    }

    React.useEffect(() => {
          dispatch(FacultyStore.GetFacultyById(parseInt(match.params.id)))
    }, [])

    React.useEffect(()=>{
        if(currentFaculty?.id){
            dispatch(SubjectsStore.GetAllByFacultyId(currentFaculty.id))
        }
    }, [currentFaculty?.id])

    return (
        <Paper elevation={6}>
            <div id="listofFac">

                <Grid container direction="row"
                    justify="center"
                    alignItems="baseline">

                    <SubjectForm {...({ currentId, setCurrentId})} />

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
                                    subjectsData.subjects.map((subject, index) => {
                                        return (<TableRow key={index} hover>
                                            <TableCell>{subject.name}</TableCell>
                                            <TableCell>
                                                <ButtonGroup variant="text">
                                                    <Button><EditIcon color="primary"
                                                        onClick={() => { setCurrentId(subject.id) }} /></Button>
                                                    <Button><DeleteIcon color="secondary"
                                                        onClick={() => onDelete(subject.id)} /></Button>
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

export default Subjects;