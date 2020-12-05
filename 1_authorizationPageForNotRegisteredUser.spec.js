/// <reference types = "cypress"/>

describe(" Sign Up ", () => {

  it("Authorization page. Not registered user", () => {
    // Prevent failing test by Cypress errors
    Cypress.on("uncaught:exception", (err, runnable) => {
      return false;
    });
    // Open site home page
    cy.visit("https://www.sbzend.ssls.com/");
    // Put new user credentials, page titles and error into variables
    const newEmail = "ssls.automation+8@gmail.com";
    const validPassword = "123456";
    const homePageTitle =
      "Cheap SSL Certificates—Buy SSL Certs $3.77 & Save 52%";
    const authorizationPageTitle = "Sign In | SSLs.com";
    const uhOhErrorText = "Uh oh! Email or password is incorrect";
    // Check the page title changes after 'Log In' click and URL check for Authorization page
    cy.title().should("equal", homePageTitle);
    cy.contains("Log in").click();
    cy.title().should("equal", authorizationPageTitle);
    cy.url().should("contain", "authorize");
    // Filling Email and Password fields by credentials and check of Password fill
    cy.get('[name="email"]').focus().clear().type(newEmail);
    cy.get('[name="password"]').focus().clear().type(validPassword);
    cy.get('[class="icon icon-eye"]').click();
    cy.get('[class="input-box password"]').should("be.visible");
    cy.get('input[name="password"]')
      .invoke("prop", "value")
      .should("equal", validPassword);
    // Check Error after login try with new user credentials
    cy.get('[type="submit"]').click();
    cy.get(".noty_text").should("be.visible");
    cy.get('[class="noty_text"]')
      .invoke("text")
      .then((errorText) => {
        expect(errorText).to.equal(uhOhErrorText);
      });
  });
})