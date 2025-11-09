import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import '../components/events/club-event-list';

@customElement('club-events-page')
export class ClubEventsPage extends LitElement {
  static override styles = css`
    :host {
      display: block;
      background: white;
    }

    .hero {
      position: relative;
      background: linear-gradient(135deg, #e11d48 0%, #f43f5e 100%);
      color: white;
      padding: clamp(3.5rem, 8vh, 6rem) 1.5rem clamp(2.5rem, 6vh, 4rem);
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
      font-size: clamp(2.25rem, 5vw, 3.5rem);
      font-weight: 700;
      margin: 0 0 1rem;
      line-height: 1.1;
      letter-spacing: -0.025em;
      color: white;
    }

    .hero-subtitle {
      font-size: clamp(1rem, 2vw, 1.25rem);
      margin: 0;
      line-height: 1.7;
      color: rgba(255, 255, 255, 0.92);
      font-weight: 400;
      max-width: 650px;
      margin-left: auto;
      margin-right: auto;
    }

    .content {
      max-width: 1200px;
      margin: 0 auto;
      padding: clamp(2.5rem, 6vh, 4rem) 1.5rem;
    }

    @media (max-width: 768px) {
      .hero {
        padding: 2.5rem 1rem 2rem;
      }
    }
  `;

  override render() {
    return html`
      <div class="hero">
        <div class="hero-content">
          <h1>Upcoming Events</h1>
          <p class="hero-subtitle">
            Discover exciting events happening at Coates Village Club.
            Join us for entertainment, community, and unforgettable experiences.
          </p>
        </div>
      </div>
      
      <div class="content">
        <club-event-list></club-event-list>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'club-events-page': ClubEventsPage;
  }
}
