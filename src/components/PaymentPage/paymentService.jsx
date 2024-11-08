// paymentService.js
export const initializePayment = async (paymentDetails) => {
    try {
      // Example API call to initiate payment with your gateway
      const response = await fetch('/api/payments/initiate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentDetails),
      });
      const result = await response.json();
  
      return result; // Return result to process response in PaymentPage component
    } catch (error) {
      console.error('Error initializing payment:', error);
      throw error;
    }
  };
  