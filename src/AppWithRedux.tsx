import React, {useReducer} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    AddTodolistAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    RemoveTodolistAC,
    todolistsReducer
} from "./state/todolists-reducer";
import {
    addTaskAC,
    changeStatusAC, changeTaskTitleAC,
    removeTaskAC,
    tasksReducer
} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

export type FilterValueType = "all" | "active" | "completed"

export type TodolistTypes = {
    id: string
    title: string
    filter: FilterValueType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {
    const dispatch = useDispatch()

    const todolists = useSelector<AppRootStateType, Array<TodolistTypes>>(state => state.todolist)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)

    function removeTask(id: string, todolistId: string) {
        dispatch(removeTaskAC(id, todolistId))
    }

    function changeStatus(id: string, isDone: boolean, todolistId: string) {
        dispatch(changeStatusAC(id, isDone, todolistId))
    }

    function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
        dispatch(changeTaskTitleAC(id, newTitle, todolistId))
    }

    function removeTodolist (id: string) {
        dispatch(RemoveTodolistAC(id))

    }

    function addTask (title: string, todolistId: string) {
        dispatch(addTaskAC(title, todolistId))
    }

    function changeTodolistTitle (id: string, title: string) {
        dispatch(ChangeTodolistTitleAC(id, title))
    }

    function addTodolist(title: string) {
        const newTodolistId = v1()
        dispatch(AddTodolistAC(title, newTodolistId))
    }

    function changeFilter(value: FilterValueType, todolistId: string) {
        let action = ChangeTodolistFilterAC(value, todolistId)
        dispatch(action)
    }

  return (
    <div className="App">
        <AppBar position="static">
            <Toolbar>
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                >
                    <Menu/>
                </IconButton>
                <Typography variant="h6">
                    News
                </Typography>
                <Button color="inherit">Login</Button>
            </Toolbar>
        </AppBar>
        <Container fixed>
            <Grid container style={ {padding: "15px"} }>
            <AddItemForm  addItem={addTodolist}/>
            </Grid>
            <Grid container spacing={3}>
        {
            todolists.map((tl) => {

                let taskForTodolist = tasks[tl.id]

                if (tl.filter === "completed") {
                    taskForTodolist = tasks[tl.id].filter(t => t.isDone === true)
                }
                if (tl.filter === "active") {
                    taskForTodolist = tasks[tl.id].filter(t => t.isDone === false)
                }

              return <Grid item>
                  <Paper style={ {padding: "15px"} }>
                  <Todolist
                          key={tl.id}
                          id={tl.id}
                          title={tl.title}
                          tasks={taskForTodolist}
                          removeTask={removeTask}
                          changeFilter={changeFilter}
                          addTask={addTask}
                          changeTaskStatus={changeStatus}
                          filter={tl.filter}
                          removeTodolist={removeTodolist}
                          changeTaskTitle={changeTaskTitle}
                          changeTodolistTitle={changeTodolistTitle}
                />
                  </Paper>
              </Grid>
            })
        }
            </Grid>
        </Container>
    </div>
  );
}


export default AppWithRedux;
