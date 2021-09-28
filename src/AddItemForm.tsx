import React, {ChangeEvent, useState} from "react";

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
        <input value={newTaskTitle}
               onChange={onChangeHadler}
               className={error ? "error" : ""}
               onKeyPress={onKeyPressHandler}
        />
        <button onClick={addTask}>+</button>
        {error && <div className={"error-message"}>{error}</div>}
    </div>
}