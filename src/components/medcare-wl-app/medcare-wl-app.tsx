// import { Component, Host, State, h, Prop } from '@stencil/core';

// @Component({
//   tag: 'medcare-wl-app',
//   styleUrl: 'medcare-wl-app.css',
//   shadow: true,
// })
// export class MedcareWlApp {
//   @State() private relativePath = '';
//   @Prop() apiBase: string;
//   @Prop() basePath: string;

//   componentWillLoad() {
//     const baseUri = new URL('/', document.baseURI || '/').pathname;

//     const toRelative = (path: string) => {
//       if (path.startsWith(baseUri)) {
//         this.relativePath = path.slice(baseUri.length);
//       } else {
//         this.relativePath = '';
//       }
//     };

//     window.navigation?.addEventListener('navigate', (ev: Event) => {
//       if ((ev as any).canIntercept) {
//         (ev as any).intercept();
//       }
//       let path = new URL((ev as any).destination.url).pathname;
//       toRelative(path);
//     });

//     toRelative(location.pathname);
//   }

//   private navigateToHome = () => {
//     window.navigation.navigate('/');
//   };

//   render() {
//     let componentToRender;

//     switch (this.relativePath) {
//       case 'medical-records':
//         componentToRender = <medcare-medical-records  onNavigateHome={this.navigateToHome} apiBase={this.apiBase} />;
//         break;
//       case 'vaccination-record':
//         componentToRender = <medcare-vaccination-record  onNavigateHome={this.navigateToHome} apiBase={this.apiBase} />;
//         break;
//       case 'update-lab-results':
//         componentToRender = <medcare-update-lab-results  onNavigateHome={this.navigateToHome} apiBase={this.apiBase} />;
//         break;
//       case 'remove-allergy-records':
//         componentToRender = <medcare-remove-allergy-records  onNavigateHome={this.navigateToHome} apiBase={this.apiBase} />;
//         break;
//       default:
//         componentToRender = (
//           <div class="menu">
//             <h1>MedCare App</h1>
//             <ul>
//               <li><a href="./medical-records">Medical Records</a></li>
//               <li><a href="./vaccination-record">Vaccination Record</a></li>
//               <li><a href="./update-lab-results">Update Lab Results</a></li>
//               <li><a href="./remove-allergy-records">Remove Allergy Records</a></li>
//             </ul>
//           </div>
//         );
//         break;
//     }

//     return <Host>{componentToRender}</Host>;
//   }
// }


import { Component, Host, State, h, Prop, Watch } from '@stencil/core';

@Component({
  tag: 'medcare-wl-app',
  styleUrl: 'medcare-wl-app.css',
  shadow: true,
})
export class MedcareWlApp {
  @State() private relativePath: string = '';
  @Prop() apiBase: string;
  @Prop() basePath: string = '';

  componentWillLoad() {
    console.log('componentWillLoad called');
    const baseUri = new URL(this.basePath || '/', document.baseURI || '/').pathname;

    const toRelative = (path: string) => {
      console.log(`Converting path to relative: ${path}`);
      if (path.startsWith(baseUri)) {
        this.relativePath = path.slice(baseUri.length);
      } else {
        this.relativePath = '';
      }
      console.log(`Updated relativePath: ${this.relativePath}`);
    };

    const handleNavigation = (ev: Event) => {
      console.log('Navigation event triggered');
      if ((ev as any).canIntercept) {
        (ev as any).intercept();
      }
      let path = new URL((ev as any).destination.url).pathname;
      console.log(`Navigation path: ${path}`);
      toRelative(path);
    };

    window.navigation?.addEventListener('navigate', handleNavigation);

    // Initial load
    toRelative(location.pathname);

    // Cleanup event listener on component unload
    window.addEventListener('unload', () => {
      console.log('Removing navigation event listener');
      window.navigation?.removeEventListener('navigate', handleNavigation);
    });
  }

  @Watch('relativePath')
  watchHandler() {
    console.log('relativePath changed:', this.relativePath);
  }

  private navigateTo = (path: string) => {
    console.log(`Navigating to: ${path}`);
    const absolute = new URL(path, new URL(this.basePath, document.baseURI)).pathname;
    window.history.pushState({}, '', absolute);
    window.dispatchEvent(new PopStateEvent('popstate'));
    this.relativePath = path.slice(1); // Update the state manually
  };

  render() {
    console.log(`Rendering component for relativePath: ${this.relativePath}`);
    let componentToRender;

    switch (this.relativePath) {
      case 'medical-records':
        componentToRender = <medcare-medical-records onNavigateHome={() => this.navigateTo('/')} apiBase={this.apiBase} />;
        break;
      case 'vaccination-record':
        componentToRender = <medcare-vaccination-record onNavigateHome={() => this.navigateTo('/')} apiBase={this.apiBase} />;
        break;
      case 'update-lab-results':
        componentToRender = <medcare-update-lab-results onNavigateHome={() => this.navigateTo('/')} apiBase={this.apiBase} />;
        break;
      case 'remove-allergy-records':
        componentToRender = <medcare-remove-allergy-records onNavigateHome={() => this.navigateTo('/')} apiBase={this.apiBase} />;
        break;
      default:
        componentToRender = (
          <div class="menu">
            <h1>MedCare App</h1>
            <ul>
              <li><a href="javascript:void(0);" onClick={() => this.navigateTo('/medical-records')}>Medical Records</a></li>
              <li><a href="javascript:void(0);" onClick={() => this.navigateTo('/vaccination-record')}>Vaccination Record</a></li>
              <li><a href="javascript:void(0);" onClick={() => this.navigateTo('/update-lab-results')}>Update Lab Results</a></li>
              <li><a href="javascript:void(0);" onClick={() => this.navigateTo('/remove-allergy-records')}>Remove Allergy Records</a></li>
            </ul>
          </div>
        );
        break;
    }

    return <Host>{componentToRender}</Host>;
  }
}
