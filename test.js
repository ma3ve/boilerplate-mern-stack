const jwt = require("jsonwebtoken");
let token = jwt.sign("asdfasfdf", "key");
// token = token.replace("ey", "by");
console.log(jwt.verify(token, "key"));
