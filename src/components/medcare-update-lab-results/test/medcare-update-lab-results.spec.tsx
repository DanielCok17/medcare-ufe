import { newSpecPage } from '@stencil/core/testing';
import { MedcareUpdateLabResults } from '../medcare-update-lab-results';

describe('medcare-update-lab-results', () => {
  const sampleResults = [
    { id: '1', testType: 'Blood Test', result: 'Normal' },
    { id: '2', testType: 'Urine Test', result: 'High' },
  ];

  it('renders sample results', async () => {
    const page = await newSpecPage({
      components: [MedcareUpdateLabResults],
      html: `<medcare-update-lab-results></medcare-update-lab-results>`,
    });

    // Manually setting the labResults state for testing
    page.rootInstance.labResults = sampleResults;
    await page.waitForChanges();

    const items = page.root.shadowRoot.querySelectorAll('li');
    expect(items.length).toEqual(sampleResults.length);
    expect(items[0].innerHTML).toContain('Blood Test');
    expect(items[1].innerHTML).toContain('Urine Test');
  });

  it('renders error message on network issues', async () => {
    const page = await newSpecPage({
      components: [MedcareUpdateLabResults],
      html: `<medcare-update-lab-results></medcare-update-lab-results>`,
    });

    // Manually setting the errorMessage state for testing
    page.rootInstance.errorMessage = 'Error fetching lab results. Please try again later.';
    await page.waitForChanges();

    const errorMessage = page.root.shadowRoot.querySelector('.error-message');
    expect(errorMessage).not.toBeNull();
    expect(errorMessage.textContent).toContain('Error fetching lab results. Please try again later.');
    expect(page.root.shadowRoot.querySelectorAll('li').length).toEqual(0);
  });

  it('updates a lab result and fetches the updated list', async () => {
    const page = await newSpecPage({
      components: [MedcareUpdateLabResults],
      html: `<medcare-update-lab-results></medcare-update-lab-results>`,
    });

    // Manually setting the labResults state for testing
    page.rootInstance.labResults = sampleResults;
    await page.waitForChanges();

    // Simulate updating a lab result
    const updatedResult = { id: '1', testType: 'Blood Test', result: 'High' };
    await page.rootInstance.updateLabResult('1', updatedResult);
    await page.waitForChanges();

    const items = page.root.shadowRoot.querySelectorAll('li');
    expect(items.length).toEqual(sampleResults.length);
    expect(items[0].innerHTML).toContain('Blood Test');
    expect(items[0].innerHTML).toContain('High');
  });
});
