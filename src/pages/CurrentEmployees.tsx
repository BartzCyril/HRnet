import {DataTableEmployee} from "../components/DataTable/DataTableEmployee.tsx";
import {Header} from "../components/Header.tsx";
import {useDispatch} from "react-redux";
import {createEmployee} from "../utils/slice/employeeSlice.ts";
import {fakeEmployees} from "../data/fakeEmployee.ts";

export function CurrentEmployees() {
    
    const dispatch = useDispatch()

    for (let i= 0; i < 1000; i++) {
        dispatch(createEmployee({
            firstName: fakeEmployees[0].firstName,
            lastName: fakeEmployees[0].lastName,
            street: fakeEmployees[0].street,
            city: fakeEmployees[0].city,
            zipCode: fakeEmployees[0].zipCode,
            dateOfBirth : new Date(fakeEmployees[0].dateOfBirth).toLocaleDateString(),
            startDate: new Date(fakeEmployees[0].startDate).toLocaleDateString(),
            selectedOptionState: fakeEmployees[0].selectedOptionState,
            selectedOptionDepartment: fakeEmployees[0].selectedOptionDepartment
        }))
    }

    return (
        <>
            <Header/>
            <section className="container mx-auto">
                <h1 className="text-center">Current Employees</h1>
                <DataTableEmployee/>
            </section>
        </>
    )
}