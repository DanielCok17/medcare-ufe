import { newSpecPage } from '@stencil/core/testing';
import { MedcareUpdateLabResults } from '../medcare-update-lab-results';

describe('medcare-update-lab-results', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [MedcareUpdateLabResults],
      html: `<medcare-update-lab-results></medcare-update-lab-results>`,
    });
    expect(page.root).toEqualHtml(`
      <medcare-update-lab-results>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </medcare-update-lab-results>
    `);
  });
});
