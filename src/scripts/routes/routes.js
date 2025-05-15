import RegisterPage from '../pages/auth/register/register-page';
import LoginPage from '../pages/auth/login/login-page';
import HomePage from '../pages/home/home-page';
import BookmarkPage from '../pages/bookmark/bookmark-page';
import StoryDetailPage from '../pages/story-detail/story-detail-page';
import NewPage from '../pages/new/new-page';
import NotFoundPage from '../pages/not-found/not-found-page';
import { checkAuthenticatedRoute, checkUnauthenticatedRouteOnly } from '../utils/auth';
import { getRoute } from './url-parser'; // Impor getRoute dari url-parser.js

export const routes = {
  '/login': () => checkUnauthenticatedRouteOnly(new LoginPage()),
  '/register': () => checkUnauthenticatedRouteOnly(new RegisterPage()),
  '/': () => checkAuthenticatedRoute(new HomePage()),
  '/new': () => checkAuthenticatedRoute(new NewPage()),
  '/stories/:id': () => checkAuthenticatedRoute(new StoryDetailPage()),
  '/bookmark': () => checkAuthenticatedRoute(new BookmarkPage()),
  '/not-found': () => new NotFoundPage(),
};

// Fungsi untuk memeriksa apakah rute ada
export function isRouteExists(pathname) {
  const routePattern = getRoute(pathname); // Dapatkan pola rute (misalnya, '/stories/123' -> '/stories/:id')
  return routePattern in routes; // Cek apakah pola ada di routes
}

// Fungsi untuk menangani rute dan redirect jika tidak ada
export function getRouteHandler() {
  const pathname = window.location.hash.replace('#', '') || '/';
  if (isRouteExists(pathname)) {
    const routePattern = getRoute(pathname);
    return routes[routePattern]();
  }
  window.location.hash = '#/not-found'; // Redirect ke /not-found
  return new NotFoundPage();
}