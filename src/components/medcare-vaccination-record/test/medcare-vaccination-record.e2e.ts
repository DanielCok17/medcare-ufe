import { newE2EPage } from '@stencil/core/testing';

describe('medcare-vaccination-record', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<medcare-vaccination-record></medcare-vaccination-record>');

    const element = await page.find('medcare-vaccination-record');
    expect(element).toHaveClass('hydrated');
  });
});
