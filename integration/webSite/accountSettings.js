describe('accountSettings', () => {
    it('accountSettings', () => {

      const password = Cypress.env('password')

      cy.visit('https://wordpress.com/log-in?redirect_to=%2Fme%2Faccount');

      //Getting login from file 
      cy.fixture('login').then((profile)=>{

        cy.get('#usernameOrEmail').type(profile.user);
      })
      
      
      cy.get('.form-button').click();
      cy.get('form').submit();
      cy.get('#password').type(password);
      cy.get('.form-button').click();
      cy.get('form').submit();
      cy.url().should('contains', 'https://wordpress.com/me/account');
      
      //Validate Data Username
      cy.get('#user_login').click()
        .should('have.value','rhefelegmailcom')   
      //Validate Email address
      cy.get('#user_email').click()
        .should('have.value','rhefele@gmail.com')


      cy.get('.language-picker__name-label').click();
      cy.get('.is-primary > span').click();
      cy.url().should('contains', 'https://wordpress.com/me/account');
     
      cy.get('.language-picker__name-label').click(({force: true}));
      cy.get('#primary > main > div:nth-child(5) > form > fieldset:nth-child(2) > div > div > div:nth-child(2) > label > div > img').click();
      cy.url().should('contains', 'https://wordpress.com/me/account');
      cy.get('.form-radio-with-thumbnail:nth-child(2) .form-radio').click();
      cy.get('.form-radio-with-thumbnail:nth-child(1) .form-radio').click(({force: true}));
     
      //Add New Site
      cy.get('html.notouch body.color-scheme.theme-default.is-classic-dark.is-group-me.is-section-me.font-smoothing-antialiased.is-nav-unification.is-sidebar-overflow div#wpcom.wpcom-site div.layout.focus-content.is-group-me.is-section-me div#content.layout__content div#primary.layout__primary main.account.main.is-wide-layout div.card.account__settings form div div.account__settings-form fieldset.form-fieldset a.button')
        .click()

      //cy.contains('Enroll In Beta')
      cy.contains('Enroll in Beta')
      cy.get('.button').click();
      
      cy.get('.acquire-intent-text-input__input').click()
        .type('Hef')
      cy.contains('Continue')
      cy.get('.button').click()   
      
      //Logging out and back in I do not want to create an account
      cy.visit('https://wordpress.com/log-in?redirect_to=%2Fme%2Faccount')
      cy.get('html body.color-scheme.theme-default.is-section-login.font-smoothing-antialiased div#wpcom.wpcom-site div.layout.is-section-login.focus-content.has-no-sidebar div#content.layout__content div#primary.layout__primary div main.wp-login__main.main div.wp-login__container div.login div.continue-as-user div.continue-as-user__user-info a.button.is-primary')
        .click()


      //Logout
      cy.get('.sidebar__me-signout-button').click();
      cy.url().should('contains', 'https://wordpress.com/');
      
    })
  })

  
