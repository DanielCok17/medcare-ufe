import { Component, Host, h, State, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'medcare-vaccination-record',
  styleUrl: 'medcare-vaccination-record.css',
  shadow: true,
})
export class MedcareVaccinationRecord {

  @Event() navigateHome: EventEmitter<void>;

  private goBack = () => {
    this.navigateHome.emit();
  };

  @State() vaccinationData = {
    date: '',
    time: '',
    type: '',
    dose: '',
    batchNumber: '',
    observations: '',
  };

  handleInputChange(event) {
    const { name, value } = event.target;
    this.vaccinationData = { ...this.vaccinationData, [name]: value };
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log('Vaccination Record:', this.vaccinationData);
    // TODO: Implement API call to save the vaccination record
  }

  render() {
    return (
      <Host>
        <form onSubmit={e => this.handleSubmit(e)}>
          <label>
            Date:
            <input type="date" name="date" value={this.vaccinationData.date} onInput={e => this.handleInputChange(e)} />
          </label>
          <label>
            Time:
            <input type="time" name="time" value={this.vaccinationData.time} onInput={e => this.handleInputChange(e)} />
          </label>
          <label>
            Vaccine Type:
            <input type="text" name="type" value={this.vaccinationData.type} onInput={e => this.handleInputChange(e)} />
          </label>
          <label>
            Dose:
            <input type="text" name="dose" value={this.vaccinationData.dose} onInput={e => this.handleInputChange(e)} />
          </label>
          <label>
            Batch Number:
            <input type="text" name="batchNumber" value={this.vaccinationData.batchNumber} onInput={e => this.handleInputChange(e)} />
          </label>
          <label>
            Observations:
            <textarea name="observations" value={this.vaccinationData.observations} onInput={e => this.handleInputChange(e)}></textarea>
          </label>
          <button type="submit">Submit</button>
        </form>
        <md-filled-button onClick={this.goBack}>
          <md-icon slot="icon">arrow_back</md-icon>
          Back to Home
        </md-filled-button>
      </Host>
    );
  }
}
