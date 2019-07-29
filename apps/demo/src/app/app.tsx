import React from 'react';
import styled from 'styled-components';
import { ProductsFeature } from '@demo/products/feature';
import { Store } from 'redux';
import { Provider } from 'react-redux';
import { GlobalStyles } from '@demo/shared/ui';

const StyledApp = styled.div`
  padding: 0 2rem;
`;

export const App = (props: { store: Store }) => {
  return (
    <>
      <GlobalStyles />
      <Provider store={props.store}>
        <StyledApp>
          <h1>Welcome!</h1>
          <ProductsFeature />
        </StyledApp>
      </Provider>
    </>
  );
};

export default App;
