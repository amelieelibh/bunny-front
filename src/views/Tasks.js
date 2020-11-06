import React, { useEffect, useReducer, useState } from "react";
import {
    Container,
    Grid,
    Snackbar,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

import AddUser from "../component/AddUser";
import BunnyToolbar from "../component/BunnyToolbar";
import ViewTitle from "../component/ViewTitle";
import BunnyCard from "../component/BunnyCard";
import UserTask from "../model/UserTask";
import TasksApi from "../api/TasksApi";
import AddTask from "../component/AddTask";

function tasksReducer(state, action) {
    switch (action.type) {
        case "add":
            if(Array.isArray(action.data)){
                return [...state, ...action.data];
            }
            return [...state, action.data];
        case "remove":
            return [...state.filter((task) => task.id !== action.data?.id)];
        case "clear":
            return [];
        default:
            throw new Error(`unknown action type: ${action.type}`);
    }
}

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const taskImg = "https://www.computerhope.com/jargon/t/task.jpg";

export default function Tasks({userId}) {

    const [showAddTask, setShowAddTask] = useState(false);
    const [updating, setUpdating] = useState();
    
    const [showMessage, setShowMessage] = useState(false);
    const [message, setMessage] = useState();
    const [msgSeverity, setMsgSeverity] = useState("success");
    const [tasks, dispatchTasks] = useReducer(tasksReducer, []);

    useEffect(() => {
        refresh()
        return function cleanup(){
            dispatchTasks({type: "clear"});
        }
    }, []);
    
    const refresh = async () => {
        dispatchTasks({type: "clear"});
        getTasks();
    };

    const getTasks = async () => {
        console.log("getTasks", userId);
        const tasks = userId ?
            await TasksApi.getInstance().findTasksByUserId(userId) :
            await TasksApi.getInstance().getAllTasks();
        console.log("tasks", tasks);
        if(!tasks || tasks.err || tasks.error){
            setMsgSeverity("error");
            setMessage(tasks.message || tasks.error || "Wasn't possible to fetch data");
            setShowMessage(true);
        }
        dispatchTasks({type: "add", data: tasks});
    };

    const saveTask = async (newTask) => {
        setShowAddTask(false);
        if(!newTask || !newTask.userId){
            return;
        }
        console.log("updating", updating);
        console.log("newTask", newTask);
        const task = updating ?
            await TasksApi.getInstance().updateTask(newTask) :
            await TasksApi.getInstance().createTask(newTask);
        console.log("create task", task);
        
        if(!task || task.err || task.error){
            setMsgSeverity("error");
            setMessage(task.message || task.error || "Error while adding task");
            setShowMessage(true);
            return;
        }
        setMsgSeverity("success");
        setMessage(`Task ${task.desc} added!`);
        setShowMessage(true);

        refresh();
        // dispatchTasks({type: "add", data: task});
    };

    const deleteTask = async (taskId) => {
        if(!taskId){
            return;
        }
        const task = await TasksApi.getInstance().deleteTask(taskId);
        console.log("delete task", task);
        if(!task || task.err || task.error){
            setMsgSeverity("error");
            setMessage(task.message || task.error || "Error while deleting task");
            setShowMessage(true);
            return;
        }
        setMsgSeverity("warning");
        setMessage(`Task ${task.id} ${task.desc} deleted!`);
        setShowMessage(true);
        dispatchTasks({type: "remove", data: new UserTask({id: taskId})});
    };

    const closeMessage = () => {
        setShowMessage(false);
    };

    const showNewTask = () => {
        setUpdating();
        setShowAddTask(true);
    };

    const showUpdate = (item) => {
        setUpdating(new UserTask({
            id: item.id,
            userId: item.userId, 
            desc: item.desc, 
            status: item.status
        }));
        setShowAddTask(true);
    };
    
    

    return (
        <Container maxWidth="md" style={{ marginTop: 20 }}>
            <ViewTitle title="Tasks to do" />
            <BunnyToolbar onAdd={showNewTask} onUpdate={refresh}
                hiddeAdd={!userId} itemType="Task" />
            
            {tasks && tasks.length > 0 ? (
                <Grid item xs={12}>
                    <Grid container justify="center" spacing={8}>
                    {tasks.map((item, index) => (
                        <BunnyCard key={`card-task-${index}`} kkey={`card-task-${index}`}
                            user={item} title={"Tarea de: " + item.userId}
                            onDelete={deleteTask}
                            onUpdate={() => showUpdate(item)}
                            image={taskImg}
                            id={item.id} item={item}
                            title={"Bunny Task"} main={`User: ${item.userId} : ${item.id}`} 
                            detail={`Task: ${item.desc}`}
                            status={item.status}
                        />
                    ))}
                    </Grid>
                </Grid>
            ) : (
                <label>
                    There are no tasks at the moment, please add some tasks to
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
            <AddTask open={showAddTask} userId={userId} updating={updating}
                onCancel={() => setShowAddTask(false)} onSave={saveTask} />
        </Container>
    );
}
