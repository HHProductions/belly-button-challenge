console.log("test message")
  const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Promise Pending
const bbutton = d3.json(url);
console.log("Belly Button JSON: ", bbutton);
otu_labels = [];
sample_values = [];
otu_ids = [];
name_id_list=["test"];
console.log("samples: ");
temp1=[];
temp2=[];
complete=[];
console.log("name_id_list0: ", name_id_list);
sample_metadata = [];


  
  

// Identify and populate the values we can display in drop down
d3.json(url).then(function(dddata) {
	let names = Object.values(dddata.names);
	name_id_list.push(dddata.names);
	console.log("name_id_list: ", name_id_list);
	console.log("length: ", dddata.names.length);


var select = document.getElementById("selDataset");
var options = [];
console.log("JSON output: ", options);


for(var i = 0; i < dddata.names.length; i++) {
    var opt = dddata.names[i];
    var el = document.createElement("option");
    el.textContent = opt;
    el.value = opt;
    select.appendChild(el);
	//console.log("i value: ", i)
}	
});

// On change to the DOM, call getData()
d3.selectAll("#selDataset").on("change", optionChanged);

// Function called by DOM changes
function optionChanged() {

	let dropdownMenu = d3.select("#selDataset");
  // Assign the value of the dropdown menu option to a letiable
  let dataset = dropdownMenu.property("value");
	console.log("dataset: ", dataset);  
	
  d3.json(url).then(function(newdata) {	
  let searchvalue = dataset
let index = Object.values(newdata.names).indexOf(searchvalue);
	console.log("item: ", temp1);
		console.log("index: ", index);


// establish data to be plotted
laszlo =[]
otu_labels.length=0;
sample_values.length=0;
otu_ids.length=0;
	complete.push(Object.values(newdata));
	sample_values.push(Object.values(newdata.samples[index]["sample_values"]));
	otu_labels.push(Object.values(newdata.samples[index]["otu_labels"]));
	otu_ids.push(Object.values(newdata.samples[index]["otu_ids"]));
	console.log("complete: ", complete);
laszlo.push(Object.values(newdata.samples[index]));
//for(let i = 0; i < newdata.samples[index]["sample_values"].length; i++) {
    //sample_values.push(Object.values(newdata.samples[index]["sample_values"]));
	//console.log("i value: ", i)
//}	
lk =  laszlo.sort(function compareFunction(firstNum, secondNum) {
  return secondNum - firstNum;
}).slice(0, 10);
sv=sample_values[0].slice().slice(0, 10);
ol=otu_labels[0].slice().slice(0, 10);
oi=otu_ids[0].slice().slice(0, 10).map(item => "OTU " + item);
console.log("sample_values0: ", sample_values);
//console.log("otu_labels: ", otu_labels[0]);
//console.log("otu_ids: ", otu_ids[0]);
console.log("sample_values1: ", sv);
console.log("otu_labels: ", ol);
console.log("otu_ids: ", oi);
console.log("laszlo: ", laszlo);
console.log("lk: ", lk);
  //}
  
  //sample-metadata
  sample_metadata = [];
  sample_metadata.push(Object.values(newdata.metadata[index]))
 let kissmaster = Object.values(newdata.metadata).map(function(item) {
  return item;
});
console.log("lac: ", kissmaster[index]); 
d3.select("#sample-metadata").html(`id: ${kissmaster[index]["id"]}<br>ethnicity: ${kissmaster[index]["ethnicity"]}<br>gender: ${kissmaster[index]["gender"]}<br>age: ${kissmaster[index]["age"]}<br>location: ${kissmaster[index]["location"]}<br>bbtype: ${kissmaster[index]["bbtype"]}<br>wfreq: ${kissmaster[index]["wfreq"]}`);
//d3.select("#sample-metadata").html("id<br>go"); 
  
  
  
  
  
// Call function to update the chart
  //updatePlotly(data);
  
  var bg_data = [{
	type: 'bar',
  //x: sample_values[0],
 // y: otu_ids[0],
	x: sv,
	y: oi,
	xaxis: {'categoryorder':'total ascending'},
	text:ol,
	orientation: 'h'
}];
Plotly.newPlot('bar', bg_data);

 // Call the bubble chart
 const bubblechart = [
  {
    x: otu_ids[0],
    y: sample_values[0],
	text:otu_labels[0],
    mode: 'markers',
    marker: {
      size: sample_values[0],
      sizemode: 'diameter',
      sizeref: 2,
      color: otu_ids[0],

    }
  }
];

const layout = {
  title: 'Bubble Chart with Y-Value Sizing',
  xaxis: {
    title: 'X-Axis'
  },
  yaxis: {
    title: 'Y-Axis'
  }
};

Plotly.newPlot('bubble', bubblechart, layout);
  
    })
}



// Update the restyled plot's values
function updatePlotly(newdata) {
  Plotly.restyle("pie", "values", [newdata]);
}

//init();