import { ReactNode } from 'react';
import { AuthPage } from '../pages/auth/auth.page';
import { DashboardPage } from '../pages/dashboard/dashboard.page';
import { EditCompanyPage } from '../pages/dashboard/components/profile.dashboard';
import { AddCampaign } from '../pages/dashboard/components/add.campaign';
import { MyCampaigns } from '../pages/dashboard/components/list.campaigns';
import { Campaign } from '../pages/dashboard/components/campaigns.dashboard';
import { EditCampaign } from '../pages/dashboard/components/edit.campagins';

/**
 * Represents the properties of a route in a React application.
 */
export class RouteProps {
  path: string;
  name: string;
  public: boolean;
  component: JSX.Element;
  nestedRoutes?: RouteProps[];
}

/**
 * An array of route objects that define the routes for the application.
 * @type {RouteProps[]}
 * @property {string} path - The path of the route.
 * @property {string} name - The name of the route.
 * @property {boolean} public - Whether or not the route is public.
 * @property {ReactNode} component - The component to render for the route.
 * @property {RouteProps[] | undefined} nestedRoutes - An optional array of nested routes.
 * @returns None
 */
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
            path: '/dashboard/add-campaign',
            name: 'הוסף קמפיין',
            public: false,
            component: <AddCampaign />
          },
          {
            path: '/dashboard/',
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

/**
 * An array of navigation routes for the dashboard.
 * @type {NavRoute[]}
 * @property {string} path - The path of the route.
 * @property {string} name - The name of the route.
 */
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
