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
      const response = await LabResultsApiFactory(undefined, this.apiBase, axios).getAllLabResults();
      this.labResults = response.data;
    } catch (error) {
      console.error('Error fetching lab results:', error);
    }
  }

  private async updateLabResult(resultId: string, updatedResult: LabResult) {
    try {
      await LabResultsApiFactory(undefined, this.apiBase, axios).updateLabResult(resultId, updatedResult);
      await this.fetchLabResults();
    } catch (error) {
      console.error('Error updating lab result:', error);
    }
  }

  async componentWillLoad() {
    await this.fetchLabResults();
  }

  private handleInputChange(event: Event, result: LabResult) {
    const target = event.target as HTMLInputElement;
    const name = target.name;
    const value = target.value;

    this.labResults = this.labResults.map(r => {
      if (r.id === result.id) {
        return { ...r, [name]: value };
      }
      return r;
    });
  }

  private handleSubmit(event: Event, result: LabResult) {
    event.preventDefault();
    this.updateLabResult(result.id, result);
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
                <form onSubmit={event => this.handleSubmit(event, result)}>
                  <label>
                    Test Type:
                    <input name="testType" type="text" value={result.testType} onInput={event => this.handleInputChange(event, result)} />
                  </label>
                  <label>
                    Result:
                    <input name="result" type="text" value={result.result} onInput={event => this.handleInputChange(event, result)} />
                  </label>
                  <button type="submit">Submit</button>
                </form>
              </li>
            ))}
          </ul>
          {/* <md-filled-button onClick={this.onNavigateHome}>
            <md-icon slot="icon">arrow_back</md-icon>
            Back to Home
          </md-filled-button> */}
        </div>
      </Host>
    );
  }
}
