/**
 * Asynchronously loads the component for Login
 */

 import * as React from 'react';
 import { lazyLoad } from 'utils/loadable';
 import { LoadingIndicator } from 'app/components/LoadingIndicator';
 
 export const ConfirmationForm = lazyLoad(
   () => import('./index'),
   module => module.ConfirmationForm,
   {
     fallback: <LoadingIndicator />,
   },
 );
 