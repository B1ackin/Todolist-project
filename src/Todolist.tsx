import React, {useCallback} from "react";
import {FilterValueType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {addTaskAC} from "./state/tasks-reducer";
import {Task} from "./Task";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    changeFilter: (value: FilterValueType, todolistId: string) => void
    filter: FilterValueType
    id: string
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (id:string, newTitle: string) => void
}


export const Todolist = React.memo( (props: PropsType) => {
    console.log('Todolist call')
    const tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[props.id])
    const dispatch = useDispatch()


    const onAllClickHandler = useCallback( () => props.changeFilter("all", props.id), [props.changeFilter, props.id])
    const onActiveClickHandler = useCallback( () => props.changeFilter("active", props.id), [props.changeFilter, props.id])
    const onComplitedClickHandler = useCallback( () => props.changeFilter("completed", props.id), [props.changeFilter, props.id])
    const removeTodolist = useCallback( () => { props.removeTodolist(props.id) }, [props.removeTodolist, props.id])

    const addTask = useCallback( (title:string) => {
        dispatch(addTaskAC(title, props.id))
    }, [props.id])

    const changeTodolistTitle = (newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle)
    }

    let allTodolistsTasks = tasks
    let taskForTodolist = allTodolistsTasks

    if (props.filter === "completed") {
        taskForTodolist = allTodolistsTasks.filter(t => t.isDone === true)
    }
    if (props.filter === "active") {
        taskForTodolist = allTodolistsTasks.filter(t => t.isDone === false)
    }

    return (
        <div>
            <h3><EditableSpan title={props.title} onChange={changeTodolistTitle}/>
            <IconButton onClick={removeTodolist}>
                <Delete />
            </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>

            <div>
                {
                    taskForTodolist.map (t => <Task
                        todolistId={props.id}
                        task={t}
                        key={t.id}
                    />)
                }
            </div>
            <div>
                <Button variant={props.filter === "all" ? "contained" : "text"} onClick={onAllClickHandler}>All</Button>
                <Button color={"primary"} variant={props.filter === "active" ? "contained" : "text"} onClick={onActiveClickHandler}>Active</Button>
                <Button color={"secondary"} variant={props.filter === "completed" ? "contained" : "text"} onClick={onComplitedClickHandler}>Completed</Button>
            </div>
        </div>
    )
})



