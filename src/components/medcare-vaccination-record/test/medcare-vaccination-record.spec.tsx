


      import { newSpecPage } from '@stencil/core/testing';
      import { MedcareVaccinationRecord } from '../medcare-vaccination-record';
      import axios from "axios";
      import MockAdapter from "axios-mock-adapter";
      import { VaccinationRecord } from '../../../api/medcare-api';
      
      describe('medcare-vaccination-record', () => {
        const sampleVaccinationRecords: VaccinationRecord[] = [


          { id: '1', patientId: '123', vaccine: 'COVID-19', date: '2024-01-15' },
          { id: '2', patientId: '124', vaccine: 'Flu', date: '2024-01-16' },
        ];
      
        let mock: MockAdapter;
      
        beforeAll(() => {
          mock = new MockAdapter(axios);
        });
      
        afterEach(() => {
          mock.reset();
        });
      
        it('renders sample vaccination records', async () => {
          mock.onGet('/api/vaccination-records/some-id').reply(200, sampleVaccinationRecords);
      
          const page = await newSpecPage({
            components: [MedcareVaccinationRecord],
            html: `<medcare-vaccination-record api-base="http://localhost:5005/api"></medcare-vaccination-record>`,
          });
      
          await page.rootInstance.fetchVaccinationRecords();
      
          const items = page.root.shadowRoot.querySelectorAll("li");
          expect(items.length).toEqual(sampleVaccinationRecords.length);
          expect(items[0].innerHTML).toContain('COVID-19');
          expect(items[1].innerHTML).toContain('Flu');
        });
      
        it('renders error message on network issues', async () => {
          mock.onGet('/api/vaccination-records/some-id').networkError();
      
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
      

