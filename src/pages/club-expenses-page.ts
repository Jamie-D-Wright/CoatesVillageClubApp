import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('club-expenses-page')
export class ClubExpensesPage extends LitElement {
  static override styles = css`
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

  override render() {
    return html`
      <h1>Expense Claims</h1>
      <wa-card>
        <div class="placeholder">
          <wa-icon name="receipt" style="font-size: 3rem; margin-bottom: 1rem;"></wa-icon>
          <p>Submit and manage expense claims</p>
          <p><em>Coming soon...</em></p>
        </div>
      </wa-card>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'club-expenses-page': ClubExpensesPage;
  }
}
