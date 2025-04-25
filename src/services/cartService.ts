import { Product } from '../types/product';

interface CartItem {
  productId: number;
  quantity: number;
}

export const addProductToCart = async (product: Product, userId: number | undefined): Promise<any> => {
  if (!userId) {
    throw new Error('User not authenticated');
  }

  const cartItem: CartItem = {
    productId: product.id,
    quantity: 1, // default quantity of 1
  };

  try {
    const response = await fetch('https://fakestoreapi.com/carts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: userId,
        products: [cartItem],
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to add product to cart');
    }

    return response.json();
  } catch (error) {
    console.error('Error adding product to cart:', error);
    throw error;
  }
};
