type OrdersPerUser = {
	order_id: string; // order's id.
	is_done: boolean; // order's status (true: completed, false: active).
	date_time_readable: string; // readable order's date information.
	total_cost: number; // total cost per order.
};

export default OrdersPerUser;
