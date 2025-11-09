/**
 * Event data model matching backend API contract
 */
export interface Event {
  id: string;
  title: string;
  description: string;
  date: string; // ISO 8601 date (YYYY-MM-DD)
  startTime: string; // HH:mm format
  endTime: string; // HH:mm format
  eventType: EventType;
  createdAt: string; // ISO 8601 datetime
  updatedAt: string; // ISO 8601 datetime
}

/**
 * Event types as defined in backend specification
 */
export enum EventType {
  SpecialEvent = 'SpecialEvent',
  RegularBarNight = 'RegularBarNight',
  PrivateHire = 'PrivateHire',
  Fundraiser = 'Fundraiser',
}

/**
 * Pagination metadata from API response
 */
export interface Pagination {
  currentPage: number;
  totalPages: number;
  totalEvents: number;
  limit: number;
}

/**
 * API response structure for events list
 */
export interface EventsResponse {
  events: Event[];
  pagination: Pagination;
}

/**
 * API error response structure
 */
export interface ApiError {
  error: {
    code: string;
    message: string;
  };
}

/**
 * Query parameters for events endpoint
 */
export interface EventsQuery {
  status?: 'upcoming' | 'past' | 'all';
  page?: number;
  limit?: number;
}
