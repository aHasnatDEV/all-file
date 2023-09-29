export default function prepareReq(serverUrl) {
    /**
 * A dynamic fetch function that can be used to make HTTP requests.
 *  - @param {Object} options - An object containing the options for the fetch function.
 *  - @param {string} options.method - The HTTP method to use for the request (e.g. 'GET', 'POST', 'PUT', 'DELETE'). The default value is 'GET'.
 *  - @param {string} options.uri - The URI to make the request to.
 *  - @param {Object} options.body - An object containing the data to be sent with the request. The default value is an empty object.
 *  - @param {Object} options.headers - An object containing the headers to be sent with the request.
 *
 * @returns {Promise} A promise that resolves with the response data if the request is successful, or rejects with an error if the request fails.
 */
    return async ({ method = 'GET', uri, body = '{}', headers }) => {
        try {
            let url = uri.startsWith('https://') ? uri : `${serverUrl || 'http://localhost:4000/api'}/${uri}`;
            var payload = {
                method,
                credentials: 'include'
            }
            if (headers && method !== 'GET') payload = { ...payload, headers, body };
            if (method === 'POST' || method === 'PATCH' && !headers) payload = { ...payload, body }
            const response = await fetch(url, payload)
            return await response.json();
        }
        catch (err) {
            throw new Error(err)
        }
    }
  };
