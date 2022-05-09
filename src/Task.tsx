import React, {ChangeEvent, useCallback} from "react";
import {useDispatch} from "react-redux";
import {changeStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskType} from "./Todolist";

type TaskPropsType = {
    todolistId: string,
    task: TaskType
}


export const Task = React.memo ((props: TaskPropsType) => {

    const dispatch = useDispatch()

    const onClickHandler = () => dispatch(removeTaskAC(props.task.id, props.todolistId))
    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked
        dispatch(changeStatusAC(props.task.id, newIsDoneValue, props.todolistId))
    }
    const onChangeTitleHandler = useCallback ((newValue: string) => {
        dispatch(changeTaskTitleAC(props.task.id, newValue, props.todolistId))
    }, [props.task.id, props.todolistId])

    return <div key={props.task.id} className={props.task.isDone ? "is-done" : ""}>
        <Checkbox
            checked={props.task.isDone}
            onChange={onChangeStatusHandler}

        />
        <EditableSpan title={props.task.title} onChange={onChangeTitleHandler}/>
        <IconButton onClick={onClickHandler}>
            <Delete />
        </IconButton>
    </div>

})