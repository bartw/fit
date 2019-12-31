const express = require("express");
const axios = require("axios");
const qs = require("qs");

const port = process.env.PORT || 3000;
const flowId = process.env.FLOW_ID || "";
const flowSecret = process.env.FLOW_SECRET || "";

const app = express();

app.get("/auth", (req, res) =>
  res.redirect(
    `https://flow.polar.com/oauth2/authorization?response_type=code&scope=accesslink.read_all&client_id=${flowId}`
  )
);

app.get("/authcallback", async (req, res) => {
  const { code } = req.query;

  if (!code || !code.length) {
    return res.status(400).send({ error: "Bad Request" });
  }

  return res.send(code);

  // const data = { grant_type: "authorization_code", code };

  // const buffer = new Buffer(`${flowId}:${flowSecret}`);
  // const base64 = buffer.toString("base64");

  // const options = {
  //   method: "POST",
  //   headers: {
  //     Authorization: `Basic ${base64}`,
  //     "Content-Type": "application/x-www-form-urlencoded",
  //     Accept: "application/json;charset=UTF-8"
  //   },
  //   data: qs.stringify(data),
  //   url: "https://polarremote.com/v2/oauth2/token"
  // };

  // try {
  //   const response = await axios(options);
  //   return res.send(response);
  // } catch (error) {
  //   return res.status(500).send({ error });
  // }
});

app.get("/", (req, res) => res.send("Hello World!"));

app.listen(port, () => console.log(`Listening on port ${port}!`));
