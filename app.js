console.log("test message")
  const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Promise Pending
const bbutton = d3.json(url);
console.log("Belly Button JSON: ", bbutton);
otu_labels = [];
sample_values = [];
otu_ids = [];
name_id_list=[];
console.log("samples: ");
temp1=[]
temp2=[]
complete=[]




  
  

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
d3.selectAll("#selDataset").on("change", getData);

// Function called by DOM changes
function getData() {

	let dropdownMenu = d3.select("#selDataset");
  // Assign the value of the dropdown menu option to a letiable
  let dataset = dropdownMenu.property("value");
	console.log("dataset: ", dataset);  
	
  d3.json(url).then(function(newdata) {	
  let searchvalue = dataset
let index = Object.values(newdata.names).indexOf(searchvalue);
	console.log("item: ", temp1);
		console.log("index: ", index);

  
  // Initialize an empty array for the country's data
 // let data = [];

// establish data to be plotted
otu_labels.length=0;
sample_values.length=0;
otu_ids.length=0;
	complete.push(Object.values(newdata));
	sample_values.push(Object.values(newdata.samples[index]["sample_values"]));
	otu_labels.push(Object.values(newdata.samples[index]["otu_labels"]));
	otu_ids.push(Object.values(newdata.samples[index]["otu_ids"]));
	console.log("complete: ", complete);

//for(let i = 0; i < newdata.samples[index]["sample_values"].length; i++) {
    //sample_values.push(Object.values(newdata.samples[index]["sample_values"]));
	//console.log("i value: ", i)
//}	
console.log("sample_values: ", sample_values);
console.log("otu_labels: ", otu_labels);
console.log("otu_ids: ", otu_ids);

  //}
// Call function to update the chart
  //updatePlotly(data);
  
  
  var bg_data = [{
  type: 'bar',
  x: sample_values,
  y: otu_ids,
  orientation: 'h'
}];
Plotly.newPlot('bar', bg_data);

  
  
    })
}



// Update the restyled plot's values
function updatePlotly(newdata) {
  Plotly.restyle("pie", "values", [newdata]);
}

//init();