let url = 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login';
let adminUser = 'Admin';
let adminPass = 'admin123';
let newFirst = 'Lukaku';
let newMid = 'Hein';
let newLast = 'Mets';
const fullName = `${newFirst} ${newMid} ${newLast}`;
let newPass = 'password123';
// Unique number for userid
const randomNumber = Math.floor(10 + Math.random() * 90);
const newUname = `${newFirst.toLowerCase()}${randomNumber}`;

describe('UI E2E', async () => {
    it('Menambahkan Karyawan Baru -> Positive', () => {
        // Login
        cy.visit(url);
        cy.get(`[placeholder='Username']`).type(adminUser);
        cy.get(`[placeholder='Password']`).type(adminPass);
        cy.get('.oxd-button.oxd-button--medium.oxd-button--main.orangehrm-login-button').click();

        // Add new employee
        cy.contains('PIM').click();
        cy.contains('Add Employee').click();
        cy.get(`[placeholder='First Name']`).type(newFirst);
        cy.get(`[placeholder='Middle Name']`).type(newMid);
        cy.get(`[placeholder='Last Name']`).type(newLast);
        cy.get(`[type='submit']`).click();
        cy.wait(5000);

        // Add login info for new employee
        cy.contains('Admin').click();
        cy.contains('Add').click();
        cy.get(`div[class='oxd-grid-2 orangehrm-full-width-grid'] div:nth-child(1) div:nth-child(1) div:nth-child(2) div:nth-child(1) div:nth-child(1) div:nth-child(2) i:nth-child(1)`).click();
        cy.get('div[role="option"]').contains('ESS').click();
        cy.get('.oxd-autocomplete-text-input.oxd-autocomplete-text-input--active').type(fullName);
        cy.wait(5000);
        cy.get('.oxd-autocomplete-dropdown > div').contains(`${newFirst} ${newMid} ${newLast}`).click();
        cy.get('body > div:nth-child(3) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > form:nth-child(3) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > i:nth-child(1)').click();
        cy.get('div[role="option"]').contains('Enabled').click();
        cy.get('body > div:nth-child(3) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > form:nth-child(3) > div:nth-child(1) > div:nth-child(1) > div:nth-child(4) > div:nth-child(1)').type(newUname);
        cy.get('input[type="password"]').eq(0).type(newPass);
        cy.get('input[type="password"]').eq(1).type(newPass);
        cy.get(`[type='submit']`).click();

        // Assertion login info for new user has been added
        cy.wait(2000);
        cy.contains('Successfully Saved').should('exist');
    })
    it('Menambahkan Karyawan Baru -> Negative', () => {
        // Login
        cy.visit(url);
        cy.get(`[placeholder='Username']`).type(adminUser);
        cy.get(`[placeholder='Password']`).type(adminPass);
        cy.get('.oxd-button.oxd-button--medium.oxd-button--main.orangehrm-login-button').click();

        // Add new employee
        cy.contains('PIM').click();
        cy.contains('Add Employee').click();
        let newFirst1 = 'David'
        cy.get(`[placeholder='First Name']`).type(newFirst1);
        cy.get(`[placeholder='Last Name']`).type(newLast);
        cy.get(`[type='submit']`).click();

        // Add login info for new employee
        cy.contains('Admin').click();
        cy.contains('Add').click();
        cy.get(`div[class='oxd-grid-2 orangehrm-full-width-grid'] div:nth-child(1) div:nth-child(1) div:nth-child(2) div:nth-child(1) div:nth-child(1) div:nth-child(2) i:nth-child(1)`).click();
        cy.get('div[role="option"]').contains('Admin').click();
        cy.get('.oxd-autocomplete-text-input.oxd-autocomplete-text-input--active').type(newFirst1);
        cy.wait(5000);
        cy.get('.oxd-autocomplete-dropdown > div').first().click();
        cy.get('body > div:nth-child(3) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > form:nth-child(3) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > i:nth-child(1)').click();
        cy.get('div[role="option"]').contains('Enabled').click();
        cy.get('body > div:nth-child(3) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > form:nth-child(3) > div:nth-child(1) > div:nth-child(1) > div:nth-child(4) > div:nth-child(1)').type(newUname);
        cy.get('input[type="password"]').eq(0).type('123asd');
        cy.get('input[type="password"]').eq(1).type(`${newPass}${randomNumber}`);
        cy.get(`[type='submit']`).click();

        // Assertion password are wrong
        cy.contains('Should have at least 7 characters').should('exist');
        cy.contains('Passwords do not match').should('exist');
    })

    it('Menambahkan Jatah Cuti Untuk Karyawan Baru -> Positive', () => {
        // Login
        cy.visit(url);
        cy.get(`[placeholder='Username']`).type(adminUser);
        cy.get(`[placeholder='Password']`).type(adminPass);
        cy.get('.oxd-button.oxd-button--medium.oxd-button--main.orangehrm-login-button').click();
        cy.wait(5000);

        // Add new leave
        cy.contains('Leave').click();
        cy.contains('Entitlements').click();
        cy.contains('Add Entitlements').click();
        cy.get(`[placeholder='Type for hints...']`).type(fullName);
        cy.wait(5000);
        cy.get('.oxd-autocomplete-dropdown > div').contains(fullName).click();
        cy.get(`div[class='oxd-grid-3 orangehrm-full-width-grid'] div:nth-child(1) div:nth-child(1) div:nth-child(2) div:nth-child(1) div:nth-child(1) div:nth-child(2) i:nth-child(1)`).click();
        cy.get('div[role="listbox"]').contains('US - Personal').click();
        cy.get(`div[class='oxd-layout-context'] div:nth-child(2) div:nth-child(1) div:nth-child(2) div:nth-child(1) div:nth-child(1) div:nth-child(2) i:nth-child(1)`).click();
        //cy.get('div[role="listbox"]').contains('2025-01-01').click();
        cy.get(`div[class='oxd-input-group oxd-input-field-bottom-space'] div input[class='oxd-input oxd-input--active']`).type('12');
        cy.get(`[type='submit']`).click();
        cy.wait(5000);
        cy.get(`div[role='document']`).contains('Confirm').click();

        // Assertion entitlements has been added
        cy.wait(2000);
        cy.contains('Successfully Saved').should('exist');
    })
    it('Menambahkan Jatah Cuti Untuk Karyawan Baru -> Negative', () => {
        // Login
        cy.visit(url);
        cy.get(`[placeholder='Username']`).type(adminUser);
        cy.get(`[placeholder='Password']`).type(adminPass);
        cy.get('.oxd-button.oxd-button--medium.oxd-button--main.orangehrm-login-button').click();
        cy.wait(5000);

        // Add new leave
        cy.contains('Leave').click();
        cy.contains('Entitlements').click();
        cy.contains('Add Entitlements').click();
        cy.get(`[placeholder='Type for hints...']`).type('Invalid');
        cy.wait(5000);
        cy.get('.oxd-autocomplete-dropdown > div').first().click();
        cy.get(`div[class='oxd-grid-3 orangehrm-full-width-grid'] div:nth-child(1) div:nth-child(1) div:nth-child(2) div:nth-child(1) div:nth-child(1) div:nth-child(2) i:nth-child(1)`).click();
        cy.get('div[role="listbox"]').contains('US - Matternity').click();
        cy.get(`div[class='oxd-layout-context'] div:nth-child(2) div:nth-child(1) div:nth-child(2) div:nth-child(1) div:nth-child(1) div:nth-child(2) i:nth-child(1)`).click();
        //cy.get('div[role="listbox"]').contains('2024-01-01').click();
        cy.get(`div[class='oxd-input-group oxd-input-field-bottom-space'] div input[class='oxd-input oxd-input--active']`).type(randomNumber);
        cy.get(`[type='submit']`).click();

        // Assertion no employee found
        cy.contains('Invalid').should('exist');
    })

    it('Karyawan Baru Request Cuti', () => {
        // Login
        cy.visit(url);
        cy.get(`[placeholder='Username']`).type(newUname);
        cy.get(`[placeholder='Password']`).type(newPass);
        cy.get('.oxd-button.oxd-button--medium.oxd-button--main.orangehrm-login-button').click();

        // Add new leave request
        cy.contains('Leave').click();
        cy.contains('Apply').click();
        cy.get('.oxd-select-text-input').eq(0).click();
        cy.get('div[role="listbox"]').contains('US - Personal').click();
        const fromDate = '2025-06-27';
        const toDate = '2025-06-27';
        cy.get('.oxd-date-input').eq(0).type(fromDate).click();
        cy.get('.oxd-date-input').eq(1).clear().type(toDate).click();
        cy.get('textarea').type('Urgent Leave for Healing');
        cy.get(`[type='submit']`).click();

        // Assertion leave has been requested
        cy.wait(2500);
        cy.contains('Successfully Saved').should('exist');
    })
    it('Approve cuti', () => {
        // Login
        cy.visit(url);
        cy.get(`[placeholder='Username']`).type(adminUser);
        cy.get(`[placeholder='Password']`).type(adminPass);
        cy.get('.oxd-button.oxd-button--medium.oxd-button--main.orangehrm-login-button').click();

        // Approve leave
        cy.contains('Leave').click();
        cy.wait(2000);
        cy.contains('Approve').click();

        // Assertion leave has been approved
        cy.wait(2500);
        cy.contains('Successfully Updated').should('exist');
    })
    it('Expect cuti di approve', () => {
        // Login
        cy.visit(url);
        cy.get(`[placeholder='Username']`).type(newUname);
        cy.get(`[placeholder='Password']`).type(newPass);
        cy.get('.oxd-button.oxd-button--medium.oxd-button--main.orangehrm-login-button').click();

        cy.contains('Leave').click();

        // Assertion expected leave is approved
        cy.wait(2500);
        cy.contains('US - Personal').should('exist');
    })
})