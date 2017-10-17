//import * as d3 from 'd3';

require("./styles.scss");

document.getElementById('dashboard').innerHTML = require("./book-listing.handlebars")();

/*
var svg = d3.select("#projects"),
    margin = {top: 0, right: 20, bottom: 0, left: 40},
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom,
    g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var peoplesvg = d3.select("#people"),
    margin = {top: 0, right: 20, bottom: 300, left: 40},
    width = +peoplesvg.attr("width") - margin.left - margin.right,
    height = +peoplesvg.attr("height") - margin.top - margin.bottom,
    pg = peoplesvg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var x = d3.scaleBand()
    .rangeRound([0, width])
    .paddingInner(0.05)
    .align(0.1);

var y = d3.scaleLinear()
    .rangeRound([height, 0]);

var z = d3.scaleOrdinal()
    .range(["#98abc5", "#11EEEE", "#CB2361", "#1195EE", "#EE11D0", "#EE7F11", "#88CB23"]);


var div = d3.select("body").append("div") 
    .attr("class", "tooltip")       
    .style("opacity", 0);

renderCost();    

function renderInitiatives() {
  d3.csv("projects.csv", function(d, i, columns) {
    var t = 0;
    for (i = 5; i < columns.length; ++i) t += d[columns[i]] = +d[columns[i]];
    d.total = t;
    return d;
  }, function(error, data) {
    if (error) throw error;

    var keys = data.columns.slice(5);

    x.domain(data.map(function(d) { return d.PPM_ID; }));
    y.domain([0, d3.max(data, function(d) { return d.total; })]).nice();
    z.domain(keys);

    g.append("text")
          .attr("x", (width / 2))             
          .attr("y", 100)
          .attr("text-anchor", "middle")  
          .style("font-size", "24px") 
          .style("text-decoration", "underline")  
          .text("Stuff")
          .on("click", function(d) {
            g.selectAll("g").remove();
            renderCost();
          });

    g.append("g")
      .selectAll("g")
      .data(d3.stack().keys(keys)(data))
      .enter().append("g")
        .attr("fill", function(d) { return z(d.key); })
      .selectAll("rect")
      .data(function(d) { return d; })
      .enter().append("rect")
        .attr("x", function(d) { return x(d.data.PPM_ID); })
        .attr("y", function(d) { return y(d[1]); })
        .attr("height", function(d) { return y(d[0]) - y(d[1]); })
        .attr("width", x.bandwidth())
        .on("mouseover", function(d) {    
               div.transition()    
                  .duration(200)    
                  .style("opacity", .9);    
              div .html(d.data.PPM_Name + "<br><br>" + 
                      "Initiatives:<br>" +
                      "In Backlog: " + d.data.Backlog + "<br>" + 
                      "In Done: " + d.data.Done + "<br>" + 
                      "In Analysis: " + d.data['In Analysis'] + "<br>" + 
                      "In Dev: " + d.data['In Dev'] + "<br>" +
                      "In New: " + d.data.New + "<br>" + 
                      "In Pending: " + d.data.Pending + "<br>" +
                      "In Walkthrough: " + d.data.Walkthrough + "<br><br>" +
                      "Number of people: " + d.data.People + "<br>" +
                      "FTE allocated: " + d.data.FTE)
                  .style("left", (d3.event.pageX) + "px")   
                  .style("top", (d3.event.pageY - 28) + "px");  
              })
        .on("mouseout", function(d) {   
            div.transition()    
                .duration(500)    
                .style("opacity", 0); 
        });

    g.append("g")
        .attr("class", "axis")
        .call(d3.axisLeft(y).ticks(null, "s"))
      .append("text")
        .attr("x", 2)
        .attr("y", y(y.ticks().pop()) + 0.5)
        .attr("dy", "0.32em")
        .attr("fill", "#000")
        .attr("font-weight", "bold")
        .attr("text-anchor", "start")
  });
}

function renderCost() {

  d3.csv("projects.csv", function(d, i, columns) {
    d.total = d[columns[4]];
    return d;
  }, function(error, data) {
    if (error) throw error;

    var keys = data.columns.slice(4,5);

    x.domain(data.map(function(d) { return d.PPM_ID; }));
    y.domain([0, d3.max(data, function(d) { return parseFloat(d.total); })]).nice();
    z.domain(keys);

    g.append("text")
          .attr("x", (width / 2))             
          .attr("y", 100)
          .attr("text-anchor", "middle")  
          .style("font-size", "24px") 
          .style("text-decoration", "underline")  
          .text("Stuff")
          .on("click", function(d) {
            g.selectAll("g").remove();
            renderInitiatives();
          });

    g.append("g")
      .selectAll("g")
      .data(d3.stack().keys(keys)(data))
      .enter().append("g")
        .attr("fill", function(d) { return z(d.key); })
      .selectAll("rect")
      .data(function(d) { return d; })
      .enter().append("rect")
        .attr("x", function(d) { return x(d.data.PPM_ID); })
        .attr("y", function(d) { 
          return y(d[1]); 
        })
        .attr("height", function(d) { 
          return y(d[0]) - y(d[1]); 
        })
        .attr("width", x.bandwidth())
        .on("mouseover", function(d) {    
               div.transition()    
                  .duration(200)    
                  .style("opacity", .9);    
              div .html(d.data.PPM_Name + "<br><br>" + 
                      "Cost$: " + d.data.Cost + 
                      "Number of people: " + d.data.People + "<br>" +
                      "FTE allocated: " + d.data.FTE)
                  .style("left", (d3.event.pageX) + "px")   
                  .style("top", (d3.event.pageY - 28) + "px");  
              })
        .on("mouseout", function(d) {   
            div.transition()    
                .duration(500)    
                .style("opacity", 0); 
        });

    g.append("g")
        .attr("class", "axis")
        .call(d3.axisLeft(y).ticks(null, "s"))
      .append("text")
        .attr("x", 2)
        .attr("y", y(y.ticks().pop()) + 0.5)
        .attr("dy", "0.32em")
        .attr("fill", "#000")
        .attr("font-weight", "bold")
        .attr("text-anchor", "start")
  });
}

d3.csv("projects.csv", function(d, i, columns) {
  d.total = d[columns[2]];
  return d;
}, function(error, data) {
  if (error) throw error;

  var keys = data.columns.slice(2,3);

  x.domain(data.map(function(d) { return d.PPM_ID; }));
  y.domain([d3.max(data, function(d) { return d.total; }), 0]).nice();
  z.domain(keys);

  pg.append("g")
    .selectAll("g")
    .data(d3.stack().keys(keys)(data))
    .enter().append("g")
      .attr("fill", function(d) { return "#C12727"; })
    .selectAll("rect")
    .data(function(d) { return d; })
    .enter().append("rect")
      .attr("x", function(d) { return x(d.data.PPM_ID); })
      .attr("y", function(d) { return 0; })
      .attr("height", function(d) { return y(d[0]) + y(d[1]); })
      .attr("width", x.bandwidth())
      .on("mouseover", function(d) {    
           div.transition()    
              .duration(200)    
              .style("opacity", .9);    
          div .html(d.data.PPM_Name + "<br><br>" + 
                "Cost$: " + d.data.Cost + 
                "<br>Initiatives:<br>" +
                "In Backlog: " + d.data.Backlog + "<br>" + 
                "In Done: " + d.data.Done + "<br>" + 
                "In Analysis: " + d.data['In Analysis'] + "<br>" + 
                "In Dev: " + d.data['In Dev'] + "<br>" +
                "In New: " + d.data.New + "<br>" + 
                "In Pending: " + d.data.Pending + "<br>" +
                "In Walkthrough: " + d.data.Walkthrough + "<br><br>" +
                "Number of people: " + d.data.People + "<br>" +
                "FTE allocated: " + d.data.FTE)
              .style("left", (d3.event.pageX) + "px")   
              .style("top", (d3.event.pageY - 28) + "px");  
          })
      .on("mouseout", function(d) {   
          div.transition()    
              .duration(500)    
              .style("opacity", 0); 
        });

  var keys = data.columns.slice(3,4);

  pg.append("g")
    .selectAll("g")
    .data(d3.stack().keys(keys)(data))
    .enter().append("g")
      .attr("fill", function(d) { return "#6600cc"; })
    .selectAll("rect")
    .data(function(d) { return d; })
    .enter().append("rect")
      .attr("x", function(d) { return x(d.data.PPM_ID); })
      .attr("y", function(d) { return 0; })
      .attr("height", function(d) { return y(d[0]) + y(d[1]); })
      .attr("width", x.bandwidth())
      .on("mouseover", function(d) {    
           div.transition()    
              .duration(200)    
              .style("opacity", .9);    
          div .html(d.data.PPM_Name + "<br><br>" + 
                "Initiatives:<br>" +
                "In Backlog: " + d.data.Backlog + "<br>" + 
                "In Done: " + d.data.Done + "<br>" + 
                "In Analysis: " + d.data['In Analysis'] + "<br>" + 
                "In Dev: " + d.data['In Dev'] + "<br>" +
                "In New: " + d.data.New + "<br>" + 
                "In Pending: " + d.data.Pending + "<br>" +
                "In Walkthrough: " + d.data.Walkthrough + "<br><br>" +
                "Number of people: " + d.data.People + "<br>" +
                "FTE allocated: " + d.data.FTE)
              .style("left", (d3.event.pageX) + "px")   
              .style("top", (d3.event.pageY - 28) + "px");  
          })
      .on("mouseout", function(d) {   
          div.transition()    
              .duration(500)    
              .style("opacity", 0); 
      });

  pg.append("g")
      .attr("class", "axis")
      .call(d3.axisLeft(y).ticks(null, "s"))
    .append("text")
      .attr("x", 2)
      .attr("y", y(y.ticks().pop()) + 0.5)
      .attr("dy", "0.32em")
      .attr("fill", "#000")
      .attr("font-weight", "bold")
      .attr("text-anchor", "start")
});
*/
