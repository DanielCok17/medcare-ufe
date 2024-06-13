import { Component, Host, Event, h, State , EventEmitter} from '@stencil/core';

@Component({
  tag: 'medcare-medical-records',
  styleUrl: 'medcare-medical-records.css',
  shadow: true,
})
export class MedcareMedicalRecords {
  @State() medicalRecords: any[] = [];

  private async fetchMedicalRecords() {
    // Replace with actual API call
    this.medicalRecords = await Promise.resolve([
      { id: 1, condition: 'Diabetes', treatment: 'Insulin', history: 'Long-term' },
      { id: 2, condition: 'Hypertension', treatment: 'Beta Blockers', history: 'Moderate' },
    ]);
  }

  @Event() navigateHome: EventEmitter<void>;

  private goBack = () => {
    this.navigateHome.emit();
  };

  async componentWillLoad() {
    await this.fetchMedicalRecords();
  }

  render() {
    return (
      <Host>
        <div>
          <h2>Specialized Medical Records</h2>
          <ul>
            {this.medicalRecords.map(record => (
              <li key={record.id}>
                <h3>{record.condition}</h3>
                <p>Treatment: {record.treatment}</p>
                <p>History: {record.history}</p>
              </li>
            ))}
          </ul>
          <md-filled-button onClick={this.goBack}>
            <md-icon slot="icon">arrow_back</md-icon>
            Back to Home
          </md-filled-button>
        </div>
      </Host>
    );
  }
}
