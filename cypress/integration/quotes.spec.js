describe("Quotes App", () => {
  beforeEach(() => {
  //each test needs fresh state 
  //tests shouldnt rely on other tests
  //every test should work in isolation

  cy.visit(`http://localhost:1234`)
})

//helpers/getters)

const textInput = () => cy.get('input[name=text]');
const authorInput = () => cy.get('input[name=author]');
const foobarInput = () => cy.get('input[name=foobar]'); 

const submitBtn = () => cy.get('button[id=submitBtn]'); 
const cancelBtn = () => cy.get('button[id=cancelBtn]'); 

it('sanity check to make sure tests work', () => {
  // *it* is a test
  // expect is an assertion
  //There acn be multiple assertions per test but they all need 
  // to relate to the ''one thing'' that we're testing

  expect(1 + 2).to.equal(3);
  expect(2 + 2).not.equal(5)
  expect({}).not.to.equal({}) // true === different objects
  expect({}).to.eql({}) // == type   equal is === eql is ==

})
//first chec to see if the inputs exist
it('the proper elements are showing', () => {
  textInput().should('exist');
  authorInput().should('exist');
  foobarInput().should('not.exist');
  submitBtn().should('exist');
  cancelBtn().should('exist');

  cy.contains("Submit Quote").should('exist'); // ===
  cy.contains(/Submit Quote/).should('exist');// ==

})
// then check to make sure the inputs and buttons work
//describe holds sections of tests specific to what is described. this is a section of tests inside the overall section of tests
describe('Filling out the inputs and cancelling', () => {
          it('can navigate to teh site', () => {
              cy.url().should('include', "localhost")
          })

          it('submit button starts out disabled', () => {
              submitBtn().should('be.disabled')
          })
          it('can type in the inputs', () => {
              textInput()
              .should('have.value', "")
              .type("CSS rules")
              .should('have.value', "CSS rules");

              authorInput()
              .should('have.value', "")
              .type("CRHarding")
              .should('have.value', "CRHarding")
          })
          
          it('the submit button enables when both inputs are filled out', () => {
              authorInput().type('Casey')
              textInput().type('this is fun')
              submitBtn().should("not.be.disabled")
          })
          it('the cancel button can reset the inputs and disable the submit button', () => {
              authorInput().type('Casey')
              textInput().type('FUN')
              cancelBtn().click();
              textInput().should("have.value", "")
              submitBtn().should("be.disabled")
          })

   describe('Adding a new quote', () => {
      it('can submit and delete a new quote', () => {
        textInput().type('Have fun!')
        authorInput().type('Gabe')
        submitBtn().click()
        // It's important that state be the samne at the beginning of each test
        // which is why we delete the newly created post immediately.
        // If we are not careful with this, we'll get lots of false positives and negatives.
        // Restart the server script if necessary to go back to the original 3 quotes.
        // Explain that in real world, a fresh testing database with predetermined data would be spun up for each test run.
        cy.contains('Have fun!').siblings('button:nth-of-type(2)').click()
        cy.contains('Have fun!').should('not.exist')
      })
  
      it('variation of can submit a new quote', () => {
        cy.contains(/have fun/).should('not.exist')
        textInput().type('have fun')
        authorInput().type('Gabe')
        submitBtn().click()
        cy.contains(/have fun/).should('exist')
        cy.contains(/have fun/).next().next().click()
        cy.contains(/have fun/).should('not.exist')
      })
    })
  
    describe('Editing an existing quote', () => {
      it('can edit a quote', () => {
        // Baking a new quote and submitting it.
        textInput().type('Use Postman')
        authorInput().type('Gabriel')
        submitBtn().click()
        // Hitting the edit button and checking inputs.
        cy.contains('Use Postman').siblings('button:nth-of-type(1)').click()
        textInput().should('have.value', 'Use Postman')
        authorInput().should('have.value', 'Gabriel')
        // Editing the quote and submitting changes.
        textInput().type(' for realz')
        authorInput().type(' Cabrejas')
        submitBtn().click()
        // Checking that the changes stuck.
        cy.contains('Use Postman for realz (Gabriel Cabrejas)')
        // Hitting the delete button for the edited quote to leave state the way it was. IMPORTANT !!
        cy.contains('Use Postman for realz (Gabriel Cabrejas)').next().next().click()
        cy.contains('Use Postman for realz (Gabriel Cabrejas)').should('not.exist')
      })
    })

  })
 
})