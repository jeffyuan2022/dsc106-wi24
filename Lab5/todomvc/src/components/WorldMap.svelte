<script>
	import { onMount } from 'svelte';
	import * as d3 from 'd3';
	import { scaleSequential, interpolatePiYG } from 'd3';
	 
	let geojsonData;
	let currentYearIndex = 0; // Initial index
	let filteredData = [];
	let endYear;
	
	const yearIntervals = [2000, 2005, 2010, 2015, 2020];
	 
	let selectedYear = yearIntervals[currentYearIndex];
	$: {selectedYear = yearIntervals[currentYearIndex], console.log(selectedYear);
		let proposedEndYear = selectedYear + 4;
        endYear = proposedEndYear > 2022 ? 2022 : proposedEndYear; // Adjust end year if it exceeds 2022
    }
	 
	const regionalChangeScale = scaleSequential(interpolatePiYG).domain([10, -5]);
	 
	onMount(async () => {
	  const response = await fetch('output_2.geojson');
	  geojsonData = await response.json();
	});
	 
	// Reactive statement to log the structure of geojsonData.features (for debugging)
	$: if (geojsonData) console.log(geojsonData.features);
	 
	// Correctly access and log the 'year_interval' of the first feature's properties (for debugging)
	$: if (geojsonData) console.log(geojsonData.features[0].properties.iso_code);
   
	$: filteredData = geojsonData?.features.filter(d => d.properties.year_interval === selectedYear);
	
	$: if (geojsonData) {
	filteredData = geojsonData?.features.filter(d => d.properties.year_interval === selectedYear);
	console.log(`Filtered data count for year ${selectedYear}:`, filteredData.length);
	}
   
	function drawMap() {
	  // Clear existing map elements
	  d3.select('svg').selectAll('*').remove();

		// Adjust the width and height if necessary to fit the map well within the view
		const width = 1200; // This will make the map responsive to the width of the body
  		const height = 500;
	 
	  const projection = d3.geoNaturalEarth1()
	 .scale(width / 6.8)
	 .translate([width / 2, height / 2]);
	 
	  const path = d3.geoPath().projection(projection);
	 
	  const tooltip = d3.select('#tooltip');
	  
	  d3.select('svg')
	 .selectAll('path')
	 .data(filteredData)
	 .enter().append('path')
	 .attr('d', path)
	 .attr('fill', d => {
	   // Access the 'regional_change' for the selected year
	   const change = d.properties.regional_change;
	   return regionalChangeScale(change);
	 })
	 .attr('stroke', 'white')
	 .on('mouseover', function(event, d) {
	   tooltip.style('visibility', 'visible')
		.html(`${d.properties.name}<br>Region: ${d.properties.Region}<br>Regional Change: ${parseFloat(d.properties.regional_change).toFixed(2)}%`)
		.style('top', (event.pageY - 10) + 'px')
		.style('left', (event.pageX + 10) + 'px');
	 })
	 .on('mouseout', function() {
	   tooltip.style('visibility', 'hidden');
	 });

	// Legend setup for vertical display
	const legendWidth = 20, legendHeight = 300, numberOfSegments = 10;
	const segmentHeight = legendHeight / numberOfSegments;
	const legendData = d3.range(numberOfSegments).map(i => regionalChangeScale.domain()[1] + (i / numberOfSegments) * (regionalChangeScale.domain()[0] - regionalChangeScale.domain()[1]));

	// Adjust the legend container to position it on the right side of the graph
	const legend = d3.select('svg').append('g')
		.attr('class', 'legend')
		.attr('transform', `translate(${width - 40}, 20)`); // Adjust these values as needed

	// Add colored rectangles, now positioned vertically
	legend.selectAll('rect')
		.data(legendData)
		.enter().append('rect')
		.attr('x', 0)
		.attr('y', (d, i) => i * segmentHeight)
		.attr('width', legendWidth)
		.attr('height', segmentHeight)
		.style('fill', d => regionalChangeScale(d));

	// Add text labels for start, midpoint, and end of the scale, adjusted for vertical layout
	const textValues = [regionalChangeScale.domain()[1], 0, regionalChangeScale.domain()[0]];
	legend.selectAll('text')
		.data(textValues)
		.enter().append('text')
		.attr('x', legendWidth + 5) // Adjust for appropriate spacing from the bars
		.attr('y', (d, i) => i * (legendHeight / (textValues.length - 1)) + 4) // Adjust for alignment, '+ 4' for centering text vertically
		.attr('text-anchor', 'start')
		.text(d => d.toFixed(1));

	// Adjust the title position for the vertical layout
	legend.append('text')
		.attr('x', -legendHeight / 2) // Position the title in the middle of the legend height
		.attr('y', -legendWidth - 10) // Adjust based on the width of the legend and desired spacing
		.attr('text-anchor', 'middle') // Ensure the text rotates around its center
		.attr('transform', 'rotate(-90)') // Rotate the text 90 degrees counter-clockwise
		.style('font-weight', 'bold')
		.text('Regional Change');
	}
	 
	// Reactive drawing of the map based on geojsonData and selectedYear
	$: if (geojsonData && selectedYear) drawMap();

	 </script>

<style>
	input[type="range"] {
	  -webkit-appearance: none; /* Override default CSS styles */
	  appearance: none;
	  width: 50%; /* Full-width */
	  height: 25px; /* Specified height */
	  background: #d2c6c6; /* Grey background */
	  outline: none; /* Remove outline */
	  opacity: 0.7; /* Set transparency (for mouse-over effects) */
	  -webkit-transition: .2s; /* 0.2 seconds transition on hover */
	  transition: opacity .2s;
	}
	
	input[type="range"]:hover {
	  opacity: 1; /* Fully opaque on mouse-over */
	}
	
	input[type="range"]::-webkit-slider-thumb {
	  -webkit-appearance: none; /* Override default look */
	  appearance: none;
	  width: 100px; /* Set a specific slider handle width */
	  height: 25px; /* Slider handle height */
	  background: #af5e4c; /* Green background */
	  cursor: pointer; /* Cursor on hover */
	}
	
	input[type="range"]::-moz-range-thumb {
	  width: 100px; /* Set a specific slider handle width */
	  height: 25px; /* Slider handle height */
	  background: #af5e4c; /* Green background */
	  cursor: pointer; /* Cursor on hover */
	}

	.year-display {
		margin-top: 10px;
		font-size: 25px;
		font-weight: bold;
		text-align: center;
	}

	.drawMaps{
		margin-top: 0px;
	}

  </style>
	 
	 <!-- Component Markup -->
	 <div class="slider-container">
		<div class="year-display">Year Range: {selectedYear} - {endYear}</div>
		<input type="range" min="0" max="4" bind:value={currentYearIndex}>
	  </div>
	 <svg width="1200" height="1200" class="drawMaps"></svg>