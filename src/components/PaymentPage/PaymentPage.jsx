import React, { useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { FlutterWaveButton } from 'flutterwave-react-v3';
import './PaymentPage.css';
import { useNavigate } from 'react-router-dom';

const PaymentPage = () => {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCardDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  // Configuration for Flutterwave
  const flutterwaveConfig = {
    public_key: "YOUR_FLUTTERWAVE_PUBLIC_KEY",
    tx_ref: Date.now(),
    amount: 100, // Specify the amount here
    currency: "USD",
    payment_options: "card, banktransfer, ussd",
    customer: {
      email: "user@example.com",
      phone_number: "123456789",
      name: "User Name",
    },
    customizations: {
      title: "Phone Tracker Payment",
      description: "Payment for device tracking subscription",
      logo: "https://your-logo-url.com/logo.png",
    },
  };

  // PayPal configuration
  const paypalOptions = {
    "client-id": "YOUR_PAYPAL_CLIENT_ID",
    currency: "USD",
  };

  const handlePaymentSuccess = (response) => {
    navigate('/success');
  };

  const handleFlutterwavePayment = () => {
    console.log('Flutterwave payment modal closed');
  };
  

  const handlePaystackPayment = () => {
    const handler = window.PaystackPop.setup({
      key: 'YOUR_PAYSTACK_PUBLIC_KEY',
      email: 'user@example.com',
      amount: 10000,
      currency: 'NGN',
      callback: function(response) {
        handlePaymentSuccess(response);
      },
      onClose: function() {
        alert('Payment cancelled');
      }
    });
    handler.openIframe();
  };

  return (
    <div className="payment-page">
      <h1>Select a Payment Method</h1>

      {/* Payment Method Selection */}
      <div className="payment-method-selection">
        <label>
          <input
            type="radio"
            value="flutterwave"
            checked={paymentMethod === 'flutterwave'}
            onChange={() => setPaymentMethod('flutterwave')}
          />
          Flutterwave
        </label>
        <label>
          <input
            type="radio"
            value="paypal"
            checked={paymentMethod === 'paypal'}
            onChange={() => setPaymentMethod('paypal')}
          />
          PayPal
        </label>
        <label>
          <input
            type="radio"
            value="paystack"
            checked={paymentMethod === 'paystack'}
            onChange={() => setPaymentMethod('paystack')}
          />
          Paystack
        </label>
        <label>
          <input
            type="radio"
            value="card"
            checked={paymentMethod === 'card'}
            onChange={() => setPaymentMethod('card')}
          />
          Card Payment
        </label>
      </div>

      {/* Card Entry Fields - Only display if Card Payment is selected */}
      {paymentMethod === 'card' && (
        <div className="card-entry">
          <h2>Enter Card Details</h2>
          <input
            type="text"
            name="cardNumber"
            placeholder="Card Number"
            value={cardDetails.cardNumber}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="expiryDate"
            placeholder="Expiry Date (MM/YY)"
            value={cardDetails.expiryDate}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="cvv"
            placeholder="CVV"
            value={cardDetails.cvv}
            onChange={handleInputChange}
          />
          <button className="pay-button" onClick={() => alert('Process Card Payment')}>
            Pay with Card
          </button>
        </div>
      )}

      {/* Render Payment Buttons Based on Selection */}
      <div className="payment-options">
        {paymentMethod === 'flutterwave' && (
          <FlutterWaveButton
            {...flutterwaveConfig}
            text="Pay with Flutterwave"
            callback={handlePaymentSuccess}
            onClose={handleFlutterwavePayment}
          />
        )}

        {paymentMethod === 'paypal' && (
          <PayPalScriptProvider options={paypalOptions}>
            <PayPalButtons
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [{ amount: { value: '100' } }],
                });
              }}
              onApprove={(data, actions) => {
                return actions.order.capture().then(handlePaymentSuccess);
              }}
            />
          </PayPalScriptProvider>
        )}

        {paymentMethod === 'paystack' && (
          <button
            className="paystack-button"
            onClick={handlePaystackPayment}
          >
            Pay with Paystack
          </button>
        )}
      </div>
    </div>
  );
};

export default PaymentPage;
