const Gpx2WormnavPointConverter = require("./gpx2wormnav-point-converter");

/**
 * Wormnav track data:
 * 
 * <li>data[0] : String - name of the track
 * <li>data[1] : float - Length of track in meter
 * <li>data[2] : int - Number of track points
 * <li>data[3] : float[] - track points (first line x1, second line y1)
 * 
 */
class Gpx2WormnavTrackConverter {

    static convert(gpxTrack, gpxCenter) {

        var wormnavData = new Array(4);
        
        wormnavData[0] = gpxTrack.name;
        wormnavData[1] = gpxTrack.length() * 1000;
        
        var gpxTrackpoints = gpxTrack.segments[0];
        var n = gpxTrackpoints.length;

        wormnavData[2] = n;

        wormnavData[3] = new Array(n);
        for (let index = 0; index < n; index++) {
            wormnavData[3] [index] = Gpx2WormnavPointConverter.convert (gpxTrackpoints[index], gpxCenter);    
        }

        return wormnavData;
    }

}

module.exports = Gpx2WormnavTrackConverter;