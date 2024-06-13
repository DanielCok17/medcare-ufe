import { newSpecPage } from '@stencil/core/testing';
import { MedcareRecordEditor } from '../medcare-record-editor';

describe('medcare-record-editor', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [MedcareRecordEditor],
      html: `<medcare-record-editor></medcare-record-editor>`,
    });
    expect(page.root).toEqualHtml(`
      <medcare-record-editor>
        <mock:shadow-root>
          <md-filled-text-field label="Meno a Priezvisko">
            <md-icon slot="leading-icon">
              person
            </md-icon>
          </md-filled-text-field>
          <md-filled-text-field label="Registračné číslo pacienta">
            <md-icon slot="leading-icon">
              fingerprint
            </md-icon>
          </md-filled-text-field>
          <md-filled-text-field disabled="" label="Čakáte od">
            <md-icon slot="leading-icon">
              watch_later
            </md-icon>
          </md-filled-text-field>
          <md-filled-select label="Dôvod návštevy">
            <md-icon slot="leading-icon">
              sick
            </md-icon>
            <md-select-option value="followup">
              <div slot="headline">
                Kontrola
              </div>
            </md-select-option>
            <md-select-option value="nausea">
              <div slot="headline">
                Nevoľnosť
              </div>
            </md-select-option>
            <md-select-option value="fever">
              <div slot="headline">
                Horúčka
              </div>
            </md-select-option>
            <md-select-option value="ache-in-throat">
              <div slot="headline">
                Bolesti hrdla
              </div>
            </md-select-option>
          </md-filled-select>
          <div class="duration-slider">
            <span class="label">
              Predpokladaná doba trvania:
            </span>
            <span class="label">
              15
            </span>
            <span class="label">
              minút
            </span>
            <md-slider labeled="" max="45" min="2" ticks="" value="15"></md-slider>
          </div>
          <md-divider></md-divider>
          <div class="actions">
            <md-filled-tonal-button id="delete">
              <md-icon slot="icon">
                delete
              </md-icon>
              Zmazať
            </md-filled-tonal-button>
            <span class="stretch-fill"></span>
            <md-outlined-button id="cancel">
              Zrušiť
            </md-outlined-button>
            <md-filled-button id="confirm">
              <md-icon slot="icon">
                save
              </md-icon>
              Uložiť
            </md-filled-button>
          </div>
        </mock:shadow-root>
      </medcare-record-editor>
    `);
  });
});
