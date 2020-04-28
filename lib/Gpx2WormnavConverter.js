var GpxBoundsFactory = require("./GpxBoundsFactory");
var Gpx2WormnavBoundsConverter = require("./Gpx2WormnavBoundsConverter");
var Gpx2WormnavTrackConverter = require("./Gpx2WormnavTrackConverter");

class Gpx2WormnavConverter {

    /**
    * Converts only the first track of a GpxResult  to the Wormnav data format:
    * 
    * (MonkeyC Data Types)
    * 
    * <li>Wormnav data : Array(5)
    * <li>Wormnav data[0] : float [] - Bounding box
    * <li>Wormnav data[1] : string - Name of track
    * <li>Wormnav data[2] : float - Length of track
    * <li>Wormnav data[3] : int - Number of track points
    * <li>Wormnav data[4] : Array(Number of track points), each Array entry is float[2] : (x, y)
     * 
     * @param {GpxResult} gpxResult
     * @returns {Array(5)} Wormnav data
     * 
     * @see {@link https://github.com/andan67/wormnav/blob/master/android/Application/src/main/java/org/andan/android/connectiq/wormnav/SendToDeviceUtility.java|wormnav data}
     * @see {@link https://github.com/elliotstokes/gpx-parse/blob/master/lib/gpxResult.js|GpxResult}
     */
    static convert(gpxResult) {

        // Get the gpx data from the first track
        var gpxTrack = gpxResult.tracks[0];
        var gpxTrackPoints = gpxTrack.segments[0];

        // create the bounds
        var gpxBounds = GpxBoundsFactory.createBounds(gpxTrackPoints);

        // get the center
        var gpxCenter = gpxBounds.getCenter();

        // convert the bounds
        var wormnavBounds = Gpx2WormnavBoundsConverter.convert(gpxBounds);

        // convert the track
        var wormnavTrack = Gpx2WormnavTrackConverter.convert(gpxTrack, gpxCenter);

        // Assemble the data
        var wormnavData = new Array(5);

        wormnavData[0] = wormnavBounds;
        wormnavData[1] = wormnavTrack[0];
        wormnavData[2] = wormnavTrack[1];
        wormnavData[3] = wormnavTrack[2];
        wormnavData[4] = wormnavTrack[3];

        return wormnavData;

    }

}

module.exports = Gpx2WormnavConverter;
