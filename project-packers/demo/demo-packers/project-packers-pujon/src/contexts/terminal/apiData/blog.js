export const blog = {
    registerBlog: {
        method: 'POST',
        uri: 'blog',
        formData: true,
        body: {
            data: undefined,
            images: undefined
        },
        suggestions: {
            raw: "A raw example of the payload: {data: {title: 'Sample Blog Post',content: '<p>This is the content of the sample blog post. It can include <strong>bold</strong>, <em>italic</em>, and other HTML formatting.</p><p>Here is a list:</p><ul><li>Item 1</li><li>Item 2</li><li>Item 3</li></ul>' }, banner: banner}.",
            data: "Please provide the data in the body object",
            images: "Please provide the images in the body object",
        }
    },
    updateBlog: {
        method: 'PATCH',
        uri: 'blog',
        params: {
            id: undefined
        },
        formData: true,
        body: {
            data: undefined,
        },
        suggestions: {
            raw: "A raw example of the payload:  payload: {data: {title: 'Sample Blog Post',content: '<p>This is the content of the sample blog post. It can include <strong>bold</strong>, <em>italic</em>, and other HTML formatting.</p><p>Here is a list:</p><ul><li>Item 1</li><li>Item 2</li><li>Item 3</li></ul>' }, banner: banner}",
            id: "Please provide 'id' field in the params object.",
            data: "Please provide the data in the body object",
        }
    },
    allBlog: {
        method: 'GET',
        uri: 'blog',
        suggestions: {
            raw: "A raw example of the uri: 'Blog'.",
        }
    },
    singleBlog: {
        method: 'GET',
        uri: 'blog',
        params: {
            id: undefined
        },
        suggestions: {
            raw: "A raw example of the uri: 'Blog/64d37fe49de8a944a29fb2b8'.",
            id: "Please provide 'id' field in the params object."
        }
    },
    removeBlog: {
        method: 'DELETE',
        uri: 'deleteblog',
        params: {
            id: undefined
        },
        suggestions: {
            raw: "A raw example of the uri: 'deleteblog'.",
            id: "Please provide an array of 'id' in body object."
        }
    }
}