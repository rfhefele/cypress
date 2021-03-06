describe('purchases', () => {
    it('purchases', () => {

      const password = Cypress.env('password')

      cy.visit('https://wordpress.com/log-in?redirect_to=%2Fme%2Fpurchases');

      //Getting login from file 
      cy.fixture('login').then((profile)=>{
        cy.get('#usernameOrEmail').type(profile.user);
      })

      cy.get('.form-button').click();
      cy.get('form').submit();
      cy.get('[name=password]')
      cy.get('#password').type(password);
      cy.get('.form-button').click();
      cy.get('form').submit();
      cy.url().should('contains', 'https://wordpress.com/me/purchases');

      cy.contains('You don\'t have any WordPress sites yet.').should('have.text', 'You don\'t have any WordPress sites yet.')

      //Nav to Billing History
      cy.get('.section-nav-tab:nth-child(2) > .section-nav-tab__link > .section-nav-tab__text').click();
      cy.contains('Purchases').should('have.text','Purchases')
      cy.contains('No receipts found.').should('have.text','No receipts found.')

      //Nav to Payment Methods
      cy.get('.section-nav-tab:nth-child(3) > .section-nav-tab__link > .section-nav-tab__text').click();
      cy.contains('Purchases').should('have.text','Purchases')
      cy.contains('You have no saved payment methods.').should('have.text','You have no saved payment methods.')

      //logout
      //validate logout home
      cy.contains('Log out').click()
      cy.url().should('include', 'https://wordpress.com/?apppromo')
    
    })
  })

  
