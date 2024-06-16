// import { Component, h, Prop, State } from '@stencil/core';
// import { VaccinationRecordsApiFactory, VaccinationRecord } from '../../api/medcare-api';
// import axios from 'axios';

// @Component({
//   tag: 'medcare-vaccination-record',
//   styleUrl: 'medcare-vaccination-record.css',
//   shadow: true,
// })
// export class MedcareVaccinationRecord {
//   @Prop() apiBase: string;
//   @Prop() onNavigateHome: () => void;
//   @State() vaccinationRecords: VaccinationRecord[] = [];
//   @State() newRecord: VaccinationRecord = { id: '', patientId: '', vaccine: '', date: '' };

//   private async fetchVaccinationRecords() {
//     try {
//       const response = await VaccinationRecordsApiFactory(undefined, this.apiBase, axios).getAllVaccinationRecords();
//       this.vaccinationRecords = response.data;
//     } catch (err) {
//       console.error('Cannot retrieve vaccination records:', err);
//     }
//   }

//   private async createVaccinationRecord(event: Event) {
//     event.preventDefault();
//     try {
//       await VaccinationRecordsApiFactory(undefined, this.apiBase, axios).createVaccinationRecord(this.newRecord);
//       await this.fetchVaccinationRecords();
//       this.newRecord = { id: '', patientId: '', vaccine: '', date: '' };
//     } catch (err) {
//       console.error('Cannot create vaccination record:', err);
//     }
//   }

//   private handleInputChange(event: Event) {
//     const target = event.target as HTMLInputElement;
//     const name = target.name;
//     const value = target.value;

//     this.newRecord = { ...this.newRecord, [name]: value };
//   }

//   async componentWillLoad() {
//     await this.fetchVaccinationRecords();
//   }

//   render() {
//     return (
//       <div>
//         <h2>Vaccination Records</h2>
//         <ul>
//           {this.vaccinationRecords.map(record => (
//             <li key={record.id}>
//               <h3>{record.vaccine}</h3>
//               <p>Date: {record.date}</p>
//             </li>
//           ))}
//         </ul>
//         <form onSubmit={(event) => this.createVaccinationRecord(event)}>
//           <label>
//             Vaccine:
//             <input type="text" name="vaccine" value={this.newRecord.vaccine} onInput={(event) => this.handleInputChange(event)} />
//           </label>
//           <label>
//             Date:
//             <input type="date" name="date" value={this.newRecord.date} onInput={(event) => this.handleInputChange(event)} />
//           </label>
//           <label>
//             Patient ID:
//             <input type="text" name="patientId" value={this.newRecord.patientId} onInput={(event) => this.handleInputChange(event)} />
//           </label>
//           <button type="submit">Create Record</button>
//         </form>
//       </div>
//     );
//   }
// }

import { Component, h, Prop, State } from '@stencil/core';
import { VaccinationRecordsApiFactory, VaccinationRecord } from '../../api/medcare-api';
import axios from 'axios';

@Component({
  tag: 'medcare-vaccination-record',
  styleUrl: 'medcare-vaccination-record.css',
  shadow: true,
})
export class MedcareVaccinationRecord {
  @Prop() apiBase: string;
  @Prop() onNavigateHome: () => void;
  @State() vaccinationRecords: VaccinationRecord[] = [];
  @State() newRecord: VaccinationRecord = { id: '', patientId: '', vaccine: '', date: '' };
  @State() errorMessage: string | null = null;

  private async fetchVaccinationRecords() {
    try {
      const response = await VaccinationRecordsApiFactory(undefined, this.apiBase, axios).getAllVaccinationRecords();
      this.vaccinationRecords = response.data;
      this.errorMessage = null;
    } catch (err) {
      console.error('Cannot retrieve vaccination records:', err);
      this.errorMessage = 'Error fetching Vaccination records. Please try again later.';
    }
  }

  private async createVaccinationRecord(event: Event) {
    event.preventDefault();
    try {
      await VaccinationRecordsApiFactory(undefined, this.apiBase, axios).createVaccinationRecord(this.newRecord);
      await this.fetchVaccinationRecords();
      this.newRecord = { id: '', patientId: '', vaccine: '', date: '' };
      this.errorMessage = null;
    } catch (err) {
      console.error('Cannot create vaccination record:', err);
      this.errorMessage = 'Error fetching Vaccination records. Please try again later.';
    }
  }

  private handleInputChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const name = target.name;
    const value = target.value;

    this.newRecord = { ...this.newRecord, [name]: value };
  }

  async componentWillLoad() {
    await this.fetchVaccinationRecords();
  }

  render() {
    return (
      <div class="container">
        <h2>Vaccination Records</h2>
        {this.errorMessage && <p class="error-message">{this.errorMessage}</p>}
        <p class="description">
          Zaznamenanie očkovania
        </p>
        <p class="scenario">
          Scenár: Po administrácii vakcíny pacientovi je nevyhnutné zaznamenať tento úkon do jeho lekárskej dokumentácie. Tento nový záznam by mal obsahovať všetky relevantné informácie o očkovaní, vrátane dátumu a času očkovania, typu vakcíny, dávky, výrobného čísla vakcíny, ako aj akýchkoľvek pozorovaní alebo vedľajších účinkov zaznamenaných počas alebo po podaní vakcíny.
        </p>
        <ul class="record-list">
          {this.vaccinationRecords.map(record => (
            <li key={record.id} class="record-item">
              <h3>{record.vaccine}</h3>
              <p><strong>Date:</strong> {record.date}</p>
              <p><strong>Patient ID:</strong> {record.patientId}</p>
            </li>
          ))}
        </ul>
        <form class="form" onSubmit={(event) => this.createVaccinationRecord(event)}>
          <label>
            Vaccine:
            <input type="text" name="vaccine" value={this.newRecord.vaccine} onInput={(event) => this.handleInputChange(event)} />
          </label>
          <label>
            Date:
            <input type="date" name="date" value={this.newRecord.date} onInput={(event) => this.handleInputChange(event)} />
          </label>
          <label>
            Patient ID:
            <input type="text" name="patientId" value={this.newRecord.patientId} onInput={(event) => this.handleInputChange(event)} />
          </label>
          <button type="submit">Create Record</button>
        </form>
        <p class="endpoint-info">
          Tento komponent využíva endpointy <code>/vaccination-records</code> pre GET a POST požiadavky.
        </p>
      </div>
    );
  }
}
