// import { newSpecPage } from '@stencil/core/testing';
// import { MedcareRemoveAllergyRecords } from '../medcare-remove-allergy-records';
// import axios from "axios";
// import MockAdapter from "axios-mock-adapter";

// describe('medcare-remove-allergy-records', () => {
//   const sampleRecords = [
//     { id: '1', patientId: '123', allergen: 'Peanuts' },
//     { id: '2', patientId: '124', allergen: 'Dust' },
//   ];

//   let mock: MockAdapter;

//   beforeAll(() => {
//     mock = new MockAdapter(axios);
//   });

//   afterEach(() => {
//     mock.reset();
//   });

//   it('renders sample records', async () => {
//     mock.onGet('http://localhost:5005/api/allergy-records').reply(200, sampleRecords);

//     const page = await newSpecPage({
//       components: [MedcareRemoveAllergyRecords],
//       html: `<medcare-remove-allergy-records api-base="http://localhost:5005/api"></medcare-remove-allergy-records>`,
//     });

//     await page.rootInstance.fetchAllergyRecords();

//     const items = page.root.shadowRoot.querySelectorAll("li");
//     expect(items.length).toEqual(sampleRecords.length);
//     expect(items[0].innerHTML).toContain('Peanuts');
//     expect(items[1].innerHTML).toContain('Dust');
//   });

//   it('deletes an allergy record', async () => {
//     mock.onGet('http://localhost:5005/api/allergy-records').reply(200, sampleRecords);
//     mock.onDelete('http://localhost:5005/api/allergy-records/1').reply(204);

//     const page = await newSpecPage({
//       components: [MedcareRemoveAllergyRecords],
//       html: `<medcare-remove-allergy-records api-base="http://localhost:5005/api"></medcare-remove-allergy-records>`,
//     });

//     await page.rootInstance.fetchAllergyRecords();

//     const firstItem = page.root.shadowRoot.querySelector("li button") as HTMLElement;
//     firstItem.click();

//     await page.waitForChanges();

//     const remainingItems = page.root.shadowRoot.querySelectorAll("li");
//     expect(remainingItems.length).toEqual(sampleRecords.length - 1);
//     expect(remainingItems[0].innerHTML).toContain('Dust');
//   });

//   it('renders error message on network issues', async () => {
//     mock.onGet('http://localhost:5005/api/allergy-records').networkError();

//     const page = await newSpecPage({
//       components: [MedcareRemoveAllergyRecords],
//       html: `<medcare-remove-allergy-records api-base="http://localhost:5005/api"></medcare-remove-allergy-records>`,
//     });

//     await page.rootInstance.fetchAllergyRecords();

//     const errorMessage = page.root.shadowRoot.querySelector(".error");
//     expect(errorMessage).not.toBeNull();
//     expect(page.root.shadowRoot.querySelectorAll("li").length).toEqual(0);
//   });
// });


import { newSpecPage } from '@stencil/core/testing';
import { MedcareRemoveAllergyRecords } from '../medcare-remove-allergy-records';

describe('medcare-remove-allergy-records', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [MedcareRemoveAllergyRecords],
      html: `<medcare-remove-allergy-records api-base="http://localhost:3334"></medcare-remove-allergy-records>`,
    });

    expect(page.root).toEqualHtml(`
      <medcare-remove-allergy-records api-base="http://localhost:3334">
        <mock:shadow-root>
          <div class="container">
            <h2>Allergy Records</h2>
            {this.errorMessage && <p class="error-message">{this.errorMessage}</p>}
            <p class="description">
              Odstránenie neaktuálnych alebo nepresných záznamov o alergiách 
            </p>
            <p class="scenario">
              Scenár: V prípade, že sa zistí, že záznam o alergiách pacienta je neaktuálny alebo nepresný (napríklad pacient už na určitú látku nie je alergický), je dôležité tento záznam odstrániť, aby sa predišlo zbytočnému obmedzeniu v liečbe alebo možným zdravotným rizikám.
            </p>
            <ul class="record-list">
            </ul>
            <p class="endpoint-info">
              Tento komponent využíva endpointy <code>/allergy-records</code> pre GET a <code>/allergy-records/{{id}}</code> pre DELETE požiadavky.
            </p>
          </div>
        </mock:shadow-root>
      </medcare-remove-allergy-records>
    `);
  });
});
