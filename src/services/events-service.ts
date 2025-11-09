import type { Event, EventsResponse, EventsQuery, ApiError } from './types';
import { EventType } from './types';

/**
 * Interface for Events Service
 */
export interface IEventsService {
  getEvents(query?: EventsQuery): Promise<EventsResponse>;
}

/**
 * Mock Events Service - provides realistic test data
 * Used when VITE_USE_REAL_API=false
 */
export class MockEventsService implements IEventsService {
  private mockEvents: Event[] = [
    {
      id: '1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p',
      title: 'Quiz Night',
      description: 'Monthly quiz with prizes. Teams of up to 6 people. Entry £2 per person.',
      date: '2025-11-15',
      startTime: '20:00',
      endTime: '23:00',
      eventType: EventType.SpecialEvent,
      createdAt: '2025-11-01T10:00:00Z',
      updatedAt: '2025-11-01T10:00:00Z',
    },
    {
      id: '2b3c4d5e-6f7g-8h9i-0j1k-2l3m4n5o6p7q',
      title: 'Live Music - The Village Band',
      description: 'Local band playing classic rock and pop covers. Free entry.',
      date: '2025-11-22',
      startTime: '20:30',
      endTime: '23:30',
      eventType: EventType.SpecialEvent,
      createdAt: '2025-11-05T14:30:00Z',
      updatedAt: '2025-11-05T14:30:00Z',
    },
    {
      id: '3c4d5e6f-7g8h-9i0j-1k2l-3m4n5o6p7q8r',
      title: 'Friday Bar Night',
      description: 'Regular bar opening. Come enjoy drinks with friends.',
      date: '2025-11-08',
      startTime: '20:00',
      endTime: '00:00',
      eventType: EventType.RegularBarNight,
      createdAt: '2025-11-01T09:00:00Z',
      updatedAt: '2025-11-01T09:00:00Z',
    },
    {
      id: '4d5e6f7g-8h9i-0j1k-2l3m-4n5o6p7q8r9s',
      title: 'Saturday Bar Night',
      description: 'Regular bar opening. Come enjoy drinks with friends.',
      date: '2025-11-09',
      startTime: '20:00',
      endTime: '00:00',
      eventType: EventType.RegularBarNight,
      createdAt: '2025-11-01T09:00:00Z',
      updatedAt: '2025-11-01T09:00:00Z',
    },
    {
      id: '5e6f7g8h-9i0j-1k2l-3m4n-5o6p7q8r9s0t',
      title: 'Christmas Fundraiser',
      description: 'Festive fundraising event with raffle and auction. All proceeds go to local charity.',
      date: '2025-12-13',
      startTime: '19:00',
      endTime: '23:00',
      eventType: EventType.Fundraiser,
      createdAt: '2025-11-01T11:00:00Z',
      updatedAt: '2025-11-08T16:20:00Z',
    },
  ];

  async getEvents(query: EventsQuery = {}): Promise<EventsResponse> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const { status = 'upcoming', page = 1, limit = 10 } = query;
    
    // Filter events based on status
    const now = new Date();
    let filteredEvents = this.mockEvents;
    
    if (status === 'upcoming') {
      filteredEvents = this.mockEvents.filter(event => new Date(event.date) >= now);
    } else if (status === 'past') {
      filteredEvents = this.mockEvents.filter(event => new Date(event.date) < now);
    }
    
    // Sort by date (earliest first)
    filteredEvents.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    
    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedEvents = filteredEvents.slice(startIndex, endIndex);
    
    return {
      events: paginatedEvents,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(filteredEvents.length / limit),
        totalEvents: filteredEvents.length,
        limit,
      },
    };
  }
}

/**
 * Real Events Service - consumes backend API
 * Used when VITE_USE_REAL_API=true
 */
export class RealEventsService implements IEventsService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = import.meta.env.VITE_API_BASE_URL || 'https://api.coatesvillageclub.co.uk/api';
  }

  async getEvents(query: EventsQuery = {}): Promise<EventsResponse> {
    const params = new URLSearchParams();
    
    if (query.status) params.append('status', query.status);
    if (query.page) params.append('page', query.page.toString());
    if (query.limit) params.append('limit', query.limit.toString());
    
    const url = `${this.baseUrl}/v1/events?${params.toString()}`;
    
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json() as ApiError;
        throw new Error(errorData.error.message || 'Failed to fetch events');
      }

      return await response.json() as EventsResponse;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to fetch events: ${error.message}`);
      }
      throw new Error('Failed to fetch events: Unknown error');
    }
  }
}

/**
 * Factory function to get the appropriate events service based on environment
 */
export function createEventsService(): IEventsService {
  const useRealApi = import.meta.env.VITE_USE_REAL_API === 'true';
  
  if (useRealApi) {
    console.log('Using real Events API');
    return new RealEventsService();
  }
  
  console.log('Using mock Events service');
  return new MockEventsService();
}

/**
 * Singleton instance of the events service
 */
export const eventsService = createEventsService();
