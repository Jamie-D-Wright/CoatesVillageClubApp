import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import '../components/events/club-event-list';

@customElement('club-events-page')
export class ClubEventsPage extends LitElement {
  static styles = css`
    :host {
      display: block;
      background: linear-gradient(180deg, #fff1f2 0%, #ffffff 100%);
    }

    .hero {
      position: relative;
      background: linear-gradient(135deg, #be123c 0%, #e11d48 50%, #f43f5e 100%);
      color: white;
      padding: 4rem 1.5rem 3rem;
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
      font-size: clamp(2rem, 4vw, 3rem);
      font-weight: 800;
      margin: 0 0 1rem;
      line-height: 1.1;
      letter-spacing: -0.02em;
      background: linear-gradient(to bottom, #ffffff, rgba(255, 255, 255, 0.9));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .hero-subtitle {
      font-size: clamp(1rem, 1.5vw, 1.25rem);
      margin: 0;
      line-height: 1.6;
      color: rgba(255, 255, 255, 0.95);
      font-weight: 400;
      max-width: 600px;
      margin-left: auto;
      margin-right: auto;
    }

    .content {
      max-width: 1280px;
      margin: 0 auto;
      padding: 3rem 1.5rem;
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
