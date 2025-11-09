import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('club-landing-page-emerald')
export class ClubLandingPageEmerald extends LitElement {
  static styles = css`
    :host {
      display: block;
      background: linear-gradient(180deg, #f0fdf4 0%, #ffffff 100%);
    }

    .hero {
      position: relative;
      background: linear-gradient(135deg, #059669 0%, #10b981 50%, #34d399 100%);
      color: white;
      padding: 5rem 1.5rem 4rem;
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
        radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
      pointer-events: none;
    }

    .hero-content {
      position: relative;
      max-width: 900px;
      margin: 0 auto;
      z-index: 1;
    }

    .hero h1 {
      font-size: clamp(2.5rem, 5vw, 4rem);
      font-weight: 800;
      margin: 0 0 1.5rem;
      line-height: 1.1;
      letter-spacing: -0.02em;
      background: linear-gradient(to bottom, #ffffff, rgba(255, 255, 255, 0.9));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .hero-subtitle {
      font-size: clamp(1.125rem, 2vw, 1.5rem);
      margin: 0 0 3rem;
      line-height: 1.6;
      color: rgba(255, 255, 255, 0.95);
      font-weight: 400;
      max-width: 700px;
      margin-left: auto;
      margin-right: auto;
    }

    .cta-buttons {
      display: flex;
      gap: 1rem;
      justify-content: center;
      flex-wrap: wrap;
      margin-top: 2rem;
    }

    .cta-buttons wa-button::part(base) {
      font-size: 1.125rem;
      padding: 0.875rem 2rem;
      border-radius: 12px;
      font-weight: 600;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
      transition: all 0.2s ease;
    }

    .cta-buttons wa-button::part(base):hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    }

    .content {
      max-width: 1280px;
      margin: 0 auto;
      padding: 4rem 1.5rem;
    }

    .section {
      margin-bottom: 5rem;
    }

    .section-header {
      text-align: center;
      margin-bottom: 3rem;
    }

    .section-title {
      font-size: clamp(2rem, 3vw, 2.75rem);
      font-weight: 800;
      margin: 0 0 1rem;
      color: #1e293b;
      letter-spacing: -0.02em;
    }

    .section-description {
      font-size: 1.125rem;
      color: #64748b;
      max-width: 700px;
      margin: 0 auto;
      line-height: 1.7;
    }

    .features {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
    }

    wa-card.feature-card {
      text-align: center;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    wa-card.feature-card::part(base) {
      padding: 2.5rem 2rem;
      border-radius: 20px;
      height: 100%;
    }

    wa-card.feature-card:hover {
      transform: translateY(-4px);
    }

    .feature-icon-wrapper {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 80px;
      height: 80px;
      margin-bottom: 1.5rem;
      background: linear-gradient(135deg, #059669, #10b981);
      border-radius: 20px;
      box-shadow: 0 10px 15px -3px rgba(5, 150, 105, 0.3);
    }

    .feature-icon {
      font-size: 2.5rem;
      color: white;
    }

    wa-card.feature-card h3 {
      font-size: 1.5rem;
      font-weight: 700;
      margin: 0 0 1rem;
      color: #1e293b;
    }

    wa-card.feature-card p {
      font-size: 1rem;
      color: #64748b;
      margin: 0;
      line-height: 1.7;
    }

    wa-card.cta-card {
      --wa-panel-border-radius: 24px;
      margin-bottom: 2rem;
      background: linear-gradient(135deg, #065f46 0%, #047857 100%);
      position: relative;
      overflow: hidden;
    }

    wa-card.cta-card::part(body) {
      padding: 4rem 2rem;
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
      font-size: clamp(1.875rem, 3vw, 2.5rem);
      font-weight: 800;
      margin: 0 0 1rem;
      letter-spacing: -0.02em;
      color: white;
    }

    .cta-section-content p {
      font-size: 1.125rem;
      margin: 0 0 2rem;
      opacity: 0.95;
      line-height: 1.7;
      color: white;
    }

    .cta-section-content .cta-buttons {
      margin-top: 2rem;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 2rem;
      margin-top: 3rem;
    }

    wa-card.stat-card {
      --wa-panel-border-radius: 16px;
      text-align: center;
      background: linear-gradient(135deg, #f0fdf4 0%, #ffffff 100%);
      backdrop-filter: blur(10px);
      border: 1px solid #d1fae5;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
    }

    wa-card.stat-card::part(body) {
      padding: 2rem 1.5rem;
      text-align: center;
    }

    .stat-number {
      font-size: 2.5rem;
      font-weight: 800;
      margin: 0 0 0.5rem;
      color: #059669;
      display: block;
    }

    .stat-label {
      font-size: 0.875rem;
      color: #64748b;
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
    'club-landing-page-emerald': ClubLandingPageEmerald;
  }
}
