type Order = {
	id?: string;
	user_id: string; // user's id.
	is_done: boolean; // order's status (true: completed, false: active).
	products_ids: Array<string>; // products ids.
	products_quantities: Array<number>; // products quantities.
	date_time?: string; // date information.
	date_time_readable?: string; // readable date information.
};

export default Order;
