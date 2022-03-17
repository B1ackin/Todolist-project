import React, {useState} from "react";
import {TextField} from "@material-ui/core";

export type EditableSpanPropsType = {
    title: string
    onChange: (newValue: string) => void

}

export const EditableSpan = React.memo( (props: EditableSpanPropsType) => {
    let [editMode, setEditMode] = useState(false)
    let [title, setTitle] = useState(props.title)

    const activateEditMode = () => {
        setEditMode(true)
        setTitle(props.title)
    }
    const activateViemMode = () => {
        setEditMode(false)
        props.onChange(title)
    }


    const onChangeTitleHandler = (e: any) => setTitle(e.currentTarget.value)

    return editMode
        ? <TextField value={title} onChange={onChangeTitleHandler} onBlur={activateViemMode} autoFocus/>
        : <span onDoubleClick={activateEditMode}>{props.title}</span>
})