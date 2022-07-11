const axios = require("axios");
const { generateConfig } = require("./utils");
const nodemailer = require("nodemailer");
const CONSTANTS = require("./constants");
const { google } = require("googleapis");
const { json } = require("express");
const SCOPES = ['https://www.googleapis.com/auth/gmail.readonly'];

require("dotenv").config();

const oAuth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URL
);

oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

async function sendMail(req, res) {
  try {
    const accessToken = await oAuth2Client.getAccessToken();
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        ...CONSTANTS.auth,
        accessToken: accessToken,
      },
    });

    const mailOptions = {
      ...CONSTANTS.mailoptions,
      text: "The Gmail API with NodeJS works",
    };

    const result = await transport.sendMail(mailOptions);
    res.send(result);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
}


async function readListMessMail(userId) {
  try {
    const url = `https://gmail.googleapis.com/gmail/v1/users/${userId}/messages`;
    oAuth2Client.generateAuthUrl({  
      access_type: 'offline',
      scope: SCOPES,
    })
    const { token } = await oAuth2Client.getAccessToken();
    const config = generateConfig(url, token);
    const response = await axios(config);

    let data = await response.data;

    return data;
  } catch (error) {
    console.log(error)
    return error
  }
}
async function readMail(userId, id) {
  try {
    const url = `https://gmail.googleapis.com/gmail/v1/users/${userId}/messages/${id}`;
    const { token } = await oAuth2Client.getAccessToken();
    const config = generateConfig(url, token)
    const response = await axios(config);
    let data = await response.data;
    return data
  } catch (error) {
    return error
  }
}


module.exports = {
  sendMail,
  readListMessMail,
  readMail,
};