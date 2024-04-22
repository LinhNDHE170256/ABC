import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const sortObject = (obj) => {
    const sortedKeys = Object.keys(obj).sort();
    const sortedObj = {};
    sortedKeys.forEach(key => {
        sortedObj[key] = obj[key];
    });
    return sortedObj;
};

const Checkout = () => {
    const [paymentStatus, setPaymentStatus] = useState(null);
    const [fullName, setFullName] = useState("");
    const [address, setAddress] = useState("");
    const [mobile, setMobile] = useState("");
    const [email, setEmail] = useState("");

    const navigate = useNavigate();

    const handlePayment = async () => {
        try {
            var ipAddr = window.location.hostname;
            var config = require('config');
            var dateFormat = require('dateformat');

            var tmnCode = config.get('vnp_TmnCode');
            var secretKey = config.get('vnp_HashSecret');
            var vnpUrl = config.get('vnp_Url');
            var returnUrl = config.get('vnp_ReturnUrl');

            var date = new Date();

            var createDate = dateFormat(date, 'yyyymmddHHmmss');
            var orderId = dateFormat(date, 'HHmmss');
            var amount = calculateTotalAmount(); // Sử dụng hàm tính tổng số tiền
            var orderInfo = "Thanh toán đơn hàng"; // Thông tin đơn hàng có thể tùy chỉnh
            var orderType = "billpayment"; // Loại đơn hàng có thể tùy chỉnh
            var locale = "vn"; // Ngôn ngữ có thể tùy chỉnh

            var vnp_Params = {};
            vnp_Params['vnp_Version'] = '2.1.0';
            vnp_Params['vnp_Command'] = 'pay';
            vnp_Params['vnp_TmnCode'] = tmnCode;
            vnp_Params['vnp_Locale'] = locale;
            vnp_Params['vnp_CurrCode'] = 'VND';
            vnp_Params['vnp_TxnRef'] = orderId;
            vnp_Params['vnp_OrderInfo'] = orderInfo;
            vnp_Params['vnp_OrderType'] = orderType;
            vnp_Params['vnp_Amount'] = amount * 100; // Chuyển đổi sang đơn vị tiền VNĐ
            vnp_Params['vnp_ReturnUrl'] = returnUrl;
            vnp_Params['vnp_IpAddr'] = ipAddr;
            vnp_Params['vnp_CreateDate'] = createDate;

            vnp_Params = sortObject(vnp_Params);

            var querystring = require('qs');
            var signData = querystring.stringify(vnp_Params, { encode: false });
            var crypto = require("crypto");
            var hmac = crypto.createHmac("sha512", secretKey);
            var signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex");
            vnp_Params['vnp_SecureHash'] = signed;
            vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });

            // Redirect to vnPay payment page
            window.location.href = vnpUrl;
        } catch (error) {
            // Handle error
            setPaymentStatus("failed");
        }
    };

    // Hàm tính tổng số tiền cần thanh toán (cần được cài đặt tùy thuộc vào logic của bạn)
    const calculateTotalAmount = () => {
        // Logic tính tổng số tiền, có thể lấy từ giỏ hàng hoặc thông tin đơn hàng
    };

    return (
        <div>
            <h2>Checkout</h2>
            <form>
                <div>
                    <label>Full Name:</label>
                    <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                    />
                </div>
                <div>
                    <label>Address:</label>
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>
                <div>
                    <label>Mobile:</label>
                    <input
                        type="text"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
            </form>
            <button onClick={handlePayment}>Pay with vnPay</button>
            {paymentStatus === "failed" && <p>Payment failed. Please try again later.</p>}
        </div>
    );
};

export default Checkout;
