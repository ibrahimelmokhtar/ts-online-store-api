type Order = {
	id?: string;
	user_id: string;
	is_done: boolean;
	products_ids: Array<string>;
	products_quantities: Array<number>;
	date_time?: string;
	date_time_readable?: string;
};

export default Order;
