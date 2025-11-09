import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { eventsService } from '../../services/events-service';
import type { Event } from '../../services/types';
import { EventType } from '../../services/types';
import './club-event-card';
import './club-event-timeline';

type LoadingState = 'idle' | 'loading' | 'success' | 'error';
type ViewMode = 'grid' | 'timeline';

@customElement('club-event-list')
export class ClubEventList extends LitElement {
  static override styles = css`
    :host {
      display: block;
    }

    .view-controls {
      display: flex;
      justify-content: center;
      gap: 1rem;
      margin-bottom: 2rem;
      padding: 1rem;
      background: linear-gradient(135deg, #fff1f2 0%, #ffffff 100%);
      border-radius: 12px;
      border: 1px solid #fecdd3;
    }

    .view-toggle {
      display: flex;
      gap: 0.5rem;
      padding: 0.5rem;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    }

    wa-button::part(base) {
      border-radius: 8px;
      font-weight: 600;
    }

    .loading-container,
    .error-container,
    .empty-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 4rem 1.5rem;
      text-align: center;
      min-height: 400px;
    }

    wa-spinner {
      font-size: 4rem;
      --track-width: 4px;
      margin-bottom: 1.5rem;
    }

    .loading-text {
      font-size: 1.25rem;
      color: #64748b;
      font-weight: 500;
    }

    .error-container {
      background: linear-gradient(135deg, #fef2f2 0%, #ffffff 100%);
      border-radius: 20px;
      padding: 3rem 2rem;
      border: 1px solid #fecaca;
    }

    .error-icon-wrapper {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 80px;
      height: 80px;
      margin-bottom: 1.5rem;
      background: linear-gradient(135deg, #ef4444, #dc2626);
      border-radius: 20px;
      box-shadow: 0 10px 15px -3px rgba(239, 68, 68, 0.3);
    }

    .error-icon {
      font-size: 2.5rem;
      color: white;
    }

    .error-message {
      font-size: 1.25rem;
      margin-bottom: 1.5rem;
      font-weight: 600;
      color: #991b1b;
    }

    wa-button::part(base) {
      font-size: 1rem;
      padding: 0.75rem 1.75rem;
      border-radius: 12px;
      font-weight: 600;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
      transition: all 0.2s ease;
    }

    wa-button::part(base):hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    }

    .empty-container {
      background: linear-gradient(135deg, #fff1f2 0%, #ffffff 100%);
      border-radius: 20px;
      padding: 4rem 2rem;
      border: 1px solid #fecdd3;
    }

    .empty-icon-wrapper {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 80px;
      height: 80px;
      margin-bottom: 1.5rem;
      background: linear-gradient(135deg, #f43f5e, #e11d48);
      border-radius: 20px;
      box-shadow: 0 10px 15px -3px rgba(225, 29, 72, 0.3);
    }

    .empty-icon {
      font-size: 2.5rem;
      color: white;
    }

    .empty-message {
      font-size: 1.25rem;
      color: #64748b;
      font-weight: 500;
    }

    .events-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 2rem;
      padding: 1rem 0;
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
  `;

  @state()
  private events: Event[] = [];

  @state()
  private loadingState: LoadingState = 'idle';

  @state()
  private errorMessage = '';

  @state()
  private viewMode: ViewMode = 'timeline';

  override async connectedCallback(): Promise<void> {
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

  private handleViewModeChange(mode: ViewMode): void {
    this.viewMode = mode;
  }

  private renderLoading() {
    return html`
      <div class="loading-container" role="status" aria-live="polite" aria-busy="true">
        <wa-spinner></wa-spinner>
        <p class="loading-text">Loading amazing events...</p>
      </div>
    `;
  }

  private renderError() {
    return html`
      <div class="error-container" role="alert" aria-live="assertive">
        <div class="error-icon-wrapper">
          <wa-icon name="triangle-exclamation" class="error-icon"></wa-icon>
        </div>
        <p class="error-message">${this.errorMessage}</p>
        <wa-button 
          variant="danger"
          size="large"
          @click=${this.handleRetry}
          aria-label="Retry loading events"
        >
          <wa-icon name="rotate-right" slot="prefix"></wa-icon>
          Try Again
        </wa-button>
      </div>
    `;
  }

  private renderEmpty() {
    return html`
      <div class="empty-container">
        <div class="empty-icon-wrapper">
          <wa-icon name="calendar-xmark" class="empty-icon"></wa-icon>
        </div>
        <p class="empty-message">No upcoming events scheduled</p>
      </div>
    `;
  }

  private renderViewControls() {
    return html`
      <div class="view-controls">
        <div class="view-toggle" role="group" aria-label="View mode selection">
          <wa-button
            variant="${this.viewMode === 'timeline' ? 'primary' : 'default'}"
            size="medium"
            @click="${() => this.handleViewModeChange('timeline')}"
            aria-pressed="${this.viewMode === 'timeline'}"
            aria-label="Timeline view"
          >
            <wa-icon name="timeline" slot="prefix"></wa-icon>
            Timeline
          </wa-button>
          <wa-button
            variant="${this.viewMode === 'grid' ? 'primary' : 'default'}"
            size="medium"
            @click="${() => this.handleViewModeChange('grid')}"
            aria-pressed="${this.viewMode === 'grid'}"
            aria-label="Grid view"
          >
            <wa-icon name="grid" slot="prefix"></wa-icon>
            Grid
          </wa-button>
        </div>
      </div>
    `;
  }

  private renderEventsGrid() {
    return html`
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

  private renderEventsTimeline() {
    return html`
      <club-event-timeline 
        .events=${this.events}
        role="list"
        aria-label="Upcoming events timeline"
      ></club-event-timeline>
    `;
  }

  private renderEvents() {
    return html`
      ${this.renderViewControls()}
      ${this.viewMode === 'timeline' ? this.renderEventsTimeline() : this.renderEventsGrid()}
    `;
  }

  override render() {
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
