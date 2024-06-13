import { Component, Host, h, State } from '@stencil/core';

@Component({
  tag: 'medcare-remove-allergy-records',
  styleUrl: 'medcare-remove-allergy-records.css',
  shadow: true,
})
export class MedcareRemoveAllergyRecords {

  @State() allergyId: string = '';

  handleInputChange(event) {
    const {  value } = event.target;
    this.allergyId = value;
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log('Remove Allergy Record ID:', this.allergyId);
    // TODO: Implement API call to remove the allergy record
  }

  render() {
    return (
      <Host>
        <form onSubmit={e => this.handleSubmit(e)}>
          <label>
            Allergy Record ID:
            <input type="text" name="allergyId" value={this.allergyId} onInput={e => this.handleInputChange(e)} />
          </label>
          <button type="submit">Remove</button>
        </form>
      </Host>
    );
  }
}
