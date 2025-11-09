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
      --padding: var(--spacing-lg, 1.5rem);
    }

    .event-title {
      margin: 0;
      font-size: var(--font-size-lg, 1.125rem);
      font-weight: var(--font-weight-semibold, 600);
    }

    .event-date,
    .event-time {
      display: flex;
      align-items: center;
      gap: var(--spacing-2, 0.5rem);
      font-size: var(--font-size-sm, 0.875rem);
      color: var(--wa-color-neutral-600);
      margin-bottom: var(--spacing-3, 0.75rem);
    }

    .event-description {
      font-size: var(--font-size-base, 1rem);
      line-height: var(--line-height-relaxed, 1.75);
      margin-top: var(--spacing-4, 1rem);
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
    const [hours, minutes] = time.split(':').map(Number);
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

  render() {
    const formattedDate = this.formatDate(this.event.date);
    const startTime = this.formatTime(this.event.startTime);
    const endTime = this.formatTime(this.event.endTime);

    return html`
      <wa-card>
        <div slot="header" style="display: flex; justify-content: space-between; align-items: center;">
          <h3 class="event-title">${this.event.title}</h3>
          <wa-badge 
            variant="${this.getEventTypeBadgeClass(this.event.eventType)}"
            aria-label="Event type: ${this.getEventTypeLabel(this.event.eventType)}"
          >
            ${this.getEventTypeLabel(this.event.eventType)}
          </wa-badge>
        </div>
        
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
