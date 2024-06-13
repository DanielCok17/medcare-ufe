import { newE2EPage } from '@stencil/core/testing';

describe('medcare-wl-app', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<medcare-wl-app></medcare-wl-app>');

    const element = await page.find('medcare-wl-app');
    expect(element).toHaveClass('hydrated');
  });
});
