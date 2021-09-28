import React, {useState} from "react";

export type EditableSpanPropsType = {
    title: string
    onChange: (newValue: string) => void
}

export function EditableSpan(props: EditableSpanPropsType) {
    let [editMode, setEditMode] = useState(false)
    let [title, setTitle] = useState("")

    const activateEditMode = () => {
        setEditMode(true)
    }
    const activateViemMode = () => {
        setEditMode(false)
        props.onChange(title)
    }


    const onChangeTitleHandler = (e: any) => setTitle(e.currentTarget.value)

    return editMode
        ? <input value={title} onChange={onChangeTitleHandler} onBlur={activateViemMode} autoFocus/>
        : <span onDoubleClick={activateEditMode}>{props.title}</span>
}