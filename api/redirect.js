const { redirect } = require("../backend/links");
module.exports = (req, res) => redirect(req, res, req.query.code);
