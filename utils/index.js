export const handleError = (error, message, res) => {
    res.status(500).json({
        message: message,
        error:error
    });
};