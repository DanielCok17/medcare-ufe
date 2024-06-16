import { newSpecPage } from '@stencil/core/testing';
import { MedcareMedicalRecords } from '../medcare-medical-records';

describe('medcare-medical-records', () => {
  const sampleRecords = [
    { id: '1', patientId: '123', condition: 'Diabetes', treatment: 'Insulin', history: 'Long-term' },
    { id: '2', patientId: '124', condition: 'Hypertension', treatment: 'Beta Blockers', history: 'Moderate' },
  ];

  it('renders sample records', async () => {
    const page = await newSpecPage({
      components: [MedcareMedicalRecords],
      html: `<medcare-medical-records></medcare-medical-records>`,
    });

    // Manually setting the medicalRecords state for testing
    page.rootInstance.medicalRecords = sampleRecords;
    await page.waitForChanges();

    const items = page.root.shadowRoot.querySelectorAll('li');
    expect(items.length).toEqual(sampleRecords.length);
    expect(items[0].innerHTML).toContain('Diabetes');
    expect(items[1].innerHTML).toContain('Hypertension');
  });

  it('renders error message on network issues', async () => {
    const page = await newSpecPage({
      components: [MedcareMedicalRecords],
      html: `<medcare-medical-records></medcare-medical-records>`,
    });

    // Manually setting the errorMessage state for testing
    page.rootInstance.errorMessage = 'Error fetching medical records. Please try again later.';
    await page.waitForChanges();

    const errorMessage = page.root.shadowRoot.querySelector('.error-message');
    expect(errorMessage).not.toBeNull();
    expect(errorMessage.textContent).toContain('Error fetching medical records. Please try again later.');
    expect(page.root.shadowRoot.querySelectorAll('li').length).toEqual(0);
  });
});
