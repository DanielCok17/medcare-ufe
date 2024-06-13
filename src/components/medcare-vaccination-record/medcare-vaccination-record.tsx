import { Component, h, Prop, State } from '@stencil/core';
import { VaccinationRecordsApiFactory, VaccinationRecord } from '../../api/medcare-api';

@Component({
  tag: 'medcare-vaccination-record',
  styleUrl: 'medcare-vaccination-record.css',
  shadow: true,
})
export class MedcareVaccinationRecord {
  @Prop() apiBase: string;
  @Prop() onNavigateHome: () => void;
  @State() vaccinationRecords: VaccinationRecord[] = [];

  private async fetchVaccinationRecords() {
    try {
      // Correctly use the method defined in the API
      const response = await VaccinationRecordsApiFactory(undefined, this.apiBase).getVaccinationRecordById('v123ab3');
      if (response.status < 299) {
        this.vaccinationRecords = [response.data];
      }
    } catch (err) {
      console.error('Cannot retrieve vaccination records:', err);
    }
  }

  async componentWillLoad() {
    await this.fetchVaccinationRecords();
  }

  render() {
    return (
      <div>
        <h2>Vaccination Records</h2>
        <ul>
          {this.vaccinationRecords.map(record => (
            <li key={record.id}>
              <h3>{record.vaccine}</h3>
              <p>Date: {record.date}</p>
            </li>
          ))}
        </ul>
        <button onClick={this.onNavigateHome}>Back to Home</button>
      </div>
    );
  }
}
