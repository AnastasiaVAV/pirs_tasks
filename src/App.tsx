import { StoreProvider } from './providers';
import { AppRoutes } from './routes';

export const App = () => {
  return (
    <StoreProvider>
      <AppRoutes />
    </StoreProvider>
  );
};
