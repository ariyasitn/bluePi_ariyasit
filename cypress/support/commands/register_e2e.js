const DOMAIN = Cypress.env('DOMAIN')

Cypress.Commands.add('register_e2e',() => {

//phone check

        cy.api({
            method : 'POST',
            url : DOMAIN + "phone-check",
            body : {
                "mobile_number": "0000000000",
            },

        }).then((response)=>{
            expect(response.status).to.eq(200)

//OTP check

        cy.api({
            method : 'POST',
            url : DOMAIN + "otp-check",
            body : {

                "OTP": "000000", //mock otp
                "mobile_number": "0000000000",
            },

        }).then((response)=>{
            expect(response.status).to.eq(200)

//identity check

        cy.api({
            method : 'POST',
            url : DOMAIN + "identity-check",
            body : {

            "citizen_id": "12345678901234",
            "laser_id": "AB0-0000-0000",
            "name": "xxxxx",
            "DOB": "0880002544985",
        }
            }).then((response)=>{
            expect(response.status).to.eq(200)

//bank check

        cy.api({
            method : 'POST',
            url : DOMAIN + "bank-check",
            body : {

            "bank_name": "xxxxx",
            "account_name": "xxxxx",
            "bank_account": "xxxxx",
        }

            }).then((response)=>{
            expect(response.status).to.eq(200)
            })
        })
    })
})
})
