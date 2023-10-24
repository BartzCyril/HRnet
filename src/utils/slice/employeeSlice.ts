import {configureStore, createSlice} from "@reduxjs/toolkit";
import {Employee} from "../../interface/interface.ts";

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