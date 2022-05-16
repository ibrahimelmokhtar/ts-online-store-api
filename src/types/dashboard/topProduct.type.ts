type TopProduct = {
	product_id: string; // product's id.
	product_name: string; // product's name.
	total_quantity: number; // product's count through all orders.
	x_orders: number; // number of orders that this product is found in.
};

export default TopProduct;
