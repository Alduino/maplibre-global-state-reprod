import {Map as MaplibreMap} from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

const UNRELATED_STATE_KEY = "unrelated";
const TEST_STATE_KEY = "test";

const map = new MaplibreMap({
    container: "map",
    center: [0, 0],
    zoom: 16,
    interactive: false
});

map.addLayer({
    source: {
        type: "geojson",
        data: {
            type: "Point",
            coordinates: [0, 0]
        }
    },
    type: "symbol",
    id: "test-layer",
    layout: {
        "text-field": "If I am RED then 'test' is null.",
    },
    paint: {
        "text-color": [
            "case",
            ["==", ["global-state", TEST_STATE_KEY], null],
            "red",
            "blue"
        ]
    }
});

function updateGlobalStateDisplay() {
    document.getElementById("global-state").textContent = JSON.stringify(map.getGlobalState(), null, 2);
}

updateGlobalStateDisplay();

function createHandler(key, value) {
    return () => {
        map.setGlobalStateProperty(key, value);
        updateGlobalStateDisplay();
    }
}

document.getElementById("set-gs-unrelated").addEventListener("click", createHandler(UNRELATED_STATE_KEY, true))
document.getElementById("set-gs-test").addEventListener("click", createHandler(TEST_STATE_KEY, null))
