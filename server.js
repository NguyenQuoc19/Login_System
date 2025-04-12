const app = require('./src/app');
const port = 3000;

const server = app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
}
);

// Close the server after 5 seconds
setTimeout(() => {
    server.close(() => {
        console.log('Server closed');
    });
}, 5000);