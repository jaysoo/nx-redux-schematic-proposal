import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import { loadProductsSuccess } from '../+state/products.actions';
import { getProductsEntities } from '../+state/products.selectors';
import { Button } from '@demo/shared/ui';

export const ProductsFeature = () => {
  const products = useSelector(getProductsEntities);
  const dispatch = useDispatch();
  const handleAdd = id => () => alert('Not Implemented!');

  useEffect(() => {
    dispatch(loadProductsAsync());
  }, []);

  return (
    <StyledProductsFeature>
      <h2>Products</h2>
      <List>
        {products.map(p => (
          <ListItem key={p.id}>
            <Cover>
              <a href={p.coverUrl} target="_blank" rel="noopener noreferrer">
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
    </StyledProductsFeature>
  );
};

const StyledProductsFeature = styled.div``;

const COVER_SIZE = '120px';

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

// This is using redux-thunk since it is the built-in way of handling effects.
// We might want to look into installing another effects library by default (redux-observable or redux-saga)
// so effects dataflow can be managed more easily (e.g. race conditions, etc.).
function loadProductsAsync() {
  return dispatch =>
    fetchProducts().then(products => dispatch(loadProductsSuccess(products)));
}

// Fake API call
async function fetchProducts() {
  return [
    {
      id: 1,
      name: 'The Pigeon HAS to Go to School!',
      author: 'Mo Willems',
      price: 9.99,
      coverUrl:
        'https://images-na.ssl-images-amazon.com/images/I/81%2BCTu%2BrfQL.jpg'
    },
    {
      id: 2,
      name: "Moon's First Friends: One Giant Leap for Friendship",
      author: 'Susanna Leonard Hill',
      price: 19.99,
      coverUrl:
        'https://images-na.ssl-images-amazon.com/images/I/A1Za2glmr7L.jpg'
    },
    {
      id: 3,
      name: 'What Do You Do with an Idea? ',
      author: 'Kobi Yamada',
      price: 20.99,
      coverUrl:
        'https://images-na.ssl-images-amazon.com/images/I/81QesGjbmlL.jpg'
    },
    {
      id: 4,
      name: "Sorry, Grown-Ups, You Can't Go to School!",
      author: 'Christina Geist',
      price: 9.99,
      coverUrl:
        'https://images-na.ssl-images-amazon.com/images/I/91bSKAes46L.jpg'
    },
    {
      id: 5,
      name: 'The Wonderful Things You Will Be',
      author: 'Emily Winfield Martin',
      price: 14.99,
      coverUrl:
        'https://images-na.ssl-images-amazon.com/images/I/91HHxxtA1wL.jpg'
    }
  ];
}

export default ProductsFeature;
