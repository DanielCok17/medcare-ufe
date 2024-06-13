import { newSpecPage } from '@stencil/core/testing';
import { MedcareMedicalRecords } from '../medcare-medical-records';
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { MedicalRecord } from '../../../api/medcare-api';

describe('medcare-medical-records', () => {
  const sampleRecords: MedicalRecord[] = [
    { id: '1', patientId: '123', condition: 'Diabetes', treatment: 'Insulin', history: 'Long-term' },
    { id: '2', patientId: '124', condition: 'Hypertension', treatment: 'Beta Blockers', history: 'Moderate' },
  ];

  let mock: MockAdapter;

  beforeAll(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
  });

  it('renders sample records', async () => {
    mock.onGet('/api/medical-records/some-id').reply(200, sampleRecords);

    const page = await newSpecPage({
      components: [MedcareMedicalRecords],
      html: `<medcare-medical-records api-base="http://localhost:5005/api"></medcare-medical-records>`,
    });

    await page.rootInstance.fetchMedicalRecords();

    const items = page.root.shadowRoot.querySelectorAll("li");
    expect(items.length).toEqual(sampleRecords.length);
    expect(items[0].innerHTML).toContain('Diabetes');
    expect(items[1].innerHTML).toContain('Hypertension');
  });

  it('renders error message on network issues', async () => {
    mock.onGet('/api/medical-records/some-id').networkError();

    const page = await newSpecPage({
      components: [MedcareMedicalRecords],
      html: `<medcare-medical-records api-base="http://localhost:5005/api"></medcare-medical-records>`,
    });

    await page.rootInstance.fetchMedicalRecords();

    const errorMessage = page.root.shadowRoot.querySelector(".error");
    expect(errorMessage).not.toBeNull();
    expect(page.root.shadowRoot.querySelectorAll("li").length).toEqual(0);
  });
});
