export interface Product {
  id: number;
  name: string;
  author: string;
  price: number;
  coverUrl: string;
}

// Fake API call
export function getProducts(): Promise<Product[]> {
  // Simulate network latency
  return new Promise(res => setTimeout(res, 200)).then(() => [
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
  ]);
}
