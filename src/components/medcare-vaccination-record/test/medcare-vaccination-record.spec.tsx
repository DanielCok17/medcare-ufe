import { newSpecPage } from '@stencil/core/testing';
import { MedcareVaccinationRecord } from '../medcare-vaccination-record';
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

describe('medcare-vaccination-record', () => {
  const sampleRecords = [
    { id: '1', patientId: '123', vaccine: 'COVID-19', date: '2024-01-01' },
    { id: '2', patientId: '124', vaccine: 'Flu', date: '2024-02-01' },
  ];

  let mock: MockAdapter;

  beforeAll(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
  });

  it('renders sample records', async () => {
    mock.onGet('http://localhost:5005/api/vaccination-records').reply(200, sampleRecords);

    const page = await newSpecPage({
      components: [MedcareVaccinationRecord],
      html: `<medcare-vaccination-record api-base="http://localhost:5005/api"></medcare-vaccination-record>`,
    });

    await page.rootInstance.fetchVaccinationRecords();

    const items = page.root.shadowRoot.querySelectorAll("li");
    expect(items.length).toEqual(sampleRecords.length);
    expect(items[0].innerHTML).toContain('COVID-19');
    expect(items[1].innerHTML).toContain('Flu');
  });

  it('creates a new vaccination record', async () => {
    mock.onGet('http://localhost:5005/api/vaccination-records').reply(200, sampleRecords);
    mock.onPost('http://localhost:5005/api/vaccination-records').reply(201);

    const page = await newSpecPage({
      components: [MedcareVaccinationRecord],
      html: `<medcare-vaccination-record api-base="http://localhost:5005/api"></medcare-vaccination-record>`,
    });

    await page.rootInstance.fetchVaccinationRecords();

    const newRecord = { id: '', patientId: '125', vaccine: 'Hepatitis', date: '2024-03-01' };
    page.rootInstance.newRecord = newRecord;

    await page.rootInstance.createVaccinationRecord(new Event('submit'));
    
    await page.waitForChanges();

    expect(page.rootInstance.vaccinationRecords.length).toEqual(sampleRecords.length + 1);
  });

  it('renders error message on network issues', async () => {
    mock.onGet('http://localhost:5005/api/vaccination-records').networkError();

    const page = await newSpecPage({
      components: [MedcareVaccinationRecord],
      html: `<medcare-vaccination-record api-base="http://localhost:5005/api"></medcare-vaccination-record>`,
    });

    await page.rootInstance.fetchVaccinationRecords();

    const errorMessage = page.root.shadowRoot.querySelector(".error");
    expect(errorMessage).not.toBeNull();
    expect(page.root.shadowRoot.querySelectorAll("li").length).toEqual(0);
  });
});
