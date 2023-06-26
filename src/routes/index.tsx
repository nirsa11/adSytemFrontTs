import { ReactNode } from 'react';
import { AuthPage } from '../pages/auth/auth.page';
import { DashboardPage } from '../pages/dashboard/dashboard.page';
import { EditCompanyPage } from '../pages/dashboard/components/profile.dashboard';
import { AddCampaign } from '../pages/dashboard/components/add.campaign';
import { MyCampaigns } from '../pages/dashboard/components/list.campaigns';
import { Campaign } from '../pages/dashboard/components/campaigns.dashboard';
import { EditCampaign } from '../pages/dashboard/components/edit.campagins';

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
          },
          {
            path: '/dashboard/edit-campaign/:id',
            name: 'הקמפיינים שלי',
            public: false,
            component: <EditCampaign />
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
