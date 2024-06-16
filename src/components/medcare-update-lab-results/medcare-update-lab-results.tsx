// import { Component, Host, State, h, Prop } from '@stencil/core';
// import { LabResultsApiFactory, LabResult } from '../../api/medcare-api';
// import axios from 'axios';

// @Component({
//   tag: 'medcare-update-lab-results',
//   styleUrl: 'medcare-update-lab-results.css',
//   shadow: true,
// })
// export class MedcareUpdateLabResults {
//   @State() labResults: LabResult[] = [];
//   @Prop() apiBase: string;
//   @Prop() onNavigateHome: () => void;

//   private async fetchLabResults() {
//     try {
//       const response = await LabResultsApiFactory(undefined, this.apiBase, axios).getAllLabResults();
//       this.labResults = response.data;
//     } catch (error) {
//       console.error('Error fetching lab results:', error);
//     }
//   }

//   private async updateLabResult(resultId: string, updatedResult: LabResult) {
//     try {
//       await LabResultsApiFactory(undefined, this.apiBase, axios).updateLabResult(resultId, updatedResult);
//       await this.fetchLabResults();
//     } catch (error) {
//       console.error('Error updating lab result:', error);
//     }
//   }

//   async componentWillLoad() {
//     await this.fetchLabResults();
//   }

//   private handleInputChange(event: Event, result: LabResult) {
//     const target = event.target as HTMLInputElement;
//     const name = target.name;
//     const value = target.value;

//     this.labResults = this.labResults.map(r => {
//       if (r.id === result.id) {
//         return { ...r, [name]: value };
//       }
//       return r;
//     });
//   }

//   private handleSubmit(event: Event, result: LabResult) {
//     event.preventDefault();
//     this.updateLabResult(result.id, result);
//   }

//   render() {
//     return (
//       <Host>
//         <div>
//           <h2>Lab Results</h2>
//           <ul>
//             {this.labResults.map(result => (
//               <li key={result.id}>
//                 <h3>{result.testType}</h3>
//                 <form onSubmit={event => this.handleSubmit(event, result)}>
//                   <label>
//                     Test Type:
//                     <input name="testType" type="text" value={result.testType} onInput={event => this.handleInputChange(event, result)} />
//                   </label>
//                   <label>
//                     Result:
//                     <input name="result" type="text" value={result.result} onInput={event => this.handleInputChange(event, result)} />
//                   </label>
//                   <button type="submit">Submit</button>
//                 </form>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </Host>
//     );
//   }
// }

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
  @State() errorMessage: string | null = null;

  private async fetchLabResults() {
    try {
      const response = await LabResultsApiFactory(undefined, this.apiBase, axios).getAllLabResults();
      this.labResults = response.data;
      this.errorMessage = null;
    } catch (error) {
      console.error('Error fetching lab results:', error);
      this.errorMessage = 'Error fetching allergy records. Please try again later.';
    }
  }

  private async updateLabResult(resultId: string, updatedResult: LabResult) {
    try {
      await LabResultsApiFactory(undefined, this.apiBase, axios).updateLabResult(resultId, updatedResult);
      await this.fetchLabResults();
      this.errorMessage = null;
    } catch (error) {
      console.error('Error updating lab result:', error);
      this.errorMessage = 'Error fetching allergy records. Please try again later.';
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
        <div class="container">
          <h2>Lab Results</h2>
          {this.errorMessage && <p class="error-message">{this.errorMessage}</p>}
          <p class="description">
            Doplnenie výsledkov laboratórnych testov do existujúceho záznamu
          </p>
          <p class="scenario">
            Scenár: Po prijatí výsledkov laboratórnych testov, ktoré boli vykonané v rámci diagnostického procesu, je potrebné tieto výsledky doplniť do relevantného existujúceho záznamu v lekárskej dokumentácii pacienta. Aktualizácia záznamu zabezpečí, že všetky informácie sú aktuálne a na jednom mieste.
          </p>
          <ul class="record-list">
            {this.labResults.map(result => (
              <li key={result.id} class="record-item">
                <h3>{result.testType}</h3>
                <form onSubmit={event => this.handleSubmit(event, result)} class="form">
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
          <p class="endpoint-info">
            Tento komponent využíva endpointy <code>/lab-results</code> pre GET a <code>/lab-results/{'{id}'}</code> pre PUT požiadavky.
          </p>
        </div>
      </Host>
    );
  }
}
