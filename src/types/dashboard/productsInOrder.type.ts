type ProductsInOrder = {
	order_id: string; // order's id.
	is_done: boolean; // order's status (true: completed, false: active).
	date_time: string; // order's date information.
	date_time_readable: string; // readable order's date information.
	user_id: string; // user's id.
	user_name: string; // user's name
	Product_id: string; // product's id.
	product_name: string; // product's name.
	product_category: string; // product's category.
	product_price: number; // product's price.
	product_quantity: number; // product's quantity.
	total_price: number; // product's total price in order.
};

export default ProductsInOrder;
