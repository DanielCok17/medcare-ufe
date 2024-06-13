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
          <div>
            <h2>Specialized Medical Records</h2>
            <ul>
              <li>
                <h3>Diabetes</h3>
                <p>Treatment: Insulin</p>
                <p>History: Long-term</p>
              </li>
              <li>
                <h3>Hypertension</h3>
                <p>Treatment: Beta Blockers</p>
                <p>History: Moderate</p>
              </li>
            </ul>
            <md-filled-button>
            <md-icon slot="icon">
              arrow_back
            </md-icon>
            Back to Home
          </md-filled-button>
          </div>
        </mock:shadow-root>
      </medcare-medical-records>
    `);
  });
});
