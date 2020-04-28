const gpxParse = require("gpx-parse");

class GpxBounds {

    constructor(minLatitude, minlongitude, maxLatitude, maxlongitude) {

        this.minLatitude = minLatitude;
        this.minlongitude = minlongitude;
        
        this.maxLatitude = maxLatitude;
        this.maxlongitude = maxlongitude;

        // The North-West (Upper-Left) Edge Point is [maxLatitude, minLongitude]
        this.northWest = new gpxParse.GpxWaypoint(this.maxLatitude, this.minlongitude);

        // The South-East (Lower-Right) Edge Point is [minLatitude, maxLongitude]
        this.southEast = new gpxParse.GpxWaypoint(this.minLatitude, this.maxlongitude);
    
    }

    /**
     * returns {GpxWaypoint} the center of the bounds
     */
    getCenter() {
        var lat = (this.northWest.lat + this.southEast.lat) / 2;
        var lon = (this.northWest.lon + this.southEast.lon) / 2; 
        
        return new gpxParse.GpxWaypoint(lat, lon);
    }

    /**
     * @returns {number} distance in meters
     */
    getDiagonalDistance() {
        return  1000 * gpxParse.utils.calculateDistance(
            this.northWest.lat, this.northWest.lon, this.southEast.lat, this.southEast.lon);
    }

}

module.exports = GpxBounds;