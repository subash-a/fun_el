(function() {
    var fdata = [[100,80],[80,20],[20,10],[10,10]];
    funnel = {};
    var svg = d3.select("#funnel").attr("width","480").attr("height","240");
    var g = svg.selectAll("g.funnel").data([fdata]);
    
    var xScale = d3.scale.linear();
    xScale
	.domain([0,10])
	.range([0,400]);
    var yScale = d3.scale.linear();
    yScale
	.domain([0,100])
	.range([0,200]);

    var gEnter = g.enter()
	.append("g")
	.attr("class","funnel")
    .attr("transform","translate(30,20)");
    var xGroup = gEnter.append("g")
    .attr("class","x-axis")
    .attr("transform","translate(0,"+yScale(100)+")");
    var yGroup = gEnter.append("g")
    .attr("class","y-axis");


    var xAxis = d3.svg.axis()
	.scale(xScale)
	.orient("bottom")
	.tickSize(1);
    var yAxis = d3.svg.axis()
	.scale(yScale)
	.orient("left")
	.tickSize(1);
    xGroup.call(xAxis);
    yGroup.call(yAxis);

    var seriesGroup = gEnter.append("g")
    .attr("class","series");

    var rectGroup = seriesGroup.selectAll("g.filter-set").data(fdata);
    var rectEnter = rectGroup.enter()
    .append("g")
    .attr("class","filter-set");
    rectEnter.append("rect")
	.attr("x",function(d,i){return i*xScale(1)})
	.attr("y",0)
	.attr("width",10)
	.attr("height",function(d){return d[0]})
	.attr("transform",function(d){return "translate(0,"+ (200 - d[0]) +")"});
    rectEnter.append("circle")
    .attr("cx",function(d,i){return (i*xScale(1))+xScale(0.60)})
    .attr("cy",yScale(80))
    .attr("r",function(d){return 10});
    rectEnter.append("text")
    .attr("x",function(d,i){return i*xScale(1)+xScale(0.5)})
    .attr("y",yScale(81))
    .style("fill","#fff")
    .style("font-family","sans-serif")
    .style("font-size","8")
    .text(function(d){return d[1]});
})();
