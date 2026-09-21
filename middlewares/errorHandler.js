const errorHandler = (err, req, res, next) => {
  if (process.env.NODE_ENV === "development") {
    console.log(err);
  }

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Something went wrong",
    data: err.data || {},
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};

export default errorHandler;
