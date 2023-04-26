import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Layout } from './components/layout';
import { Header } from './components/layout/header';
import { Main } from './modules/main';
import { SideText } from './modules/side-text';
import { Provider } from 'react-redux';
import store from './store';
import { CustomProvider } from 'rsuite';

function App() {
  return (
    <BrowserRouter>
      <CustomProvider theme='dark'>
        <Provider store={store}>
          <Header />
          <Layout>
            <Main />
            <SideText />
          </Layout>
        </Provider>
      </CustomProvider>
    </BrowserRouter>
  );
}

export default App;
