function isAuthenticatedAI(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({
    statusCode: 401,
    message: "You are not authenticated",
  });
}

export default isAuthenticatedAI;
