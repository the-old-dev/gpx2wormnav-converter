var gpxParse = require("gpx-parse");
var Gpx2WormnavPointConverter = require("../lib/Gpx2WormnavPointConverter");

describe('Gpx2WormnavPointConverter Tests', () => {

    var point = new gpxParse.GpxWaypoint(51.163496, 10.447428);
    var center = new gpxParse.GpxWaypoint(51.1633908, 10.4455304);
    var expectedWormnavPoint = [0.00002076916, 0.000001836354];

    it('should convert one point correctly', () => {
        var wormnavPoint = Gpx2WormnavPointConverter.convert(point, center);
        expect(wormnavPoint).toEqual(expectedWormnavPoint);
    });

});
