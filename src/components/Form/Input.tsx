import {memo, useId} from "react";

type InputProps = {
    type: 'text' | 'number'
    name: string
    onChange: (value: string) => void
    value: string
}

function Input({type, name, value, onChange}: InputProps) {

    const id = useId()

    return (
        <div className="form-group col-md-6">
            <label htmlFor={id}>{name}</label>
            <input type={type} className="form-control" id={id} placeholder={`Write your ${name} ...`} required minLength={4} value={value} onChange={(e) => onChange(e.target.value)}/>
        </div>
    )
}

export default memo(Input)