import React from 'react';
import './App.css';
import RootLayout from './mycomponents/layout/RootLayout';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginPage from './pages/Login';
import DashboardLayout from './mycomponents/layout/DashbordLayout';
import { DashboardContent } from './pages/Dashboard';
import { BranchesPage } from './pages/Branches';
import { RolesPage } from './pages/Roles';
import UsersPage from './pages/Users';
import CardSchemePage from './pages/CardScheme';
import CardProfilesPage from './pages/CardProfile';
import CreateProfilePage from './pages/Createprofile';
import CardRequestsPage from './pages/CardRequest';
import CardRequestDetailsPage from './pages/CardRequestDetailsPage';
import BlockUnblockCardPage from './pages/CardBlock';
import CardsPage from './pages/Cards';
import TrailPage from './pages/Trail';
import AccountPage from './pages/Account';
import AuthorizationListPage from './pages/AuthList';
import AuthorizationQueuePage from './pages/AuthQueue';
import CreateRolePage  from './mycomponents/create-role-dialog';
import ComplaintsLogPage from './pages/Complaint';

function App() {
  const router = createBrowserRouter([
    {
       path: "/",
      element: <LoginPage/>,
      errorElement: <div>Oops! Something went wrong.</div>,
    },
    {
      path: "/login",
      element: <LoginPage/>,
    },
    {
      path: "/dashboard",
      element: <DashboardLayout/>,
      children: [
        { index: true, element: <DashboardContent/> },
        { path: "branches", element: <BranchesPage/> },
        { path: "roles", element: <RolesPage/> },
        { path: "users", element: <UsersPage/> },
        { path: "roles/create", element: <CreateRolePage/> },
        { path: "card-scheme", element: <CardSchemePage/> },
        { path: "card-profile", element: <CardProfilesPage/> },
        { path: "card-profiles/create", element: <CreateProfilePage/> },
        { path: "card-request", element: <CardRequestsPage/> },
        { path: "card-request/:id", element: <CardRequestDetailsPage/> },
        {path: "cards", element: <CardsPage/>},
        {path: "block-unblock", element: <BlockUnblockCardPage/>},
        {path: "complaints-log", element: <ComplaintsLogPage/>},
        {path: 'trail', element: <TrailPage/>},
        {path: 'account', element: <AccountPage/>},
        {path: 'authorization-list', element: <AuthorizationListPage/>},
        {path: 'authorization-queue', element: <AuthorizationQueuePage/>},

      ]
    }
  ]);

  return (
    <RootLayout>
      <RouterProvider router={router} />
    </RootLayout>
  );
}

export default App;