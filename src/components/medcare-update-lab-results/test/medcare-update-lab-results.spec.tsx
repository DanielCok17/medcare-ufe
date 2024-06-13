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
          <form>
            <label>
              Test Name:
              <input type="text" name="testName" value="">
            </label>
            <label>
              Result:
              <input type="text" name="result" value="">
            </label>
            <label>
              Date:
              <input type="date" name="date" value="">
            </label>
            <label>
              Notes:
              <textarea name="notes" value=""></textarea>
            </label>
            <button type="submit">Submit</button>
          </form>
        </mock:shadow-root>
      </medcare-update-lab-results>
    `);
  });
});
