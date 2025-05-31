export const extractErrorMessages = (error) => {

    if (!error) return null;

    if (error.response?.data) {

        const data = error.response.data;

        // handle Zod validation errors (array format)



        if (data.errors && Array.isArray(data.errors)) {
            return data.errors.map(err => err.message).join(',');
        }

        // handle single error message

        if (data.message) {
            return data.message;
        }

        // handle error field

        if (data.error) {
            return data.error
        }

    }


    // handle network errors


    if (error.response && !error.response) {
        return 'Network Error , Please check your connection'
    }

    // Fall back to general error

    if (error.message) {
        return error.message
    }
    // Handle other types of errors

    return 'Something went wrong. please try again'

}