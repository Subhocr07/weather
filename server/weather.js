require("dotenv").config();
const axios = require("axios");
const router = require("express").Router();
const Search = require("./models/weatherSchema.js");

router.post("/weather", async (req, res) => {
  console.log(req.body);
  try {
    const city = req.body.city;
    const apiKey = process.env.OPENWEATHERMAP_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    const response = await axios.get(url);

    const data = response.data;
    const weather = {
      city: data.name,
      temperature: data.main.temp,
      description: data.weather[0].description,
    };
    console.log(weather);
    res.send(weather);

    const search = new Search({ city });
    search.save();
  } catch (error) {
    res.send(error);
  }
});
module.exports = router;
