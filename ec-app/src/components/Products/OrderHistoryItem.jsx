import React from 'react';
import Divider from "@material-ui/core/Divider";
import { OrderProducts } from "./index";
import { datetimeToString, dateToString } from "../../functions/common";
import { TextDetail } from "../UIkit";
import { makeStyles, createStyles } from '@material-ui/core/styles';


const OrderHistoryItem = (props) => {

    const orderedDatetime = datetimeToString(props.order.updated_at.toDate())
    const shippingDate = dateToString(props.order.shipping_date.toDate())
    const totalPrice = "¥" + props.order.amount.toLocaleString()
    const products = props.order.products
    return (
        <div>
            <div className="module-spacer--small" />
            <TextDetail label={"注文ID"} value={props.order.id} />
            <TextDetail label={"注文日時"} value={orderedDatetime} />
            <TextDetail label={"発送予定日"} value={shippingDate} />
            <TextDetail label={"注文金額"} value={totalPrice} />
            {products.length > 0 && (
                <OrderProducts products={products} />
            )}
            <div className="module-spacer--extra-extra-small" />
            <Divider />
        </div>
    );
};

export default OrderHistoryItem;
