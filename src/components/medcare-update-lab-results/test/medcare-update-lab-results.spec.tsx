import { newSpecPage } from '@stencil/core/testing';
import { MedcareUpdateLabResults } from '../medcare-update-lab-results';
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

describe('medcare-update-lab-results', () => {
  const sampleResults = [
    { id: '1', patientId: '123', testType: 'Blood Test', result: 'Normal' },
    { id: '2', patientId: '124', testType: 'Urine Test', result: 'Abnormal' },
  ];

  let mock: MockAdapter;

  beforeAll(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
  });

  it('renders sample results', async () => {
    mock.onGet('http://localhost:5005/api/lab-results').reply(200, sampleResults);

    const page = await newSpecPage({
      components: [MedcareUpdateLabResults],
      html: `<medcare-update-lab-results api-base="http://localhost:5005/api"></medcare-update-lab-results>`,
    });

    await page.rootInstance.fetchLabResults();

    const items = page.root.shadowRoot.querySelectorAll("li");
    expect(items.length).toEqual(sampleResults.length);
    expect(items[0].innerHTML).toContain('Blood Test');
    expect(items[1].innerHTML).toContain('Urine Test');
  });

  it('updates lab result', async () => {
    mock.onGet('http://localhost:5005/api/lab-results').reply(200, sampleResults);
    mock.onPut('http://localhost:5005/api/lab-results/1').reply(200);

    const page = await newSpecPage({
      components: [MedcareUpdateLabResults],
      html: `<medcare-update-lab-results api-base="http://localhost:5005/api"></medcare-update-lab-results>`,
    });

    await page.rootInstance.fetchLabResults();
    const result = sampleResults[0];
    result.result = 'Updated Result';

    page.rootInstance.handleSubmit(new Event('submit'), result);
    
    await page.waitForChanges();

    const items = page.root.shadowRoot.querySelectorAll("li");
    expect(items.length).toEqual(sampleResults.length);
    expect(items[0].innerHTML).toContain('Updated Result');
  });

  it('renders error message on network issues', async () => {
    mock.onGet('http://localhost:5005/api/lab-results').networkError();

    const page = await newSpecPage({
      components: [MedcareUpdateLabResults],
      html: `<medcare-update-lab-results api-base="http://localhost:5005/api"></medcare-update-lab-results>`,
    });

    await page.rootInstance.fetchLabResults();

    const errorMessage = page.root.shadowRoot.querySelector(".error");
    expect(errorMessage).not.toBeNull();
    expect(page.root.shadowRoot.querySelectorAll("li").length).toEqual(0);
  });
});
