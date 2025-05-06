describe('Complete Registration Flow', () => {
    it('should complete the registration process', () => {
      // Step 1: Input Phone Number and Trigger OTP
      cy.visit('/url-to-registration-page'); // Replace with actual URL
      cy.get('[data-cy="phone-input"]').type('1234567890');
      cy.get('[data-cy="send-otp-button"]').click();
  
      // Intercept OTP API and mock response
      cy.intercept('POST', '/api/send-otp', (req) => {
        req.reply({
          statusCode: 200,
          body: { otp: '123456' }, // Mocked OTP
        });
      }).as('sendOtp');
      cy.wait('@sendOtp');
  
      // Step 2: Verify OTP
      cy.get('[data-cy="otp-input"]').type('123456');
      cy.get('[data-cy="verify-otp-button"]').click();
      cy.url().should('include', '/identity-check');
  
      // Step 3: Input Personal Information
      cy.get('[data-cy="citizen_id-input"]').type('1234567890123');
      cy.get('[data-cy="laser_id-input"]').type('AB0-0000-0000');
      cy.get('[data-cy="name-input"]').type('John Doe');
      cy.get('[data-cy="dob-input"]').type('1990-01-01');
      cy.get('[data-cy="submit-personal-info-button"]').click();
      cy.url().should('include', '/bank-check');
  
      // Step 4: Add Banking Account
      cy.get('[data-cy="bank-name-input"]').type('Bank of Cypress');
      cy.get('[data-cy="account-number-input"]').type('123456789');
      cy.get('[data-cy="submit-bank-info-button"]').click();
      cy.url().should('include', '/register');
  
      // Step 5: Verify Registration Completion
      cy.contains('Registration Completed').should('be.visible');
    });
  });