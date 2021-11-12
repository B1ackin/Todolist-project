import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";

export type FilterValueType = "all" | "active" | "completed"

export type TodolistTypes = {
    id: string
    title: string
    filter: FilterValueType
}

function App() {


    function removeTask(id: string, todolistId: string) {
        let tasks = tasksObj[todolistId]
        let filteredTask = tasks.filter(t => t.id !== id)
        tasksObj[todolistId] = filteredTask
        setTasks({...tasksObj})
    }

    function changeFilter(value: FilterValueType, todolistId: string) {
        let todolist = todolists.find(tl => tl.id === todolistId)
        if(todolist) {
            todolist.filter = value;
            setTodolist([...todolists])
        }
    }

    function changeStatus(id: string, isDone: boolean, todolistId: string) {
        let tasks = tasksObj[todolistId];
        let task = tasks.find(t => t.id === id)
        if (task) {
            task.isDone = isDone
            setTasks({...tasksObj})
        }
    }

    function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
        let tasks = tasksObj[todolistId];
        let task = tasks.find(t => t.id === id)
        if (task) {
            task.title = newTitle
            setTasks({...tasksObj})
        }
    }

    function addTask (title: string, todolistId: string) {
       let task =  {id: v1(), title: title, isDone: false}
       let tasks = tasksObj[todolistId];
        let newTasks = [task, ...tasks];
        tasksObj[todolistId] = newTasks
        setTasks({...tasksObj})
    }

    function removeTodolist (id: string) {
        let filteredTodolist = todolists.filter(tl => tl.id != id)
        setTodolist(filteredTodolist)
        delete tasksObj[id]
    }

    function changeTodolistTitle (id: string, title: string) {
        let todolist = todolists.find(tl => tl.id === id)
        if(todolist) {
            todolist.title = title
            setTodolist([...todolists])
        }
    }

    let todolistId1 = v1();
    let todolistId2 = v1();


    let [todolists, setTodolist] = useState<Array<TodolistTypes>>([
        {id: todolistId1, title: "What to learn" , filter: "active"},
        {id: todolistId2, title: "What to buy" , filter: "completed"}
    ])



    let [tasksObj, setTasks] = useState({
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

    function addTodolist(title: string) {
        let todolist:TodolistTypes = {
            id: v1(),
            filter: "all",
            title: title
        }

        setTodolist([todolist, ...todolists])
        setTasks({
            ...tasksObj,
            [todolist.id]: []
        })
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


export default App;
