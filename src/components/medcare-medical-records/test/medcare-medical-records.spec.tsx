import { newSpecPage } from '@stencil/core/testing';
import { MedcareMedicalRecords } from '../medcare-medical-records';

describe('medcare-medical-records', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [MedcareMedicalRecords],
      html: `<medcare-medical-records></medcare-medical-records>`,
    });
    expect(page.root).toEqualHtml(`
      <medcare-medical-records>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </medcare-medical-records>
    `);
  });
});
