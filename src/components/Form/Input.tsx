import {memo, useEffect, useId} from "react";
import {Employee} from "../../interface/interface.ts";

type InputProps = {
    type: 'text' | 'number'
    name: string
    onChange: (value: string) => void
    value: string
    funcErrors?: ((type: keyof Employee, value: string) => void)[]
    keyEmployee?: keyof Employee
}

function Input({type, name, value, onChange, funcErrors, keyEmployee}: InputProps) {

    const id = useId()

    useEffect(() => {
        if (keyEmployee) {
            funcErrors?.forEach(func => func(keyEmployee, value))
        }
    }, [value, keyEmployee]);

    return (
        <div className="form-group col-md-6">
            <label htmlFor={id}>{name}</label>
            <input type={type} className="form-control" id={id} placeholder={`Write your ${name} ...`} value={value} onChange={(e) => onChange(e.target.value)}/>
        </div>
    )
}

export default memo(Input)