/**
 * Offline Queue Utility
 * In-memory queue for failed requests when offline, with automatic retry on reconnection
 */

export interface QueuedRequest {
  id: string;
  url: string;
  options: RequestInit;
  timestamp: number;
  retryCount: number;
}

class OfflineQueue {
  private queue: Map<string, QueuedRequest> = new Map();
  private maxRetries = 3;
  private isProcessing = false;

  constructor() {
    // Listen for online event to process queue
    window.addEventListener('online', () => {
      this.processQueue();
    });
  }

  /**
   * Add a failed request to the queue
   */
  add(url: string, options: RequestInit = {}): string {
    const id = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const request: QueuedRequest = {
      id,
      url,
      options,
      timestamp: Date.now(),
      retryCount: 0,
    };
    
    this.queue.set(id, request);
    console.log(`[OfflineQueue] Added request to queue: ${url}`, { queueSize: this.queue.size });
    
    return id;
  }

  /**
   * Remove a request from the queue
   */
  remove(id: string): boolean {
    return this.queue.delete(id);
  }

  /**
   * Get current queue size
   */
  size(): number {
    return this.queue.size;
  }

  /**
   * Get all queued requests
   */
  getAll(): QueuedRequest[] {
    return Array.from(this.queue.values());
  }

  /**
   * Clear all queued requests
   */
  clear(): void {
    this.queue.clear();
  }

  /**
   * Process all queued requests
   */
  async processQueue(): Promise<void> {
    if (this.isProcessing || this.queue.size === 0) {
      return;
    }

    if (!navigator.onLine) {
      console.log('[OfflineQueue] Still offline, skipping queue processing');
      return;
    }

    console.log(`[OfflineQueue] Processing ${this.queue.size} queued requests`);
    this.isProcessing = true;

    const requests = Array.from(this.queue.values());
    const results = await Promise.allSettled(
      requests.map(request => this.retryRequest(request))
    );

    // Log results
    const successful = results.filter(r => r.status === 'fulfilled').length;
    const failed = results.filter(r => r.status === 'rejected').length;
    console.log(`[OfflineQueue] Processed queue: ${successful} successful, ${failed} failed`);

    this.isProcessing = false;

    // If there are still items in queue and we're online, try again
    if (this.queue.size > 0 && navigator.onLine) {
      setTimeout(() => this.processQueue(), 5000);
    }
  }

  /**
   * Retry a single queued request
   */
  private async retryRequest(request: QueuedRequest): Promise<void> {
    try {
      const response = await fetch(request.url, request.options);
      
      if (response.ok) {
        // Success - remove from queue
        this.queue.delete(request.id);
        console.log(`[OfflineQueue] Successfully retried: ${request.url}`);
        
        // Dispatch event for UI updates
        window.dispatchEvent(new CustomEvent('request-synced', {
          detail: { requestId: request.id, url: request.url }
        }));
      } else {
        throw new Error(`HTTP ${response.status}`);
      }
    } catch (error) {
      request.retryCount++;
      
      if (request.retryCount >= this.maxRetries) {
        // Max retries reached - remove from queue
        this.queue.delete(request.id);
        console.error(`[OfflineQueue] Max retries reached for: ${request.url}`, error);
        
        // Dispatch failure event
        window.dispatchEvent(new CustomEvent('request-failed', {
          detail: { requestId: request.id, url: request.url, error }
        }));
      } else {
        // Update retry count but keep in queue
        this.queue.set(request.id, request);
        console.warn(`[OfflineQueue] Retry ${request.retryCount}/${this.maxRetries} failed: ${request.url}`);
      }
    }
  }

  /**
   * Check if currently online
   */
  isOnline(): boolean {
    return navigator.onLine;
  }
}

// Export singleton instance
export const offlineQueue = new OfflineQueue();
