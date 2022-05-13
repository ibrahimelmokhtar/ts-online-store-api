import { Request } from 'express';
import OrderModel from '../../models/order.model';
import Datetime from '../../types/datetime.type';
import Order from '../../types/order.type';

/**
 * @description Add current date into req.body in many forms (ISO and String).
 * @param {Request} req
 * @param {string} dateTime
 * @param {string} dateTimeReadable
 * @returns {Request} Updated version of passed request.
 */
export const setDateAndTime = async (
	req: Request,
	dateTime?: string,
	dateTimeReadable?: string
): Promise<Request> => {
	// get current date and time: NOW()
	const currentDateObject: Date = new Date();

	// extract desired information:
	if (!dateTime) {
		dateTime = currentDateObject.toISOString();
	}
	if (!dateTimeReadable) {
		dateTimeReadable = currentDateObject.toString();
	}

	// set extracted information into (req.body):
	req.body.date_time = dateTime;
	req.body.date_time_readable = dateTimeReadable;

	// return (req) object back again:
	return req;
};

/**
 * @description
 * @param {string} orderID
 * @returns
 */
export const getDateAndTime = async (orderID: string): Promise<Datetime> => {
	// create new instance of OrderModel Class:
	const orderModel = new OrderModel();

	// obtain a specific order by its ID:
	const order: Order = (await orderModel.show(orderID)) as Order;

	const result: Datetime = {
		date_time: '',
		date_time_readable: '',
	};
	if (!order) {
		result.date_time = (order as Order).date_time as string;
		result.date_time_readable = (order as Order)
			.date_time_readable as string;
	}

	return result;
};
