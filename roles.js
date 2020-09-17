const AccessControl = require("accesscontrol");
const ac = new AccessControl();
 
exports.roles = (function() {
ac.grant("user")
 .readOwn("profile")
 .updateOwn("profile")
 
ac.grant("developer")
 .extend("user")
 .readAny("profile")
 
ac.grant("manager")
 .extend("user")
 .extend("developer")
 .updateAny("profile")
 .deleteAny("profile")
 
return ac;
})();