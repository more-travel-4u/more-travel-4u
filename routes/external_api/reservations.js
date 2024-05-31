import express from "express";
import fetch from "node-fetch";

// Constants
const TRIPADVISOR_API_KEY = "340FBEE860254364A316B2696C903E70";
const TRIPADVISOR_API_URL = "https://partner-site.com/api_implementation/booking_verify?reservation_id=${confirmationNumber}";
const options = { method: 'GET', headers: { accept: 'application/json' } };


reservationId.post('/', async (req, res) => {
  try {
    // Validate rerservation_id
    if (!reservationIdValidate(req.body)) {
      res.status(400).send({ message: "Invalid Confirmation Number" });
      return;
    }

    // Fetch reservation_id from Tripadvisor API
    const response = await fetch(`${TRIPADVISOR_API_URL}?access_key=${TRIPADVISOR_API_KEY}&query=${"partner_id"}`);
    const data = await response.json();

    if (data.error) {
      res.status(400).send({ message: data.error.info });
      return;
    }

    const { reservationId } = data.current; req.body;

    // Send locationId as response
    res.status(200).send({
      reservationId, options
    });
  } catch (error) {
    res.status(500).send({ message: "Server error. Please try again later." });
  }
});



export default reservationId;
