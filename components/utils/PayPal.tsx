import React from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
interface Props {
  total: number;
  onApporve: Function;
}

function PayPal(props: Props) {
  return (
    <PayPalScriptProvider
      options={{
        "client-id":
          "AQtOFFRJSeihOZQZ4_cJP67f_2b5ZEoDO9B97g3sMjXs_XhgUie3P0vXXn4rDB6zKT3BvOdDatVDjMVY",
      }}
    >
      <PayPalButtons
        style={{
          layout: "horizontal",
          color: "black",
          tagline: false,
          height: 35,
        }}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: `${props.total}`,
                },
              },
            ],
          });
        }}
        onApprove={props.onApporve}
      />
    </PayPalScriptProvider>
  );
}

export default PayPal;
