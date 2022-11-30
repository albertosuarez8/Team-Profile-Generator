const Engineer = require("../lib/engineer");
const engineer = new Engineer("Albert", "3", "test@email.com", "albertosuarez8")

test("getName function returns name", () => {
    expect(engineer.getName()).toBe("Albert");
})

test("getId function returns id", () => {
    expect(engineer.getId()).toBe("3");
})

test("getEmail function returns email", () => {
    expect(engineer.getEmail()).toBe("test@email.com");
})

test("getRole function returns role", () => {
    expect(engineer.getRole()).toBe("Engineer");
}
)
test("getGithub function returns github", () => {
    expect(engineer.getGithub()).toBe("albertosuarez8");
})



