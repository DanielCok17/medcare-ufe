import { newSpecPage } from '@stencil/core/testing';
import { MedcareVaccinationRecord } from '../medcare-vaccination-record';

describe('medcare-vaccination-record', () => {
  const sampleRecords = [
    { id: '1', patientId: '123', vaccine: 'Pfizer', date: '2023-06-01' },
    { id: '2', patientId: '124', vaccine: 'Moderna', date: '2023-06-02' },
  ];

  it('renders sample records', async () => {
    const page = await newSpecPage({
      components: [MedcareVaccinationRecord],
      html: `<medcare-vaccination-record></medcare-vaccination-record>`,
    });

    // Manually setting the vaccinationRecords state for testing
    page.rootInstance.vaccinationRecords = sampleRecords;
    await page.waitForChanges();

    const items = page.root.shadowRoot.querySelectorAll('li');
    expect(items.length).toEqual(sampleRecords.length);
    expect(items[0].innerHTML).toContain('Pfizer');
    expect(items[1].innerHTML).toContain('Moderna');
  });

  it('renders error message on network issues', async () => {
    const page = await newSpecPage({
      components: [MedcareVaccinationRecord],
      html: `<medcare-vaccination-record></medcare-vaccination-record>`,
    });

    // Manually setting the errorMessage state for testing
    page.rootInstance.errorMessage = 'Error fetching Vaccination records. Please try again later.';
    await page.waitForChanges();

    const errorMessage = page.root.shadowRoot.querySelector('.error-message');
    expect(errorMessage).not.toBeNull();
    expect(errorMessage.textContent).toContain('Error fetching Vaccination records. Please try again later.');
    expect(page.root.shadowRoot.querySelectorAll('li').length).toEqual(0);
  });

  it('handles input changes correctly', async () => {
    const page = await newSpecPage({
      components: [MedcareVaccinationRecord],
      html: `<medcare-vaccination-record></medcare-vaccination-record>`,
    });

    const input = page.root.shadowRoot.querySelector('input[name="vaccine"]') as HTMLInputElement;
    input.value = 'Johnson & Johnson';
    input.dispatchEvent(new Event('input'));

    await page.waitForChanges();

    expect(page.rootInstance.newRecord.vaccine).toBe('Johnson & Johnson');
  });

  it('handles form submission correctly', async () => {
    const page = await newSpecPage({
      components: [MedcareVaccinationRecord],
      html: `<medcare-vaccination-record></medcare-vaccination-record>`,
    });

    // Mocking the createVaccinationRecord function
    page.rootInstance.createVaccinationRecord = jest.fn();
    const form = page.root.shadowRoot.querySelector('form');
    form.dispatchEvent(new Event('submit'));

    await page.waitForChanges();

    expect(page.rootInstance.createVaccinationRecord).toHaveBeenCalled();
  });
});
