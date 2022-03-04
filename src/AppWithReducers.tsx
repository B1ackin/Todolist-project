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

export type FilterValueType = "all" | "active" | "completed"

export type TodolistTypes = {
    id: string
    title: string
    filter: FilterValueType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithReducers() {

    let todolistId1 = v1();
    let todolistId2 = v1();


    let [todolists, dispatchToTodolistReducer] = useReducer(todolistsReducer, [
        {id: todolistId1, title: "What to learn" , filter: "active"},
        {id: todolistId2, title: "What to buy" , filter: "completed"}
    ])

    let [tasksObj, dispatchToTasksReducer] = useReducer(tasksReducer, {
        [todolistId1]: [
            {id: v1(), title: "CSS", isDone: false},
            {id: v1(), title: "JS", isDone: false},
            {id: v1(), title: "React", isDone: false},
            {id: v1(), title: "HTML", isDone: true}
        ],
        [todolistId2]: [
            {id: v1(), title: "React", isDone: false},
            {id: v1(), title: "HTML", isDone: true}
        ]
    })


    function removeTask(id: string, todolistId: string) {
        dispatchToTasksReducer(removeTaskAC(id, todolistId))
    }

    function changeStatus(id: string, isDone: boolean, todolistId: string) {
        dispatchToTasksReducer(changeStatusAC(id, isDone, todolistId))
    }

    function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
        dispatchToTasksReducer(changeTaskTitleAC(id, newTitle, todolistId))
    }

    function removeTodolist (id: string) {
        dispatchToTasksReducer(RemoveTodolistAC(id))
        dispatchToTodolistReducer(RemoveTodolistAC(id))
    }

    function addTask (title: string, todolistId: string) {
        dispatchToTasksReducer(addTaskAC(title, todolistId))
        //debugger
        // [{ 'odododod'}, {}, {}]
        // {
        //  'odododod': [{},{},{}]
        // }
        // {id: '1', name: 'naeme'}: []
        // return
        // let task =  {id: v1(), title: title, isDone: false}
        // let tasks = tasksObj[todolistId];
        // console.log(tasksObj)
        // console.log([todolistId])
        // console.log(tasksObj[todolistId])
        //
        // let newTasks = [task, ...tasks];
        // tasksObj[todolistId] = newTasks
        // setTasks({...tasksObj})


    }

    function changeTodolistTitle (id: string, title: string) {
        dispatchToTodolistReducer(ChangeTodolistTitleAC(id, title))
    }

    function addTodolist(title: string) {
        const newTodolistId = v1()
        dispatchToTasksReducer(AddTodolistAC(title, newTodolistId))
        dispatchToTodolistReducer(AddTodolistAC(title, newTodolistId))
    }

    function changeFilter(value: FilterValueType, todolistId: string) {
        let action = ChangeTodolistFilterAC(value, todolistId)
        dispatchToTodolistReducer(action)
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

                let taskForTodolist = tasksObj[tl.id]

                if (tl.filter === "completed") {
                    taskForTodolist = tasksObj[tl.id].filter(t => t.isDone === true)
                }
                if (tl.filter === "active") {
                    taskForTodolist = tasksObj[tl.id].filter(t => t.isDone === false)
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


export default AppWithReducers;
