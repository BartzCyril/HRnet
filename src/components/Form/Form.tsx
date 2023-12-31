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
                <Input type="text" name="First Name" onChange={setFirstName} value={firstName} keyEmployee="firstName" funcErrors={[dataEmpty]}/>
                {errors.firstName !== "" && <Error message={errors.firstName}/>}
                <Input type="text" name="Last Name" onChange={setLastName} value={lastName} funcErrors={[dataEmpty]} keyEmployee="lastName"/>
                {errors.lastName !== "" && <Error message={errors.lastName}/>}
                <DateTime onChange={setDateOfBirth} value={dateOfBirth} name="Date of Birth" funcErrors={[dataEmpty, verifyDate]} keyEmployee="dateOfBirth"/>
                {errors.dateOfBirth !== "" && <Error message={errors.dateOfBirth}/>}
                <DateTime onChange={setStartDate} value={startDate} name="Start Date" funcErrors={[dataEmpty, verifyDate]} keyEmployee="startDate"/>
                {errors.startDate !== "" && <Error message={errors.startDate}/>}
                <fieldset className="border p-2">
                    <legend className="float-none w-auto p-2">Address</legend>
                    <Input type="text" name="Street" onChange={setStreet} value={street} keyEmployee="street" funcErrors={[dataEmpty]}/>
                    {errors.street !== "" && <Error message={errors.street}/>}
                    <Input type="text" name="City" onChange={setCity} value={city} keyEmployee="city" funcErrors={[dataEmpty]}/>
                    {errors.city !== "" && <Error message={errors.city}/>}
                    <Input type="number" name="Zip Code" onChange={setZipCode} value={zipCode} keyEmployee="zipCode" funcErrors={[dataEmpty]}/>
                    {errors.zipCode !== "" && <Error message={errors.zipCode}/>}
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