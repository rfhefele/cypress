describe('login', () => 
{
  it('login', () => 
  {
    //Log into site
    //password in not in the archive. Passed as env variable at start
    const password = Cypress.env('password')

    cy.visit('https://wordpress.com/me')
    cy.get('[name=password]')

    //Getting login from file 
    cy.fixture('login').then((profile)=>{
      cy.contains('Email Address or Username').click()
      .type(profile.user)
    })

    cy.contains('Continue').click()
    cy.contains('Password').click()
      .type(password)  
    cy.contains('Log In').click()

    //validate login by url
    cy.url().should('include', '/wordpress.com/me')
      
    //Add data to field
    //No need to clean up. Data is cleared before entering
    cy.get('input#first_name').click().focused().clear().type('Robert');
    cy.get('input#last_name').click().focused().clear().type('Hefele');
    cy.get('textarea#description').click().focused().clear().type('Who I am');

    //Turns off and on
    cy.contains('Hide my Gravatar profile').click()

    //Start Profile Links
    cy.get('button').contains('Add').type('Add URL')
    cy.contains('Add URL').click()
    //Use CSS Selector
    cy.get('input.form-text-input:nth-child(1)').click().type('https://www.google.com/');
    cy.get('.profile-links-add-other__title').click().type('myfavurldescription');
    cy.contains('Add Site').click()

    //Delete by CSS Path
    //Is an assetion and cleans data for the next run
    cy.get('button.button:nth-child(3) > svg:nth-child(1)').click()
      
    //Save the profile
    //logout
    //validate logout home
    cy.contains('Save profile details').click()
    cy.contains('Settings saved successfully')
    cy.wait(5000)
    cy.contains('Log out').click()
    cy.url().should('include', 'https://wordpress.com/?apppromo')      
    
  })
})

  
