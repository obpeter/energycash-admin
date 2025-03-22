const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        createProxyMiddleware(['/admin'], {
            target: 'http://localhost:8085',
            changeOrigin: true,
            pathRewrite: {'^/admin' : '/'},
            headers: {
                Connection: "keep-alive"
            },
        })
    );
    app.use(
        createProxyMiddleware(['/cash'], {
            target: 'http://localhost:9090',
            changeOrigin: true,
            pathRewrite: {'^/cash' : ''},
        })
    );
    app.use(
        createProxyMiddleware( ['/api'], {
            target: 'http://localhost:9080',
            pathRewrite: {'^/api' : ''},
            changeOrigin: true,
        })
    );
    // app.use(
    //     '/subscription',
    //     createProxyMiddleware({
    //         target: 'http://localhost:6080',
    //         changeOrigin: true,
    //     })
    // );
};