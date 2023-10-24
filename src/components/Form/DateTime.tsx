import DateTimePicker from "react-datetime-picker";
import {memo, useEffect, useId} from "react";
import {Employee} from "../../interface/interface.ts";

export type Value = Date | null

type DateTimeProps = {
    onChange: (value: Value) => void
    value: Value
    name: string
    funcErrors: ((type: keyof Employee, value: Date | null) => void)[]
    keyEmployee: keyof Employee
}

function DateTime({onChange, value, name, funcErrors, keyEmployee}: DateTimeProps) {

    const id = useId()

    useEffect(() => {
        funcErrors.forEach(func => func(keyEmployee, value));
    }, [value]);

    return (
        <div className="d-flex flex-column col-md-6">
            <label htmlFor={id}>{name}</label>
            <DateTimePicker onChange={onChange} value={value} id={id} format={"d/M/y"}/>
        </div>
    )
}

export default memo(DateTime)