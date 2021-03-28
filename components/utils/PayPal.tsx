import PayPalCheckout from "react-paypal-checkout-button";
import "react-paypal-checkout-button/dist/index.css";

function PayPal() {
  return (
    <PayPalCheckout
      clientId="Af9OVjRheL06cma0E0ilsSgyNQCdikYYbzAoZ_437Idy82RW3Y3gTFqN7G7O-VQ0oIB3xF9_weG-aWjY"
      amount={100}
      currency="USD"
      onSuccess={(data: any, order: any) => {
        console.log(data, order);
      }}
      onError={(error: any) => {
        console.log(error);
      }}
    />
  );
}

export default PayPal;
