import {faker} from "@faker-js/faker";

export function getEmployeeList() {
    return new Array(25).fill(1).map(() => ({
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        street: faker.location.street(),
        city: faker.location.city(),
        zipCode: faker.location.zipCode(),
        dateOfBirth: faker.date.birthdate().toLocaleDateString(),
        startDate: faker.date.birthdate().toLocaleDateString(),
        selectedOptionState: faker.location.state(),
        selectedOptionDepartment: faker.commerce.department()
    }))
}