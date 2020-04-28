/**
 * Convert point(s) in radians to warmnav points. A center point in radians is required for the conversion.
 * 
 * The wormnav point is defined by
 * 
 * - an array of two floats
 * - array [0] = the x coordinate of the point
 * - array [1] = the y coordinate of the point
 * 
 * @see {@link https://github.com/andan67/wormnav/blob/master/android/Application/src/main/java/org/andan/android/connectiq/wormnav/SendToDeviceUtility.java|point for wormnav}
 * 
 */
class Gpx2WormnavPointConverter {

    static convert(point, center) {
        return Gpx2WormnavPointConverter._convert$FromRadians$(
            point.lat.toRad(), point.lon.toRad(), center.lat.toRad(), center.lon.toRad());
    }

    /**
     * 
     * @param {float[latitude, longitude]} pointInRadians 
     * @param {float[latitude, longitude]} centerInRadians 
     */
    static _convert$FromRadians$(pointLatitudeRadian, pointLongitudeRadian, centerLatitudeRadian, centerLongitudeRadian) {

        var wormNavPoint = new Array(2);

        // Calculate latitude
        wormNavPoint[0] = Math.cos(pointLatitudeRadian) * Math.sin(pointLongitudeRadian - centerLongitudeRadian);
        
        // Calculate longitude
        wormNavPoint[1] = 
            Math.cos(centerLatitudeRadian) * Math.sin(pointLatitudeRadian)
            - Math.sin(centerLatitudeRadian) * Math.cos(pointLatitudeRadian)
            * Math.cos(pointLongitudeRadian - centerLongitudeRadian);

        // Limit precision to 6 digits after the decimal point
        wormNavPoint = Gpx2WormnavPointConverter.limitPrecision(wormNavPoint, 6);

        return wormNavPoint;
    }

    static limitPrecision(pointInRadians, decimalPlaces) {

        var limited = new Array(2);

        // Convert to expo representation with the decimal places
        limited[0] = pointInRadians[0].toExponential(decimalPlaces);
        limited[1] = pointInRadians[1].toExponential(decimalPlaces);

        // Convert the string to a number
        limited[0] = Number.parseFloat(limited[0]);
        limited[1] = Number.parseFloat(limited[1]);

        return limited;
    }

}

module.exports = Gpx2WormnavPointConverter;