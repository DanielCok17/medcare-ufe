import { Component, Host, h, State } from '@stencil/core';

@Component({
  tag: 'medcare-update-lab-results',
  styleUrl: 'medcare-update-lab-results.css',
  shadow: true,
})
export class MedcareUpdateLabResults {

  @State() labResults = {
    testName: '',
    result: '',
    date: '',
    notes: '',
  };

  handleInputChange(event) {
    const { name, value } = event.target;
    this.labResults = { ...this.labResults, [name]: value };
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log('Lab Results:', this.labResults);
    // TODO: Implement API call to update the lab results
  }

  render() {
    return (
      <Host>
        <form onSubmit={e => this.handleSubmit(e)}>
          <label>
            Test Name:
            <input type="text" name="testName" value={this.labResults.testName} onInput={e => this.handleInputChange(e)} />
          </label>
          <label>
            Result:
            <input type="text" name="result" value={this.labResults.result} onInput={e => this.handleInputChange(e)} />
          </label>
          <label>
            Date:
            <input type="date" name="date" value={this.labResults.date} onInput={e => this.handleInputChange(e)} />
          </label>
          <label>
            Notes:
            <textarea name="notes" value={this.labResults.notes} onInput={e => this.handleInputChange(e)}></textarea>
          </label>
          <button type="submit">Submit</button>
        </form>
      </Host>
    );
  }
}
