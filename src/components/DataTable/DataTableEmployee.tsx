import {useState} from "react";
import Input from "../Form/Input.tsx";
import DataTable, {TableColumn} from "react-data-table-component";
import {useSelector} from "react-redux";
import {Employee, EmployeeSelector} from "../../utils/slice/employeeSlice.ts";

const columns: TableColumn<Employee>[] = [
    {
        name: 'First Name',
        selector: row => row.firstName,
        sortable: true,
    },
    {
        name: 'Last Name',
        selector: row => row.lastName,
        sortable: true,
    },
    {
        name: 'Start Date',
        selector: row => row.startDate,
        sortable: true,
    },
    {
        name: 'Department',
        selector: row => row.selectedOptionDepartment,
        sortable: true,
    },
    {
        name: 'Date of Birth',
        selector: row => row.dateOfBirth,
        sortable: true,
    },
    {
        name: 'Street',
        selector: row => row.street,
        sortable: true,
    },
    {
        name: 'City',
        selector: row => row.city,
        sortable: true,
    },
    {
        name: 'State',
        selector: row => row.selectedOptionState,
        sortable: true,
    },
    {
        name: 'Zip Code',
        selector: row => row.zipCode,
        sortable: true,
    },
];

export function DataTableEmployee() {

    const employees = useSelector<EmployeeSelector>((e) => e.employees) as Employee[]
    const [search, setSearch] = useState("")

    const filteredEmployees = employees.filter((employee: Employee) => {
        return Object.values(employee).some(value=>
            value.toString().toLowerCase().includes(search.toLowerCase())
        )
    })

    return (
        <>
            {employees[0] && <Input type="text" name="Search" value={search} onChange={setSearch}/>}
            <DataTable columns={columns} data={filteredEmployees} pagination={true} persistTableHead={true}/>
        </>

    )

}