export const cart = {
    registerCart: {
        method: "POST",
        uri: "cart",
        body: {
            products: undefined,
        },
        suggestions: {
            raw: "A raw example of the uri: 'cart'",
            products: "Please select a product",
        }
    },
    updateCart: {
        method: "PATCH",
        uri: "cart",
        suggestions: {
            raw: "A raw example of the uri: 'cart'",
        }
    },
    getCart: {
        method: "GET",
        uri: "cart",
        suggestions: {
            raw: "A raw example of the uri: 'cart'.",
        }
    },
    addDiscount: {
        method: "PATCH",
        uri: "cartdiscount",
        body: {
            discountApplied: undefined
        },
        suggestions: {
            raw: "A raw example of the uri: 'cart'.",
            discountApplied: "Please add a discount"
        }
    }
}