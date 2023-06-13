import { AuthPage } from '../pages/auth/auth.page';
import { HomePage } from '../pages/home.page';

export const mainRoutes = [
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
  }
];
