const proxy = require('http-proxy-middleware');

// let app = express();
// app.use("/api", proxy({target: "http://localhost:8080", changeOrigin: true}));
// app.listen(3000);

module.exports = function(app) {
    app.use(proxy('/api',
        {target: 'http://localhost:8080'}
    ));
    app.listen(3000);
};