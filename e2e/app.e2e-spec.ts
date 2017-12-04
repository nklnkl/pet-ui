import { PetUiPage } from './app.po';

describe('pet-ui App', () => {
  let page: PetUiPage;

  beforeEach(() => {
    page = new PetUiPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
