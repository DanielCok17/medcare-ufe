import { newE2EPage } from '@stencil/core/testing';

describe('medcare-update-lab-results', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<medcare-update-lab-results></medcare-update-lab-results>');

    const element = await page.find('medcare-update-lab-results');
    expect(element).toHaveClass('hydrated');
  });
});
