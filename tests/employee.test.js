const Employee = require("../lib/employee");
const employee = new Employee("Albert", "3", "test@email.com")

test("get name function returns name", () => {
    expect(employee.getName()).toBe("Albert");
})

test("get id function returns id", () => {
    expect(employee.getId()).toBe("3");
})

test("get email function returns email", () => {
    expect(employee.getEmail()).toBe("test@email.com");
})

test("get role function returns role", () => {
    expect(employee.getRole()).toBe("Employee");
})

