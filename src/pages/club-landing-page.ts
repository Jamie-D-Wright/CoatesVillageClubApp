import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('club-landing-page')
export class ClubLandingPage extends LitElement {
  static override styles = css`
    :host {
      display: block;
      background: white;
    }

    .hero {
      position: relative;
      background: linear-gradient(135deg, #e11d48 0%, #f43f5e 100%);
      color: white;
      padding: clamp(4rem, 10vh, 8rem) 1.5rem clamp(3rem, 8vh, 6rem);
      text-align: center;
      overflow: hidden;
    }

    .hero::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: 
        radial-gradient(circle at 30% 40%, rgba(255, 255, 255, 0.08) 0%, transparent 60%),
        radial-gradient(circle at 70% 70%, rgba(255, 255, 255, 0.06) 0%, transparent 60%);
      pointer-events: none;
    }

    .hero-content {
      position: relative;
      max-width: 800px;
      margin: 0 auto;
      z-index: 1;
    }

    .hero h1 {
      font-size: clamp(2.5rem, 6vw, 4.5rem);
      font-weight: 700;
      margin: 0 0 1.25rem;
      line-height: 1.1;
      letter-spacing: -0.03em;
      color: white;
    }

    .hero-subtitle {
      font-size: clamp(1.125rem, 2.5vw, 1.375rem);
      margin: 0 0 2.5rem;
      line-height: 1.7;
      color: rgba(255, 255, 255, 0.92);
      font-weight: 400;
      max-width: 650px;
      margin-left: auto;
      margin-right: auto;
    }

    .cta-buttons {
      display: flex;
      gap: 1rem;
      justify-content: center;
      flex-wrap: wrap;
      margin-top: 2.5rem;
    }

    .cta-buttons wa-button::part(base) {
      font-size: 1rem;
      padding: 0.875rem 2rem;
      border-radius: 10px;
      font-weight: 600;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
      transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .cta-buttons wa-button::part(base):hover {
      transform: translateY(-1px);
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
    }

    .content {
      max-width: 1200px;
      margin: 0 auto;
      padding: clamp(3rem, 8vh, 5rem) 1.5rem;
    }

    .section {
      margin-bottom: clamp(4rem, 10vh, 6rem);
    }

    .section-header {
      text-align: center;
      margin-bottom: clamp(2.5rem, 6vh, 4rem);
    }

    .section-title {
      font-size: clamp(2rem, 4vw, 3rem);
      font-weight: 700;
      margin: 0 0 1rem;
      color: #1f2937;
      letter-spacing: -0.025em;
    }

    .section-description {
      font-size: clamp(1rem, 2vw, 1.125rem);
      color: #6b7280;
      max-width: 650px;
      margin: 0 auto;
      line-height: 1.7;
    }

    .features {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 2rem;
    }

    wa-card.feature-card {
      text-align: center;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    wa-card.feature-card::part(base) {
      padding: 2.5rem 2rem;
      border-radius: 16px;
      height: 100%;
      border: 1px solid #f3f4f6;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
    }

    wa-card.feature-card:hover {
      transform: translateY(-6px);
      box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08);
      border-color: #fee2e2;
    }

    .feature-icon-wrapper {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 72px;
      height: 72px;
      margin-bottom: 1.5rem;
      background: linear-gradient(135deg, #e11d48, #f43f5e);
      border-radius: 16px;
      box-shadow: 0 8px 16px rgba(225, 29, 72, 0.2);
    }

    .feature-icon {
      font-size: 2rem;
      color: white;
    }

    wa-card.feature-card h3 {
      font-size: 1.375rem;
      font-weight: 600;
      margin: 0 0 0.875rem;
      color: #1f2937;
    }

    wa-card.feature-card p {
      font-size: 0.9375rem;
      color: #6b7280;
      margin: 0;
      line-height: 1.7;
    }

    wa-card.cta-card {
      --wa-panel-border-radius: 20px;
      margin-bottom: 3rem;
      background: linear-gradient(135deg, #1f2937 0%, #374151 100%);
      position: relative;
      overflow: hidden;
      border: 1px solid rgba(255, 255, 255, 0.1);
    }

    wa-card.cta-card::part(body) {
      padding: clamp(3rem, 8vh, 5rem) 2rem;
      text-align: center;
    }

    .cta-section-content {
      position: relative;
      z-index: 1;
      max-width: 700px;
      margin: 0 auto;
      color: white;
      text-align: center;
    }

    .cta-section-content h2 {
      font-size: clamp(1.875rem, 4vw, 2.75rem);
      font-weight: 700;
      margin: 0 0 1rem;
      letter-spacing: -0.025em;
      color: white;
    }

    .cta-section-content p {
      font-size: clamp(1rem, 2vw, 1.125rem);
      margin: 0 0 2rem;
      opacity: 0.9;
      line-height: 1.7;
      color: white;
    }

    .cta-section-content .cta-buttons {
      margin-top: 2rem;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: 1.5rem;
      margin-top: 3rem;
    }

    wa-card.stat-card {
      --wa-panel-border-radius: 16px;
      text-align: center;
      background: white;
      border: 1px solid #f3f4f6;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
      transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
    }

    wa-card.stat-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.08);
      border-color: #fee2e2;
    }

    wa-card.stat-card::part(body) {
      padding: 2rem 1.5rem;
      text-align: center;
    }

    .stat-number {
      font-size: 2.5rem;
      font-weight: 700;
      margin: 0 0 0.5rem;
      color: #e11d48;
      display: block;
    }

    .stat-label {
      font-size: 0.875rem;
      color: #6b7280;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      font-weight: 600;
      display: block;
    }

    @media (max-width: 768px) {
      .hero {
        padding: 3rem 1rem 2.5rem;
      }

      .cta-buttons {
        flex-direction: column;
        align-items: stretch;
      }

      .features {
        grid-template-columns: 1fr;
      }

      .cta-section {
        padding: 3rem 1.5rem;
      }

      .stats-grid {
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
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

  override render() {
    return html`
      <div class="hero">
        <div class="hero-content">
          <h1>Welcome to Coates Village Club</h1>
          <p class="hero-subtitle">
            Your vibrant community hub bringing people together through events, 
            activities, and shared experiences. Join us for quiz nights, live music, 
            fundraisers, and create lasting memories with your neighbors.
          </p>
          <div class="cta-buttons">
            <wa-button variant="primary" size="large" @click=${this.handleViewEvents}>
              <wa-icon name="calendar" slot="prefix"></wa-icon>
              Explore Events
            </wa-button>
            <wa-button variant="default" size="large" @click=${this.handleLogin}>
              <wa-icon name="right-to-bracket" slot="prefix"></wa-icon>
              Member Login
            </wa-button>
          </div>
        </div>
      </div>

      <div class="content">
        <section class="section">
          <div class="section-header">
            <h2 class="section-title">What Makes Us Special</h2>
            <p class="section-description">
              We're more than just a club – we're a community that celebrates 
              connection, creativity, and collaboration.
            </p>
          </div>
          
          <div class="features">
            <wa-card class="feature-card">
              <div class="feature-icon-wrapper">
                <wa-icon name="calendar-days" class="feature-icon"></wa-icon>
              </div>
              <h3>Exciting Events</h3>
              <p>
                From quiz nights to live music performances, we host a diverse 
                range of events throughout the year for all ages and interests.
              </p>
            </wa-card>

            <wa-card class="feature-card">
              <div class="feature-icon-wrapper">
                <wa-icon name="users" class="feature-icon"></wa-icon>
              </div>
              <h3>Community Spirit</h3>
              <p>
                Connect with neighbors, forge new friendships, and strengthen 
                our local community through shared experiences and memories.
              </p>
            </wa-card>

            <wa-card class="feature-card">
              <div class="feature-icon-wrapper">
                <wa-icon name="hand-holding-heart" class="feature-icon"></wa-icon>
              </div>
              <h3>Volunteer & Grow</h3>
              <p>
                Get involved by volunteering at events, managing the bar, or 
                helping with operations. Make a real difference in your community.
              </p>
            </wa-card>
          </div>
        </section>

        <section class="section">
          <wa-card class="cta-card">
            <div class="cta-section-content">
              <h2>Ready to Get Involved?</h2>
              <p>
                Whether you're looking to attend events, volunteer your time, or 
                become a committee member, there are many ways to be part of 
                Coates Village Club. Join us today and experience the difference 
                community makes.
              </p>
              <div class="cta-buttons">
                <wa-button variant="primary" size="large" @click=${this.handleViewEvents}>
                  <wa-icon name="calendar-check" slot="prefix"></wa-icon>
                  Browse Events
                </wa-button>
                <wa-button variant="default" size="large" @click=${this.handleLogin}>
                  <wa-icon name="user-plus" slot="prefix"></wa-icon>
                  Sign In
                </wa-button>
              </div>
            </div>
          </wa-card>

          <div class="stats-grid">
            <wa-card class="stat-card">
              <div class="stat-number">50+</div>
              <div class="stat-label">Annual Events</div>
            </wa-card>
            <wa-card class="stat-card">
              <div class="stat-number">200+</div>
              <div class="stat-label">Active Members</div>
            </wa-card>
            <wa-card class="stat-card">
              <div class="stat-number">15</div>
              <div class="stat-label">Years Strong</div>
            </wa-card>
          </div>
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
