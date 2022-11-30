const Intern = require("../lib/intern");
const intern = new Intern("Albert", "3", "test@email.com", "UCF")

test("getName function returns name", () => {
    expect(intern.getName()).toBe("Albert");
})

test("getId function returns id", () => {
    expect(intern.getId()).toBe("3");
})

test("getEmail function returns email", () => {
    expect(intern.getEmail()).toBe("test@email.com");
})

test("getRole function returns role", () => {
    expect(intern.getRole()).toBe("Intern");
}
)
test("getGithub function returns github", () => {
    expect(intern.getSchool()).toBe("UCF");
})



