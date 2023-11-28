//API_NOTIFICATION_MESSAGES

export const API_NOTIFICATION_MESSAGES = {
    loading: {
        title: "Loading...",
        message: "Data is being loaded from the server"
    },
    success: {
        title: "Success",
        message: "Data is loaded from the server"
    },
    responseFailure: {
        title: "Error",
        message: "An error occured while fetching data from the server, please try again"
    },
    requestFailure: {
        title: "Error",
        message: "An error occured while parsing request data"
    },
    networkError: {
        title: "Error",
        message: "Unable to connect to server, please check your internet connection"
    },
}


// API service call
//Sampke request
//Need service call : {url: '/', method: 'POST/GET/PUT/DELETE' params: true/false, query: true/false}

export const SERVICE_URLS = {
    userSignup:{ url: '/signup', method: 'POST' },
    userLogin:{ url: '/login', method: 'POST' },
    uploadFile:{ url: '/file/upload', method: 'POST' },
}