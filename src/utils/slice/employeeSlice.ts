import {configureStore, createSlice} from "@reduxjs/toolkit";

export interface Employee {
    firstName: string,
    lastName: string,
    street: string,
    city: string,
    zipCode: string,
    dateOfBirth: string,
    startDate: string,
    selectedOptionState: string,
    selectedOptionDepartment: string
}

export interface EmployeeSelector {
    employees: Employee
}

type stateStore = Employee[]

const initialState: stateStore[] = []

const employeeSlice = createSlice({
    name: "employees",
    initialState,
    reducers: {
        createEmployee: (state, action) => {state.push(action.payload)},
    }
})

export const {createEmployee} = employeeSlice.actions

export const store = configureStore({
    reducer: {
        employees: employeeSlice.reducer
    }
})