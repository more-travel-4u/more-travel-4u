const API_URL = "https://more-travel-4u.onrender.com"

const pokeDeploy = async () => await fetch(API_URL + "/health");

setInterval(pokeDeploy, 300000);