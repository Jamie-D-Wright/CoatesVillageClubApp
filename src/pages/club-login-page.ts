import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import '../components/auth/club-login-form';

@customElement('club-login-page')
export class ClubLoginPage extends LitElement {
  static override styles = css`
    :host {
      display: block;
      padding: var(--spacing-xl, 2rem);
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--wa-color-neutral-50);
    }
  `;

  override render() {
    return html`
      <club-login-form></club-login-form>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'club-login-page': ClubLoginPage;
  }
}
