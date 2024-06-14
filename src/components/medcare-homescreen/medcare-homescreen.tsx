import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'medcare-homescreen',
  styleUrl: 'medcare-homescreen.css',
  shadow: true,
})
export class MedcareHomescreen {
  @Prop() apiBase: string;
  @Prop() basePath: string;

  render() {
    return (
      <div class="container">
        <medcare-medical-records api-base={this.apiBase} base-path={this.basePath}></medcare-medical-records>
        <medcare-vaccination-record api-base={this.apiBase} base-path={this.basePath}></medcare-vaccination-record>
        <medcare-update-lab-results api-base={this.apiBase} base-path={this.basePath}></medcare-update-lab-results>
        <medcare-remove-allergy-records api-base={this.apiBase} base-path={this.basePath}></medcare-remove-allergy-records>
      </div>
    );
  }

}

