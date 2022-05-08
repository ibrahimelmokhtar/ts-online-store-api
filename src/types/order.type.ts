type Order = {
	id?: string;
	products?: Array<string>;
	quantities?: Array<number>;
	userID: string;
	isDone: boolean;
};

export default Order;
