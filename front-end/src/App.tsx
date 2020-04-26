import React from 'react';
import GlobalStyled from './styles/global';
import SignIn from './pages/SignIn';

import { AuthProvider } from './context/AuthContext';

const App: React.FC = () => (
  <>
    <AuthProvider>
      <SignIn />
    </AuthProvider>
    <GlobalStyled />
  </>
);

export default App;
