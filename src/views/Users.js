import React, { useEffect, useReducer, useState } from "react";
import {
    Box,
    Container,
    Grid,
    Snackbar,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

import UsersApi from "../api/UsersApi";
import AddUser from "../component/AddUser";
import BunnyToolbar from "../component/BunnyToolbar";
import ViewTitle from "../component/ViewTitle";
import BunnyCard from "../component/BunnyCard";
import User from "../model/User";

function usersReducer(state, action) {
    switch (action.type) {
        case "add":
            if(Array.isArray(action.data)){
                return [...state, ...action.data];
            }
            return [...state, action.data];
        case "remove":
            return [...state.filter((user) => user.id !== action.data?.id)];
        case "clear":
            return [];
        default:
            throw new Error(`unknown action type: ${action.type}`);
    }
}

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const avatarImg = "https://icons.iconarchive.com/icons/papirus-team/papirus-status/256/avatar-default-icon.png";

export default function Users({}) {

    const [showAddUser, setShowAddUser] = useState(false);
    const [updating, setUpdating] = useState();
    
    const [showMessage, setShowMessage] = useState(false);
    const [message, setMessage] = useState();
    const [msgSeverity, setMsgSeverity] = useState("success");
    const [users, dispatchUsers] = useReducer(usersReducer, []);

    useEffect(() => {
        refresh()
        return function cleanup(){
            dispatchUsers({type: "clear"});
        }
    }, []);
    
    const refresh = async () => {
        dispatchUsers({type: "clear"});
        getUsers();
    };

    const getUsers = async () => {
        const users = await UsersApi.getInstance().getAllUsers();
        if(!users || users.err || users.error){
            setMsgSeverity("error");
            setMessage(users.message || users.error || "Wasn't possible to fetch data");
            setShowMessage(true);
        }
        dispatchUsers({type: "add", data: users});
    };

    const saveUser = async (newUser) => {
        setShowAddUser(false);
        if(!newUser || !newUser.name){
            return;
        }
        const user = updating ?
            await UsersApi.getInstance().updateUser(newUser) :
            await UsersApi.getInstance().createUser(newUser);
        console.log("create user", user);
        if(!user || user.err || user.error){
            setMsgSeverity("error");
            setMessage(user.message || user.error || "Error while adding user");
            setShowMessage(true);
            return;
        }
        setMsgSeverity("success");
        setMessage(`User ${user.name} added!`);
        setShowMessage(true);

        refresh();
        // dispatchUsers({type: "add", data: user});
    };

    const deleteUser = async (userId) => {
        if(!userId){
            return;
        }
        const user = await UsersApi.getInstance().deleteUser(userId);
        console.log("delete user", user);
        if(!user || user.err || user.error){
            setMsgSeverity("error");
            setMessage(user.message || user.error || "Error while deleting user");
            setShowMessage(true);
            return;
        }
        setMsgSeverity("warning");
        setMessage(`User ${user.id} ${user.name} deleted!`);
        setShowMessage(true);
        dispatchUsers({type: "remove", data: new User({id: userId})});
    };

    const closeMessage = () => {
        setShowMessage(false);
    };

    const showNewUser = () => {
        setUpdating();
        setShowAddUser(true);
    };

    const showUpdate = (item) => {
        setUpdating(new User({
            id: item.id,
            name: item.name, 
        }));
        setShowAddUser(true);
    };
    
    

    return (
        <Container maxWidth="md" style={{ marginTop: 20 }}>
            <ViewTitle title="Users" />
            <BunnyToolbar onAdd={showNewUser} onUpdate={refresh}
                itemType="User" />
            
            {users && users.length > 0 ? (
                <Grid item xs={12}>
                    <Grid container justify="center" spacing={8}>
                    {users.map((item, index) => (
                        <BunnyCard user={item} key={`card-user-${index}`} kkey={`card-user-${index}`} 
                            onDelete={deleteUser} onClick={() => window.location.href = `/tasks/${item.id}`}
                            onUpdate={() => showUpdate(item)}
                            image={avatarImg}
                            id={item.id} item={item}
                            title="Bunny User" main={`UserId: ${item.id}`} 
                            detail={`Name: ${item.name}`}
                        />
                    ))}
                    </Grid>
                </Grid>
            ) : (
                <label>
                    There are no users at the moment, please add some users to
                    see this content
                </label>
            )}
            <Snackbar
                open={showMessage}
                autoHideDuration={6000}
                onClose={closeMessage}
            >
                <Alert onClose={closeMessage} severity={msgSeverity}>
                    {message}
                </Alert>
            </Snackbar>
            <AddUser open={showAddUser} updating={updating}
                onCancel={() => setShowAddUser(false)} onSave={saveUser} />
        </Container>
    );
}
