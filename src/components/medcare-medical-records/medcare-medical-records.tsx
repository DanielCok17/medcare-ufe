// import { Component, Host, State, h, Prop } from '@stencil/core';
// import { MedicalRecordsApiFactory, MedicalRecord } from '../../api/medcare-api';
// import axios from 'axios';

// @Component({
//   tag: 'medcare-medical-records',
//   styleUrl: 'medcare-medical-records.css',
//   shadow: true,
// })
// export class MedcareMedicalRecords {
//   @State() medicalRecords: MedicalRecord[] = [];
//   @Prop() apiBase: string;
//   @Prop() onNavigateHome: () => void;

//   private async fetchMedicalRecords() {
//     try {
//       const response = await MedicalRecordsApiFactory(undefined, this.apiBase, axios).getAllMedicalRecords();
//       this.medicalRecords = response.data;
//     } catch (error) {
//       console.error('Error fetching medical records:', error);
//     }
//   }

//   async componentWillLoad() {
//     await this.fetchMedicalRecords();
//   }

//   render() {
//     return (
//       <Host>
//         <div>
//           <h2>Medical Records</h2>
//           <ul>
//             {this.medicalRecords.map(record => (
//               <li key={record.id}>
//                 <p>Condition:  {record.condition}</p> 
//                 <p>Patient ID: {record.patientId}</p>
//                 <p>Treatment: {record.treatment}</p>
//                 <p>History: {record.history}</p>
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
import { MedicalRecordsApiFactory, MedicalRecord } from '../../api/medcare-api';
import axios from 'axios';

@Component({
  tag: 'medcare-medical-records',
  styleUrl: 'medcare-medical-records.css',
  shadow: true,
})
export class MedcareMedicalRecords {
  @State() medicalRecords: MedicalRecord[] = [];
  @Prop() apiBase: string;
  @Prop() onNavigateHome: () => void;
  @State() errorMessage: string | null = null;

  private async fetchMedicalRecords() {
    try {
      const response = await MedicalRecordsApiFactory(undefined, this.apiBase, axios).getAllMedicalRecords();
      this.medicalRecords = response.data;
      this.errorMessage = null;
    } catch (error) {
      console.error('Error fetching medical records:', error);
      this.errorMessage = 'Error fetching allergy records. Please try again later.';
    }
  }

  async componentWillLoad() {
    await this.fetchMedicalRecords();
  }

  render() {
    return (
      <Host>
        <div class="container">
          <h2>Medical Records</h2>
          {this.errorMessage && <p class="error-message">{this.errorMessage}</p>}
          <p class="description">
            Prístup k špecializovaným lekárskym záznamom
          </p>
          <p class="scenario">
            Scenár: Lekár potrebuje získať prístup k špecializovaným lekárskym záznamom pacienta, pre komplexnú revíziu pacientovho zdravotného stavu. Tento prístup umožní lekárovi získať hlbší prehľad o špecifických zdravotných problémoch a historických liečebných plánoch pacienta.
          </p>
          <ul class="record-list">
            {this.medicalRecords.map(record => (
              <li key={record.id} class="record-item">
                <p><strong>Condition:</strong> {record.condition}</p>
                <p><strong>Patient ID:</strong> {record.patientId}</p>
                <p><strong>Treatment:</strong> {record.treatment}</p>
                <p><strong>History:</strong> {record.history}</p>
              </li>
            ))}
          </ul>
          <p class="endpoint-info">
            Tento komponent využíva endpoint <code>/medical-records</code> na získanie lekárskych záznamov.
          </p>
          {/* <md-filled-button onClick={this.onNavigateHome}>
            <md-icon slot="icon">arrow_back</md-icon>
            Back to Home
          </md-filled-button> */}
        </div>
      </Host>
    );
  }
}
