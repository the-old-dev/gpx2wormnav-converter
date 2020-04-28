const gpxparse = require("gpx-parse");
const Gpx2WormnavPointConverter = require("./Gpx2WormnavPointConverter");

/**
* Converts from GPX Bounds to Wormnav Bounds.
* 
* Wormnav Bounds Data Format: 
*
* The North-West (Upper-Left) Edge Point:
* <li>bounds[0] = maxLatitude {float [Wormnav]}
* <li>bounds[1] = minLongitude {float [Wormnav]}
*
* The South-East (Lower-Right) Edge Point:
* <li>bounds[2] = minLatitude {float [Wormnav]}
* <li>bounds[3] = maxLongitude {float [Wormnav]}
*
* The Center Point
* <li>bounds[4] = center Latitude (flaot [Radian])
* <li>bounds[5] = center Longitude (float [Radian])
*
* The diagonal distance
* <li>bounds[6] = diagonal distance (float [Meters])
* 
*/
class Gpx2WormnavBoundsConverter {

    /**
     * Converts GPX Bounds to Wormnav Bounds
     * 
     * @param {GpxBounds} gpxBounds
     */
    static convert( gpxBounds ) {

        var center =  gpxBounds.getCenter();

        var wormnavUpperLeft = Gpx2WormnavPointConverter.convert(gpxBounds.northWest,center); 
        var wormnavLowerRight = Gpx2WormnavPointConverter.convert(gpxBounds.southEast,center); 
        var wormnavCenter = [center.lat.toRad(), center.lon.toRad()];
        var wormnavDiagonalDistance = gpxBounds.getDiagonalDistance();

        var wormnavData = new Array(7);

        wormnavData[0] = wormnavUpperLeft[0];
        wormnavData[1] = wormnavUpperLeft[1];
        wormnavData[2] = wormnavLowerRight[0];
        wormnavData[3] = wormnavLowerRight[1];
        wormnavData[4] = wormnavCenter[0];
        wormnavData[5] = wormnavCenter[1];
        wormnavData[6] = wormnavDiagonalDistance;

        return wormnavData;

    }

}

module.exports = Gpx2WormnavBoundsConverter;
