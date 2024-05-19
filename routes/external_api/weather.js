import express from "express";
import fetch from "node-fetch";  
import 'dotenv/config'; // Importing 'dotenv' to load environment variables

const weatherapi = express.Router();

// WEATHERSTACK API DOCUMENTATION: https://weatherstack.com/documentation

// Constants
const WEATHERSTACK_API_KEY = process.env.WEATHERSTACK_API_KEY; // Accessing API key from environment variable
const WEATHERSTACK_API_URL = "http://api.weatherstack.com/current";

// Utility function to validate city input
const weatherValidate = (body) => {
  if (typeof body.city !== "string" || body.city.trim() === "") {
    return false;
  }
  return true;
};

// Endpoint to fetch weather data for a city
// POST /api/weather
weatherapi.post('/', async (req, res) => {
  try {
    // Validate city input
    if (!weatherValidate(req.body)) {
      res.status(400).send({ message: "Invalid city input." });
      return;
    }

    const { city } = req.body;

    // Fetch weather data from Weatherstack API
    const response = await fetch(`${WEATHERSTACK_API_URL}?access_key=${WEATHERSTACK_API_KEY}&query=${city}`);
    const data = await response.json();

    if (data.error) {
      res.status(400).send({ message: data.error.info });
      return;
    }

    const { temperature, weather_descriptions } = data.current;

    // Send weather data as response
    res.status(200).send({
      city,
      temperature,
      description: weather_descriptions[0],
      data // snuck in the whole data object here in case anybody needs it
    });
  } catch (error) {
    res.status(500).send({ message: "Server error. Please try again later." });
  }
});

export default weatherapi;
