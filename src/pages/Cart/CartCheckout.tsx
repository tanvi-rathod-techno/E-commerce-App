import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Button from '../../components/ui/Button';
import InputRadio from '../../components/ui/InputRadio';
import { ArrowLeft } from 'lucide-react';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const location = useLocation();

  // Access the cart items and product details passed from the CartPage
  const { cartItems, products } = location.state || { cartItems: [], products: [] };

  const shippingCost = 7.0;
  const orderSubtotal = cartItems.reduce((total, item) => {
    const product = products.find((p) => p.id === item.productId);
    return total + (product?.price ?? 0) * item.quantity;
  }, 0);
  const orderTotal = orderSubtotal + shippingCost;

  const [selectedPaymentMethod, setSelectedPaymentMethod] = React.useState<string>('bank-transfer');

  const handleCheckout = () => {
    console.log('Proceeding to checkout...');
  };

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedPaymentMethod(e.target.value);
  };

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 pt-8 pb-4">
        <div className="flex justify-end mb-4">
          <button onClick={() => navigate(-1)} className="text-pink-600 hover:text-pink-800">
            <ArrowLeft />
          </button>
        </div>
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Order Summary */}
          <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Your Order</h2>
            <div className="space-y-4">
              {cartItems.map((item, index) => {
                const product = products.find((p) => p.id === item.productId);
                return (
                  <div key={index} className="flex justify-between text-sm sm:text-base">
                    <span>{product?.title} × {item.quantity}</span>
                    <span>${(product?.price ?? 0) * item.quantity}</span>
                  </div>
                );
              })}
            </div>

            <div className="mt-4 border-t pt-4 text-sm sm:text-base">
              <div className="flex justify-between mb-2">
                <span>Cart Subtotal</span>
                <span>${orderSubtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Shipping</span>
                <span className="text-pink-600">Flat Rate: ${shippingCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between border-t pt-4 font-semibold text-lg">
                <span>Order Total</span>
                <span>${orderTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Payment Methods</h2>
            <div className="space-y-4">
              {/* Payment Option: Direct Bank Transfer */}
              <InputRadio
                id="bank-transfer"
                name="payment-method"
                label="Direct Bank Transfer"
                value="bank-transfer"
                checked={selectedPaymentMethod === 'bank-transfer'}
                onChange={handlePaymentChange}
              />
              <p className="text-sm text-gray-600">
                Make your payment directly into our bank account. Please use your Order ID as the payment reference.
                Your order won’t be shipped until the funds have cleared in our account.
              </p>

              {/* Payment Option: Cheque Payment */}
              <InputRadio
                id="cheque"
                name="payment-method"
                label="Cheque Payment"
                value="cheque"
                checked={selectedPaymentMethod === 'cheque'}
                onChange={handlePaymentChange}
              />

              {/* Payment Option: PayPal */}
              <InputRadio
                id="paypal"
                name="payment-method"
                label="PayPal"
                value="paypal"
                checked={selectedPaymentMethod === 'paypal'}
                onChange={handlePaymentChange}
              />
            </div>

            <div className="mt-6">
              <Button
                onClick={handleCheckout}
                className="bg-pink-600 text-white hover:bg-pink-700"
              >
                Place Order
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
