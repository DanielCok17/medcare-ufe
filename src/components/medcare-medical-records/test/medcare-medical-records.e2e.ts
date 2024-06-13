import { newE2EPage } from '@stencil/core/testing';

describe('medcare-medical-records', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<medcare-medical-records></medcare-medical-records>');

    const element = await page.find('medcare-medical-records');
    expect(element).toHaveClass('hydrated');
  });
});
