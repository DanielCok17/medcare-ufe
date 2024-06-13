import { newE2EPage } from '@stencil/core/testing';

describe('medcare-remove-allergy-records', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<medcare-remove-allergy-records></medcare-remove-allergy-records>');

    const element = await page.find('medcare-remove-allergy-records');
    expect(element).toHaveClass('hydrated');
  });
});
