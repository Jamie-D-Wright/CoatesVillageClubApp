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
      date: '2025-11-14',
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
      date: '2025-11-15',
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
    {
      id: '6f7g8h9i-0j1k-2l3m-4n5o-6p7q8r9s0t1u',
      title: 'Acoustic Night - Open Mic',
      description: 'Bring your instruments and join our open mic session. Acoustic sets welcome.',
      date: '2025-11-16',
      startTime: '19:30',
      endTime: '22:30',
      eventType: EventType.SpecialEvent,
      createdAt: '2025-11-02T12:00:00Z',
      updatedAt: '2025-11-02T12:00:00Z',
    },
    {
      id: '7g8h9i0j-1k2l-3m4n-5o6p-7q8r9s0t1u2v',
      title: 'Bingo Night',
      description: 'Traditional bingo with cash prizes. Eyes down at 8pm sharp!',
      date: '2025-11-20',
      startTime: '20:00',
      endTime: '22:00',
      eventType: EventType.SpecialEvent,
      createdAt: '2025-11-03T10:30:00Z',
      updatedAt: '2025-11-03T10:30:00Z',
    },
    {
      id: '8h9i0j1k-2l3m-4n5o-6p7q-8r9s0t1u2v3w',
      title: 'Friday Bar Night',
      description: 'Regular bar opening. Come enjoy drinks with friends.',
      date: '2025-11-21',
      startTime: '20:00',
      endTime: '00:00',
      eventType: EventType.RegularBarNight,
      createdAt: '2025-11-01T09:00:00Z',
      updatedAt: '2025-11-01T09:00:00Z',
    },
    {
      id: '9i0j1k2l-3m4n-5o6p-7q8r-9s0t1u2v3w4x',
      title: 'Saturday Bar Night',
      description: 'Regular bar opening. Come enjoy drinks with friends.',
      date: '2025-11-22',
      startTime: '20:00',
      endTime: '00:00',
      eventType: EventType.RegularBarNight,
      createdAt: '2025-11-01T09:00:00Z',
      updatedAt: '2025-11-01T09:00:00Z',
    },
    {
      id: '0j1k2l3m-4n5o-6p7q-8r9s-0t1u2v3w4x5y',
      title: 'Karaoke Night',
      description: 'Show off your singing talents! Free entry, song requests welcome.',
      date: '2025-11-23',
      startTime: '20:00',
      endTime: '23:30',
      eventType: EventType.SpecialEvent,
      createdAt: '2025-11-04T15:00:00Z',
      updatedAt: '2025-11-04T15:00:00Z',
    },
    {
      id: '1k2l3m4n-5o6p-7q8r-9s0t-1u2v3w4x5y6z',
      title: 'Friday Bar Night',
      description: 'Regular bar opening. Come enjoy drinks with friends.',
      date: '2025-11-28',
      startTime: '20:00',
      endTime: '00:00',
      eventType: EventType.RegularBarNight,
      createdAt: '2025-11-01T09:00:00Z',
      updatedAt: '2025-11-01T09:00:00Z',
    },
    {
      id: '2l3m4n5o-6p7q-8r9s-0t1u-2v3w4x5y6z7a',
      title: 'Saturday Bar Night',
      description: 'Regular bar opening. Come enjoy drinks with friends.',
      date: '2025-11-29',
      startTime: '20:00',
      endTime: '00:00',
      eventType: EventType.RegularBarNight,
      createdAt: '2025-11-01T09:00:00Z',
      updatedAt: '2025-11-01T09:00:00Z',
    },
    {
      id: '3m4n5o6p-7q8r-9s0t-1u2v-3w4x5y6z7a8b',
      title: 'Comedy Night',
      description: 'Stand-up comedy featuring local comedians. 18+ only. Entry £5.',
      date: '2025-11-30',
      startTime: '20:30',
      endTime: '23:00',
      eventType: EventType.SpecialEvent,
      createdAt: '2025-11-06T14:00:00Z',
      updatedAt: '2025-11-06T14:00:00Z',
    },
    {
      id: '4n5o6p7q-8r9s-0t1u-2v3w-4x5y6z7a8b9c',
      title: 'Family Movie Night',
      description: 'Family-friendly movie screening with popcorn and snacks. Free entry for members.',
      date: '2025-12-01',
      startTime: '18:00',
      endTime: '21:00',
      eventType: EventType.SpecialEvent,
      createdAt: '2025-11-07T11:00:00Z',
      updatedAt: '2025-11-07T11:00:00Z',
    },
    {
      id: '5o6p7q8r-9s0t-1u2v-3w4x-5y6z7a8b9c0d',
      title: 'Friday Bar Night',
      description: 'Regular bar opening. Come enjoy drinks with friends.',
      date: '2025-12-05',
      startTime: '20:00',
      endTime: '00:00',
      eventType: EventType.RegularBarNight,
      createdAt: '2025-11-01T09:00:00Z',
      updatedAt: '2025-11-01T09:00:00Z',
    },
    {
      id: '6p7q8r9s-0t1u-2v3w-4x5y-6z7a8b9c0d1e',
      title: 'Saturday Bar Night',
      description: 'Regular bar opening. Come enjoy drinks with friends.',
      date: '2025-12-06',
      startTime: '20:00',
      endTime: '00:00',
      eventType: EventType.RegularBarNight,
      createdAt: '2025-11-01T09:00:00Z',
      updatedAt: '2025-11-01T09:00:00Z',
    },
    {
      id: '7q8r9s0t-1u2v-3w4x-5y6z-7a8b9c0d1e2f',
      title: 'Wine Tasting Evening',
      description: 'Sample a selection of wines with expert guidance. Limited spaces. Entry £15.',
      date: '2025-12-07',
      startTime: '19:00',
      endTime: '21:30',
      eventType: EventType.SpecialEvent,
      createdAt: '2025-11-08T10:00:00Z',
      updatedAt: '2025-11-08T10:00:00Z',
    },
    {
      id: '8r9s0t1u-2v3w-4x5y-6z7a-8b9c0d1e2f3g',
      title: 'Live Music - Jazz Trio',
      description: 'Smooth jazz evening featuring talented local musicians. Free entry.',
      date: '2025-12-14',
      startTime: '20:00',
      endTime: '23:00',
      eventType: EventType.SpecialEvent,
      createdAt: '2025-11-08T12:00:00Z',
      updatedAt: '2025-11-08T12:00:00Z',
    },
    {
      id: '9s0t1u2v-3w4x-5y6z-7a8b-9c0d1e2f3g4h',
      title: 'Private Birthday Party',
      description: 'Private venue hire for birthday celebration.',
      date: '2025-12-18',
      startTime: '18:00',
      endTime: '23:00',
      eventType: EventType.PrivateHire,
      createdAt: '2025-11-05T16:00:00Z',
      updatedAt: '2025-11-05T16:00:00Z',
    },
    {
      id: '0t1u2v3w-4x5y-6z7a-8b9c-0d1e2f3g4h5i',
      title: 'New Year\'s Eve Gala',
      description: 'Ring in the new year with live entertainment, buffet, and champagne toast. Tickets £25.',
      date: '2025-12-31',
      startTime: '20:00',
      endTime: '01:00',
      eventType: EventType.SpecialEvent,
      createdAt: '2025-11-09T09:00:00Z',
      updatedAt: '2025-11-09T09:00:00Z',
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
