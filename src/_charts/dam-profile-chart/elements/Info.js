const Info = (svg, text) => {
  svg.append('g').attr('class', 'dam');
  svg
    .append('g')
    .attr('class', 'labelText')
    .append('text')
    .attr('text-anchor', 'end')
    .attr('dx', 1230)
    .attr('dy', 15)
    .attr('class', 'infoText')
    .attr('font-family', 'sans-serif')
    .attr('font-size', '1em')
    .text(`${text || ''} ${new Date().toUTCString()}`);
};

export default Info;
