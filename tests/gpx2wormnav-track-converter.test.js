var gpxParse = require("gpx-parse");
var Gpx2WormnavTrackConverter = require("../lib/gpx2wormnav-track-converter");
var GpxBoundsFactory = require("../lib/gpx-bounds-factory");

var loadedGpx = null;

function getGpx(callback) {
    gpxParse.parseGpxFromFile("tests/simple-test.gpx", callback);
}

beforeEach(done => {

    var callback = function (error, gpx) {
        if (error !== null) {
            done(error);
        } else {
            loadedGpx = gpx;
            done();
        }
    };

    getGpx(callback);
});

test('Gpx2WormnavTrackConverter correct conversion Tests', () => {

    var gpxTrack = loadedGpx.tracks[0];
    var gpxCenter = GpxBoundsFactory.createBounds(gpxTrack.segments[0]).getCenter();
    var wormnavTrackData = Gpx2WormnavTrackConverter.convert(gpxTrack, gpxCenter);

    expect(wormnavTrackData[0]).toBe("Kleiner Test");
    expect(wormnavTrackData[1]).toBe(3822.5509908244526);
    expect(wormnavTrackData[2]).toBe(69);
    expect(wormnavTrackData[3].length).toBe(69);
});
