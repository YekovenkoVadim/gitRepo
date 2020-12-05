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
    const homePageTitle =
      "Cheap SSL Certificates—Buy SSL Certs $3.77 & Save 52%";
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
    cy.get('input[name="password"]')
      .invoke("prop", "value")
      .should("equal", validPassword);
    // Check "Log in" button is changed on "User@email" with dropdown menu
    cy.get('[type="submit"]').click();
    cy.get('[class="ssls-toolbar__btn-text"]').should(
      "contain",
      registeredEmail
    );
    cy.get('[class="ssls-icon ssls-icon-user-circle"]').click();
    cy.get(
      '[class="ssls-dropdown__holder ssls-dropdown__holder--toolbar"]'
    ).should("be.visible");
    // Open Profile page and check it`s visible
    cy.get('[href="/user/profile"]').should("contain", "Profile").click();
    cy.get('[class="profile-page ng-scope"]').should("be.visible");

    /*     cy.get('[class="icon icon-arrows-cw"]')
      .parents("form")
      .find('[class="text"]')
      .should("contain", "Name")
      .parents("form")
      .find('[class="text ng-binding"]')
      .should("contain", "Tom Ford"); */

    cy.get('[class="icon icon-arrows-cw"]')
      .parents("form")
      .find('[class="text"]')
      .eq(0)
      .then(($nK) => {
        const NameKey = $nK.text();
        cy.wrap($nK).should("contain", "Name");
      })
      .parents("form")
      .find('[class="text ng-binding"]')
      .eq(0)
      .then(($nV) => {
        const nameValue = $nV.text();
        cy.wrap($nV).should("contain", "Tom Ford");
      });

    cy.get('[class="icon icon-arrows-cw"]')
      .parents("form")
      .find('[class="text"]')
      .eq(1)
      .then(($eK) => {
        const EmailKey = $eK.text();
        cy.wrap($eK).should("contain", "Email");
      })
      .parents("form")
      .find('[class="text ng-binding"]')
      .eq(1)
      .then(($eV) => {
        const EmailValue = $eV.text();
        cy.wrap($eV).should("contain", "ssls.automation+666@gmail.com");
      });

    cy.get('[class="icon icon-arrows-cw"]')
      .parents("form")
      .find('[class="text"]')
      .eq(2)
      .then(($pK) => {
        const PasswordKey = $pK.text();
        cy.wrap($pK).should("contain", "Password");
      })
      .parents("form")
      .find('[class="text ng-binding"]')
      .eq(2)
      .then(($pV) => {
        const PasswordValue = $pV.text();
        cy.wrap($pV).should("contain", "*****");
      });

    cy.get('[class="icon icon-arrows-cw"]')
      .parents("form")
      .find('[class="text"]')
      .eq(3)
      .then(($phK) => {
        const PhoneKey = $phK.text();
        cy.wrap($phK).should("contain", "Phone");
      })
      .parents("form")
      .find('[class="text ng-binding"]')
      .eq(3)
      .then(($phV) => {
        const PhoneValue = $phV.text();
        cy.wrap($phV).should("contain", "+380 12312312");
      });

    cy.get('[class="icon icon-arrows-cw"]')
      .parents("form")
      .find('[class="text"]')
      .eq(4)
      .then(($aK) => {
        const AddressKey = $aK.text();
        cy.wrap($aK).should("contain", "Address");
      })
      .parents("form")
      .find('[class="text ng-binding"]')
      .eq(4)
      .then(($aV) => {
        const AddressValue = $aV.text();
        cy.wrap($aV).should(
          "contain",
          "Diagon alley 21, Misto, Uryupinsk 612120, Ukraine"
        );
      });

    cy.get('[class="icon icon-arrows-cw"]')
      .parents("form")
      .find('[class="text"]')
      .eq(5)
      .then(($sK) => {
        const SupportKey = $sK.text();
        cy.wrap($sK).should("contain", "Support pin");
      })
      .parents("form")
      .find('[class="text ng-binding"]')
      .eq(5)
      .then(($sV) => {
        const SupportValue = $sV.text();
        cy.wrap($sV).should("contain", "UC1v");
      });

    cy.get('[class="icon icon-arrows-cw"]')
      .parents("form")
      .find('[class="text"]')
      .eq(6)
      .then(($newK) => {
        const NewsletterKey = $newK.text();
        cy.wrap($newK).should("contain", "Newsletter");
      })
      .parents("form")
      .find('[class="text mail-list"]')
      .then(($newV) => {
        const PNewsletterValue = $newV.text();
        cy.wrap($newV.text()).should("contain", "Include in mailing list");

      }) 
  });
})