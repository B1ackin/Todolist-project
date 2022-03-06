import React, {ChangeEvent} from "react";
import {FilterValueType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {addTaskAC, changeStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {TasksStateType} from "./AppWithRedux";

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


export function Todolist(props: PropsType) {
    const tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[props.id])
    const dispatch = useDispatch()


    function changeStatus(id: string, isDone: boolean, todolistId: string) {
        dispatch(changeStatusAC(id, isDone, todolistId))
    }






    const onAllClickHandler = () => props.changeFilter("all", props.id)
    const onActiveClickHandler = () => props.changeFilter("active", props.id)
    const onComplitedClickHandler = () => props.changeFilter("completed", props.id)
    const removeTodolist = () => { props.removeTodolist(props.id) }



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
            <AddItemForm addItem={(title) => {
                dispatch(addTaskAC(title, props.id))
            }}/>

            <div>
                {
                    taskForTodolist.map (t => {
                   const onClickHandler = () => dispatch(removeTaskAC(t.id, props.id))
                        const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            let newIsDoneValue = e.currentTarget.checked
                            dispatch(changeStatusAC(t.id, newIsDoneValue, props.id))
                        }
                        const onChangeTitleHandler = (newValue: string) => {
                            dispatch(changeTaskTitleAC(t.id, newValue, props.id))

                        }
                        return <div key={t.id} className={t.isDone ? "is-done" : ""}>
                            <Checkbox
                                checked={t.isDone}
                                onChange={onChangeStatusHandler}

                        />
                        <EditableSpan title={t.title} onChange={onChangeTitleHandler}/>
                        <IconButton onClick={onClickHandler}>
                            <Delete />
                        </IconButton>
                        </div>

                    })
                }
            </div>
            <div>
                <Button variant={props.filter === "all" ? "contained" : "text"} onClick={onAllClickHandler}>All</Button>
                <Button color={"primary"} variant={props.filter === "active" ? "contained" : "text"} onClick={onActiveClickHandler}>Active</Button>
                <Button color={"secondary"} variant={props.filter === "completed" ? "contained" : "text"} onClick={onComplitedClickHandler}>Completed</Button>
            </div>
        </div>
    )
}


