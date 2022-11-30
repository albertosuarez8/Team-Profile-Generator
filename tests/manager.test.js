const Manager = require("../lib/manager");
const manager = new Manager("Albert", "3", "test@email.com", "101101")

test("getName function returns name", () => {
    expect(manager.getName()).toBe("Albert");
})

test("getId function returns id", () => {
    expect(manager.getId()).toBe("3");
})

test("getEmail function returns email", () => {
    expect(manager.getEmail()).toBe("test@email.com");
})

test("getRole function returns role", () => {
    expect(manager.getRole()).toBe("Manager");
}
)
test("getOfficeNumber function returns office manager", () => {
    expect(manager.getOfficeNumber()).toBe("101101");
})



