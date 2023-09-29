export const notification = {
    getNotification: {
        method: "GET",
        uri: "notification",
        suggestions: {
            raw: "A raw example of the uri: 'getnotification'",
        }
    },
    deleteNotification: {
        method: "DELETE",
        uri: "notification",
        params: {
            id: undefined,
        },
        suggestions: {
            raw: "A raw example of the uri: 'deletenotification'",
        }
    }
}