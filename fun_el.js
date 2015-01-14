(function() {
    var fdata = [[100,80],[80,20],[20,10],[10,10]];
    funnel = {};
    var colors = ["#E8929C","#D292E8","#9792E8","#92DBE8","#92E8CE","#97E892","#D5E892","#E8C392"];
    var axis_color = "#d8d8d8";
    var chart = function(selection) {
	selection.each(function(data){
	    var container = d3.select(this);
	    var xScale = d3.scale.linear();
	    xScale
		.domain([0,data.length])
		.range([0,400]);
	    var yScale = d3.scale.linear();
	    yScale
		.domain([0,d3.max(data,function(d){return d[0]})])
		.range([200,0]);
			
	    var g = container.selectAll("g.funnel").data([data]);
	    var gEnter = g.enter()
		.append("g")
		.attr("class","funnel")
		.attr("transform","translate(30,20)");
	    gEnter.append("g")
		.attr("class","x-axis")
		.attr("transform","translate(0,200)");
	    gEnter.append("g")
		.attr("class","y-axis");

	    var xGroup = g.select("g.x-axis");
	    
	    var yGroup = g.select("g.y-axis");
	    
	    
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

	    gEnter.append("g")
		.attr("class","series");

	    var seriesGroup = g.selectAll("g.series");

	    chart.update = function() {
		container.call(chart);
	    };

	    var rectGroup = seriesGroup.selectAll("g.filter-set").data(data)
	    rectGroup.select("rect")
		.attr("x",function(d,i){return i*xScale(1)})
		.attr("y",0)
		.attr("width",10)
		.attr("height",function(d){return yScale.range()[0] - yScale(d[0])})
		.attr("transform",function(d){return "translate(0,"+ yScale(d[0]) +")"})
	    .attr("fill",function(d,i){return colors[i]});

	    var rectEnter = rectGroup.enter()
		.append("g")
		.attr("class","filter-set");

	    
	    rectEnter.append("rect")
		.attr("x",function(d,i){return i*xScale(1)})
		.attr("y",0)
		.attr("width",10)
		.attr("height",function(d){return yScale.range()[0] - yScale(d[0])})
		.attr("transform",function(d){return "translate(0,"+ (yScale(d[0])) +")"})
	    .attr("fill",function(d,i){return colors[i]});

	    rectGroup.select("polygon")
		.attr("points","0,0 15,0 18,7 15,14 0,14")
		.attr("transform",function(d,i){return "translate("+((i*xScale(1))+xScale(0.40))+","+100+")"})
	    .attr("fill","#01A0C5");
	    
	    rectEnter.append("polygon")
		.attr("points","0,0 15,0 18,7 15,14 0,14")
		.attr("transform",function(d,i){return "translate("+((i*xScale(1))+xScale(0.40))+","+100+")"})
	    .attr("fill","#01A0C5");

	    rectGroup.select("text")
		.attr("x",function(d,i){return i*xScale(1)+xScale(0.45)})
		.attr("y",110)
		.style("fill","#fff")
		.style("font-family","sans-serif")
		.style("font-size","8")
		.text(function(d){return d[1]});

	    rectEnter.append("text")
		.attr("x",function(d,i){return i*xScale(1)+xScale(0.45)})
		.attr("y",110)
		.style("fill","#fff")
		.style("font-family","sans-serif")
		.style("font-size","8")
		.text(function(d){return d[1]});
	});

	return this;
    };
    var gdata = [[500,10],[420,20],[400,30],[390,40]];
    var svg = d3.select("#funnel")
	.attr("width","480")
	.attr("height","240")
	.datum(gdata)
	.call(chart);
    

    d3.select("button#change").on("click",function(){
	
	d3.select("#funnel")
	.datum(fdata)
	.call(chart);
	
    });
})();
