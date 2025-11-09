import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { provide } from '@lit/context';
import { authContext } from '../../contexts/auth-context';
import type { AuthContext } from '../../contexts/auth-context';
import { authService, UserRole } from '../../services/auth-service';
import { offlineQueue } from '../../utils/offline-queue';

interface MenuItem {
  label: string;
  path: string;
  icon: string;
  role?: UserRole | 'volunteer-or-higher';
}

interface MenuGroup {
  label?: string;
  items: MenuItem[];
}

@customElement('club-app-header')
export class ClubAppHeader extends LitElement {
  static styles = css`
    :host {
      display: block;
      position: sticky;
      top: 0;
      z-index: 100;
      background: var(--wa-color-primary-600, #1e40af);
      color: white;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .header-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: var(--spacing-4, 1rem) var(--spacing-lg, 1.5rem);
      max-width: 1280px;
      margin: 0 auto;
    }

    .logo-section {
      display: flex;
      align-items: center;
      gap: var(--spacing-4, 1rem);
    }

    .logo {
      font-size: var(--font-size-xl, 1.25rem);
      font-weight: var(--font-weight-bold, 700);
      text-decoration: none;
      color: white;
      display: flex;
      align-items: center;
      gap: var(--spacing-2, 0.5rem);
    }

    .offline-indicator {
      display: flex;
      align-items: center;
      gap: var(--spacing-2, 0.5rem);
      padding: var(--spacing-1, 0.25rem) var(--spacing-3, 0.75rem);
      background: var(--wa-color-warning-500);
      border-radius: 4px;
      font-size: var(--font-size-sm, 0.875rem);
      font-weight: var(--font-weight-medium, 500);
    }

    .actions-section {
      display: flex;
      align-items: center;
      gap: var(--spacing-4, 1rem);
    }

    /* Desktop Navigation */
    .desktop-nav {
      display: none;
      flex: 1;
      justify-content: center;
    }

    @media (min-width: 768px) {
      .desktop-nav {
        display: flex;
      }
      
      .mobile-menu-button {
        display: none;
      }
    }

    .nav-list {
      display: flex;
      gap: var(--spacing-2, 0.5rem);
      list-style: none;
      margin: 0;
      padding: 0;
    }

    .nav-item {
      position: relative;
    }

    .nav-link {
      display: flex;
      align-items: center;
      gap: var(--spacing-2, 0.5rem);
      padding: var(--spacing-2, 0.5rem) var(--spacing-4, 1rem);
      color: white;
      text-decoration: none;
      border-radius: 4px;
      font-size: var(--font-size-sm, 0.875rem);
      font-weight: var(--font-weight-medium, 500);
      transition: background-color 0.2s;
    }

    .nav-link:hover {
      background: rgba(255, 255, 255, 0.1);
    }

    .nav-link[aria-current="page"] {
      background: rgba(255, 255, 255, 0.2);
      font-weight: var(--font-weight-semibold, 600);
    }

    .nav-group-label {
      padding: var(--spacing-2, 0.5rem) var(--spacing-4, 1rem);
      color: rgba(255, 255, 255, 0.7);
      font-size: var(--font-size-xs, 0.75rem);
      font-weight: var(--font-weight-semibold, 600);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    /* Mobile Menu Button */
    .mobile-menu-button {
      background: none;
      border: none;
      color: white;
      cursor: pointer;
      padding: var(--spacing-2, 0.5rem);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    /* Drawer Styles */
    wa-drawer::part(panel) {
      width: 280px;
    }

    wa-drawer::part(body) {
      padding: 0;
    }

    .drawer-header {
      padding: var(--spacing-lg, 1.5rem);
      background: var(--wa-color-primary-600);
      color: white;
    }

    .drawer-title {
      margin: 0;
      font-size: var(--font-size-lg, 1.125rem);
      font-weight: var(--font-weight-bold, 700);
    }

    .drawer-nav {
      padding: var(--spacing-4, 1rem) 0;
    }

    .drawer-group {
      margin-bottom: var(--spacing-lg, 1.5rem);
    }

    .drawer-group-label {
      padding: var(--spacing-2, 0.5rem) var(--spacing-lg, 1.5rem);
      color: var(--wa-color-neutral-600);
      font-size: var(--font-size-xs, 0.75rem);
      font-weight: var(--font-weight-semibold, 600);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .drawer-nav-link {
      display: flex;
      align-items: center;
      gap: var(--spacing-3, 0.75rem);
      padding: var(--spacing-3, 0.75rem) var(--spacing-lg, 1.5rem);
      color: var(--wa-color-neutral-900);
      text-decoration: none;
      font-size: var(--font-size-base, 1rem);
      transition: background-color 0.2s;
    }

    .drawer-nav-link:hover {
      background: var(--wa-color-neutral-100);
    }

    .drawer-nav-link[aria-current="page"] {
      background: var(--wa-color-primary-50);
      color: var(--wa-color-primary-700);
      font-weight: var(--font-weight-semibold, 600);
    }

    .drawer-divider {
      height: 1px;
      background: var(--wa-color-neutral-200);
      margin: var(--spacing-4, 1rem) 0;
    }

    .user-info {
      padding: var(--spacing-4, 1rem) var(--spacing-lg, 1.5rem);
      border-top: 1px solid var(--wa-color-neutral-200);
      background: var(--wa-color-neutral-50);
    }

    .user-email {
      font-size: var(--font-size-sm, 0.875rem);
      color: var(--wa-color-neutral-700);
      margin-bottom: var(--spacing-2, 0.5rem);
    }

    .user-role {
      display: inline-block;
      font-size: var(--font-size-xs, 0.75rem);
    }

    wa-button::part(base) {
      font-size: var(--font-size-sm, 0.875rem);
    }
  `;

  @provide({ context: authContext })
  @state()
  private authContextValue: AuthContext = {
    user: null,
    isAuthenticated: false,
  };

  @state()
  private drawerOpen = false;

  @state()
  private isOnline = navigator.onLine;

  @state()
  private queueSize = 0;

  private menuGroups: MenuGroup[] = [
    {
      items: [
        { label: 'Events', path: '/events', icon: 'calendar' },
      ],
    },
    {
      label: 'Volunteer',
      items: [
        { label: 'My Shifts', path: '/shifts', icon: 'calendar-check', role: 'volunteer-or-higher' },
        { label: 'Stock Alerts', path: '/stock-alerts', icon: 'box', role: 'volunteer-or-higher' },
        { label: 'Expenses', path: '/expenses', icon: 'receipt', role: 'volunteer-or-higher' },
      ],
    },
    {
      label: 'Admin',
      items: [
        { label: 'Manage Events', path: '/manage-events', icon: 'calendar-plus', role: UserRole.Committee },
        { label: 'Users', path: '/users', icon: 'users', role: UserRole.Committee },
      ],
    },
  ];

  connectedCallback() {
    super.connectedCallback();
    this.updateAuthContext();
    
    // Listen for auth changes
    window.addEventListener('auth-changed', this.handleAuthChanged);
    
    // Listen for online/offline events
    window.addEventListener('online', this.handleOnlineStatus);
    window.addEventListener('offline', this.handleOnlineStatus);
    
    // Listen for queue updates
    window.addEventListener('request-synced', this.handleQueueUpdate);
    window.addEventListener('request-failed', this.handleQueueUpdate);
    
    // Initial queue size
    this.updateQueueSize();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('auth-changed', this.handleAuthChanged);
    window.removeEventListener('online', this.handleOnlineStatus);
    window.removeEventListener('offline', this.handleOnlineStatus);
    window.removeEventListener('request-synced', this.handleQueueUpdate);
    window.removeEventListener('request-failed', this.handleQueueUpdate);
  }

  private handleAuthChanged = () => {
    this.updateAuthContext();
  };

  private handleOnlineStatus = () => {
    this.isOnline = navigator.onLine;
    if (this.isOnline) {
      offlineQueue.processQueue();
    }
  };

  private handleQueueUpdate = () => {
    this.updateQueueSize();
  };

  private updateAuthContext() {
    const user = authService.getCurrentUser();
    this.authContextValue = {
      user,
      isAuthenticated: authService.isAuthenticated(),
    };
  }

  private updateQueueSize() {
    this.queueSize = offlineQueue.size();
  }

  private shouldShowMenuItem(item: MenuItem): boolean {
    if (!item.role) return true;
    
    if (item.role === 'volunteer-or-higher') {
      return authService.isVolunteerOrHigher();
    }
    
    return authService.hasRole(item.role);
  }

  private shouldShowGroup(group: MenuGroup): boolean {
    return group.items.some(item => this.shouldShowMenuItem(item));
  }

  private isCurrentPage(path: string): boolean {
    return window.location.pathname === path;
  }

  private handleNavClick(path: string) {
    window.history.pushState({}, '', path);
    window.dispatchEvent(new PopStateEvent('popstate'));
    this.drawerOpen = false;
  }

  private toggleDrawer() {
    this.drawerOpen = !this.drawerOpen;
  }

  private handleLogout() {
    authService.logout();
    this.drawerOpen = false;
    window.location.href = '/login';
  }

  private handleLogin() {
    window.location.href = '/login';
  }

  private renderOfflineIndicator() {
    if (this.isOnline) return '';

    return html`
      <div class="offline-indicator" role="status" aria-live="polite">
        <wa-icon name="wifi-slash"></wa-icon>
        <span>Offline ${this.queueSize > 0 ? `(${this.queueSize} pending)` : ''}</span>
      </div>
    `;
  }

  private renderDesktopNav() {
    if (!this.authContextValue.isAuthenticated) return '';

    return html`
      <nav class="desktop-nav" aria-label="Main navigation">
        <ul class="nav-list" role="list">
          ${this.menuGroups.map(group => {
            if (!this.shouldShowGroup(group)) return '';
            
            return html`
              ${group.label ? html`
                <li class="nav-group-label" role="presentation">${group.label}</li>
              ` : ''}
              ${group.items.map(item => {
                if (!this.shouldShowMenuItem(item)) return '';
                
                return html`
                  <li class="nav-item" role="none">
                    <a
                      href=${item.path}
                      class="nav-link"
                      ?aria-current=${this.isCurrentPage(item.path) ? 'page' : undefined}
                      @click=${(e: Event) => {
                        e.preventDefault();
                        this.handleNavClick(item.path);
                      }}
                    >
                      <wa-icon name=${item.icon}></wa-icon>
                      <span>${item.label}</span>
                    </a>
                  </li>
                `;
              })}
            `;
          })}
        </ul>
      </nav>
    `;
  }

  private renderDrawerNav() {
    return html`
      <div class="drawer-header">
        <h2 class="drawer-title">Coates Village Club</h2>
      </div>
      
      ${this.authContextValue.isAuthenticated ? html`
        <nav class="drawer-nav" aria-label="Main navigation">
          ${this.menuGroups.map((group, index) => {
            if (!this.shouldShowGroup(group)) return '';
            
            return html`
              ${index > 0 ? html`<div class="drawer-divider"></div>` : ''}
              <div class="drawer-group">
                ${group.label ? html`
                  <div class="drawer-group-label">${group.label}</div>
                ` : ''}
                ${group.items.map(item => {
                  if (!this.shouldShowMenuItem(item)) return '';
                  
                  return html`
                    <a
                      href=${item.path}
                      class="drawer-nav-link"
                      ?aria-current=${this.isCurrentPage(item.path) ? 'page' : undefined}
                      @click=${(e: Event) => {
                        e.preventDefault();
                        this.handleNavClick(item.path);
                      }}
                    >
                      <wa-icon name=${item.icon}></wa-icon>
                      <span>${item.label}</span>
                    </a>
                  `;
                })}
              </div>
            `;
          })}
        </nav>
        
        <div class="user-info">
          <div class="user-email">${this.authContextValue.user?.email}</div>
          <wa-badge class="user-role" variant="neutral">
            ${this.authContextValue.user?.role}
          </wa-badge>
        </div>
      ` : ''}
    `;
  }

  render() {
    return html`
      <header>
        <div class="header-content">
          <div class="logo-section">
            <button
              class="mobile-menu-button"
              @click=${this.toggleDrawer}
              aria-label="Toggle menu"
              aria-expanded=${this.drawerOpen}
            >
              <wa-icon name="bars" style="font-size: 1.5rem;"></wa-icon>
            </button>
            
            <a href="/" class="logo" @click=${(e: Event) => {
              e.preventDefault();
              this.handleNavClick('/');
            }}>
              <wa-icon name="house"></wa-icon>
              <span>Coates Village Club</span>
            </a>
          </div>

          ${this.renderDesktopNav()}

          <div class="actions-section">
            ${this.renderOfflineIndicator()}
            
            ${this.authContextValue.isAuthenticated ? html`
              <wa-button variant="text" @click=${this.handleLogout}>
                <wa-icon name="right-from-bracket" slot="prefix"></wa-icon>
                Logout
              </wa-button>
            ` : html`
              <wa-button variant="primary" @click=${this.handleLogin}>
                <wa-icon name="right-to-bracket" slot="prefix"></wa-icon>
                Login
              </wa-button>
            `}
          </div>
        </div>
      </header>

      <wa-drawer
        ?open=${this.drawerOpen}
        placement="start"
        @wa-after-hide=${() => this.drawerOpen = false}
      >
        ${this.renderDrawerNav()}
      </wa-drawer>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'club-app-header': ClubAppHeader;
  }
}
