import Order from "../model/order.js";
import moment from "moment";

export const createOrder = async (req, res) => {
  const { tableNumber, orderItem, orderType, orderStatus } = req.body;

  if (!tableNumber || !orderItem) {
    return res.status(400).json({ msg: "required fields" });
  }

  orderType === undefined ? "dineIn" : orderType;

  const order = await Order.create({
    tableNumber,
    orderItem,
    orderType,
    orderStatus,
  });

  console.log(tableNumber);
  console.log(orderItem);
  if (!order) {
    return res.status(401).json({ msg: "Order was not placed successfully" });
  }

  return res.status(201).json({ msg: "Order Created Suuccessfully" });
};

export const totalOrder = async (req, res) => {
  const orders = await Order.find();

  return res.status(200).json({ msg: "All good", count: orders.length });
};

export const totalRevenue = async (req, res) => {
  const order = await Order.find();
  let totalRevenue = 0;

  order.map((item) => {
    totalRevenue +=
      (item.orderItem.Capricciosa.quantity || 0) *
      (item.orderItem.Capricciosa.price || 0);
    totalRevenue +=
      (item.orderItem.Marinara.quantity || 0) *
      (item.orderItem.Marinara.price || 0);
    totalRevenue +=
      (item.orderItem.Pepperoni.quantity || 0) *
      (item.orderItem.Pepperoni.price || 0);
    totalRevenue +=
      (item.orderItem.Sicilian.quantity || 0) *
      (item.orderItem.Sicilian.price || 0);
    totalRevenue +=
      (item.orderItem.chicken.quantity || 0) *
      (item.orderItem.chicken.price || 0);
  });
  console.log(order);

  return res
    .status(200)
    .json({ msg: "All good revenue", revenue: totalRevenue });
};

export const orderTypeDetails = async (req, res) => {
  const order = await Order.find();

  const result = {
    daily: { served: 0, dineIn: 0, takeAway: 0 },
    weekly: { served: 0, dineIn: 0, takeAway: 0 },
    monthly: { served: 0, dineIn: 0, takeAway: 0 },
    yearly: { served: 0, dineIn: 0, takeAway: 0 },
  };

  order.forEach((order) => {
    const created = new Date(order.createdAt);
    const createdat = order.createdAt;

    const dayKey = created.toISOString().split("T")[0];
    const daykeyOr = createdat.toISOString().split("T")[0];
    const weekKey = `${created.getFullYear()}-W${moment(created).isoWeek()}`;
    const weekKeyOr = `${createdat.getFullYear()}-W${moment(
      createdat
    ).isoWeek()}`;

    const monthKey = `${created.getFullYear()}-${created.getMonth() + 1}`;
    const monthKeyOr = `${createdat.getFullYear()}-${createdat.getMonth() + 1}`;
    const yearKey = `${created.getFullYear()}`;
    const yearKeyOr = `${createdat.getFullYear()}`;

    if (dayKey === daykeyOr) {
      if (order.orderType === "served") result.daily.served++;
      if (order.orderType === "dineIn") result.daily.dineIn++;
      if (order.orderType === "takeAway") result.daily.takeAway++;
    }
    if (weekKey === weekKeyOr) {
      if (order.orderType === "served") result.weekly.served++;
      if (order.orderType === "dineIn") result.weekly.dineIn++;
      if (order.orderType === "takeAway") result.weekly.takeAway++;
    }
    if (monthKey === monthKeyOr) {
      if (order.orderType === "served") result.monthly.served++;
      if (order.orderType === "dineIn") result.monthly.dineIn++;
      if (order.orderType === "takeAway") result.monthly.takeAway++;
    }
    if (yearKey === yearKeyOr) {
      if (order.orderType === "served") result.yearly.served++;
      if (order.orderType === "dineIn") result.yearly.dineIn++;
      if (order.orderType === "takeAway") result.yearly.takeAway++;
    }
  });

  console.log(result);
  return res
    .status(200)
    .json({ msg: "All good in orderTypeDetails", orderType: result });
};

export const weekDayRevenue = async (req, res) => {
  const order = await Order.find();

  let weekdayRevenue = {
    Monday: 0,
    Tuesday: 0,
    Wednesday: 0,
    Thursday: 0,
    Friday: 0,
    Saturday: 0,
    Sunday: 0,
  };

  const weekdayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  order.forEach((item) => {
    const orderDay = new Date(item.createdAt).getDay();

    const dayName = weekdayNames[orderDay];

    const items = item.orderItem;

    for (const [key, value] of Object.entries(items)) {
      if (value?.price && value?.quantity) {
        weekdayRevenue[dayName] += value.price * value.quantity;
      }
    }
  });

  let sale = [];

  Object.entries(weekdayRevenue).forEach(([key, value], index) => {
    sale.push(value);
  });
  return res.status(200).json({
    revenueByWeekday: sale,
  });
};

export const orderSummary = async (req, res) => {
  const order = await Order.find();

  const summary = [];
  order.map((item) => {
    const order = item.orderItem;
    const summaryItems = {
      name: [],
      totalOrder: 0,
      orderType: "",
      orderStatus: "",
      tableNumber: 0,
      time: "",
    };

    if (order.Capricciosa.quantity !== undefined) {
      summaryItems.totalOrder += order.Capricciosa.quantity;
      summaryItems.name.push("Capricossa");
      summaryItems.orderType = item.orderType;
      summaryItems.orderStatus = item.orderStatus;
      summaryItems.tableNumber = item.tableNumber;
      summaryItems.time = item.createdAt.toTimeString().split(" ")[0];
    }
    if (order.Marinara.quantity !== undefined) {
      summaryItems.totalOrder += order.Marinara.quantity;
      summaryItems.name.push("Marinara");
      summaryItems.orderType = item.orderType;
      summaryItems.orderStatus = item.orderStatus;
      summaryItems.tableNumber = item.tableNumber;
      summaryItems.time = item.createdAt.toTimeString().split(" ")[0];
    }
    if (order.Sicilian.quantity !== undefined) {
      summaryItems.totalOrder += order.Sicilian.quantity;
      summaryItems.name.push("Sicilian");
      summaryItems.orderType = item.orderType;
      summaryItems.orderStatus = item.orderStatus;
      summaryItems.tableNumber = item.tableNumber;
      summaryItems.time = item.createdAt.toTimeString().split(" ")[0];
    }
    if (order.Pepperoni.quantity !== undefined) {
      summaryItems.totalOrder += order.Pepperoni.quantity;
      summaryItems.name.push("Pepperoni");
      summaryItems.orderType = item.orderType;
      summaryItems.orderStatus = item.orderStatus;
      summaryItems.tableNumber = item.tableNumber;
      summaryItems.time = item.createdAt.toTimeString().split(" ")[0];
    }
    if (order.chicken.quantity !== undefined) {
      summaryItems.totalOrder += order.chicken.quantity;
      summaryItems.name.push("chicken");
      summaryItems.orderType = item.orderType;
      summaryItems.orderStatus = item.orderStatus;
      summaryItems.tableNumber = item.tableNumber;
      summaryItems.time = item.createdAt.toTimeString().split(" ")[0];
    }

    summary.push(summaryItems);
  });

  return res.status(200).json({ msg: "all good in summary", summary: summary });
};
