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
  @Prop() apiBase: string;
  @Prop() onNavigateHome: () => void;

  private async fetchAllergyRecords() {
    try {
      const response = await AllergyRecordsApiFactory(undefined, this.apiBase, axios).getAllergyRecordById('some-id');
      this.allergyRecords = [response.data];
    } catch (error) {
      console.error('Error fetching allergy records:', error);
    }
  }

  async componentWillLoad() {
    await this.fetchAllergyRecords();
  }

  render() {
    return (
      <Host>
        <div>
          <h2>Allergy Records</h2>
          <ul>
            {this.allergyRecords.map(record => (
              <li key={record.id}>
                <h3>{record.allergen}</h3>
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
