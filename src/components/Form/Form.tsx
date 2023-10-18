import {useState} from "react";
import {department, SelectOptions, states} from "../../data/data.ts";
import Input from "./Input.tsx";
import CustomSelect from "./CustomSelect.tsx";
import DateTime, {Value} from "./DateTime.tsx";
import {useDispatch} from "react-redux";
import {createEmployee} from "../../utils/slice/employeeSlice.ts";
import {Modal, useToggle} from "modal-cyril-bartz";

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

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault()
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

    return (
        <form onSubmit={handleSubmit} action="#">
            <Input type="text" name="First Name" onChange={setFirstName} value={firstName}/>
            <Input type="text" name="Last Name" onChange={setLastName} value={lastName}/>
            <DateTime onChange={setDateOfBirth} value={dateOfBirth} name="Date of Birth"/>
            <DateTime onChange={setStartDate} value={startDate} name="Start Date"/>
            <fieldset className="border p-2">
                <legend className="float-none w-auto p-2">Address</legend>
                <Input type="text" name="Street" onChange={setStreet} value={street}/>
                <Input type="text" name="City" onChange={setCity} value={city}/>
                <Input type="number" name="Zip Code" onChange={setZipCode} value={zipCode}/>
                <CustomSelect name="State" onChange={setSelectedOptionState} value={selectedOptionState} options={states}/>
            </fieldset>
            <CustomSelect name="Department" onChange={setSelectedOptionDepartment} value={selectedOptionDepartment} options={department}/>
            <button type="submit" className="btn btn-primary btn" style={{marginTop: "1rem"}}>Save</button>
            <Modal open={show} onClose={toggle}>
                <div>Employee Created!</div>
            </Modal>
        </form>
    )
}