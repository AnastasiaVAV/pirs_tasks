import { BrowserRouter } from 'react-router-dom';
import { StoreProvider } from './app/providers';
import { AppRoutes } from './app/routes';

export const App = () => {
  return (
    <StoreProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </StoreProvider>
  );
};
