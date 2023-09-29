export const product = {
    registerProduct: {
        method: 'POST',
        uri: 'products',
        formData: true,
        body: {
            data: undefined,
            images: undefined
        },
        suggestions: {
            raw: "A raw example of the payload: {data: { name: 'Testing Product',description: 'This is a sample product description.',origin: 'Sample Origin',quantity: '20',price: '10.00',tax: '10.00',fee: '5.00',category: '64c37d290d10a967880c78f8',subcategory: '64c37d280d10a967880c78f6',tags: 'sample, shoe, electronics',link: 'https://example.com/sample-product'},images:'images'}.",
            data: "Please provide the data in the body object",
            images: "Please provide the images in the body object",
        }
    },
    updateProduct: {
        method: 'PATCH',
        uri: 'products',
        params: {
            id: undefined
        },
        formData: true,
        body: {
            data: undefined,
        },
        suggestions: {
            raw: "A raw example of the payload: {data: { name: 'Testing Product',description: 'This is a sample product description.',origin: 'Sample Origin',quantity: '20',price: '10.00',tax: '10.00',fee: '5.00',category: '64c37d290d10a967880c78f8',subcategory: '64c37d280d10a967880c78f6',tags: 'sample, shoe, electronics',link: 'https://example.com/sample-product'},images:'images'}.",
            id: "Please provide 'id' field in the params object.",
            data: "Please provide the data in the body object",
        }
    },
    allProduct: {
        method: 'GET',
        uri: 'products',
        suggestions: {
            raw: "A raw example of the uri: 'products'.",
        }
    },
    singleProduct: {
        method: 'GET',
        uri: 'products',
        params: {
            id: undefined
        },
        suggestions: {
            raw: "A raw example of the uri: 'product/64ca84cf1c1475adfdf18e4d'.",
            id: "Please provide 'id' field in the params object."
        }
    },
    removeProduct: {
        method: 'DELETE',
        uri: 'deleteproduct',
        body: {
            id: undefined
        },
        suggestions: {
            raw: "A raw example of the uri: 'deleteproduct'.",
            id: "Please provide an array of 'id' in body object."
        }
    }
}