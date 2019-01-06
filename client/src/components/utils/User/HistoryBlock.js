import React from "react";
import Moment from "react-moment";

const HistoryBlock = props => {
  return (
    <div className="history_block">
      <table>
        <thead>
          <tr>
            <th>Data of Purchase</th>
            <th>Product</th>
            <th>Price Paid</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {props.products
            ? props.products.map((product, index) => (
                <tr key={index}>
                  <td>
                    <Moment format={"MM/DD/YYYY"}>
                      {product.dateOfPurchase}
                    </Moment>
                  </td>
                  <td>
                    {product.brand.name} {product.name}
                  </td>
                  <td>$ {product.price}</td>
                  <td>{product.quantity}</td>
                </tr>
              ))
            : null}
        </tbody>
      </table>
    </div>
  );
};

export default HistoryBlock;
