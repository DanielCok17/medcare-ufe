import { Component, Host, State, h, Prop } from '@stencil/core';

@Component({
  tag: 'medcare-wl-app',
  styleUrl: 'medcare-wl-app.css',
  shadow: true,
})
export class MedcareWlApp {
  @State() private relativePath = '';
  @Prop() apiBase: string;
  @Prop() basePath: string;

  componentWillLoad() {
    const baseUri = new URL('/', document.baseURI || '/').pathname;

    const toRelative = (path: string) => {
      if (path.startsWith(baseUri)) {
        this.relativePath = path.slice(baseUri.length);
      } else {
        this.relativePath = '';
      }
    };

    window.navigation?.addEventListener('navigate', (ev: Event) => {
      if ((ev as any).canIntercept) {
        (ev as any).intercept();
      }
      let path = new URL((ev as any).destination.url).pathname;
      toRelative(path);
    });

    toRelative(location.pathname);
  }

  private navigateToHome = () => {
    window.navigation.navigate('/');
  };

  render() {
    let componentToRender;

    switch (this.relativePath) {
      case 'medical-records':
        componentToRender = <medcare-medical-records  onNavigateHome={this.navigateToHome} apiBase={this.apiBase} />;
        break;
      case 'vaccination-record':
        componentToRender = <medcare-vaccination-record  onNavigateHome={this.navigateToHome} apiBase={this.apiBase} />;
        break;
      case 'update-lab-results':
        componentToRender = <medcare-update-lab-results  onNavigateHome={this.navigateToHome} apiBase={this.apiBase} />;
        break;
      case 'remove-allergy-records':
        componentToRender = <medcare-remove-allergy-records  onNavigateHome={this.navigateToHome} apiBase={this.apiBase} />;
        break;
      default:
        componentToRender = (
          <div class="menu">
            <h1>MedCare App</h1>
            <ul>
              <li><a href="./medical-records">Medical Records</a></li>
              <li><a href="./vaccination-record">Vaccination Record</a></li>
              <li><a href="./update-lab-results">Update Lab Results</a></li>
              <li><a href="./remove-allergy-records">Remove Allergy Records</a></li>
            </ul>
          </div>
        );
        break;
    }

    return <Host>{componentToRender}</Host>;
  }
}
