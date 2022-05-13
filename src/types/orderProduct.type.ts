type OrderProduct = {
	id?: string;
	order_id: string;
	product_id: string;
	product_quantity: number;
	date_time?: string;
	date_time_readable?: string;
};

export default OrderProduct;
