export const support = {
    registerSupport: {
        method: "POST",
        uri: "support",
        body: {
            type: undefined,
            message: undefined
        },
        suggestions: {
            raw: "A raw example of the payload: {message:'This is a sample message', type:'payment'}.",
            type: "Please mention the type of support",
            message: "Please enter a message"
        }
    },
    allSupports: {
        method: "GET",
        uri: "support",
        suggestions: {
            raw: "A raw example of the uri: 'support'.",
        }
    },
    singleSupport: {
        method: "GET",
        uri: "support",
        params: {
            id: undefined
        },
        suggestions: {
            raw: "A raw example of the uri: 'support/64d0e49ce38a875d6f3e49ee'.",
            id: "Please provide an id"
        }
    },
    updateSupport: {
        method: "PATCH",
        uri: "support",
        params: {
            id: undefined
        },
        suggestions: {
            raw: "A raw example of the uri: 'support/64d0e49ce38a875d6f3e49ee'.",
            id: "Please provide an id"
        }
    },
    deletesupport: {
        method: "DELETE",
        uri: "deletesupport",
        body: {
            id: undefined,
        },
        suggestions: {
            raw: "A raw example of the uri: 'deletesupport'.",
            id: "Please provide an array of id"
        }
    },
}