const getIndex = (req, res) => {
    return res.status(200).json({
        message: "Hello world! This is the v1 API",
        status: "success",
        data: {
            name: "v1",
            version: "1.0.0",
        },
    });
}

module.exports = {
    getIndex,
};