import { ReactNode } from 'react';
import { AuthPage } from '../pages/auth/auth.page';
import { HomePage } from '../pages/home.page';
import { EditCompanyPage } from '../pages/dashboard/components/comapny.dashboard';

class Route {
  path: string;
  name: string;
  public: boolean;
  component: JSX.Element;
}

export const mainRoutes: Route[] = [
  {
    path: 'auth',
    name: 'התחברות',
    public: true,
    component: <AuthPage />
  },
  {
    path: 'reset-password',
    name: 'איפוס סיסמה',
    public: true,
    component: <AuthPage />
  },
  {
    path: 'home',
    name: 'דף הבית',
    public: false,
    component: <HomePage />
  },
  {
    path: '/dashboard/edit-profile',
    name: 'פרופיל',
    public: false,
    component: <EditCompanyPage />
  }
];
