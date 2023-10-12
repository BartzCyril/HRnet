import {DataTableEmployee} from "../components/DataTable/DataTableEmployee.tsx";
import {Header} from "../components/Header.tsx";
import {fakeEmployees} from "../data/fakeEmployee.ts";
import {useDispatch} from "react-redux";
import {createEmployee} from "../utils/slice/employeeSlice.ts";

export function CurrentEmployees() {

    const dispatch = useDispatch()

    fakeEmployees.map((e) => dispatch(createEmployee({
            firstName: e.firstName,
            lastName: e.lastName,
            street: e.street,
            city: e.city,
            zipCode: e.zipCode,
            dateOfBirth : new Date(e.dateOfBirth).toLocaleDateString(),
            startDate: new Date(e.startDate).toLocaleDateString(),
            selectedOptionState: e.selectedOptionState,
            selectedOptionDepartment: e.selectedOptionDepartment
        }))
    )

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