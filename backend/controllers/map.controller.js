import axios from "axios"
import Captain from "../models/captain.js";

const getRidingAmount = (distance, time) => {

    const rates = {
        car: { baseFare: 50, perKm: 30, perMinute: 2 },
        auto: { baseFare: 30, perKm: 10, perMinute: 1.5 },
        motorcycle: { baseFare: 20, perKm: 8, perMinute: 1 }
    };

    return {
        car: rates.car.baseFare + (rates.car.perKm * (distance / 1000)) + (rates.car.perMinute * (time / 60)),
        auto: rates.auto.baseFare + (rates.auto.perKm * (distance / 1000)) + (rates.auto.perMinute * (time / 60)),
        motorcycle: rates.motorcycle.baseFare + (rates.motorcycle.perKm * (distance / 1000)) + (rates.motorcycle.perMinute * (time / 60))
    }

};


export const getCordinate = async (address) => {
    try {

        const url = `https://api.distancematrix.ai/maps/api/geocode/json?address=${address}&key=${process.env.CORDINATR}`

        const res = await axios.get(url)
        const { lat, lng } = await res.data.result[0].geometry.location
        return { lat: lat, lng: lng }

    } catch (error) {
        console.log(error)
    }
}

export const getDistance = async (pic, dis) => {
    try {
        let url = `https://api.distancematrix.ai/maps/api/distancematrix/json?origins=${pic}&destinations=${dis}&key=${process.env.DIST_KEY}`;

        const res = await axios.get(url);

        if (res.data.status === "OK") {
            const data = res.data.rows[0].elements;
            const fare = getRidingAmount(data[0].distance.value, data[0].duration.value);

            return { fare: fare, duration: data[0].duration.text, distance: data[0].distance.text };
        } else {
            return { message: "Invalid location" };
        }
    } catch (error) {
        console.log(error);
        if (error.code === 'ECONNABORTED') {
            console.log('Request timed out');
        } else if (error.code === 'EAI_AGAIN') {
            console.log('DNS resolution error');
        }
    }
};

export const getSuggestion = async (input) => {
    const url = `https://google-map-places.p.rapidapi.com/maps/api/geocode/json?address=${input}&language=en&region=en&result_type=administrative_area_level_1&location_type=APPROXIMATE`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': 'c7c5014242msh32e1c09ffa3936cp107ffbjsne5bc03bd8401',
            'x-rapidapi-host': 'google-map-places.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.text();
        console.log(result);
    } catch (error) {
        console.error(error);
    }
}

export const findCaptainsWithinRadius = async (ltd, lng, radius) => {
    try {
      // Convert radius to meters
      const radiusInMeters = radius * 1000;
  
      // Geospatial query
      const captains = await Captain.find({
        location: {
          $geoWithin: {
            $centerSphere: [[ltd, lng], radiusInMeters / 6378100], // Earth's radius in meters
          },
        },
      });
  
      return captains;
    } catch (error) {
      console.error('Error finding captains:', error);
      throw error;
    }
  };



