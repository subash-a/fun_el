(function() {
    var fdata = [[100,80],[80,20],[20,10],[10,10]];
    var fdata_single = [100,80,20,10];
    var funnel = {};
    var colors = ["#E8929C","#D292E8","#9792E8","#92DBE8","#92E8CE","#97E892","#D5E892","#E8C392"];
    var axis_color = "#d8d8d8";
    var windowing = function(array,evalFunc,windowSize,windowStep) {
	var step = windowStep || 1;
	var size = windowSize || 2;
	return array.map(function(d,i,a){
	    return evalFunc(a.slice(i,i+size));
	});
    };
    var evalFunc = function(a) {
	return parseInt(((parseInt(a[0],10) - parseInt(a[1],10))/(parseInt(a[0],10))) * 100,10) || 0;
    };
    var width = 840;
    var height = 480;
    var margin = {"top":20,"left":10};
    var graphHeight = height - 2 * (margin.top);
    var graphWidth = width - 2 * (margin.left);
    var yScale = d3.scale.linear();
    var xScale = d3.scale.linear();
    var xAxis = d3.svg.axis()
	.scale(xScale)
	.orient("bottom")
	.tickSize(1);
    var yAxis = d3.svg.axis()
	.scale(yScale)
	.orient("left")
	.tickSize(1);
    var xAxisLabel = "Series";
    var yAxisLabel = "Range";
    var chart = function(selection) {
	selection.each(function(values){
	    var dataLength = values.length;
	    var data = d3.zip(values,windowing(values,evalFunc,2));
	    var container = d3.select(this);

	    xScale
		.domain([0,data.length])
		.range([0,graphWidth]);

	    yScale
		.domain([0,d3.max(data,function(d){return d[0]})])
		.range([graphHeight,0]);

	    var barWidth = ((graphWidth/values.length)/2) || 5;

	    var g = container.selectAll("g.funnel").data([data]);
	    var gEnter = g.enter()
		.append("g")
		.attr("class","funnel")
		.attr("transform","translate("+margin.left*3+","+margin.top+")");
	    gEnter.append("g")
		.attr("class","x-axis")
		.attr("transform","translate(0,"+graphHeight+")");
	    gEnter.append("g")
		.attr("class","y-axis");

	    var xGroup = g.select("g.x-axis");
	    
	    var yGroup = g.select("g.y-axis");
	    	
	    xGroup.call(xAxis);
	    yGroup.call(yAxis);

	    xGroup.append("text")
		.attr("x",graphWidth/2)
		.attr("y",0)
		.text(xAxisLabel)
		.attr("transform","translate(0,28)");

	    yGroup.append("text")
		.attr("text-anchor","middle")
		.attr("x",0)
		.attr("y",graphHeight/2)
		.text(yAxisLabel)
		.attr("transform","rotate(-90 "+0+","+graphHeight/2+") translate(0,-28)");
	    
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
		.attr("width",barWidth)
		.attr("height",function(d){return yScale.range()[0] - yScale(d[0])})
		.attr("transform",function(d){return "translate(0,"+ yScale(d[0]) +")"})
	    .attr("fill",function(d,i){return colors[i]});

	    var rectEnter = rectGroup.enter()
		.append("g")
		.attr("class","filter-set");
	    
	    rectEnter.append("rect")
		.attr("x",function(d,i){return i*xScale(1)})
		.attr("y",0)
		.attr("width",barWidth)
		.attr("height",function(d){return yScale.range()[0] - yScale(d[0])})
		.attr("transform",function(d){return "translate(0,"+ (yScale(d[0])) +")"})
	    .attr("fill",function(d,i){return colors[i]});

	    var ptr = pointer();	
	    
	    seriesGroup.call(ptr);

	});

	return this;
    };

    // Writing the pointer component to be separate so that they can be used on any bar graph
    var pointer = function() {
	
	var chart = function(selection) {
	    var translateX = 0;
	    var translateY = 0;
	    var scaleX = 1;
	    var scaleY = 1;
	    selection.each(function(data){
		var container = d3.select(this);
		var gPointer = container.selectAll("g.pointer").data(data);
		
		gPointer.select("text")
		    .attr("x",function(d,i){return i*xScale(1)+xScale(0.45)})
		    .attr("y",110)
		    .style("fill","#fff")
		    .style("font-family","sans-serif")
		    .style("font-size","8")
		    .text(function(d){return d});
		gPointer.select("polygon")
		    .attr("points","0,0 15,0 18,7 15,14 0,14")
		    .attr("fill","#00a6c6")
		    .attr("transform",function(d,i){return "translate("+i*xScale(10)+","+translateY+") scale("+scaleX+","+scaleY+")"});
		var gPointerEnter = gPointer.enter()
		    .append("g")
		    .attr("class","pointer");
		gPointerEnter.append("polygon")
		    .attr("points","0,0 15,0 18,7 15,14 0,14")
		    .attr("fill","#00a6c6")
	    	    .attr("transform",function(d,i){return "translate("+i*xScale(10)+","+translateY+") scale("+scaleX+","+scaleY+")"});
		gPointerEnter.append("text")
		    .attr("x",function(d,i){return i*xScale(1)+xScale(0.45)})
		    .attr("y",110)
		    .style("fill","#fff")
		    .style("font-family","sans-serif")
		    .style("font-size","8")
		    .text(function(d){return d});
	    });
	    return this;
	};
	
	return chart;
    };
    
    var gdata = [[500,10],[420,20],[400,30],[390,40]];
    var gdata_single = [500,420,400,390];
    var width = 840;
    var height = 480;
    
    var svg = d3.select("#funnel")
	.attr("width",width)
	.attr("height",height)
	.datum(gdata_single)
	.call(chart);
    
    d3.select("button#change").on("click",function(){
	d3.select("#funnel")
	    .datum(fdata_single)
	    .call(chart);
	
    });
})();
