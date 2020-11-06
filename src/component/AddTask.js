import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import UserTask from "../model/UserTask";
import { MenuItem, Select } from "@material-ui/core";
import { TaskStatus } from "../model/TaskStatus";

export default function AddTask({ open, userId, updating,
    onCancel = () => {}, onSave = (task) => {} }) {

    const [show, setShow] = useState(open);
    const [task, setTask] = useState(new UserTask({
        id: 0, 
        userId: userId || 0,
        desc: "", 
        status: TaskStatus[TaskStatus.TODO]
    }));

    useEffect(() => setShow(open), [open]);
    useEffect(() => onSetUserId({target: {value: userId}}), [userId]);
    useEffect(() => {
        if(updating){
            // console.log("updating", updating);
            setTask(new UserTask({
                id: updating.id,
                userId: updating.userId, 
                status: updating.status, 
                desc: updating.desc
            }));
        }
    }, [updating]);

    const onSetDesc = (e) => {
        setTask(new UserTask({...task, desc: e.target.value}));
    };

    const onSetUserId = (e) => {
        setTask(new UserTask({...task, userId: e.target.value}));
    };

    const onSetStatus = (e) => {
        // console.log("setStatus", task);
        // console.log("setStatus", e.target.value);
        setTask({...task, status: e.target.value});
    };

    const handleClose = (save) => {
        console.log("handleClose", save);
        if(Boolean(save)){
            onSave(task)
        }else{
            onCancel(false);
        }
        // setShow(false);
        setTask(new UserTask({
            id: 0, userId: 0, desc: "", 
            status: TaskStatus[TaskStatus.TODO]}));
    };
    
    return (
        <Dialog
            open={show}
            onClose={() => handleClose(false)}
            aria-labelledby="add-task-dialog-title"
        >
            <DialogTitle id="add-task-dialog-title">Add Task</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Please enter data for new task
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="task"
                    label="User Id"
                    type="text"
                    fullWidth disabled
                    value={task?.userId}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="task"
                    label="Task"
                    type="text"
                    fullWidth
                    value={task?.desc}
                    onChange={onSetDesc}
                />
                <Select value={task.status} onChange={onSetStatus} native={false}>
                    <MenuItem value={TaskStatus[TaskStatus.TODO]}>{TaskStatus[TaskStatus.TODO]}</MenuItem>
                    <MenuItem value={TaskStatus[TaskStatus.DONE]}>{TaskStatus[TaskStatus.DONE]}</MenuItem>
                </Select>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => handleClose(false)} color="primary">
                    Cancel
                </Button>
                <Button onClick={() => handleClose(true)} color="primary">
                    {updating ? "Save" : "Add"} Task
                </Button>
            </DialogActions>
        </Dialog>
    );
}
