type Order = {
	id?: string;
	userID: string;
	isDone: boolean;
	productsIDs: Array<string>;
	productsQuantities: Array<number>;
};

export default Order;
