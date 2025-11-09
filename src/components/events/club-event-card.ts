import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { Event } from '../../services/types';
import { EventType } from '../../services/types';

@customElement('club-event-card')
export class ClubEventCard extends LitElement {
  static styles = css`
    :host {
      display: block;
      height: 100%;
    }

    wa-card {
      height: 100%;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    wa-card::part(base) {
      padding: 1.75rem;
      border-radius: 20px;
      height: 100%;
      display: flex;
      flex-direction: column;
      border: 1px solid #fecdd3;
      background: linear-gradient(135deg, #ffffff 0%, #fff1f2 100%);
    }

    wa-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    }

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 1rem;
      margin-bottom: 1.25rem;
    }

    .event-title {
      margin: 0;
      font-size: 1.375rem;
      font-weight: 700;
      color: #1e293b;
      line-height: 1.3;
      flex: 1;
    }

    .event-type-badge {
      flex-shrink: 0;
    }

    wa-badge::part(base) {
      font-size: 0.75rem;
      font-weight: 600;
      padding: 0.375rem 0.75rem;
      border-radius: 8px;
      text-transform: uppercase;
      letter-spacing: 0.025em;
    }

    .event-meta {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      margin-bottom: 1.25rem;
      padding: 1rem;
      background: rgba(255, 255, 255, 0.8);
      border-radius: 12px;
      border: 1px solid #f3f4f6;
    }

    .event-date,
    .event-time {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      font-size: 0.9375rem;
      color: #475569;
      font-weight: 500;
    }

    .event-date wa-icon,
    .event-time wa-icon {
      color: #e11d48;
      font-size: 1.125rem;
    }

    .event-description {
      font-size: 1rem;
      line-height: 1.7;
      color: #64748b;
      margin: 0;
      flex: 1;
    }
  `;

  @property({ type: Object })
  event!: Event;

  private formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  private formatTime(time: string): string {
    // Convert 24-hour time to 12-hour format with AM/PM
    const [hoursStr = '0', minutesStr = '0'] = time.split(':');
    const hours = parseInt(hoursStr, 10);
    const minutes = parseInt(minutesStr, 10);
    const period = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;
    return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
  }

  private getEventTypeBadgeClass(type: EventType): string {
    switch (type) {
      case EventType.SpecialEvent:
        return 'brand';
      case EventType.RegularBarNight:
        return 'neutral';
      case EventType.PrivateHire:
        return 'info';
      case EventType.Fundraiser:
        return 'success';
      default:
        return 'neutral';
    }
  }

  private getEventTypeLabel(type: EventType): string {
    switch (type) {
      case EventType.SpecialEvent:
        return 'Special Event';
      case EventType.RegularBarNight:
        return 'Bar Night';
      case EventType.PrivateHire:
        return 'Private Hire';
      case EventType.Fundraiser:
        return 'Fundraiser';
      default:
        return type;
    }
  }

  override render() {
    const formattedDate = this.formatDate(this.event.date);
    const startTime = this.formatTime(this.event.startTime);
    const endTime = this.formatTime(this.event.endTime);

    return html`
      <wa-card>
        <div class="card-header">
          <h3 class="event-title">${this.event.title}</h3>
          <wa-badge 
            class="event-type-badge"
            variant="${this.getEventTypeBadgeClass(this.event.eventType)}"
            aria-label="Event type: ${this.getEventTypeLabel(this.event.eventType)}"
          >
            ${this.getEventTypeLabel(this.event.eventType)}
          </wa-badge>
        </div>
        
        <div class="event-meta">
          <div class="event-date">
            <wa-icon name="calendar"></wa-icon>
            <time datetime="${this.event.date}">${formattedDate}</time>
          </div>
          
          <div class="event-time">
            <wa-icon name="clock"></wa-icon>
            <span>
              <time datetime="${this.event.startTime}">${startTime}</time>
              -
              <time datetime="${this.event.endTime}">${endTime}</time>
            </span>
          </div>
        </div>
        
        <p class="event-description">${this.event.description}</p>
      </wa-card>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'club-event-card': ClubEventCard;
  }
}
