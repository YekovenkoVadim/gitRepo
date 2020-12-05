/// <reference types = "cypress"/>

describe(" Sign Up ", () => {
  // Prevent failing test by Cypress errors and open Home page before each Test
  beforeEach(() => {
    Cypress.on("uncaught:exception", (err, runnable) => {
      return false;
    });
    cy.visit("https://www.sbzend.ssls.com/");
  });

  it("Authorization page (Welcome back!)", () => {
    // Put registered user credentials into variables
    const registeredEmail = "ssls.automation+666@gmail.com";
    const validPassword = "123456";
    const homePageTitle = "Cheap SSL Certificates—Buy SSL Certs $3.77 & Save 52%";
    const authorizationPageTitle = "Sign In | SSLs.com";
    // Check the page title changes after 'Log In' click and URL check for Authorization page
    cy.title().should("equal", homePageTitle);
    cy.contains("Log in").click();
    cy.title().should("equal", authorizationPageTitle);
    cy.get(".ssls-toolbar__btn-text").should("contain", "Log in");
    cy.url().should("contain", "authorize");
    // Filling Email and Password fields by credentials and check of Password fill
    cy.get('[name="email"]').focus().clear().type(registeredEmail);
    cy.get('[name="password"]').focus().clear().type(validPassword);
    cy.get('[class="icon icon-eye"]').click();
    cy.get('[class="input-box password"]').should("be.visible");
    cy.get('input[name="password"]').invoke("prop", "value").should("equal", validPassword);
    // Check "Log in" button is changed on "User@email" with dropdown menu
    cy.get('[type="submit"]').click();
    cy.get('[class="ssls-toolbar__btn-text"]').should("contain",registeredEmail);
    cy.get('[class="ssls-icon ssls-icon-user-circle"]').click();
    cy.get('[class="ssls-dropdown__holder ssls-dropdown__holder--toolbar"]').should("be.visible");
    // Check the menu items
    cy.get('[class="ssls-header-dropdown-nav ssls-header-user-nav"]')
      .find("li")
      .should("have.length", 5)
      .should("contain", "Orders history")
      .and("contain", "Profile")
      .and("contain", "ssls.automation+666@gmail.com")
      .and("contain", "Funds")
      .and("contain", "Log out");

    // Moving back to Home page - Log out
    cy.contains("Log out").click();
    cy.title().should("equal", authorizationPageTitle);
  });
});
