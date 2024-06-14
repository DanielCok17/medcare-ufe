import { newSpecPage } from '@stencil/core/testing';
import { MedcareHomescreen } from '../medcare-homescreen';

describe('medcare-homescreen', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [MedcareHomescreen],
      html: `<medcare-homescreen></medcare-homescreen>`,
    });
    expect(page.root).toEqualHtml(`
      <medcare-homescreen>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </medcare-homescreen>
    `);
  });
});
