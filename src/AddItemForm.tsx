import React, {ChangeEvent, useState} from "react";
import {Button, IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

export type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormPropsType) {

    let [newTaskTitle, setNewTaskTitle] = useState("");
    let [error, setError] = useState<string | null>(null);

    function onChangeHadler(e: ChangeEvent<HTMLInputElement>) {
        setNewTaskTitle(e.currentTarget.value)
    }

    function addTask() {
        if (newTaskTitle.trim() !== "") {
            props.addItem(newTaskTitle);
            setNewTaskTitle("");
        } else {
            setError("Field is required")
        }
    }

    const onKeyPressHandler = (e: any) => {
        setError(null)
        if (e.charCode === 13) {
            addTask()
        }
    }

    return <div>
        <TextField value={newTaskTitle}
                   variant={"outlined"}
                   label={"Field value"}
               onChange={onChangeHadler}
               error={!!error}
                   helperText={error}
               onKeyPress={onKeyPressHandler}
        />
        <IconButton onClick={addTask} color={"primary"}>
            <AddBox />
        </IconButton>

    </div>
}