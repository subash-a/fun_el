# fun_el
A Funnel Graph based on D3 
This funnel graph utilizes a bar graph and other shapes to represent a change in value from one stage of a process to another.
The value of the bar indicates the Number of itens at each stage and the value in the arrow pointing to the next stage indicates the percentage of the whole which made it to the next stage.
<head>
    <script src="d3.v3.js"></script>
</head>
<body>
  <div id="container">
    <svg id="funnel"></svg>
    <button id="change" style='display:none'>Switch</button>
  </div>
  <script src="fun_el.js"></script>
</body>
</head>
