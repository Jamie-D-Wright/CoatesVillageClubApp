import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { authService } from '../../services/auth-service';
import type { LoginCredentials } from '../../services/auth-service';

@customElement('club-login-form')
export class ClubLoginForm extends LitElement {
  static override styles = css`
    :host {
      display: block;
      max-width: 400px;
      margin: 0 auto;
    }

    .login-container {
      padding: var(--spacing-xl, 2rem);
    }

    h2 {
      margin: 0 0 var(--spacing-lg, 1.5rem) 0;
      font-size: var(--font-size-2xl, 1.5rem);
      font-weight: var(--font-weight-bold, 700);
      text-align: center;
    }

    .form-field {
      margin-bottom: var(--spacing-lg, 1.5rem);
    }

    label {
      display: block;
      margin-bottom: var(--spacing-2, 0.5rem);
      font-size: var(--font-size-sm, 0.875rem);
      font-weight: var(--font-weight-medium, 500);
    }

    wa-input {
      width: 100%;
    }

    .actions {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-4, 1rem);
      margin-top: var(--spacing-xl, 2rem);
    }

    .error-message {
      padding: var(--spacing-4, 1rem);
      background: var(--wa-color-danger-50);
      border: 1px solid var(--wa-color-danger-200);
      border-radius: 4px;
      color: var(--wa-color-danger-800);
      font-size: var(--font-size-sm, 0.875rem);
      margin-bottom: var(--spacing-4, 1rem);
    }

    .demo-info {
      margin-top: var(--spacing-lg, 1.5rem);
      padding: var(--spacing-4, 1rem);
      background: var(--wa-color-info-50);
      border: 1px solid var(--wa-color-info-200);
      border-radius: 4px;
      font-size: var(--font-size-sm, 0.875rem);
      color: var(--wa-color-info-800);
    }

    .demo-info h3 {
      margin: 0 0 var(--spacing-2, 0.5rem) 0;
      font-size: var(--font-size-base, 1rem);
      font-weight: var(--font-weight-semibold, 600);
    }

    .demo-info ul {
      margin: var(--spacing-2, 0.5rem) 0 0 0;
      padding-left: var(--spacing-lg, 1.5rem);
    }

    .demo-info li {
      margin-bottom: var(--spacing-1, 0.25rem);
    }
  `;

  @state()
  private email = '';

  @state()
  private password = '';

  @state()
  private loading = false;

  @state()
  private error = '';

  private async handleSubmit(e: Event) {
    e.preventDefault();
    
    this.error = '';
    this.loading = true;

    try {
      const credentials: LoginCredentials = {
        email: this.email,
        password: this.password,
      };

      await authService.login(credentials);
      
      // Dispatch event for app to handle navigation
      window.dispatchEvent(new CustomEvent('auth-changed', {
        detail: { user: authService.getCurrentUser() }
      }));

      // Navigation will be handled by the router guard
      window.location.href = '/events';
    } catch (err) {
      this.error = err instanceof Error ? err.message : 'Login failed';
    } finally {
      this.loading = false;
    }
  }

  private handleEmailInput(e: Event) {
    this.email = (e.target as HTMLInputElement).value;
  }

  private handlePasswordInput(e: Event) {
    this.password = (e.target as HTMLInputElement).value;
  }

  override render() {
    return html`
      <wa-card class="login-container">
        <h2>Sign In</h2>
        
        ${this.error ? html`
          <div class="error-message" role="alert">
            ${this.error}
          </div>
        ` : ''}

        <form @submit=${this.handleSubmit}>
          <div class="form-field">
            <label for="email">Email</label>
            <wa-input
              id="email"
              type="email"
              placeholder="your.email@example.com"
              .value=${this.email}
              @wa-input=${this.handleEmailInput}
              required
              ?disabled=${this.loading}
            ></wa-input>
          </div>

          <div class="form-field">
            <label for="password">Password</label>
            <wa-input
              id="password"
              type="password"
              placeholder="Enter your password"
              .value=${this.password}
              @wa-input=${this.handlePasswordInput}
              required
              ?disabled=${this.loading}
            ></wa-input>
          </div>

          <div class="actions">
            <wa-button
              type="submit"
              variant="primary"
              ?loading=${this.loading}
              ?disabled=${this.loading || !this.email || !this.password}
              style="width: 100%;"
            >
              ${this.loading ? 'Signing in...' : 'Sign In'}
            </wa-button>
          </div>
        </form>

        <div class="demo-info">
          <h3>Demo Accounts</h3>
          <p>Use any password with these email patterns:</p>
          <ul>
            <li><strong>committee@example.com</strong> - Committee access (full admin)</li>
            <li><strong>volunteer@example.com</strong> - Volunteer access</li>
            <li><strong>member@example.com</strong> - Member access</li>
          </ul>
        </div>
      </wa-card>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'club-login-form': ClubLoginForm;
  }
}
