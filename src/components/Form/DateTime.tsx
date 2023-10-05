import DateTimePicker from "react-datetime-picker";
import {memo, useId} from "react";

export type Value = Date | null

type DateTimeProps = {
    onChange: (value: Value) => void
    value: Value
    name: string
}

function DateTime({onChange, value, name}: DateTimeProps) {

    const id = useId()

    return (
        <div className="d-flex flex-column col-md-6">
            <label htmlFor={id}>{name}</label>
            <DateTimePicker onChange={onChange} value={value} id={id} format={"d/M/y"}/>
        </div>
    )
}

export default memo(DateTime)