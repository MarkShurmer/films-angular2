import { FilmsAngular2Page } from './app.po';

describe('films-angular2 App', function() {
  let page: FilmsAngular2Page;

  beforeEach(() => {
    page = new FilmsAngular2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
