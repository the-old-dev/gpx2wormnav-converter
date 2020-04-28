var gpxParse = require("gpx-parse");
var Gpx2WormnavConverter = require("../lib/Gpx2WormnavConverter");

var loadedGpx = null;

function loadGpx(callback) {
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
    loadGpx(callback);
});

test('Gpx2WormnavConverter correct conversion Tests', () => {

    expect(loadedGpx).not.toBeNull();
    
    var wormnavData = Gpx2WormnavConverter.convert(loadedGpx);

    expect(wormnavData[0].length).toBe(7);
    expect(wormnavData[1]).toBe("Kleiner Test");
    expect(wormnavData[2]).toBe(3822.5509908244526);
    expect(wormnavData[3]).toBe(69);
    expect(wormnavData[4].length).toBe(69);
});
