const gpxparse = require("gpx-parse");
const GpxBounds = require("./gpx-bounds");

class GpxBoundsFactory {

    /**
     * A bounds consits of minimum and maximum latitude and longitude values:
     * 
     * 
     * @returns GpxBounds
     * 
     * @param {GpxWaypoint[]]} gpxWaypointsArray 
     */
    static createBounds(gpxWaypointsArray) {

        var minLat = Number.MAX_VALUE;
		var minLon = Number.MAX_VALUE;
        
        var maxLat = -Number.MAX_VALUE;
        var maxLon = -Number.MAX_VALUE;
        
        var latitude = 0.0;
        var longitude = 0.0;

		for (var index = 0; index < gpxWaypointsArray.length; index++) { 

			latitude = gpxWaypointsArray[index].lat;
			longitude = gpxWaypointsArray[index].lon;

			minLat = Math.min(minLat, latitude);
            minLon = Math.min(minLon, longitude);
            
			maxLat = Math.max(maxLat, latitude);
			maxLon = Math.max(maxLon, longitude);

		}
		
		return new GpxBounds(minLat, minLon, maxLat, maxLon);
    }

}

module.exports = GpxBoundsFactory;