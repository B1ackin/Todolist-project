import React, {useCallback} from 'react';
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
} from "./state/todolists-reducer";
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
    console.log('App call')
    const dispatch = useDispatch()

    const todolists = useSelector<AppRootStateType, Array<TodolistTypes>>(state => state.todolist)


    const removeTodolist = useCallback( (id: string) => {
        dispatch(RemoveTodolistAC(id))

    }, [])

    const changeTodolistTitle = useCallback( (id: string, title: string) => {
        dispatch(ChangeTodolistTitleAC(id, title))
    }, [])

    const addTodolist = useCallback((title: string) => {
        const newTodolistId = v1()
        dispatch(AddTodolistAC(title, newTodolistId))
    }, [])

    const changeFilter = useCallback((value: FilterValueType, todolistId: string) => {
        let action = ChangeTodolistFilterAC(value, todolistId)
        dispatch(action)
    }, [])

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

              return <Grid item>
                  <Paper style={ {padding: "15px"} }>
                  <Todolist
                          key={tl.id}
                          id={tl.id}
                          title={tl.title}
                          changeFilter={changeFilter}
                          filter={tl.filter}
                          removeTodolist={removeTodolist}
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
