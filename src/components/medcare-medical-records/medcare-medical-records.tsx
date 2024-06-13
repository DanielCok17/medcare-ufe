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

  private async fetchMedicalRecords() {
    try {
      const response = await MedicalRecordsApiFactory(undefined, this.apiBase, axios).getAllMedicalRecords();
      this.medicalRecords = response.data;
    } catch (error) {
      console.error('Error fetching medical records:', error);
    }
  }

  async componentWillLoad() {
    await this.fetchMedicalRecords();
  }

  render() {
    return (
      <Host>
        <div>
          <h2>Medical Records</h2>
          <ul>
            {this.medicalRecords.map(record => (
              <li key={record.id}>
                <h3>{record.condition}</h3>
                <p>Patient ID: {record.patientId}</p>
                <p>Treatment: {record.treatment}</p>
                <p>History: {record.history}</p>
              </li>
            ))}
          </ul>
          <md-filled-button onClick={this.onNavigateHome}>
            <md-icon slot="icon">arrow_back</md-icon>
            Back to Home
          </md-filled-button>
        </div>
      </Host>
    );
  }
}
