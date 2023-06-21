import { ReactNode } from 'react';
import { AuthPage } from '../pages/auth/auth.page';
import { DashboardPage } from '../pages/dashboard/dashboard.page';
import { EditCompanyPage } from '../pages/dashboard/components/comapny.dashboard';
import { AddCampaign } from '../pages/dashboard/components/addCampaign';
import { MyCampaigns } from '../pages/dashboard/components/myCampaigns';
import { Campaign } from '../pages/dashboard/components/campaigns.dashboard';

export class RouteProps {
  path: string;
  name: string;
  public: boolean;
  component: JSX.Element;
  nestedRoutes?: RouteProps[];
}

export const mainRoutes: RouteProps[] = [
  {
    path: '/auth',
    name: 'התחברות',
    public: true,
    component: <AuthPage />
  },
  {
    path: '/reset-password',
    name: 'איפוס סיסמה',
    public: true,
    component: <AuthPage />
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    public: false,
    component: <DashboardPage />,
    nestedRoutes: [
      {
        path: '/dashboard/edit-profile',
        name: 'פרופיל',
        public: false,
        component: <EditCompanyPage />
      },
      {
        path: '/dashboard',
        name: 'קמפיינים',
        public: false,
        component: <Campaign />,
        nestedRoutes: [
          {
            path: '/dashboard/',
            name: 'הוסף קמפיין',
            public: false,
            component: <AddCampaign />
          },
          {
            path: '/dashboard/my-campaigns',
            name: 'הקמפיינים שלי',
            public: false,
            component: <MyCampaigns />
          }
        ]
      }
    ]
  }
];
export type NavRoute = Pick<RouteProps, 'path' | 'name'>;

export const navRoutes: NavRoute[] = [
  {
    path: '/dashboard',
    name: 'קמפיינים'
  },
  {
    path: '/dashboard/edit-profile',
    name: 'פרופיל'
  }
];
