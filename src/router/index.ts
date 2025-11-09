/**
 * Application Router
 * Configures routes using @vaadin/router with lazy loading and guards
 */

import { Router } from '@vaadin/router';
import type { Route } from '@vaadin/router';
import { requireCommittee, requireVolunteer, redirectIfAuthenticated } from './guards';

export function initRouter(outlet: HTMLElement): Router {
  const router = new Router(outlet);
  
  const routes: Route[] = [
    {
      path: '/',
      component: 'club-landing-page',
      action: async () => {
        await import('../pages/club-landing-page');
      },
    },
    {
      path: '/login',
      component: 'club-login-page',
      action: async (context, commands) => {
        const guardResult = redirectIfAuthenticated(context, commands);
        if (guardResult) return guardResult;
        await import('../pages/club-login-page');
      },
    },
    {
      path: '/events',
      component: 'club-events-page',
      action: async () => {
        await import('../pages/club-events-page');
      },
    },
    {
      path: '/shifts',
      component: 'club-shifts-page',
      action: async (context, commands) => {
        const guardResult = requireVolunteer(context, commands);
        if (guardResult) return guardResult;
        await import('../pages/club-shifts-page');
      },
    },
    {
      path: '/stock-alerts',
      component: 'club-stock-alerts-page',
      action: async (context, commands) => {
        const guardResult = requireVolunteer(context, commands);
        if (guardResult) return guardResult;
        await import('../pages/club-stock-alerts-page');
      },
    },
    {
      path: '/expenses',
      component: 'club-expenses-page',
      action: async (context, commands) => {
        const guardResult = requireVolunteer(context, commands);
        if (guardResult) return guardResult;
        await import('../pages/club-expenses-page');
      },
    },
    {
      path: '/users',
      component: 'club-users-page',
      action: async (context, commands) => {
        const guardResult = requireCommittee(context, commands);
        if (guardResult) return guardResult;
        await import('../pages/club-users-page');
      },
    },
    {
      path: '/manage-events',
      component: 'club-manage-events-page',
      action: async (context, commands) => {
        const guardResult = requireCommittee(context, commands);
        if (guardResult) return guardResult;
        await import('../pages/club-manage-events-page');
      },
    },
    {
      path: '(.*)',
      redirect: '/',
    },
  ];
  
  router.setRoutes(routes);

  return router;
}
