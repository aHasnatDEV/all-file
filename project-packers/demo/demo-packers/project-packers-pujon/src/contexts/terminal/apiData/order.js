export const order = {
    registerOrder: {
        method: "POST",
        uri: "order",
        body: {
            email: undefined,
            shippingaddress: undefined,
            phone: undefined
        },
        suggestions: {
            raw: "A raw example of the payload: {email:'abcd@abc.com',products:[{product, productQuantity}], phone:'01111111111',shippingaddress:'{name:'a', address:'b', city:'c',area:'d',zip:'111'}'}.",
            email: "Please enter your email address",
            shippingaddress: "Please enter your shipping address",
            phone: "Please enter your phone number"
        }
    },
    allOrders: {
        method: "GET",
        uri: "order",
        suggestions: {
            raw: "A raw example of the uri: 'discount'.",
        }
    },
    singleOrder: {
        method: "GET",
        uri: "order",
        params: {
            id: undefined
        },
        suggestions: {
            raw: "A raw example of the uri: 'order/64d32151ff0abe43d9cbb5ab'.",
            id: "Please provide an id"
        }
    },
    updateOrder: {
        method: "PATCH",
        uri: "order",
        params: {
            id: undefined
        },
        suggestions: {
            raw: "A raw example of the uri: 'order/64d32151ff0abe43d9cbb5ab'.",
            id: "Please provide an id"
        }
    },
    deleteOrder: {
        method: "DELETE",
        uri: "deleteorder",
        body: {
            id: undefined,
        },
        suggestions: {
            raw: "A raw example of the uri: 'deleteorder'.",
            id: "Please provide an array of id"
        }
    },
    userOrder: {
        method: "GET",
        uri: "userorder/me",
        suggestions: {
            raw: "A raw example of the uri: 'userorder/me'.",
        }
    },
    refundOrder: {
        method: "POST",
        uri: "refundorder",
        params: {
            id: undefined
        },
        body: {
            remarks: undefined
        },
        suggestions: {
            raw: "A raw example of the uri: 'refundorder'.",
            id: "Please provide the order id",
            remarks: "Please provide why you want to refund in body object as remarks."
        }
    },
    refundStatus: {
        method: "GET",
        uri: "refundstatus",
        params: {
            id: undefined
        },
        suggestions: {
            raw: "A raw example of the uri: 'refundstatus'.",
            id: "Please provide the order id.",
        }
    },
    transactionStatus: {
        method: "GET",
        uri: "transactionstatus",
        params: {
            id: undefined
        },
        suggestions: {
            raw: "A raw example of the uri: 'transactionstatus'.",
            id: "Please provide the order id.",
        }
    }
}