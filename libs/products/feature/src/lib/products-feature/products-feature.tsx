import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@demo/shared/ui';

import {
  selectProductsEntities,
  selectProductsLoaded,
  fetchProducts
} from '../+state/products.slice';

export const ProductsFeature = () => {
  const products = useSelector(selectProductsEntities);
  const loaded = useSelector(selectProductsLoaded);
  const dispatch = useDispatch();
  const handleAdd = id => () => alert('Not Implemented!');

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  return (
    <StyledProductsFeature>
      <h2>Products</h2>
      {loaded ? (
        <List>
          {products &&
            products.map(p => (
              <ListItem key={p.id}>
                <Cover>
                  <a
                    href={p.coverUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <CoverImage src={p.coverUrl} />
                  </a>
                </Cover>
                <Details>
                  <Title>{p.name}</Title>
                  <Author>By {p.author}</Author>
                  <Price>CDN$ {p.price}</Price>
                  <Button onClick={handleAdd(p.id)}>Add to Cart</Button>
                </Details>
              </ListItem>
            ))}
        </List>
      ) : (
        <Loading>Loading...</Loading>
      )}
    </StyledProductsFeature>
  );
};

const StyledProductsFeature = styled.div``;

const COVER_SIZE = '120px';

const Loading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50vh;
  font-size: 1.5rem;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
`;

const ListItem = styled.li`
  margin-bottom: 1rem;
  display: flex;
`;

const Title = styled.h3`
  margin: 0 0 0.5rem 0;
  font-size: 1rem;
  font-weight: 600;
`;

const Author = styled.p`
  margin: 0 0 1rem 0;
  font-size: 0.8rem;
`;

const Cover = styled.div`
  width: ${COVER_SIZE};
  margin-right: 1rem;
`;

const CoverImage = styled.img`
  max-width: ${COVER_SIZE};
  max-height: ${COVER_SIZE};
`;

const Details = styled.div`
  flex: 1;
`;

const Price = styled.span`
  margin-right: 1rem;
`;

export default ProductsFeature;
