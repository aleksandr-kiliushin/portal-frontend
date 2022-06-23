import { faker } from "@faker-js/faker"

describe("Profile", () => {
  it("edits about-me section and displays saved changes in profile", () => {
    cy.visit("http://localhost:3666/login")
    cy.get("input[name='username']").type("a.kilyushin")
    cy.get("input[name='password']").type("123")
    cy.get("button[type='submit']").click()

    const newActivityFieldValue = faker.lorem.sentence(5)

    cy.get("a[aria-label='settings']").click()
    cy.get("input[name='activity_field']").clear().type(newActivityFieldValue)
    cy.get("button[type='submit']").click()
    cy.wait(1500)
    cy.location("pathname").should("equal", "/profile")
    cy.location("search").should("equal", "?tab=information")
    cy.get("label").contains("Направление деятельности").next().contains(newActivityFieldValue).should("exist")
  })
})
