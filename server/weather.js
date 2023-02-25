require("dotenv").config();
const axios = require("axios");
const router = require("express").Router();
const Search = require("./models/weatherSchema.js");
const jwt = require("jsonwebtoken");

router.post("/weather", async (req, res) => {
  console.log(req.body.city);
  console.log(req.headers.authorization);

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
    console.log("line:22", weather);
    res.send(weather);

    //user specific save weather

    try {
      //authorization checking
      const auth_id = jwt.verify(
        req.headers.authorization,
        process.env.SECRET_KEY
      );
      const cityList = await Search.find({ userId: auth_id });
      //if name of the person already exist
      if (cityList.length) {
        await Search.updateMany(
          { userId: auth_id },
          { $push: { weather: weather } }
        );
      } else {
        //if the person does not exist
        await Search.create({ weather: weather, userId: auth_id });
      }
    } catch (error) {
      console.log(error);
    }
    // const search = new Search({ weather: weather, userId: auth_id });
    // search.save();
  } catch (error) {
    res.send(error);
  }
});
module.exports = router;
