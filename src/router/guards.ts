/**
 * Route Guards
 * Protect routes based on authentication and user roles
 */

import { authService } from '../services/auth-service';

/**
 * Require authentication to access route
 */
export const requireAuth = (_context: any, commands: any) => {
  if (!authService.isAuthenticated()) {
    // Redirect to login page
    return commands.redirect('/login');
  }
  return undefined;
};

/**
 * Require Committee role to access route
 */
export const requireCommittee = (_context: any, commands: any) => {
  if (!authService.isAuthenticated()) {
    return commands.redirect('/login');
  }
  
  if (!authService.isCommittee()) {
    // Redirect to events page if not Committee
    return commands.redirect('/events');
  }
  
  return undefined;
};

/**
 * Require Volunteer or higher role to access route
 */
export const requireVolunteer = (_context: any, commands: any) => {
  if (!authService.isAuthenticated()) {
    return commands.redirect('/login');
  }
  
  if (!authService.isVolunteerOrHigher()) {
    // Redirect to events page if not Volunteer or higher
    return commands.redirect('/events');
  }
  
  return undefined;
};

/**
 * Redirect to events page if already authenticated
 */
export const redirectIfAuthenticated = (_context: any, commands: any) => {
  if (authService.isAuthenticated()) {
    return commands.redirect('/events');
  }
  return undefined;
};
