var gpxParse = require("gpx-parse");
var GpxBounds = require("../lib/GpxBounds");
var Gpx2WormnavBoundsConverter = require("../lib/Gpx2WormnavBoundsConverter");

describe("Gpx2WormnavBoundsConverter Tests", () => {

    var gpxBounds = new GpxBounds(1.0, 1.0, 3.0, 3.0);
    var wormnavBounds = Gpx2WormnavBoundsConverter.convert(gpxBounds);

    it("should convert upper left correctly", () => {
        expect(wormnavBounds[0]).toBe(-0.01742849);
        expect(wormnavBounds[1]).toBe( 0.01745771);
    });

    it("should convert lower right correctly", () => {
        expect(wormnavBounds[2]).toBe( 0.01744975);
        expect(wormnavBounds[3]).toBe(-0.01744709);
    });

    it("should convert center correctly", () => {
        expect(wormnavBounds[4]).toBe(0.03490658503988659);
        expect(wormnavBounds[5]).toBe(0.03490658503988659);
    });

    it("should convert diagonal distance correctly", () => {
        expect(wormnavBounds[6]).toBe(314205.55472726724);
    });

});
