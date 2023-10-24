import {useState} from "react";
import {Employee} from "../interface/interface.ts";

export function useFormErrors() {
    const [errors, setErrors] = useState<Employee>({
        city: "",
        dateOfBirth: "",
        firstName: "",
        lastName: "",
        selectedOptionDepartment: "",
        selectedOptionState: "",
        startDate: "",
        street: "",
        zipCode: ""
    })

    const dataEmpty = (type: keyof Employee, value: string | Date | null) => {
        if (type === "firstName" || type === "lastName" || type === "street" || type === "city" || type === "zipCode") {
            if (typeof value === "string") {
                if (value.trim().length === 0) {
                    setErrors(prevError => ({...prevError, [type]: "Please fill in this field"}))
                } else {
                    setErrors(prevError => ({...prevError, [type]: ""}))
                }
            }
        }
        if (type === "startDate" || type === "dateOfBirth") {
            if (value === null) {
                setErrors(prevError => ({...prevError, [type]: "Please fill in this field"}))
            } else {
                setErrors(prevError => ({...prevError, [type]: ""}))
            }
        }
    }

    const verifyDate = (type: keyof Employee, value: Date | null) => {
        if (!value)
            return

        const today = new Date()

        if (type === "dateOfBirth" || type === "startDate") {
            if (!(value <= today))
            {
                setErrors(prevError => ({...prevError, [type]: "You cannot enter a date in the future."}))
            } else if (type === "dateOfBirth")
            {
                const birthDate = value
                let age = today.getFullYear() - birthDate.getFullYear()

                if (today.getMonth() < birthDate.getMonth() || (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())) {
                    age--
                }

                if (age < 18) {
                    setErrors(prevError => ({...prevError, dateOfBirth: "Employee cannot be a minor"}))
                } else {
                    setErrors(prevError => ({...prevError, dateOfBirth: ""}))
                }
            }
            else {
                setErrors(prevError => ({...prevError, [type]: ""}))
            }
        }

    }

    return {errors, dataEmpty, verifyDate}

}