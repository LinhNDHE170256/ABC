import React, { useState } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests

const Vnpay = () => {
  const [redirectUrl, setRedirectUrl] = useState('');

  const handlePayment = async () => {
    try {
      const response = await axios.post('/create_payment_url', {
        amount: 100, // Thay đổi giá trị theo yêu cầu của bạn
        bankCode: 'NCB', // Thay đổi giá trị theo yêu cầu của bạn
        orderDescription: 'Mô tả đơn hàng', // Thay đổi giá trị theo yêu cầu của bạn
        orderType: 'billpayment', // Thay đổi giá trị theo yêu cầu của bạn
        language: 'vn', // Thay đổi giá trị theo yêu cầu của bạn
      });
      setRedirectUrl(response.data);
    } catch (error) {
      console.error('Error creating payment URL:', error);
    }
  };

  return (
    <div>
      <button onClick={handlePayment}>Thanh toán</button>
      {redirectUrl && <p>Redirecting...</p>}
      {redirectUrl && <iframe title="VNPay" src={redirectUrl} width="100%" height="600px" />}
    </div>
  );
};

export default Vnpay;
