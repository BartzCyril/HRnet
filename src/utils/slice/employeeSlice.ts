import {configureStore, createSlice} from "@reduxjs/toolkit";

interface Employee {
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
        user: employeeSlice.reducer
    }
})