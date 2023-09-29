export const request = {
    registerRequest: {
        method: 'POST',
        uri: 'request',
        formData: true,
        body: {
            data: undefined,
            images: undefined
        },
        suggestions: {
            raw: "A raw example of the payload:{ data: {name: 'Sample Request Mail test',link: 'This is a sample req link.',note: 'Sample Origin',quantity: ' 2'}}, images: 'images'}.",
            data: "Please provide the data in the body object",
            images: "Please provide the images in the body object",
        }
    },
    updateRequest: {
        method: 'PATCH',
        uri: 'request',
        params: {
            id: undefined
        },
        formData: true,
        body: {
            data: undefined,
        },
        suggestions: {
            raw: "A raw example of the payload: { data: {name: 'Sample Request',link: 'This is a sample req link.',note: 'Sample Origin',quantity: '2', status:'processing'}}, images: 'images'}.",
            id: "Please provide 'id' field in the params object.",
            data: "Please provide the data in the body object",
        }
    },
    invoiceRequest: {
        method: 'PATCH',
        uri: 'sendinvoice',
        params: {
            id: undefined
        },
        formData: true,
        body: {
            data: undefined,
        },
        suggestions: {
            raw: "A raw example of the payload: { data: {name: 'Sample Request',link: 'This is a sample req link.',note: 'Sample Origin',quantity: '2'}}, images: 'images'}.",
            id: "Please provide 'id' field in the params object.",
            data: "Please provide the data in the body object",
        }
    },
    allRequest: {
        method: 'GET',
        uri: 'request',
        suggestions: {
            raw: "A raw example of the uri: 'request'.",
        }
    },
    singleRequest: {
        method: 'GET',
        uri: 'request',
        params: {
            id: undefined
        },
        suggestions: {
            raw: "A raw example of the uri: 'request/64d37fe49de8a944a29fb2b8'.",
            id: "Please provide 'id' field in the params object."
        }
    },
    removeRequest: {
        method: 'DELETE',
        uri: 'deleterequest',
        body: {
            id: undefined
        },
        suggestions: {
            raw: "A raw example of the uri: 'deleterequest'.",
            id: "Please provide an array of 'id' in body object."
        }
    }
}