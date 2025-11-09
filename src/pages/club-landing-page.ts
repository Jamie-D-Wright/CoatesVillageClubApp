import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('club-landing-page')
export class ClubLandingPage extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .hero {
      background: linear-gradient(135deg, var(--wa-color-primary-600, #1e40af) 0%, var(--wa-color-primary-700, #1e3a8a) 100%);
      color: white;
      padding: var(--spacing-xl, 3rem) var(--spacing-lg, 1.5rem);
      text-align: center;
      margin: calc(var(--spacing-xl, 2rem) * -1) calc(var(--spacing-xl, 2rem) * -1) var(--spacing-xl, 2rem);
    }

    .hero h1 {
      font-size: var(--font-size-3xl, 2.25rem);
      font-weight: var(--font-weight-bold, 700);
      margin: 0 0 var(--spacing-4, 1rem);
    }

    .hero p {
      font-size: var(--font-size-lg, 1.125rem);
      margin: 0 0 var(--spacing-lg, 1.5rem);
      opacity: 0.95;
      max-width: 600px;
      margin-left: auto;
      margin-right: auto;
    }

    .cta-buttons {
      display: flex;
      gap: var(--spacing-4, 1rem);
      justify-content: center;
      flex-wrap: wrap;
      margin-top: var(--spacing-lg, 1.5rem);
    }

    .content {
      max-width: 1280px;
      margin: 0 auto;
      padding: 0 var(--spacing-lg, 1.5rem) var(--spacing-xl, 2rem);
      background: #ffffff;
    }

    .section {
      margin-bottom: var(--spacing-xl, 3rem);
    }

    .section h2 {
      font-size: var(--font-size-2xl, 1.875rem);
      font-weight: var(--font-weight-bold, 700);
      margin: 0 0 var(--spacing-lg, 1.5rem);
      color: var(--wa-color-neutral-900, #1f2937);
    }

    .features {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: var(--spacing-lg, 1.5rem);
      margin-top: var(--spacing-lg, 1.5rem);
    }

    .feature-card {
      text-align: center;
      padding: var(--spacing-lg, 1.5rem);
    }

    .feature-icon {
      font-size: 3rem;
      margin-bottom: var(--spacing-4, 1rem);
      color: var(--wa-color-primary-600, #1e40af);
    }

    .feature-card h3 {
      font-size: var(--font-size-lg, 1.125rem);
      font-weight: var(--font-weight-semibold, 600);
      margin: 0 0 var(--spacing-3, 0.75rem);
      color: var(--wa-color-neutral-900, #1f2937);
    }

    .feature-card p {
      font-size: var(--font-size-base, 1rem);
      color: var(--wa-color-neutral-600, #6b7280);
      margin: 0;
      line-height: 1.6;
    }

    @media (max-width: 768px) {
      .hero h1 {
        font-size: var(--font-size-2xl, 1.875rem);
      }

      .hero p {
        font-size: var(--font-size-base, 1rem);
      }

      .cta-buttons {
        flex-direction: column;
        align-items: stretch;
      }

      .features {
        grid-template-columns: 1fr;
      }
    }
  `;

  private handleViewEvents() {
    window.history.pushState({}, '', '/events');
    window.dispatchEvent(new PopStateEvent('popstate'));
  }

  private handleLogin() {
    window.history.pushState({}, '', '/login');
    window.dispatchEvent(new PopStateEvent('popstate'));
  }

  render() {
    return html`
      <div class="hero">
        <h1>Welcome to Coates Village Club</h1>
        <p>
          Your local community hub for events, activities, and connections.
          Join us for quiz nights, live music, fundraisers, and more!
        </p>
        <div class="cta-buttons">
          <wa-button variant="primary" size="large" @click=${this.handleViewEvents}>
            <wa-icon name="calendar" slot="prefix"></wa-icon>
            View Events
          </wa-button>
          <wa-button variant="default" size="large" @click=${this.handleLogin}>
            <wa-icon name="right-to-bracket" slot="prefix"></wa-icon>
            Member Login
          </wa-button>
        </div>
      </div>

      <div class="content">
        <section class="section">
          <h2>What We Offer</h2>
          <div class="features">
            <wa-card class="feature-card">
              <div class="feature-icon">
                <wa-icon name="calendar-days"></wa-icon>
              </div>
              <h3>Regular Events</h3>
              <p>
                From quiz nights to live music performances, we host exciting events
                throughout the year for all members of the community.
              </p>
            </wa-card>

            <wa-card class="feature-card">
              <div class="feature-icon">
                <wa-icon name="users"></wa-icon>
              </div>
              <h3>Community Spirit</h3>
              <p>
                Connect with neighbors, make new friends, and strengthen our
                local community through shared experiences.
              </p>
            </wa-card>

            <wa-card class="feature-card">
              <div class="feature-icon">
                <wa-icon name="hand-holding-heart"></wa-icon>
              </div>
              <h3>Volunteer Opportunities</h3>
              <p>
                Get involved by volunteering at events, managing the bar, or
                helping with club operations.
              </p>
            </wa-card>
          </div>
        </section>

        <section class="section">
          <h2>Get Involved</h2>
          <wa-card>
            <div style="padding: var(--spacing-lg, 1.5rem);">
              <p style="margin: 0 0 var(--spacing-4, 1rem); font-size: var(--font-size-base, 1rem); color: var(--wa-color-neutral-700);">
                Whether you're looking to attend events, volunteer your time, or become a
                committee member, there are many ways to be part of Coates Village Club.
              </p>
              <div style="display: flex; gap: var(--spacing-4, 1rem); flex-wrap: wrap;">
                <wa-button variant="primary" @click=${this.handleViewEvents}>
                  Browse Events
                </wa-button>
                <wa-button variant="default" @click=${this.handleLogin}>
                  Sign In
                </wa-button>
              </div>
            </div>
          </wa-card>
        </section>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'club-landing-page': ClubLandingPage;
  }
}
