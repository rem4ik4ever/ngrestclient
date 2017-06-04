import { Hello1Page } from './app.po';

describe('hello1 App', () => {
  let page: Hello1Page;

  beforeEach(() => {
    page = new Hello1Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
