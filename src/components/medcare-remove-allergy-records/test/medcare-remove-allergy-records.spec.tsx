import { newSpecPage } from '@stencil/core/testing';
import { MedcareRemoveAllergyRecords } from '../medcare-remove-allergy-records';
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { AllergyRecord } from '../../../api/medcare-api';

describe('medcare-remove-allergy-records', () => {

const sampleAllergyRecords: AllergyRecord[] = [
  { id: '1', patientId: '123', allergen: 'Peanuts' },
  { id: '2', patientId: '124', allergen: 'Shellfish' },
];

  let mock: MockAdapter;

  beforeAll(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
  });

  it('renders sample allergy records', async () => {
    mock.onGet('/api/allergy-records/some-id').reply(200, sampleAllergyRecords);

    const page = await newSpecPage({
      components: [MedcareRemoveAllergyRecords],
      html: `<medcare-remove-allergy-records api-base="http://localhost:5005/api"></medcare-remove-allergy-records>`,
    });

    await page.rootInstance.fetchAllergyRecords();

    const items = page.root.shadowRoot.querySelectorAll("li");
    expect(items.length).toEqual(sampleAllergyRecords.length);
    expect(items[0].innerHTML).toContain('Peanuts');
    expect(items[1].innerHTML).toContain('Bee Stings');
  });

  it('renders error message on network issues', async () => {
    mock.onGet('/api/allergy-records/some-id').networkError();

    const page = await newSpecPage({
      components: [MedcareRemoveAllergyRecords],
      html: `<medcare-remove-allergy-records api-base="http://localhost:5005/api"></medcare-remove-allergy-records>`,
    });

    await page.rootInstance.fetchAllergyRecords();

    const errorMessage = page.root.shadowRoot.querySelector(".error");
    expect(errorMessage).not.toBeNull();
    expect(page.root.shadowRoot.querySelectorAll("li").length).toEqual(0);
  });
});

