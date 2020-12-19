import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, ButtonGroup, Button } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { useToasts } from "react-toast-notifications";

import { ApplicationState } from '../../store'
import * as FacultiesStore from '../../store/Faculties'
import * as GroupsStore from '../../store/Groups'
import { GroupForm } from './GroupForm'
import { RouteComponentProps } from 'react-router-dom';
import { Faculty } from '../../store/Faculties';

type TParams = { id: string };

const Groups = ({ match }: RouteComponentProps<TParams>) => {

    const groupsData = useSelector<ApplicationState, GroupsStore.GroupsState>(state => state.groups);
    const currentFaculty = useSelector<ApplicationState, Faculty | undefined>(state => state.faculties.currentFaculty)

    const dispatch = useDispatch();

    const [currentId, setCurrentId] = React.useState<number>(0)
    const { addToast } = useToasts()

    const onDelete = (id: number) => {
        dispatch(GroupsStore.Delete(id,
            () => addToast("Deleted successfully", { appearance: 'info' })))
    }

    React.useEffect(() => {
        dispatch(FacultiesStore.GetFacultyById(parseInt(match.params.id)))
    }, [])


    React.useEffect(() => {
        if (currentFaculty?.id) {
            dispatch(GroupsStore.GetAllByFacultyId(currentFaculty.id))
        }
    }, [currentFaculty?.id])

    return (
        <Paper elevation={6}>
            <div id="listofFac">

                <Grid container direction="row"
                    justify="center"
                    alignItems="baseline">

                    <GroupForm {...({ currentId, setCurrentId })} />

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
                                    groupsData.groups.map((group, index) => {
                                        return (<TableRow key={index} hover>
                                            <TableCell>{group.name}</TableCell>
                                            <TableCell>
                                                <ButtonGroup variant="text">
                                                    <Button><EditIcon color="primary"
                                                        onClick={() => { setCurrentId(group.id) }} /></Button>
                                                    <Button><DeleteIcon color="secondary"
                                                        onClick={() => onDelete(group.id)} /></Button>
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

export default Groups;