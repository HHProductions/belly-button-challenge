// define url link of json
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// define function for charts and graphs and data that varies based on dropdown menu
function chart1(item, index){

  // establish data to be plotted

	sample_values = item.samples[index]["sample_values"];
	otu_labels = item.samples[index]["otu_labels"];
	otu_ids = item.samples[index]["otu_ids"];
console.log("sample_values1: ", sample_values);
console.log("otu_labels: ", otu_labels);
console.log("otu_ids: ", otu_ids);


// establish metadata
 let md = Object.values(item.metadata).map(function(item) {
  return item;
});
 
 // display metadata
d3.select("#sample-metadata").html(`id: ${md[index]["id"]}<br>ethnicity: ${md[index]["ethnicity"]}<br>gender: ${md[index]["gender"]}<br>age: ${md[index]["age"]}<br>location: ${md[index]["location"]}<br>bbtype: ${md[index]["bbtype"]}<br>wfreq: ${md[index]["wfreq"]}`);

// create bar graph 
  const bg_data = [{
	type: 'bar',
	x: sample_values.slice(0, 10).reverse(),
	y: otu_ids.slice(0, 10).map(item => "OTU " + item).reverse(),
	xaxis: {'categoryorder':'total ascending'},
	text:otu_labels.slice(0, 10).reverse(),
	orientation: 'h'
}];
const layout1 = {
  title: `Top 10 OTU ID and Sample Values for ID ${md[index]["id"]}`,
  xaxis: {
    title: 'Sample Values'
  },
  yaxis: {
    title: 'OTU ID'
  }
};
Plotly.newPlot('bar', bg_data, layout1);	
	
	
// create the bubble chart
 
 const bubblechart = [
  {
    x: otu_ids,
    y: sample_values,
	text:otu_labels,
    mode: 'markers',
    marker: {
      size: sample_values,
      sizemode: 'diameter',
      sizeref: 2,
      color: otu_ids,
    }
  }
];

const layout2 = {
  title: `OTU ID and Sample Values for ID ${md[index]["id"]}`,
  xaxis: {title: 'OTU ID'},
  yaxis: {title: 'Sample Values'}
};

Plotly.newPlot('bubble', bubblechart, layout2);
 
}



function init() {
// Identify and populate the values we can display in drop down
d3.json(url).then(function(dddata) {
	let names = Object.values(dddata.names);
	//name_id_list.push(dddata.names);
	//console.log("name_id_list: ", name_id_list);
	//console.log("length: ", dddata.names.length);


var select = document.getElementById("selDataset");
var options = [];
console.log("JSON output: ", options);


for(var i = 0; i < names.length; i++) {
    var opt = names[i];
    var el = document.createElement("option");
    el.textContent = opt;
    el.value = opt;
    select.appendChild(el);
	//console.log("i value: ", i)
}
chart1(dddata, 0);
});
}


// Function called by DOM changes
function optionChanged() {

	let dropdownMenu = d3.select("#selDataset");
  // Assign the value of the dropdown menu option to a letiable
  let dataset = dropdownMenu.property("value");
	console.log("dataset: ", dataset);  
	
  d3.json(url).then(function(newdata) {	
  let searchvalue = dataset
let index = Object.values(newdata.names).indexOf(searchvalue);
		console.log("index: ", index);
chart1(newdata, index);
  });
}

init();
