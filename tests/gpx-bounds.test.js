var gpxParse = require("gpx-parse");
var GpxBounds = require("../lib/gpx-bounds");

describe("GpxBounds Tests", () => {

    var bounds = new GpxBounds(1.0, 1.0, 3.0, 3.0);
    var center = new gpxParse.GpxWaypoint(2.0, 2.0);
    var distance = 314205.55472726724;

    it("should calculate center correct", () => {
        expect(bounds.getCenter()).toStrictEqual(center);
    });

    it("should calculate diagonal distance correct", () => {
        expect(bounds.getDiagonalDistance()).toBe(distance);
    });

});
