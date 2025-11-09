import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { Event } from '../../services/types';
import { EventType } from '../../services/types';

interface EventsByMonth {
  [key: string]: Event[];
}

@customElement('club-event-timeline')
export class ClubEventTimeline extends LitElement {
  static override styles = css`
    :host {
      display: block;
      background: white;
    }

    .timeline-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem 1rem;
    }

    .month-section {
      margin-bottom: 3rem;
      position: relative;
    }

    .month-header {
      display: flex;
      align-items: center;
      gap: 0.875rem;
      margin-bottom: 2rem;
      padding: 1rem 1.25rem;
      background: linear-gradient(135deg, var(--wa-color-primary-50, #fef2f2) 0%, white 100%);
      border-radius: 12px;
      border-left: 4px solid var(--wa-color-primary-600, #e11d48);
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
    }

    .month-icon {
      font-size: 1.75rem;
      color: var(--wa-color-primary-600, #e11d48);
    }

    .month-title {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--wa-color-neutral-900, #111827);
      margin: 0;
      letter-spacing: -0.02em;
    }

    .events-timeline {
      position: relative;
      padding-left: 2rem;
    }

    /* Vertical timeline line */
    .events-timeline::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 2px;
      background: linear-gradient(180deg, 
        var(--wa-color-primary-300, #fda4af) 0%,
        var(--wa-color-primary-500, #f43f5e) 50%, 
        var(--wa-color-primary-600, #e11d48) 100%);
      opacity: 0.6;
    }

    .timeline-event {
      position: relative;
      margin-bottom: 2rem;
      padding-left: 2rem;
    }

    /* Timeline dot */
    .timeline-event::before {
      content: '';
      position: absolute;
      left: -2.35rem;
      top: 0.75rem;
      width: 0.875rem;
      height: 0.875rem;
      background: linear-gradient(135deg, var(--wa-color-primary-500, #f43f5e) 0%, var(--wa-color-primary-700, #be123c) 100%);
      border: 2.5px solid white;
      border-radius: 50%;
      box-shadow: 0 0 0 2px rgba(225, 29, 72, 0.2), 0 2px 4px rgba(0, 0, 0, 0.1);
      z-index: 1;
      transition: all 0.3s ease;
    }

    .timeline-event:hover::before {
      transform: scale(1.3);
      box-shadow: 0 0 0 3px rgba(225, 29, 72, 0.3), 0 4px 8px rgba(225, 29, 72, 0.2);
    }

    .event-card {
      background: white;
      border: 1px solid var(--wa-color-neutral-200, #e5e7eb);
      border-left: 3px solid var(--wa-color-primary-500, #f43f5e);
      border-radius: 12px;
      padding: 1.5rem;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      cursor: pointer;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
    }

    .event-card:hover {
      transform: translateX(8px) translateY(-2px);
      box-shadow: 0 12px 24px -8px rgba(225, 29, 72, 0.25), 0 4px 12px rgba(0, 0, 0, 0.08);
      border-left-color: var(--wa-color-primary-600, #e11d48);
      border-left-width: 4px;
      background: linear-gradient(135deg, #ffffff 0%, #fff9fa 100%);
    }

    .event-date-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      background: var(--wa-color-primary-50, #fef2f2);
      color: var(--wa-color-primary-700, #be123c);
      padding: 0.35rem 0.75rem;
      border-radius: 6px;
      border: 1px solid var(--wa-color-primary-200, #fecdd3);
      font-weight: 600;
      font-size: 0.8125rem;
      margin-bottom: 0.875rem;
      letter-spacing: 0.01em;
    }

    .event-date-badge wa-icon {
      font-size: 0.875rem;
      color: var(--wa-color-primary-600, #e11d48);
    }

    .event-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 1rem;
      margin-bottom: 1rem;
    }

    .event-title {
      font-size: 1.125rem;
      font-weight: 700;
      color: var(--wa-color-neutral-900, #111827);
      margin: 0;
      line-height: 1.4;
      letter-spacing: -0.01em;
    }

    wa-badge::part(base) {
      font-size: 0.75rem;
      font-weight: 600;
      padding: 0.375rem 0.75rem;
      border-radius: 8px;
      text-transform: uppercase;
      letter-spacing: 0.025em;
    }

    .event-time {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: var(--wa-color-neutral-600, #6b7280);
      font-size: 0.875rem;
      margin-bottom: 0.875rem;
      font-weight: 500;
    }

    .event-time wa-icon {
      color: var(--wa-color-primary-500, #f43f5e);
      font-size: 0.9375rem;
    }

    .event-description {
      color: var(--wa-color-neutral-600, #6b7280);
      font-size: 0.9375rem;
      line-height: 1.65;
      margin: 0;
    }

    .empty-state {
      text-align: center;
      padding: 4rem 2rem;
    }

    .empty-icon {
      font-size: 4rem;
      color: var(--wa-color-neutral-400, #9ca3af);
      margin-bottom: 1rem;
    }

    .empty-message {
      font-size: 1.25rem;
      color: var(--wa-color-neutral-600, #64748b);
      margin: 0;
    }

    @media (max-width: 768px) {
      .timeline-container {
        padding: 1rem 0.5rem;
      }

      .events-timeline {
        padding-left: 1.5rem;
      }

      .timeline-event {
        padding-left: 1.5rem;
      }

      .timeline-event::before {
        left: -1.9rem;
        width: 0.75rem;
        height: 0.75rem;
      }

      .month-title {
        font-size: 1.5rem;
      }

      .event-card {
        padding: 1rem;
      }

      .event-card:hover {
        transform: translateX(4px);
      }
    }
  `;

  @property({ type: Array })
  events: Event[] = [];

  private groupEventsByMonth(): EventsByMonth {
    const grouped: EventsByMonth = {};
    
    this.events.forEach(event => {
      const date = new Date(event.date);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      
      if (!grouped[monthKey]) {
        grouped[monthKey] = [];
      }
      grouped[monthKey].push(event);
    });

    // Sort events within each month by date
    Object.keys(grouped).forEach(monthKey => {
      const monthEvents = grouped[monthKey];
      if (monthEvents) {
        monthEvents.sort((a, b) => 
          new Date(a.date).getTime() - new Date(b.date).getTime()
        );
      }
    });

    return grouped;
  }

  private formatMonthYear(monthKey: string): string {
    const [year = '2025', month = '1'] = monthKey.split('-');
    const date = new Date(parseInt(year, 10), parseInt(month, 10) - 1);
    return date.toLocaleDateString('en-GB', {
      month: 'long',
      year: 'numeric'
    });
  }

  private formatDayDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      weekday: 'short',
      day: 'numeric',
      month: 'short'
    });
  }

  private formatTime(time: string): string {
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

  private renderEvent(event: Event) {
    const startTime = this.formatTime(event.startTime);
    const endTime = this.formatTime(event.endTime);
    const dayDate = this.formatDayDate(event.date);

    return html`
      <div class="timeline-event">
        <div class="event-card">
          <div class="event-date-badge">
            <wa-icon name="calendar"></wa-icon>
            <span>${dayDate}</span>
          </div>

          <div class="event-header">
            <h3 class="event-title">${event.title}</h3>
            <wa-badge 
              variant="${this.getEventTypeBadgeClass(event.eventType)}"
              aria-label="Event type: ${this.getEventTypeLabel(event.eventType)}"
            >
              ${this.getEventTypeLabel(event.eventType)}
            </wa-badge>
          </div>

          <div class="event-time">
            <wa-icon name="clock"></wa-icon>
            <span>${startTime} - ${endTime}</span>
          </div>

          <p class="event-description">${event.description}</p>
        </div>
      </div>
    `;
  }

  private renderMonthSection(monthKey: string, events: Event[]) {
    return html`
      <div class="month-section">
        <div class="month-header">
          <wa-icon name="calendar-days" class="month-icon"></wa-icon>
          <h2 class="month-title">${this.formatMonthYear(monthKey)}</h2>
        </div>
        <div class="events-timeline">
          ${events.map(event => this.renderEvent(event))}
        </div>
      </div>
    `;
  }

  private renderEmpty() {
    return html`
      <div class="empty-state">
        <wa-icon name="calendar-xmark" class="empty-icon"></wa-icon>
        <p class="empty-message">No events scheduled</p>
      </div>
    `;
  }

  override render() {
    if (this.events.length === 0) {
      return this.renderEmpty();
    }

    const eventsByMonth = this.groupEventsByMonth();
    const monthKeys = Object.keys(eventsByMonth).sort();

    return html`
      <div class="timeline-container">
        ${monthKeys.map(monthKey => {
          const monthEvents = eventsByMonth[monthKey];
          return monthEvents ? this.renderMonthSection(monthKey, monthEvents) : null;
        })}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'club-event-timeline': ClubEventTimeline;
  }
}
