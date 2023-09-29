export const schemas = {
  product: {
    id: "string",
    name: "string",
    description: "string",
    price: "number",
  },
  request: {
    id: "string",
    requestNumber: "string",
    name: "string",
    link: "string",
    customer: "string"
  },
  order: {
    id: "string",
    orderNumber: "string",
    customer: "string",
  },
  customer: {
    id: "string",
    name: "string",
    phone: "string",
  },
};
