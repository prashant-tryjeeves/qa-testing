import {getTitle, getTransferListButton} from '../support/app.po';

describe('visit transaction pages', () => {

  beforeEach(() => cy.visit('/'));

  it('should display title', () => {
    getTitle().contains('Transfer money FX -');
  });

  it('should navigate to transfer list page', () => {
    getTransferListButton().click();
    getTitle().contains('List of transactions');
  });

});
