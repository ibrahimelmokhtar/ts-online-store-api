type OrderProduct = {
	id?: string;
	order_id: string; // order's id.
	product_id: string; // product's id.
	product_quantity: number; // product's quantity.
	date_time?: string; // date information.
	date_time_readable?: string; // readable date information.
};

export default OrderProduct;
