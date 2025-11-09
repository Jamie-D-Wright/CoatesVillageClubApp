import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { eventsService } from '../../services/events-service';
import type { Event } from '../../services/types';
import { EventType } from '../../services/types';
import './club-event-card';

type LoadingState = 'idle' | 'loading' | 'success' | 'error';

@customElement('club-event-list')
export class ClubEventList extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .loading-container,
    .error-container,
    .empty-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: var(--spacing-xl);
      text-align: center;
      min-height: 300px;
    }

    wa-spinner {
      font-size: 3rem;
      --track-width: 4px;
    }

    .loading-text {
      margin-top: var(--spacing-md);
      color: var(--text-secondary);
      font-size: var(--font-size-lg);
    }

    .error-container {
      color: var(--error-700);
    }

    .error-icon {
      font-size: 48px;
      margin-bottom: var(--spacing-md);
    }

    .error-message {
      font-size: var(--font-size-lg);
      margin-bottom: var(--spacing-md);
      font-weight: var(--font-weight-semibold);
    }

    wa-button {
      margin-top: var(--spacing-md);
    }

    .empty-icon {
      font-size: 48px;
      margin-bottom: var(--spacing-md);
      color: var(--neutral-400);
    }

    .empty-message {
      font-size: var(--font-size-lg);
      color: var(--text-secondary);
    }

    .events-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: var(--spacing-lg);
      padding: var(--spacing-md) 0;
    }

    @media (min-width: 768px) {
      .events-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (min-width: 1024px) {
      .events-grid {
        grid-template-columns: repeat(3, 1fr);
      }
    }

    .section-header {
      margin-bottom: var(--spacing-lg);
    }

    .section-title {
      font-size: var(--font-size-2xl);
      font-weight: var(--font-weight-bold);
      color: var(--text-primary);
      margin-bottom: var(--spacing-sm);
    }

    .section-subtitle {
      font-size: var(--font-size-base);
      color: var(--text-secondary);
    }
  `;

  @state()
  private events: Event[] = [];

  @state()
  private loadingState: LoadingState = 'idle';

  @state()
  private errorMessage = '';

  async connectedCallback(): Promise<void> {
    super.connectedCallback();
    await this.loadEvents();
  }

  private async loadEvents(): Promise<void> {
    this.loadingState = 'loading';
    this.errorMessage = '';

    try {
      const response = await eventsService.getEvents({ status: 'upcoming', limit: 20 });
      this.events = response.events;
      this.loadingState = 'success';
    } catch (error) {
      this.loadingState = 'error';
      this.errorMessage = error instanceof Error ? error.message : 'Failed to load events';
    }
  }

  private handleRetry(): void {
    void this.loadEvents();
  }

  private renderLoading() {
    return html`
      <div class="loading-container" role="status" aria-live="polite" aria-busy="true">
        <wa-spinner></wa-spinner>
        <p class="loading-text">Loading events...</p>
      </div>
    `;
  }

  private renderError() {
    return html`
      <div class="error-container" role="alert" aria-live="assertive">
        <div class="error-icon" aria-hidden="true">⚠️</div>
        <p class="error-message">${this.errorMessage}</p>
        <wa-button 
          variant="brand"
          @click=${this.handleRetry}
          aria-label="Retry loading events"
        >
          Try Again
        </wa-button>
      </div>
    `;
  }

  private renderEmpty() {
    return html`
      <div class="empty-container">
        <div class="empty-icon" aria-hidden="true">📅</div>
        <p class="empty-message">No upcoming events scheduled</p>
      </div>
    `;
  }

  private renderEvents() {
    return html`
      <div class="section-header">
        <h2 class="section-title">Upcoming Events</h2>
        <p class="section-subtitle">Join us for these exciting activities</p>
      </div>
      <div class="events-grid" role="list" aria-label="Upcoming events">
        ${this.events.map(event => html`
          <club-event-card 
            .event=${event}
            role="listitem"
          ></club-event-card>
        `)}
      </div>
    `;
  }

  render() {
    if (this.loadingState === 'loading') {
      return this.renderLoading();
    }

    if (this.loadingState === 'error') {
      return this.renderError();
    }

    if (this.events.length === 0) {
      return this.renderEmpty();
    }

    return this.renderEvents();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'club-event-list': ClubEventList;
  }
}
