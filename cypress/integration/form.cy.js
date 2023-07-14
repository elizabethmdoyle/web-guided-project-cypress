describe("Form Tests", () => {
    beforeEach(() => {

        cy.visit(`http://localhost:1234`)
    })

    const nameInput = () => cy.get()('input[name=text]');
    const emailInput = () => cy.get()('input[name=email]')
    const passwordInput = () => cy.get()('input[name=password]')

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

      describe('Making sure inputs work', () => {
        it('name input is working', () => {

          nameInput()
            .should('have.value', "")
            .type("CSS rules")
            .should('have.value', "CSS rules");  
        })

        it('input in wrong project', () => {
            emailInput().should('not.exist')
            passwordInput().should('not.exist')

        })
        
      })

   

})