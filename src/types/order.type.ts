type Order = {
    id?: string;
    products: Array<string>;
    quantities: Array<number>;
    userID: string;
    orderStatus: boolean;
};

export default Order;
