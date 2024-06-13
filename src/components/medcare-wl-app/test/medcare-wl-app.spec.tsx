import { newSpecPage } from '@stencil/core/testing';
import { MedcareWlApp } from '../medcare-wl-app';

describe('medcare-wl-app', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [MedcareWlApp],
      html: `<medcare-wl-app></medcare-wl-app>`,
    });
    expect(page.root).toEqualHtml(`
      <medcare-wl-app>
        <mock:shadow-root>
          <div class="menu">
            <h1>MedCare App</h1>
            <ul>
              <li>
                <a href="./medical-records">Medical Records</a>
              </li>
              <li>
                <a href="./vaccination-record">Vaccination Record</a>
              </li>
              <li>
                <a href="./update-lab-results">Update Lab Results</a>
              </li>
              <li>
                <a href="./remove-allergy-records">Remove Allergy Records</a>
              </li>
            </ul>
          </div>
        </mock:shadow-root>
      </medcare-wl-app>
    `);
  });
});
