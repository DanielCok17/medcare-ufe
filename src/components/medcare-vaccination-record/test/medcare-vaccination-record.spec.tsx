import { newSpecPage } from '@stencil/core/testing';
import { MedcareVaccinationRecord } from '../medcare-vaccination-record';

describe('medcare-vaccination-record', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [MedcareVaccinationRecord],
      html: `<medcare-vaccination-record></medcare-vaccination-record>`,
    });
    expect(page.root).toEqualHtml(`
      <medcare-vaccination-record>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </medcare-vaccination-record>
    `);
  });
});
