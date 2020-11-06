import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Icon from '@material-ui/core/Icon';
import AddIcon from '@material-ui/icons/Add';
import RefreshIcon from '@material-ui/icons/Refresh';
import { Container, makeStyles } from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
    },
    toolbar: {
        marginTop: 10,
        marginBottom: 20,
    }
}));

export default function BunnyToolbar({
    onAdd = () => {},
    onUpdate = () => {},
    hiddeAdd: hideAdd,
    itemType
}) {

    const classes = useStyles();
    
    return (
        <Container className={classes.toolbar} maxWidth="sm">
            {/* This Button uses a Font Icon, see the installation instructions in the Icon component docs. */}
            {!hideAdd &&
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    endIcon={<AddIcon />}
                    onClick={onAdd}
                >
                    Add&nbsp;{itemType}
                </Button>
            }
            <Button
                variant="contained"
                color="default"
                className={classes.button}
                startIcon={<RefreshIcon />}
                onClick={onUpdate}
            >
                Refresh
            </Button>
        </Container>
    );
}
