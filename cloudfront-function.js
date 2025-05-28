function handler(event) {
    var request = event.request;
    var uri = request.uri;

    // List of file extensions that should be served directly
    var staticFileExtensions = [
        '.html',
        '.js',
        '.css',
        '.png',
        '.jpg',
        '.jpeg',
        '.gif',
        '.svg',
        '.ico',
        '.json',
        '.txt',
        '.woff',
        '.woff2',
        '.ttf',
        '.eot',
    ];

    // Check if the URI has a file extension
    var hasExtension = staticFileExtensions.some((ext) => uri.endsWith(ext));

    // If the URI doesn't have a file extension, it's a route that needs to be handled by the SPA
    if (!hasExtension) {
        // If the URI ends with a slash, serve the index.html from that directory
        if (uri.endsWith('/')) {
            request.uri = uri + 'index.html';
        } else {
            // For all other routes, serve the root index.html
            request.uri = '/index.html';
        }
    }

    return request;
}
