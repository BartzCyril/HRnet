import {memo, useId} from "react";
import {SelectOptions} from "../../data/data.ts";
import Select from 'react-select';

type Value = SelectOptions | null

type CustomSelectProps = {
    name: string
    onChange: (value: Value) => void
    value: Value
    options: SelectOptions[]
}

function CustomSelect({name, onChange, value, options}: CustomSelectProps) {
    const id = useId()

    return (
        <div className="d-flex flex-column col-md-6">
            <label htmlFor={id}>{name}</label>
            <Select defaultValue={value} onChange={onChange} options={options} required/>
        </div>
    )
}

export default memo(CustomSelect)