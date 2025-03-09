import React from "react";
import useData  from "../../hooks/useData";
import "./MyOrderPage.css";
import Table from "../Common/Table";
import Loader from "../Common/Loader";

const MyOrderPage = () => {

  const { data: orders, error, isLoading } = useData("order");
  const getProductString = order => {
   const producrStrigArr = order.products.map(p => `${p.product.title}(${p.quantity})`);
  
   return producrStrigArr.join(" , ");
  }

  return (
    <section className="align_center myorder_page">
    {isLoading && <Loader />}
    {error && <em className="form_error">{error}</em>}
    {orders && (
      <Table headings={["Order", "Products", "Total", "Status"]}>
        <tbody>
          {orders.map((order,index) => (
            <tr key={order._id}>
              <td>{index + 1}</td>
              <td>
                {getProductString(order)}
              </td>
              <td>${order.total.toFixed(2)}</td>
              <td>{order.status}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    )}
  </section>
);
};

export default MyOrderPage;
