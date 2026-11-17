import {useEffect, useState} from "react";
import {department, SelectOptions, states} from "../../data/data.ts";
import Input from "./Input.tsx";
import CustomSelect from "./CustomSelect.tsx";
import DateTime, {Value} from "./DateTime.tsx";
import {useDispatch} from "react-redux";
import {createEmployee} from "../../utils/slice/employeeSlice.ts";
import {Modal, useToggle} from "modal-cyril-bartz";
import {getEmployeeList} from "../../api/employee.ts";
import {useFormErrors} from "../../hooks/useFormErrors.ts";
import {Error} from "./Error.tsx";
import {Employee} from "../../interface/interface.ts";

export function Form() {
    
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [street, setStreet] = useState("")
    const [city, setCity] = useState("")
    const [zipCode, setZipCode] = useState("")
    const [dateOfBirth, setDateOfBirth] = useState<Value>(new Date());
    const [startDate, setStartDate] = useState<Value>(new Date());
    const [selectedOptionState, setSelectedOptionState] = useState<SelectOptions | null>(states[0]);
    const [selectedOptionDepartment, setSelectedOptionDepartment] = useState<SelectOptions | null>(department[0]);
    const {show, toggle} = useToggle(false)

    const dispatch = useDispatch()

    const {errors, verifyDate, dataEmpty} = useFormErrors()

    // Errors are computed from mount (submit needs them) but only shown once the field is edited or the form submitted
    const [touched, setTouched] = useState<Partial<Record<keyof Employee, boolean>>>({})
    const [submitted, setSubmitted] = useState(false)
    const touch = <T,>(key: keyof Employee, set: (value: T) => void) => (value: T) => {
        set(value)
        setTouched(prev => ({...prev, [key]: true}))
    }
    const showError = (key: keyof Employee) => (submitted || touched[key]) && errors[key] !== ""

    useEffect(() => {
        const fakeEmployees = getEmployeeList()
        for (let i=0; i < fakeEmployees.length; i++) {
            dispatch(createEmployee({
                firstName: fakeEmployees[i].firstName,
                lastName: fakeEmployees[i].lastName,
                street: fakeEmployees[i].street,
                city: fakeEmployees[i].city,
                zipCode: fakeEmployees[i].zipCode,
                dateOfBirth: fakeEmployees[i].dateOfBirth,
                startDate: fakeEmployees[i].startDate,
                selectedOptionState: fakeEmployees[i].selectedOptionState,
                selectedOptionDepartment: fakeEmployees[i].selectedOptionDepartment
            }))
        }
    }, []);

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault()
        setSubmitted(true)

        let hasErrors = false

        for (const key in errors) {
            if (errors[key as keyof typeof errors]) {
                hasErrors = true
                break
            }
        }

        if (!hasErrors) {
            dispatch(createEmployee({
                firstName,
                lastName,
                street,
                city,
                zipCode,
                dateOfBirth: dateOfBirth?.toLocaleDateString(),
                startDate: startDate?.toLocaleDateString(),
                selectedOptionState: selectedOptionState?.abbreviation,
                selectedOptionDepartment: selectedOptionDepartment?.value
            }))
            toggle()
        }

    }

    return (
        <>
            <form onSubmit={handleSubmit} action="#">
                <Input type="text" name="First Name" onChange={touch("firstName", setFirstName)} value={firstName} keyEmployee="firstName" funcErrors={[dataEmpty]}/>
                {showError("firstName") && <Error message={errors.firstName}/>}
                <Input type="text" name="Last Name" onChange={touch("lastName", setLastName)} value={lastName} funcErrors={[dataEmpty]} keyEmployee="lastName"/>
                {showError("lastName") && <Error message={errors.lastName}/>}
                <DateTime onChange={touch("dateOfBirth", setDateOfBirth)} value={dateOfBirth} name="Date of Birth" funcErrors={[dataEmpty, verifyDate]} keyEmployee="dateOfBirth"/>
                {showError("dateOfBirth") && <Error message={errors.dateOfBirth}/>}
                <DateTime onChange={touch("startDate", setStartDate)} value={startDate} name="Start Date" funcErrors={[dataEmpty, verifyDate]} keyEmployee="startDate"/>
                {showError("startDate") && <Error message={errors.startDate}/>}
                <fieldset className="border p-2">
                    <legend className="float-none w-auto p-2">Address</legend>
                    <Input type="text" name="Street" onChange={touch("street", setStreet)} value={street} keyEmployee="street" funcErrors={[dataEmpty]}/>
                    {showError("street") && <Error message={errors.street}/>}
                    <Input type="text" name="City" onChange={touch("city", setCity)} value={city} keyEmployee="city" funcErrors={[dataEmpty]}/>
                    {showError("city") && <Error message={errors.city}/>}
                    <Input type="number" name="Zip Code" onChange={touch("zipCode", setZipCode)} value={zipCode} keyEmployee="zipCode" funcErrors={[dataEmpty]}/>
                    {showError("zipCode") && <Error message={errors.zipCode}/>}
                    <CustomSelect name="State" onChange={setSelectedOptionState} value={selectedOptionState} options={states}/>
                </fieldset>
                <CustomSelect name="Department" onChange={setSelectedOptionDepartment} value={selectedOptionDepartment} options={department}/>
                <button type="submit" className="btn btn-primary btn" style={{marginTop: "1rem"}}>Save</button>
            </form>
            <Modal open={show} onClose={toggle}>
                <div>Employee Created!</div>
            </Modal>
        </>
    )
}