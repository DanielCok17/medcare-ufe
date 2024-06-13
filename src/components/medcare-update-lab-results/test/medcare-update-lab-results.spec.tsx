import { newSpecPage } from '@stencil/core/testing';
import { MedcareUpdateLabResults } from '../medcare-update-lab-results';
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { LabResult } from '../../../api/medcare-api';

describe('medcare-update-lab-results', () => {
  const sampleLabResults: LabResult[] = [
    { id: '1', patientId: '123', testType: 'Blood Test', result: 'Normal' },
    { id: '2', patientId: '124', testType: 'X-Ray', result: 'Clear' },
  ];

  let mock: MockAdapter;

  beforeAll(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
  });

  it('renders sample lab results', async () => {
    mock.onGet('/api/lab-results/some-id').reply(200, sampleLabResults);

    const page = await newSpecPage({
      components: [MedcareUpdateLabResults],
      html: `<medcare-update-lab-results api-base="http://localhost:5005/api"></medcare-update-lab-results>`,
    });

    await page.rootInstance.fetchLabResults();

    const items = page.root.shadowRoot.querySelectorAll("li");
    expect(items.length).toEqual(sampleLabResults.length);
    expect(items[0].innerHTML).toContain('Blood Sugar');
    expect(items[1].innerHTML).toContain('Cholesterol');
  });

  it('renders error message on network issues', async () => {
    mock.onGet('/api/lab-results/some-id').networkError();

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
