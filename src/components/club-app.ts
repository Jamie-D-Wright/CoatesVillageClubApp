import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { initRouter } from '../router';
import './layout/club-app-header';

@customElement('club-app')
export class ClubApp extends LitElement {
  static override styles = css`
    :host {
      display: block;
      min-height: 100vh;
      background: white;
    }

    main {
      max-width: 1280px;
      margin: 0 auto;
      min-height: calc(100vh - 64px);
      background: white;
    }

    #router-outlet {
      outline: none;
    }

    #router-outlet:focus-visible {
      outline: 2px solid var(--wa-color-primary-600);
      outline-offset: 4px;
    }
  `;

  override firstUpdated() {
    const outlet = this.renderRoot.querySelector('#router-outlet') as HTMLElement;
    if (outlet) {
      initRouter(outlet);
      
      // Set focus on route changes for accessibility
      window.addEventListener('vaadin-router-location-changed', () => {
        outlet.setAttribute('tabindex', '-1');
        outlet.focus();
      });
    }
  }

  override render() {
    return html`
      <club-app-header></club-app-header>
      <main>
        <div id="router-outlet"></div>
      </main>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'club-app': ClubApp;
  }
}
