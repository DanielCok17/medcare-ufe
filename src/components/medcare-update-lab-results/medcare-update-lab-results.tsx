import { Component, Host, State, h, Prop } from '@stencil/core';
import { LabResultsApiFactory, LabResult } from '../../api/medcare-api';
import axios from 'axios';

@Component({
  tag: 'medcare-update-lab-results',
  styleUrl: 'medcare-update-lab-results.css',
  shadow: true,
})
export class MedcareUpdateLabResults {
  @State() labResults: LabResult[] = [];
  @Prop() apiBase: string;
  @Prop() onNavigateHome: () => void;

  private async fetchLabResults() {
    try {
      const response = await LabResultsApiFactory(undefined, this.apiBase, axios).getLabResultsById('some-id');
      this.labResults = [response.data];
    } catch (error) {
      console.error('Error fetching lab results:', error);
    }
  }

  async componentWillLoad() {
    await this.fetchLabResults();
  }

  render() {
    return (
      <Host>
        <div>
          <h2>Lab Results</h2>
          <ul>
            {this.labResults.map(result => (
              <li key={result.id}>
                <h3>{result.testType}</h3>
                <p>Result: {result.result}</p>
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
