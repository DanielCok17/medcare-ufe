import { newE2EPage } from '@stencil/core/testing';

describe('medcare-record-editor', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<medcare-record-editor></medcare-record-editor>');

    const element = await page.find('medcare-record-editor');
    expect(element).toHaveClass('hydrated');
  });
});
