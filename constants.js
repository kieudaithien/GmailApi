require("dotenv").config();

const auth = {
  type: "OAuth2",
  user: "thienkdt@gmail.com",
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  refreshToken: process.env.REFRESH_TOKEN,
};

const mailoptions = {
  from: "Siddhant &lt;thienkdt@gmail.com>",
  to: "leedongkyo101@gmail.com",
  subject: "Gmail API NodeJS",
};

module.exports = {
  auth,
  mailoptions,
};