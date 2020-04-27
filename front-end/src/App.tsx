import React from 'react';
import GlobalStyled from './styles/global';
import SignIn from './pages/SignIn';

import AppProvider from './hooks';

const App: React.FC = () => (
  <>
    <AppProvider>
      <SignIn />
    </AppProvider>

    <GlobalStyled />
  </>
);

export default App;
