import {DataTableEmployee} from "../components/DataTable/DataTableEmployee.tsx";
import {Header} from "../components/Header.tsx";

export function CurrentEmployees() {

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