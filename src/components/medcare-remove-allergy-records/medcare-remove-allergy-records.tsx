// import { Component, Host, State, h, Prop } from '@stencil/core';
// import { AllergyRecordsApiFactory, AllergyRecord } from '../../api/medcare-api';
// import axios from 'axios';

// @Component({
//   tag: 'medcare-remove-allergy-records',
//   styleUrl: 'medcare-remove-allergy-records.css',
//   shadow: true,
// })
// export class MedcareRemoveAllergyRecords {
//   @State() allergyRecords: AllergyRecord[] = [];
//   @Prop() apiBase: string;
//   @Prop() onNavigateHome: () => void;

//   private async fetchAllergyRecords() {
//     try {
//       const response = await AllergyRecordsApiFactory(undefined, this.apiBase, axios).getAllAllergyRecords();
//       this.allergyRecords = response.data;
//     } catch (error) {
//       console.error('Error fetching allergy records:', error);
//     }
//   }

//   private async deleteAllergyRecord(id: string) {
//     try {
//       await AllergyRecordsApiFactory(undefined, this.apiBase, axios).deleteAllergyRecord(id);
//       this.allergyRecords = this.allergyRecords.filter(record => record.id !== id);
//     } catch (error) {
//       console.error('Error deleting allergy record:', error);
//     }
//   }

//   async componentWillLoad() {
//     await this.fetchAllergyRecords();
//   }

//   render() {
//     return (
//       <Host>
//         <div>
//           <h2>Allergy Records</h2>
//           <ul>
//             {this.allergyRecords.map(record => (
//               <li key={record.id}>
//                 <h3>{record.allergen}</h3>
//                 <button onClick={() => this.deleteAllergyRecord(record.id)}>Delete</button>
//               </li>
//             ))}
//           </ul>
//           {/* <md-filled-button onClick={this.onNavigateHome}>
//             <md-icon slot="icon">arrow_back</md-icon>
//             Back to Home
//           </md-filled-button> */}
//         </div>
//       </Host>
//     );
//   }
// }


import { Component, Host, State, h, Prop } from '@stencil/core';
import { AllergyRecordsApiFactory, AllergyRecord } from '../../api/medcare-api';
import axios from 'axios';

@Component({
  tag: 'medcare-remove-allergy-records',
  styleUrl: 'medcare-remove-allergy-records.css',
  shadow: true,
})
export class MedcareRemoveAllergyRecords {
  @State() allergyRecords: AllergyRecord[] = [];
  @State() errorMessage: string | null = null;
  @Prop() apiBase: string;
  @Prop() onNavigateHome: () => void;

  private async fetchAllergyRecords() {
    try {
      const response = await AllergyRecordsApiFactory(undefined, this.apiBase, axios).getAllAllergyRecords();
      this.allergyRecords = response.data;
      this.errorMessage = null;
    } catch (error) {
      console.error('Error fetching allergy records:', error);
      this.errorMessage = 'Error fetching allergy records. Please try again later.';
    }
  }

  private async deleteAllergyRecord(id: string) {
    try {
      await AllergyRecordsApiFactory(undefined, this.apiBase, axios).deleteAllergyRecord(id);
      this.allergyRecords = this.allergyRecords.filter(record => record.id !== id);
      this.errorMessage = null;
    } catch (error) {
      console.error('Error deleting allergy record:', error);
      this.errorMessage = 'Error deleting allergy record. Please try again later.';
    }
  }

  async componentWillLoad() {
    await this.fetchAllergyRecords();
  }

  render() {
    return (
      <Host>
        <div class="container">
          <h2>Allergy Records</h2>
          {this.errorMessage && <p class="error-message">{this.errorMessage}</p>}
          <p class="description">
          Odstránenie neaktuálnych alebo nepresných záznamov o alergiách 
          </p>
          <p class="scenario">
          Scenár: V prípade, že sa zistí, že záznam o alergiách pacienta je neaktuálny alebo nepresný (napríklad pacient už na určitú látku nie je alergický), je dôležité tento záznam odstrániť, aby sa predišlo zbytočnému obmedzeniu v liečbe alebo možným zdravotným rizikám.          </p>
          <ul class="record-list">
            {this.allergyRecords.map(record => (
              <li key={record.id} class="record-item">
                <h3>{record.allergen}</h3>
                <p><strong>Patient ID:</strong> {record.patientId}</p>
                <button onClick={() => this.deleteAllergyRecord(record.id)}>Delete</button>
              </li>
            ))}
          </ul>
          <p class="endpoint-info">
            Tento komponent využíva endpointy <code>/allergy-records</code> pre GET a <code>/allergy-records/{'{id}'}</code> pre DELETE požiadavky.
          </p>
  
        </div>
      </Host>
    );
  }
}
