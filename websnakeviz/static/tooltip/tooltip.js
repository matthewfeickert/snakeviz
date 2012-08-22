d3helpertooltip = function(accessor){
    return function(selection){
        var tooltipDiv;
        var bodyNode = d3.select('body').node();
        selection.on("mouseover", function(d, i){
            // Clean up lost tooltips
            d3.select('body').selectAll('div.tooltip').remove();
            // Append tooltip
            tooltipDiv = d3.select('body').append('div').attr('class', 'viztooltip');
            var absoluteMousePos = d3.mouse(bodyNode);
            tooltipDiv.style('left', (absoluteMousePos[0] + 10)+'px')
                .style('top', (absoluteMousePos[1] - 15)+'px')
                .style('position', 'absolute')
                .style('z-index', 1001);
            // Add text using the accessor function
            var tooltipText = accessor(d, i) || '';
            // Crop text arbitrarily
            tooltipDiv.style('width', function(d, i){return (tooltipText.length > 80) ? '300px' : null;})
                .text(tooltipText);

            // select all the nodes that represent this exact function
            // and highlight them by darkening their color
            var thisname = d.name;
            var thisfilename = d.filename;
            var thisdirectory = d.directory;
            var thislinenumber = d.line_number;
            var thispath = selection.filter(function(d, i) {
                return d.name == thisname &
                       d.filename == thisfilename &
                       d.directory == thisdirectory &
                       d.line_number == thislinenumber;})
            var thiscolor = d3.rgb(color(d)).darker(1);
            thispath.style('fill', thiscolor.toString());
        })
        .on('mousemove', function(d, i) {
            // Move tooltip
            var absoluteMousePos = d3.mouse(bodyNode);
            tooltipDiv.style('left', (absoluteMousePos[0] + 10)+'px')
                .style('top', (absoluteMousePos[1] - 15)+'px');
            var tooltipText = accessor(d, i) || '';
            tooltipDiv.text(tooltipText);
        })
        .on("mouseout", function(d, i){
            // Remove tooltip
            tooltipDiv.remove();

            // reset darkened nodes to their original color
            var thisname = d.name;
            var thisfilename = d.filename;
            var thisdirectory = d.directory;
            var thislinenumber = d.line_number;
            var thispath = selection.filter(function(d, i) {
                return d.name == thisname &
                       d.filename == thisfilename &
                       d.directory == thisdirectory &
                       d.line_number == thislinenumber;})
            thispath.style('fill', color(d))
        });

    };
};