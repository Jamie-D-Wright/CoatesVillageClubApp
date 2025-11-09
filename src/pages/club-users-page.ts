import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('club-users-page')
export class ClubUsersPage extends LitElement {
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

    .admin-badge {
      display: inline-block;
      margin-left: var(--spacing-2, 0.5rem);
    }
  `;

  override render() {
    return html`
      <h1>
        User Management
        <wa-badge variant="danger" class="admin-badge">Admin Only</wa-badge>
      </h1>
      <wa-card>
        <div class="placeholder">
          <wa-icon name="users" style="font-size: 3rem; margin-bottom: 1rem;"></wa-icon>
          <p>Manage club members and permissions</p>
          <p><em>Coming soon...</em></p>
        </div>
      </wa-card>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'club-users-page': ClubUsersPage;
  }
}
