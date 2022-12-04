import React, {ChangeEvent, useState} from "react";


type EditableSpanPropsType = {
    title:string
    onChange:(newValue:string)=> void
}

function EditableSpan(props:EditableSpanPropsType) {

    let [editMod, setEdidMode] = useState(false)
    let [title, setTitle] = useState("")

    const activeEditMode = () => {
        setEdidMode(true)
        setTitle(props.title)
    }

    const activeteViewMode = () => {
        setEdidMode(false)
        props.onChange(title)
    }

    const onChangeTitleHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }


    return editMod
    ? <input value={title}
             onChange={onChangeTitleHandler}
             onBlur={activeteViewMode}
             autoFocus
        />
      : <span onDoubleClick={activeEditMode}>{props.title}</span>
}


export default EditableSpan