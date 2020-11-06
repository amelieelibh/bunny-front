import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import User from "../model/User";

export default function AddUser({ open, onCancel = () => {}, onSave = (user) => {} }) {

    const [show, setShow] = useState(open);
    const [user, setUser] = useState(new User({name: ""}));

    useEffect(() => setShow(open), [open]);

    const onSetName = (e) => {
        setUser(new User({...user, name: e.target.value}));
    };

    const handleClose = (save) => {
        if(Boolean(save)){
            onSave(user)
        }else{
            onCancel(false);
        }
        // setShow(false);
        setUser(new User({name: ""}));
    };
    
    return (
        <Dialog
            open={show}
            onClose={handleClose}
            aria-labelledby="add-user-dialog-title"
        >
            <DialogTitle id="add-user-dialog-title">Add User</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Please enter data for new user
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="User name"
                    type="text"
                    fullWidth
                    value={user?.name}
                    onChange={onSetName}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={() => handleClose(true)} color="primary">
                    Add User
                </Button>
            </DialogActions>
        </Dialog>
    );
}
