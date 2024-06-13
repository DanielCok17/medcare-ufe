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

  private async fetchVaccinationRecords() {
    try {
      const response = await VaccinationRecordsApiFactory(undefined, this.apiBase, axios).getAllVaccinationRecords();
      this.vaccinationRecords = response.data;
    } catch (err) {
      console.error('Cannot retrieve vaccination records:', err);
    }
  }

  private async createVaccinationRecord(event: Event) {
    event.preventDefault();
    try {
      await VaccinationRecordsApiFactory(undefined, this.apiBase, axios).createVaccinationRecord(this.newRecord);
      await this.fetchVaccinationRecords();
      this.newRecord = { id: '', patientId: '', vaccine: '', date: '' };
    } catch (err) {
      console.error('Cannot create vaccination record:', err);
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
        <form onSubmit={(event) => this.createVaccinationRecord(event)}>
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
        <button onClick={this.onNavigateHome}>Back to Home</button>
      </div>
    );
  }
}
