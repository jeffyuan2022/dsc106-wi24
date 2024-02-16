<script>
	mapboxgl.accessToken = "pk.eyJ1IjoieWl5MTU5IiwiYSI6ImNsc29kajJ5YjBhdmgya3BpNnI3bmFlczcifQ.o9opVXMQKSJqoBcMDsaJ9w";
	const map = new mapboxgl.Map({
		container: "map",
		style: "mapbox://styles/mapbox/light-v11", 
		center: [-71.0942, 42.3601], 
		zoom: 13, // starting zoom level
		minZoom: 12,
		maxZoom: 15,
	});
    map.on("load", () => {
		map.addSource("boston_route", {
			type: "geojson",
			data: "https://bostonopendata-boston.opendata.arcgis.com/datasets/boston::existing-bike-network-2022.geojson?outSR=%7B%22latestWkid%22%3A3857%2C%22wkid%22%3A102100%7D",
		});
		map.addLayer({
			id: "boston_route",
			type: "line",
			source: "boston_route",
			paint: {
				"line-color": "#BEE5B0",
				"line-width": 3,
			},
		});
	});

    map.on("viewreset", position_station_markers);
	map.on("move", position_station_markers);
	map.on("moveend", position_station_markers);

    function create_station_markers(station_data) {
		station_markers = marker_container
			.selectAll("circle")
			.data(station_data)
			.enter()
			.append("circle")
			.attr("r", 5)
			.style("fill", "#808080")
			.attr("stroke", "#808080")
			.attr("stroke-width", 1)
			.attr("fill-opacity", 0.4)
			.attr("name", function (d) {
				return d["name"];
			});
        position_station_markers();
	}

    function position_station_markers() {
		station_markers
			.attr("cx", function (d) {
				return project(d).x;
			})
			.attr("cy", function (d) {
				return project(d).y;
			});
	}
	function project(d) {
		return map.project(new mapboxgl.LngLat(+d.lon, +d.lat));
	}


    let stationsFile = "https://raw.githubusercontent.com/dsc-courses/dsc106-wi24/gh-pages/resources/data/lab6_station_info.json";
	let station_data = [];
	let station_markers;

	fetch(stationsFile)
		.then((response) => response.json())
		.then((d) => (station_data = d.data.stations))
        .then((d) => create_station_markers(d));

    const marker_container = d3
		.select(map.getCanvasContainer() )
		.append("svg")
		.attr("width", "100%")
		.attr("height", "100%")
		.style("position", "absolute")
		.style("z-index", 2);

</script>

<main>

</main>
