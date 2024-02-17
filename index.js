const express = require("express");
const webpush = require("web-push");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, "cosmofeed")));

app.use(bodyParser.json());

const publicVapidKey =
  "BFoJA2OEzKYJU8gSHmuLIXCH2dQQwUmo1SthcDJuQF3FT9VVjClBdsRovB4yoY5NFxISIQNKLNyAY0Lh84LXJs4";
const privateVapidKey = "g0-0JVZhpEcGAqVt6dxClRISIziwoaGiJz2fcJI-Sc8";

webpush.setVapidDetails(
  "mailto:Cosmofeed@test.com",
  publicVapidKey,
  privateVapidKey
);

app.post("/subscribe", (req, res) => {
  const subscription = req.body;

  res.status(201).json({});

  const payload = JSON.stringify({ title: "Notification from Cosmofeed" });

  webpush
    .sendNotification(subscription, payload)
    .catch((err) => console.error(err));
});

app.listen(9000, () => {
  console.log(
    "Server is running on port 9000, Refresh the website to get notification"
  );
});
