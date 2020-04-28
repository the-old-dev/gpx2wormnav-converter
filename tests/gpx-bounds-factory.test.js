var gpxParse = require("gpx-parse");
var GpxBoundsFactory = require("../lib/gpx-bounds-factory");
var GpxBounds = require("../lib/gpx-bounds");

var loadedGpx = null;

function getGpx(callback) {
    gpxParse.parseGpxFromFile("tests/simple-test.gpx", callback);
}

function createBounds(gpxWaypointsArray) {
    return GpxBoundsFactory.createBounds(gpxWaypointsArray);
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

describe('GpxBoundsFactory Tests', () => {

    var bounds = new GpxBounds(51.16032072343, 10.4416680336, 51.16571724415, 10.45257925987);

    it('should return the expected bounds from the first segment of the first track', () => {
        expect(loadedGpx).not.toBeNull();
        expect(loadedGpx.tracks).not.toBeNull();
        expect(loadedGpx.tracks[0]).not.toBeNull();
        var wayPoints = loadedGpx.tracks[0].segments[0];
        expect(wayPoints).not.toBeNull();
        expect(wayPoints.length).toBeGreaterThan(10);
        expect(createBounds(wayPoints)).toEqual(bounds);
    });

});
