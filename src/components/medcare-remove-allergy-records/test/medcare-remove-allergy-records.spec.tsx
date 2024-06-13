import { newSpecPage } from '@stencil/core/testing';
import { MedcareRemoveAllergyRecords } from '../medcare-remove-allergy-records';

describe('medcare-remove-allergy-records', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [MedcareRemoveAllergyRecords],
      html: `<medcare-remove-allergy-records></medcare-remove-allergy-records>`,
    });
    expect(page.root).toEqualHtml(`
      <medcare-remove-allergy-records>
        <mock:shadow-root>
          <form>
            <label>
              Allergy Record ID:
              <input name="allergyId" type="text" value="">
            </label>
            <button type="submit">
              Remove
            </button>
          </form>
        </mock:shadow-root>
      </medcare-remove-allergy-records>
    `);
  });
});
