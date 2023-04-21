import { createLine, straightLine } from './Lines.js';

const Levels = (svg, damScale, damTop, damBottom, levels = []) => {
  // short circuit
  if (!levels.length || !damTop || isNaN(damBottom) || !damScale) {
    console.log('Unable to draw dam profile levels');
    console.log(levels);
    console.log(damScale);
    return;
  }

  const x = { left: 160, right: 410 };
  const length = 290;
  const radius = 4;

  var baseModifier = Math.abs(Math.round((damTop - damBottom) * 0.09));
  var moveByModifier = Math.max(
    10,
    Math.abs(Math.round((damTop - damBottom) * 0.09))
  );

  // Default Level Properties if not speficied
  const _levels = levels.map((l) => ({
    side: l.name === 'Top of Surcharge' ? 'right' : 'left', // default; labels will be on left side of image
    showLine: true,
    ...l,
  }));

  // reverse order sort
  var lineData = _levels.sort((a, b) => {
    return a.value > b.value ? -1 : a.value < b.value ? 1 : 0;
  });

  //Check if the text and lines are too close, and then re-position
  var priorVal = -1,
    priorMod = 0,
    priorSide = 'left';
  lineData.forEach((d) => {
    if (
      priorVal === -1 ||
      priorVal - d.value > baseModifier ||
      priorSide !== d.side
    ) {
      priorVal = d.value;
      priorMod = 0;
      d.modifier = 0;
      d.lineType = 'straight';
    } else if (priorVal !== d.value && priorMod === 0) {
      priorVal = d.value - moveByModifier;
      priorMod = d.modifier = moveByModifier;
      d.lineType = 'angled';
    } else if (priorVal === d.value && priorMod === 0) {
      priorVal = d.value - 25;
      priorMod = d.modifier = 25;
      d.lineType = 'angled';
    } else {
      priorVal = d.value - (priorMod + moveByModifier);
      priorMod = d.modifier = priorMod + moveByModifier;
      d.lineType = 'angled';
    }
    priorSide = d.side;
  });

  var lines = svg
    .selectAll('g.dashedLines')
    .data(lineData, (d) => `${d.name}-${d.value}`)
    .enter()
    .append('g')
    .attr('class', 'dashedLines');

  lines
    .append('path')
    .attr('d', (d) => {
      if (d.lineType === 'straight') {
        return d.showLine ? createLine(length) : createLine(20);
      } else {
        return d.showLine
          ? d.side === 'left'
            ? straightLine([
                [0, d.modifier],
                [20, 0],
                [length, 0],
              ])
            : straightLine([
                [0, 0],
                [length - 20, 0],
                [length, d.modifier],
              ])
          : straightLine([
              [0, d.modifier],
              [d.modifier, 0],
            ]);
      }
    })
    .attr('transform', (d) => `translate(${x[d.side]},${damScale(d.value)})`)
    .attr('stroke', '#FF0000')
    .attr('fill', 'none')
    .style('stroke-dasharray', ('3', '3'));

  //create red dot at the end of the dashed line
  lines
    .append('circle')
    .attr('r', radius)
    .attr('cx', (d) => (d.side === 'left' ? x[d.side] : x[d.side] + length))
    .attr('cy', (d) => damScale(d.value) + d.modifier)
    .attr('fill', '#FF0000');

  lines
    .append('text')
    .attr('text-anchor', (d) => (d.side === 'left' ? 'end' : 'start'))
    .attr('x', (d) =>
      d.side === 'left' ? x[d.side] - 10 : x[d.side] + length + 10
    )
    .attr('y', (d) => damScale(d.value) + d.modifier + radius - 6.5)
    .attr('font-family', 'sans-serif')
    .attr('fill', '#FF0000')
    .attr('font-size', '1.0em')
    .text((d) => d.name);

  lines
    .append('text')
    .attr('text-anchor', (d) => (d.side === 'left' ? 'end' : 'start'))
    .attr('x', (d) =>
      d.side === 'left' ? x[d.side] - 10 : x[d.side] + length + 10
    )
    .attr('y', (d) => damScale(d.value) + d.modifier + radius + 16)
    .attr('font-family', 'sans-serif')
    .attr('fill', '#000000')
    .attr('font-size', '1.2em')
    .text((d) => `${d.value}'`);
};
export default Levels;
