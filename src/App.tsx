import { StoreProvider } from './app/providers';
import { AppRoutes } from './app/routes';

export const App = () => {
  return (
    <StoreProvider>
      <AppRoutes />
    </StoreProvider>
  );
};
