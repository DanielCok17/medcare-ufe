import { newE2EPage } from '@stencil/core/testing';

describe('medcare-homescreen', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<medcare-homescreen></medcare-homescreen>');

    const element = await page.find('medcare-homescreen');
    expect(element).toHaveClass('hydrated');
  });
});
