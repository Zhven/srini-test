function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const uuid = () => Cypress._.random(0, 1e6);
const id = uuid();
const testuser = `testuser${id}`;
const testpwd = `testpwd${id}`;

const testclient = `testclient${id}`;
const testclientpwd = `testclientpwd${id}`;
const testclientselect = getRandomInt(1, 3);

const testclient2 = `testclient2${id}`;
const testclientpwd2 = `testclientpwd2${id}`;

describe("My First Test", () => {
  it("Requirements", () => {
    cy.visit("/register");
    cy.get("input[name='firstName']").type(testuser);
    cy.get("input[name='lastName']").type(testuser);
    cy.get("input[name='email']").type(testuser + "@mail.com");
    cy.get("input[name='username']").type(testuser);
    cy.get("input[name='password']").type(testpwd);
    cy.get("select").select(getRandomInt(1, 3));
    cy.get("input[name='address']").type(testuser);
    cy.get(".btn").click();
    cy.url().should("include", "/login");

    cy.get("input[name='username']").type(testuser);
    cy.get("input[name='password']").type(testpwd);
    cy.get(".btn")
      .click()
      .should(() => {
        expect(localStorage.getItem("user")).to.contain("jwt");
      });
    cy.url().should("include", "/home");

    cy.get(".btn:contains('Add client')").click();
    cy.get("input[name='firstName']").type(testclient);
    cy.get("input[name='lastName']").type(testclient);
    cy.get("input[name='email']").type(testclient + "@mail.com");
    cy.get("input[name='username']").type(testclient);
    cy.get("input[name='password']").type(testclientpwd);
    cy.get("select[name='countryId']").select(testclientselect);
    cy.get("input[name='address']").type(testclient);
    cy.get(".btn-success").click();
    cy.get("tbody")
    .find("tr")
    .then((row) => {
      //row.length will give you the row count
      expect(row.length).to.equal(1);
    });

    cy.get(".btn-warning").click();
    cy.get("input[name='firstName']").clear().type(testclient2);
    cy.get("input[name='lastName']").clear().type(testclient2);
    cy.get("input[name='email']").clear().type(testclient2 + "@mail.com");
    cy.get("input[name='username']").should('be.disabled');
    cy.get("input[name='password']").clear().type(testclientpwd2);
    cy.get("select[name='countryId']").select(testclientselect+1);
    cy.get(".btn-success").click()
    cy.get("td[data-label='First Name'] > span").should('not.have.text', testclient);
    cy.get("td[data-label='Last Name'] > span").should('not.have.text', testclient);
    cy.get("td[data-label='Username'] > span").should('have.text', testclient);
    cy.get("td[data-label='Address'] > span").should('have.text', testclient);

    cy.get("a.nav-link:contains(' LogOut ')").click().should(() => {
      expect(localStorage.getItem("user")).equals(null);
    });;
  });
});
