const LAT_MILES = .0144;

const LNG_MILES = (lat) => {
    // Calculate circumference of earth at that latitude
    const circumference = 2 * Math.PI * (Math.cos(lat) * 4000)
    return 1 / (circumference / 360)
};

const TRAILS_URL = (lat, lng, maxDistance) => {
    return `https://www.hikingproject.com/data/get-trails?lat=${lat}&lon=${lng}&maxDistance=${maxDistance}&key=200608509-80447dc50ba92f9dc07975e2fcce605d`
};

const ANIMALS_URL = (latRange, lngRange) => {
    return `https://api.gbif.org/v1/occurrence/search?decimalLongitude=${lngRange}&decimalLatitude=${latRange}&kingdomKey=1&limit=300`
};

const GET_ANIMAL_DATA = 'https://us-central1-hack-hiking.cloudfunctions.net/function-1'

module.exports = {
    LAT_MILES,
    LNG_MILES,
    TRAILS_URL,
    ANIMALS_URL,
    GET_ANIMAL_DATA
}