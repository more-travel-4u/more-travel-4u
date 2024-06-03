import express from "express";
import fetch from "node-fetch";

// Constants


const HOTEL_API_URL = 'https://booking-com.p.rapidapi.com/v1/metadata/exchange-rates?locale=en-gb&currency=AED';
const options = {
  method: 'GET',
  headers: {
    'x-rapidapi-key': 'ad2ae320b2msh6d722cc3f2a217bp1b7d74jsn447f1a99e0d8',
    'x-rapidapi-host': 'booking-com.p.rapidapi.com'
  }
};


hotelDetails.post('/', async (req, res) => {
  try {
    // Validate search
    if (!searchHotelDetails(req.body)) {
      res.status(400).send({ message: "Hotel Search" });
      return;
    }

    // Fetch hotel from Booking.com API
    const response = await fetch(`${HOTEL_API_URL}?access_key='ad2ae320b2msh6d722cc3f2a217bp1b7d74jsn447f1a99e0d8'&query=${searchQuery}`);
    const data = await response.json();

    if (data.error) {
      res.status(400).send({ message: data.error.info });
      return;
    }

    const { hotelDetails } = data.current; req.body;

    // Send phone as response
    res.status(200).send({
      hotelDetails
    });
  } catch (error) {
    res.status(500).send({ message: "Server error. Please try again later." });
  }
});



export default hotelDetails; 
