import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('club-stock-alerts-page')
export class ClubStockAlertsPage extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: var(--spacing-xl, 2rem);
    }

    h1 {
      margin: 0 0 var(--spacing-lg, 1.5rem) 0;
      font-size: var(--font-size-2xl, 1.5rem);
      font-weight: var(--font-weight-bold, 700);
    }

    .placeholder {
      padding: var(--spacing-xl, 2rem);
      text-align: center;
      color: var(--wa-color-neutral-600);
    }
  `;

  render() {
    return html`
      <h1>Stock Alerts</h1>
      <wa-card>
        <div class="placeholder">
          <wa-icon name="box" style="font-size: 3rem; margin-bottom: 1rem;"></wa-icon>
          <p>View and manage bar stock alerts</p>
          <p><em>Coming soon...</em></p>
        </div>
      </wa-card>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'club-stock-alerts-page': ClubStockAlertsPage;
  }
}
