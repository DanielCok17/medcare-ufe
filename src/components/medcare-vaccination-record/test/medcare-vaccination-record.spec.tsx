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
          <form>
            <label>
              Date:
              <input type="date" name="date" value="">
            </label>
            <label>
              Time:
              <input type="time" name="time" value="">
            </label>
            <label>
              Vaccine Type:
              <input type="text" name="type" value="">
            </label>
            <label>
              Dose:
              <input type="text" name="dose" value="">
            </label>
            <label>
              Batch Number:
              <input type="text" name="batchNumber" value="">
            </label>
            <label>
              Observations:
              <textarea name="observations" value=""></textarea>
            </label>
            <button type="submit">Submit</button>
          </form>
        </mock:shadow-root>
      </medcare-vaccination-record>
    `);
  });
});
