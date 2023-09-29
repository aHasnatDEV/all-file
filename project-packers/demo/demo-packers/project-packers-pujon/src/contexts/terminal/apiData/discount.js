export const discount = {
    registerDiscount: {
        method: 'POST',
        uri: 'discount',
        body: {
            code: undefined,
            category: undefined,
            subcategory: undefined,
            expiry_date: undefined,
            limit: undefined
        },
        suggestions: {
            raw: "A raw example of the payload:{code: 'hello50',category: '64c37d290d10a967880c78f8',subcategory: '64c37d280d10a967880c78f6',amount: '50',expiry_date: '10/12/2023',limit: '20'}.",
            code: "Please provide code.",
            category: "Please provide category.",
            subcategory: "Please provide subcategory.",
            expiry_date: "Please provide expiry_date.",
            limit: "Please provide limit."
        }
    },
    allDiscount: {
        method: 'GET',
        uri: 'discount',
        suggestions: {
            raw: "A raw example of the uri: 'discount'.",
        }
    },
    removeDiscount: {
        method: 'DELETE',
        uri: 'deleteDiscount',
        body: {
            id: undefined
        },
        suggestions: {
            raw: "A raw example of the uri: 'deletediscount'.",
            id: "Please provide an array of 'id' in body object."
        }
    },
    useDiscount: {
        method: 'GET',
        uri: 'usediscount',
        query: {
            code: undefined
        },
        suggestions: {
            raw: "A raw example of the uri: 'deletediscount'.",
            code: "Please provide the discount code in query."
        }
    },
    abandonDiscount: {
        method: 'GET',
        uri: 'abandondiscount',
        query: {
            code: undefined
        },
        suggestions: {
            raw: "A raw example of the uri: 'deletediscount'.",
            code: "Please provide the discount code in query."
        }
    },
}