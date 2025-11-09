import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import '../components/events/club-event-list';

@customElement('club-events-page')
export class ClubEventsPage extends LitElement {
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
  `;

  render() {
    return html`
      <h1>Upcoming Events</h1>
      <club-event-list></club-event-list>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'club-events-page': ClubEventsPage;
  }
}
