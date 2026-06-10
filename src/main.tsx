import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {HelmetProvider} from 'react-helmet-async';
import {RouterProvider} from '@tanstack/react-router';
import {router} from './router.tsx';
import {SiteDataProvider} from './contexts/SiteDataContext';
import {AuthProvider} from './contexts/AuthContext';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <AuthProvider>
        <SiteDataProvider>
          <RouterProvider router={router} />
        </SiteDataProvider>
      </AuthProvider>
    </HelmetProvider>
  </StrictMode>,
);
