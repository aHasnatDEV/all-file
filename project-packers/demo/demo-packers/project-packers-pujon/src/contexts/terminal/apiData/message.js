export const message = {
    sendMessage: {
        method: "POST",
        uri: "sendmessage",
        params: {
            id: undefined
        },
        body: {
            message: undefined
        },
        suggestions: {
            raw: "A raw example of the uri: 'sendmessage'",
            id: "Please enter support id",
            message: "Please enter message"
        }
    },
    getMessage: {
        method: "GET",
        uri: "getmessage",
        params: {
            id: undefined
        },
        suggestions: {
            raw: "A raw example of the uri: 'getmessage'",
            id: "Please enter support id"
        }
    }
}