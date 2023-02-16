//
// THIS IS THE DAM PROFILE CHART CODE
// AS-IS, CURRENTLY RENDERING CHARTS ON THE
// WEBSITE WATER.USACE.ARMY.MIL
// IT WILL BE USED AS THE STARTING POINT FOR d3-chart-server's
// DAM-PROFILE-CHART VISUALIZATION
//

var BasinStreamService = function (_options) {
  var defaultOptions = {
    elementId: 'container',
    animateWater: true,
    rainDrops: 0,
    debug: false,
    colorArr: ['red', 'yellow', 'yellow', 'green'],
    colorLevels: [0.0, 0.2, 0.3, 0.4],
    hasLock: false,
    hasTurbine: false,
    dataService: function () {
      return {
        date: null,
        text: null,
        currentLevel: null, //255,
        deadPool: null, //235,
        tailWater: null,
        ruleCurve: null, //300,
        //ruleCurveDateTime: null, //'01/30 1400',
        damBottom: null, //220,
        damTop: null, //320,
        inflow: null, //0.2,
        outflow: null, //0.4,
        precip: null, // 83.1,
        sur: null, //0.1,
        horizontalLabels: {},
        gradientLabel: [0, 20, 40, 60, 80, 100],
        gradientTop: null,
        gradientBottom: null,
        colorArr: ['red', 'yellow', 'yellow', 'green'],
        colorLevels: [0.0, 0.2, 0.3, 0.4],
        //horizontalLeftLabels: [
        //  {name: 'Top of Control Pool', value: 320},
        //  {name: 'Top of Conservation Pool', value: 260}
        //]
      };
    },
    baseURL: './js/',
  };

  this.shapes = {
    outflowArrow: {
      dam: [
        [620, 355],
        [655, 355],
        [655, 340],
        [680, 360],
        [655, 380],
        [655, 365],
        [620, 365],
      ],
      lock: [
        [1020, 355],
        [1055, 355],
        [1055, 340],
        [1080, 360],
        [1055, 380],
        [1055, 365],
        [1020, 365],
      ],
      lockTurbine: [
        [1020, 355],
        [1055, 355],
        [1055, 340],
        [1080, 360],
        [1055, 380],
        [1055, 365],
        [1020, 365],
      ],
      turbine: [
        [620, 355],
        [655, 355],
        [655, 340],
        [680, 360],
        [655, 380],
        [655, 365],
        [620, 365],
      ],
    },
    outflowCircle: {
      dam: { x: 600, y: 360 },
      lock: { x: 1000, y: 360 },
      lockTurbine: { x: 1000, y: 360 },
      turbine: { x: 600, y: 360 },
    },
    outflowText: {
      dam: { x: 610, y: 325 },
      lock: { x: 1010, y: 325 },
      lockTurbine: { x: 1010, y: 325 },
      turbine: { x: 610, y: 325 },
    },
  };

  this.numFormat = d3.format('.2f');
  this.tickScale = d3.scale.linear().domain([0, 17]);
  this.damScale = d3.scale.linear().range([130, 560]);
  this.gradientScale = d3.scale.ordinal().domain([0, 20, 40, 60, 80, 100]);
  this.gradientAxis = d3.svg.axis();
  this.rainCount = 0;
  this.options = $.extend({}, defaultOptions, _options);
  this.hasLock = this.options.hasLock;
  this.hasTurbine = this.options.hasTurbine;
  this.mode = 'dam';
  this.elementId = this.options.elementId;
  this.element = $('#' + this.elementId);
  this.raw = null;
  this.first = true;
  this.world = null;
  this.baseURL = this.options.baseURL;
  this.curvedLine = d3.svg
    .line()
    .x(function (d) {
      return d[0];
    })
    .y(function (d) {
      return d[1];
    })
    .interpolate('basis');
  this.straightLine = d3.svg
    .line()
    .x(function (d) {
      return d[0];
    })
    .y(function (d) {
      return d[1];
    });
};

BasinStreamService.prototype.load = function () {
  var self = this;
  self.raw = self.options.dataService();
  self.options = $.extend({}, self.options, self.options.dataService());

  self.mode =
    self.options.hasLock && self.options.hasTurbine
      ? 'lockTurbine'
      : !self.options.hasLock && !self.options.hasTurbine
      ? 'dam'
      : self.options.hasLock
      ? 'lock'
      : 'turbine';

  self.init();
};

BasinStreamService.prototype.clear = function () {
  var self = this;
  var options = self.options;

  //Clear out any previous content
  d3.select('#' + options.elementId)
    .selectAll('*')
    .remove();
};

BasinStreamService.prototype.init = function () {
  var self = this;
  var options = self.options;
  var width = $(window).width();
  var height = $(window).height();

  cWidth = 1240;
  cHeight = 650;

  //Clear out any previous content
  self.clear();

  if (!isNaN(options.damTop) && !isNaN(options.damBottom)) {
    self.tickScale.range([options.damTop, options.damBottom]);

    self.damScale.domain([options.damTop, options.damBottom]);

    self.svgContainer = d3
      .select('#' + options.elementId)
      .append('div')
      .classed('svg-container', true)
      .append('svg')
      .attr('preserveAspectRatio', 'xMinYMin meet')
      .attr('viewBox', '0 0 ' + cWidth + ' ' + cHeight);

    if (options.height !== undefined) {
      self.svgContainer.attr('height', options.height);
    }

    //https://codepen.io/gapcode/pen/vEJNZN
    if (
      window.navigator.userAgent.indexOf('MSIE ') > 0 ||
      window.navigator.userAgent.indexOf('Trident/') > 0 ||
      window.navigator.userAgent.indexOf('Trident/') > 0
    ) {
      self.svgContainer.attr('style', 'min-height:650px;');
    }

    self.svgContainer.append('g').classed('svg-content-responsive', true);

    //create 'defs' in case any gradients are needed
    self.svgContainer.append('defs');
    //create line on the left
    self.svgContainer
      .append('g')
      .attr('class', 'leftLine')
      .append('path')
      .attr(
        'd',
        self.curvedLine([
          [0, 100],
          [220, 100],
          [243, 130],
          [243, 150],
          [243, 560],
          [243, 560],
          [243, 560],
        ])
      )
      .attr('stroke', '#B3B3B3')
      .attr('stroke-width', 7)
      .attr('fill', 'none')
      .attr('stroke-linejoin', 'miter');
    //create center dam
    self.svgContainer
      .select('g.leftLine')
      .append('path')
      .attr(
        'd',
        self.straightLine([
          [410, 561],
          [410, 150],
          [390, 150],
          [390, 130],
          [510, 130],
          [510, 150],
          [490, 170],
          [490, 210],
          [560, 440],
          [610, 440],
          [610, 561],
        ])
      )
      .attr('stroke', '#B3B3B3')
      .attr('stroke-width', 2)
      .attr('fill', '#B3B3B3')
      .attr('stroke-linejoin', 'bevel');

    self.drawWaterLevel();
    self.createLegend();
    self.createInflowIcon();
    self.drawMountain();

    if (self.options.hasLock) {
      self.createLock();
      self.drawBoat();
    } else {
      if (self.options.hasTurbine) {
        self.noLockTurbine();
      } else {
        self.noLock();
      }
    }

    if (self.options.hasTurbine) {
      self.createTurbine();
    }

    self.drawTicks();
    self.createOutflowIcon(self.mode);
    self.createSurchargeIcon(self.mode);
    self.createMiddleGradient(self.mode);
    self.drawDashedLines(self.options.horizontalLabels);
    self.setText(self.mode);
  }
};

//function to draw tick marks onto visualization
BasinStreamService.prototype.drawTicks = function () {
  var self = this;
  self.svgContainer.append('g').attr('class', 'ticks');
  var length = 5;
  var strokeWidth = 4;
  for (var i = 0; i < 18; i++) {
    if (i % 2 === 0) {
      strokeWidth = 4;
      length = 15;
    } else {
      strokeWidth = 2;
      length = 10;
    }
    self.svgContainer
      .select('g.ticks')
      .append('path')
      .attr('d', self.createLine(length))
      .attr('stroke-width', strokeWidth)
      .attr('stroke', '#B3B3B3')
      .attr(
        'transform',
        'translate(' + (240 - length) + ',' + (130 + i * 25.4) + ')'
      );

    self.svgContainer
      .select('g.ticks')
      .append('text')
      .attr('font-family', 'sans-serif')
      .attr('fill', '#b3b3b3')
      .attr('font-size', '12px')
      .attr('transform', 'translate(' + 180 + ',' + (135 + i * 25.4) + ')')
      .text(self.numFormat(self.tickScale(i)));
  }
};

BasinStreamService.prototype.createMiddleGradient = function (direction) {
  var self = this;
  var topY = self.damScale(self.options.gradientTop);
  var bottomY = self.damScale(self.options.gradientBottom);
  var height = bottomY - topY;

  if (!isNaN(topY) && !isNaN(bottomY)) {
    d3.select('#MiddleGradient').remove();
    d3.select('g.middleGradient').remove();

    self.gradientScale.range([bottomY, topY]);
    self.gradientAxis.scale(self.gradientScale).orient('right');

    //create the actual gradient with green: 60%, yellow: 60-75%, and red: 85-100%
    var middleGradient = self.svgContainer
      .select('defs')
      .append('linearGradient')
      .attr('id', 'MiddleGradient')
      .attr('x1', '0%')
      .attr('x2', '0%')
      .attr('y1', '0%')
      .attr('y2', '100%');

    self.options.colorLevels.forEach(function (d, i) {
      middleGradient
        .append('stop')
        .attr('offset', d * 100 + '%')
        .attr('stop-color', self.options.colorArr[i]);
    });

    self.svgContainer
      .append('g')
      .attr('class', 'middleGradient')
      .append('path')
      .attr(
        'd',
        self.straightLine([
          [445, topY],
          [460, topY],
          [460, bottomY],
          [445, bottomY],
          [445, topY],
        ])
      )
      .attr('fill', 'url(#MiddleGradient)');

    //create percentage marks
    if (Math.abs(topY - bottomY) > 40) {
      self.options.gradientLabel.forEach(function (d, i) {
        self.svgContainer
          .select('g.middleGradient')
          .append('text')
          .attr('x', 465)
          .attr('y', topY + 5 + i * (height / 5))
          .attr('font-family', 'sans-serif')
          .attr('font-size', '12px')
          .text(d + '%');
      });
    } else {
      self.svgContainer
        .select('g.middleGradient')
        .append('text')
        .attr('x', 465)
        .attr('y', topY + 5)
        .attr('font-family', 'sans-serif')
        .attr('font-size', '12px')
        .text(self.options.gradientLabel[0] + '%');

      self.svgContainer
        .select('g.middleGradient')
        .append('text')
        .attr('x', 465)
        .attr(
          'y',
          topY + 5 + (self.options.gradientLabel.length - 1) * (height / 5)
        )
        .attr('font-family', 'sans-serif')
        .attr('font-size', '12px')
        .text(
          self.options.gradientLabel[self.options.gradientLabel.length - 1] +
            '%'
        );
    }
  }
};

BasinStreamService.prototype.drawDashedLines = function (data) {
  var self = this;
  //create dashed line
  var x = { left: 160, right: 410 },
    angleddLength = 270,
    length = 290,
    radius = 4;
  var priorVal = -1,
    priorMod = 0,
    priorSide = 'left';

  var baseModifier = Math.abs(
    Math.round((self.options.damTop - self.options.damBottom) * 0.09)
  );
  var moveByModifier = Math.max(
    10,
    Math.abs(Math.round((self.options.damTop - self.options.damBottom) * 0.09))
  );

  self.svgContainer.selectAll('g.dashedLines').remove();

  // reverse order sort
  var lineData = data.sort(function (a, b) {
    return a.value > b.value ? -1 : a.value < b.value ? 1 : 0;
  });

  //Check if the text and lines are too close, and then re-position
  lineData.forEach(function (d, i) {
    if (
      priorVal == -1 ||
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

  var lines = self.svgContainer
    .selectAll('g.dashedLines')
    .data(lineData, function (d) {
      return d.name + '-' + d.value;
    });

  lines.enter().append('g').attr('class', 'dashedLines');

  lines
    .append('path')
    .attr('d', function (d) {
      if (d.lineType == 'straight') {
        return d.showLine ? self.createLine(length) : self.createLine(20);
      } else {
        return d.showLine
          ? d.side === 'left'
            ? self.straightLine([
                [0, d.modifier],
                [20, 0],
                [length, 0],
              ])
            : self.straightLine([
                [0, 0],
                [length - 20, 0],
                [length, d.modifier],
              ])
          : self.straightLine([
              [0, d.modifier],
              [d.modifier, 0],
            ]);
      }
    })
    .attr('transform', function (d) {
      return 'translate(' + x[d.side] + ',' + self.damScale(d.value) + ')';
    })
    .attr('stroke', '#FF0000')
    .attr('fill', 'none')
    .style('stroke-dasharray', ('3', '3'));

  //create red dot at the end of the dashed line
  lines
    .append('circle')
    .attr('r', radius)
    .attr('cx', function (d) {
      return d.side === 'left' ? x[d.side] : x[d.side] + length;
    })
    .attr('cy', function (d) {
      return self.damScale(d.value) + d.modifier;
    })
    .attr('fill', '#FF0000');

  lines
    .append('text')
    .attr('text-anchor', function (d) {
      return d.side === 'left' ? 'end' : 'start';
    })
    .attr('x', function (d) {
      return d.side === 'left' ? x[d.side] - 10 : x[d.side] + length + 10;
    })
    .attr('y', function (d) {
      return self.damScale(d.value) + d.modifier + radius - 6.5;
    })
    .attr('font-family', 'sans-serif')
    .attr('fill', '#FF0000')
    .attr('font-size', '1em')
    .text(function (d) {
      return d.name;
    });

  lines
    .append('text')
    .attr('text-anchor', function (d) {
      return d.side === 'left' ? 'end' : 'start';
    })
    .attr('x', function (d) {
      return d.side === 'left' ? x[d.side] - 10 : x[d.side] + length + 10;
    })
    .attr('y', function (d) {
      return self.damScale(d.value) + d.modifier + radius + 6.5;
    })
    .attr('font-family', 'sans-serif')
    .attr('fill', '#000000')
    .attr('font-size', '1em')
    .text(function (d) {
      return d.value + "'";
    });
};

//BasinStreamService.prototype.to = function create a line of length 'length'
BasinStreamService.prototype.createLine = function (length) {
  var self = this;
  return self.straightLine([
    [0, 0],
    [length, 0],
  ]);
};

//BasinStreamService.prototype.to = function create a line of length 'length'
BasinStreamService.prototype.createAngledLine = function (length) {
  var self = this;
  return self.straightLine([
    [0, 0],
    [length, 0],
  ]);
};

//create arrows at x and y coordinate. rotate by rotation degrees
BasinStreamService.prototype.createArrow = function (x, y, rotation) {
  var self = this;
  return self.svgContainer
    .append('path')
    .attr(
      'd',
      self.straightLine([
        [4, 0],
        [6, 0],
        [6, 20],
        [10, 20],
        [5, 28],
        [0, 20],
        [4, 20],
      ])
    )
    .attr('fill', '#000000')
    .attr(
      'transform',
      'translate(' + x + ',' + y + ') rotate(' + rotation + ')'
    );
};

BasinStreamService.prototype.drawWaterLevel = function () {
  var self = this;
  //create water behind the dam
  self.svgContainer.append('g').attr('class', 'water-level');

  self.svgContainer
    .select('g.water-level')
    .append('path')
    .attr(
      'd',
      self.straightLine([
        [247, self.damScale(self.options.currentLevel)],
        [247, 560],
        [409, 560],
        [409, self.damScale(self.options.currentLevel)],
      ])
    )
    .attr('fill', '#DCF1F9');

  self.svgContainer
    .select('g.water-level')
    .append('text')
    .attr('text-anchor', 'start')
    .attr('dx', 250)
    .attr('dy', self.damScale(self.options.currentLevel) + 20)
    .attr('fill', '#666666')
    .attr('font-family', 'sans-serif')
    .attr('font-size', '24px')
    .text(function () {
      return self.options.currentLevel + "'";
    });
};

//Set text display values for data display values that do not have position affected by the value
BasinStreamService.prototype.setText = function (mode) {
  var self = this;
  d3.selectAll('.labelText').remove();

  // inflow
  self.svgContainer
    .append('g')
    .attr('class', 'labelText')
    .append('text')
    .attr('text-anchor', 'start')
    .attr('dx', 350)
    .attr('dy', 65)
    .attr('class', 'inflowText')
    .attr('font-family', 'sans-serif')
    .attr('font-size', '1em')
    .text(function () {
      return !isNaN(self.options.inflow) ? self.options.inflow + ' cfs' : '';
    });
  // outflow
  self.svgContainer
    .append('g')
    .attr('class', 'labelText')
    .append('text')
    .attr('text-anchor', 'middle')
    .attr('dx', self.shapes.outflowText[mode].x)
    .attr('dy', self.shapes.outflowText[mode].y)
    .attr('class', 'outflowText')
    .attr('font-family', 'sans-serif')
    .attr('font-size', '1em')
    .text(function () {
      return !isNaN(self.options.outflow) ? self.options.outflow + ' cfs' : '';
    });
  // surcharge
  self.svgContainer
    .append('g')
    .attr('class', 'labelText')
    .append('text')
    .attr('text-anchor', 'start')
    .attr('dx', 605)
    .attr('dy', 124)
    .attr('class', 'surchargeText')
    .attr('font-family', 'sans-serif')
    .attr('font-size', '1em')
    .text(function () {
      return !isNaN(self.options.sur) ? self.options.sur + ' cfs' : '';
    });
  // tailwater
  self.svgContainer
    .append('g')
    .attr('class', 'labelText')
    .append('text')
    .attr('text-anchor', 'end')
    .attr('dx', 1200)
    .attr('dy', 530)
    .attr('fill', '#fff')
    .attr('class', 'tailwaterText')
    .attr('font-family', 'sans-serif')
    .attr('font-size', '18px')
    .text(function () {
      return !isNaN(self.options.tailWater) ? self.options.tailWater + "'" : '';
    });
  // current text
  self.svgContainer
    .append('g')
    .attr('class', 'labelText')
    .append('text')
    .attr('text-anchor', 'end')
    .attr('dx', 1230)
    .attr('dy', 15)
    .attr('class', 'inflowText')
    .attr('font-family', 'sans-serif')
    .attr('font-size', '1em')
    .text(function () {
      return (
        self.options.text +
        ' ' +
        d3.time.format('%e-%b-%Y %H:%M:%S')(
          new Date(parseInt(self.options.date + '000'))
        )
      );
    });
};

BasinStreamService.prototype.update = function (fn) {
  var self = this;
  self.options = $.extend({}, self.options, fn());

  // set
  self.svgContainer
    .select('g.water-level path')
    .attr(
      'd',
      self.straightLine([
        [247, self.damScale(self.options.currentLevel)],
        [247, 560],
        [409, 560],
        [409, self.damScale(self.options.currentLevel)],
      ])
    )
    .attr('fill', '#DCF1F9');

  self.svgContainer
    .select('g.water-level text')
    .attr('text-anchor', 'start')
    .attr('dx', 250)
    .attr('dy', self.damScale(self.options.currentLevel) + 20)
    .attr('fill', '#666666')
    .attr('font-family', 'sans-serif')
    .attr('font-size', '24px')
    .text(function () {
      return self.options.currentLevel + "'";
    });

  d3.select('g.inflowIcon').attr('style', function (d) {
    return 'display:' + (!isNaN(self.options.inflow) ? 'inline' : 'none') + ';';
  });
  d3.select('g.outflowIcon').attr('style', function (d) {
    return (
      'display:' + (!isNaN(self.options.outflow) ? 'inline' : 'none') + ';'
    );
  });
  d3.select('g.surchargeIcon').attr('style', function (d) {
    return 'display:' + (!isNaN(self.options.sur) ? 'inline' : 'none') + ';';
  });

  self.createMiddleGradient(self.mode);
  self.drawDashedLines(self.options.horizontalLabels);
  self.setText(self.mode);
};

//if no lock exists, draw rectangle underneath dam water
BasinStreamService.prototype.noLock = function () {
  var self = this;
  self.svgContainer
    .append('g')
    .attr('class', 'nolock')
    .append('path')
    .attr(
      'd',
      self.straightLine([
        [239, 560],
        [611, 560],
        [611, 590],
        [239, 590],
      ])
    )
    .attr('fill', '#B3B3B3');
  self.svgContainer
    .select('g.nolock')
    .append('path')
    .attr(
      'd',
      self.straightLine([
        [611, 510],
        [611, 590],
        [1210, 590],
        [1210, 510],
      ])
    )
    .attr('fill', '#85BBDF');
};

BasinStreamService.prototype.noLockTurbine = function () {
  var self = this;

  //bottom of lock
  self.svgContainer
    .append('g')
    .attr('class', 'lock')
    .append('path')
    .attr(
      'd',
      self.straightLine([
        [240, 560],
        [300, 560],
        [300, 610],
        [840, 560],
        [1209, 560],
        [1209, 640],
        [240, 640],
      ])
    )
    .attr('stroke', '#B3B3B3')
    .attr('stroke-width', 2)
    .attr('fill', '#B3B3B3')
    .attr('stroke-linejoin', 'bevel');
  var lockGradient = self.svgContainer
    .select('defs')
    .append('linearGradient')
    .attr('id', 'LockGradient')
    .attr('x1', '0%')
    .attr('x2', '50%')
    .attr('y1', '0%')
    .attr('y2', '0%')
    .attr('gradientUnits', 'userSpaceOnUse');
  lockGradient
    .append('stop')
    .attr('offset', '40%')
    .attr('stop-color', '#DCF1F9');
  lockGradient
    .append('stop')
    .attr('offset', '80%')
    .attr('stop-color', '#82B8DC');
  //create water underneath lock (with the above gradient)
  self.svgContainer
    .select('g.lock')
    .append('path')
    .attr(
      'd',
      self.straightLine([
        [300, 559],
        [830, 559],
        [830, 610],
        [300, 610],
      ])
    )
    .attr('fill', 'url(#LockGradient)');
  //create arrows in the water
  self.createArrow(310, 570, 0);
  self.createArrow(520, 605, -90);
  self.createArrow(787, 590, 180);
  self.createArrow(822, 590, 180);
  //water outside of lock
  self.svgContainer
    .select('g.lock')
    .append('path')
    .attr(
      'd',
      self.straightLine([
        [611, 510],
        [611, 560],
        [1210, 560],
        [1210, 510],
      ])
    )
    .attr('fill', '#85BBDF');
  //rectangle below dam
  self.svgContainer
    .select('g.lock')
    .append('path')
    .attr(
      'd',
      self.straightLine([
        [330, 560],
        [330, 590],
        [770, 590],
        [770, 560],
      ])
    )
    .attr('stroke', '#B3B3B3')
    .attr('stroke-width', 2)
    .attr('fill', '#B3B3B3')
    .attr('stroke-linejoin', 'bevel');
  //separator between outlet arrows
  self.svgContainer
    .select('g.lock')
    .append('path')
    .attr(
      'd',
      self.straightLine([
        [795, 560],
        [805, 560],
        [805, 590],
        [795, 590],
      ])
    )
    .attr('stroke', '#B3B3B3')
    .attr('stroke-width', 2)
    .attr('fill', '#B3B3B3');
  //grey region separating tailwater from outlet
  self.svgContainer
    .select('g.lock')
    .append('path')
    .attr(
      'd',
      self.straightLine([
        [830, 560],
        [850, 560],
        [1020, 560],
        [1020, 590],
        [830, 590],
      ])
    )
    .attr('stroke', '#B3B3B3')
    .attr('stroke-width', 2)
    .attr('fill', '#B3B3B3');
};

//create lock
BasinStreamService.prototype.createLock = function () {
  var self = this;
  self.svgContainer
    .append('g')
    .attr('class', 'lock')
    .append('path')
    .attr(
      'd',
      self.straightLine([
        [240, 560],
        [300, 560],
        [300, 610],
        [1020, 610],
        [1020, 560],
        [1209, 560],
        [1209, 640],
        [240, 640],
      ])
    )
    .attr('stroke', '#B3B3B3')
    .attr('stroke-width', 2)
    .attr('fill', '#B3B3B3')
    .attr('stroke-linejoin', 'bevel');
  //create water between lock and dam
  self.svgContainer
    .select('g.lock')
    .append('path')
    .attr(
      'd',
      self.straightLine([
        [539, 370],
        [850, 370],
        [850, 560],
        [620, 560],
        [620, 410],
        [550, 410],
      ])
    )
    .attr('fill', '#82B8DC');
  //create gray background above the water
  self.svgContainer
    .select('g.lock')
    .append('path')
    .attr(
      'd',
      self.straightLine([
        [510, 130],
        [510, 150],
        [490, 170],
        [490, 210],
        [539, 370],
        [850, 370],
        [850, 130],
      ])
    )
    .attr('fill', '#EEEEEE');
  //create gradient for water underneath the lock. See http://jsfiddle.net/ZCwrx/
  var lockGradient = self.svgContainer
    .select('defs')
    .append('linearGradient')
    .attr('id', 'LockGradient')
    .attr('x1', '0%')
    .attr('x2', '50%')
    .attr('y1', '0%')
    .attr('y2', '0%')
    .attr('gradientUnits', 'userSpaceOnUse');
  lockGradient
    .append('stop')
    .attr('offset', '40%')
    .attr('stop-color', '#DCF1F9');
  lockGradient
    .append('stop')
    .attr('offset', '80%')
    .attr('stop-color', '#82B8DC');
  //create water underneath lock (with the above gradient)
  self.svgContainer
    .select('g.lock')
    .append('path')
    .attr(
      'd',
      self.straightLine([
        [300, 560],
        [1020, 560],
        [1020, 610],
        [300, 610],
      ])
    )
    .attr('fill', 'url(#LockGradient)');
  //create arrows in the water
  self.createArrow(310, 570, 0);
  self.createArrow(520, 605, -90);
  self.createArrow(787, 590, 180);
  self.createArrow(822, 590, 180);
  //rectangle below dam
  self.svgContainer
    .select('g.lock')
    .append('path')
    .attr(
      'd',
      self.straightLine([
        [330, 560],
        [330, 590],
        [770, 590],
        [770, 560],
      ])
    )
    .attr('stroke', '#B3B3B3')
    .attr('stroke-width', 2)
    .attr('fill', '#B3B3B3')
    .attr('stroke-linejoin', 'bevel');
  //light grey rectangle in the lock water
  self.svgContainer
    .select('g.lock')
    .append('path')
    .attr(
      'd',
      self.straightLine([
        [670, 560],
        [670, 390],
        [545, 390],
        [560, 440],
        [610, 440],
        [610, 560],
      ])
    )
    .attr('stroke', '#B3B3B3')
    .attr('stroke-width', 2)
    .attr('fill', '#EEEEEE')
    .attr('stroke-linejoin', 'bevel');
  //lock wall
  self.svgContainer
    .select('g.lock')
    .append('path')
    .attr(
      'd',
      self.straightLine([
        [830, 560],
        [850, 560],
        [850, 130],
        [880, 130],
        [880, 560],
        [990, 560],
        [990, 590],
        [830, 590],
      ])
    )
    .attr('stroke', '#B3B3B3')
    .attr('stroke-width', 2)
    .attr('fill', '#B3B3B3');
  self.svgContainer
    .select('g.lock')
    .append('path')
    .attr(
      'd',
      self.straightLine([
        [795, 560],
        [805, 560],
        [805, 590],
        [795, 590],
      ])
    )
    .attr('stroke', '#B3B3B3')
    .attr('stroke-width', 2)
    .attr('fill', '#B3B3B3');
  //create water flowing off to right side of screen
  self.svgContainer
    .select('g.lock')
    .append('path')
    .attr(
      'd',
      self.straightLine([
        [880, 560],
        [880, 510],
        [1210, 510],
        [1210, 560],
      ])
    )
    .attr('fill', '#82B8DC');
};

BasinStreamService.prototype.createTurbine = function () {
  var self = this;
  //create top part of turbine
  self.svgContainer
    .append('g')
    .attr('class', 'turbine')
    .append('path')
    .attr(
      'd',
      self.straightLine([
        [565, 440],
        [565, 430],
        [575, 430],
        [575, 425],
        [595, 425],
        [595, 430],
        [605, 430],
        [605, 440],
        [590, 440],
        [590, 540],
        [580, 540],
        [580, 440],
      ])
    )
    .attr('stroke', '#606063')
    .attr('stroke-width', 2)
    .attr('fill', '#606063');
  //create circular part of turbine
  self.svgContainer
    .select('g.turbine')
    .append('path')
    .attr(
      'd',
      self.curvedLine([
        [580, 540],
        [560, 560],
        [570, 570],
        [600, 570],
        [610, 560],
        [590, 540],
      ])
    )
    .attr('stroke', '#606063')
    .attr('stroke-width', 2)
    .attr('fill', '#606063');
  //create bottom part of turbine
  self.svgContainer
    .select('g.turbine')
    .append('path')
    .attr(
      'd',
      self.straightLine([
        [580, 590],
        [580, 575],
        [583, 575],
        [583, 560],
        [587, 560],
        [587, 575],
        [590, 575],
        [590, 575],
        [590, 590],
      ])
    )
    .attr('stroke', '#606063')
    .attr('stroke-width', 2)
    .attr('fill', '#606063');
  //create turbine propeller part 1
  self.svgContainer
    .select('g.turbine')
    .append('path')
    .attr(
      'd',
      self.curvedLine([
        [575, 595],
        [580, 598],
        [590, 592],
        [595, 595],
        [590, 598],
        [580, 592],
        [575, 595],
      ])
    )
    .attr('stroke', '#8D8986')
    .attr('stroke-width', 2)
    .attr('fill', '#8D8986');
  //create turbine propeller part 2
  self.svgContainer
    .select('g.turbine')
    .append('path')
    .attr(
      'd',
      self.straightLine([
        [584, 590],
        [586, 590],
        [586, 600],
        [586, 600],
        [584, 600],
        [584, 600],
      ])
    )
    .attr('stroke', '#221E1F')
    .attr('stroke-width', 2)
    .attr('fill', '#221E1F');
};

BasinStreamService.prototype.createInflowIcon = function () {
  var self = this;
  //create inflow icon
  self.svgContainer
    .append('g')
    .attr('class', 'inflowIcon')
    .append('circle')
    .attr('r', 25)
    .attr('cx', 320)
    .attr('cy', 60)
    .attr('fill', '#66AAD7');
  self.svgContainer
    .select('g.inflowIcon')
    .append('path')
    .attr(
      'd',
      self.straightLine([
        [315, 70],
        [315, 100],
        [300, 100],
        [320, 120],
        [340, 100],
        [325, 100],
        [325, 70],
      ])
    )
    .attr('fill', '#66AAD7');
  self.svgContainer
    .select('g.inflowIcon')
    .append('path')
    .attr(
      'd',
      self.straightLine([
        [60, 58],
        [320, 58],
        [320, 65],
        [60, 65],
      ])
    )
    .attr('fill', '#66AAD7');
  self.svgContainer
    .select('g.inflowIcon')
    .append('text')
    .attr('text-anchor', 'middle')
    .attr('dx', 320)
    .attr('dy', 67)
    .attr('fill', '#fff')
    .attr('font-family', 'sans-serif')
    .text('IN');
};

BasinStreamService.prototype.createOutflowIcon = function (mode) {
  var self = this;
  //create outflow icon
  self.svgContainer
    .append('g')
    .attr('class', 'outflowIcon')
    .append('circle')
    .attr('r', 25)
    .attr('cx', self.shapes.outflowCircle[mode].x)
    .attr('cy', self.shapes.outflowCircle[mode].y)
    .attr('fill', '#0F4868');
  self.svgContainer
    .select('g.outflowIcon')
    .append('path')
    .attr('d', self.straightLine(self.shapes.outflowArrow[mode])) //outflow icon for lock
    .attr('fill', '#0F4868');
  self.svgContainer
    .select('g.outflowIcon')
    .append('text')
    .attr('text-anchor', 'middle')
    .attr('dx', self.shapes.outflowCircle[mode].x)
    .attr('dy', self.shapes.outflowCircle[mode].y + 5)
    .attr('fill', '#fff')
    .attr('font-family', 'sans-serif')
    .text('OUT');
};

BasinStreamService.prototype.createSurchargeIcon = function () {
  var self = this;
  //create inflow icon
  self.svgContainer
    .append('g')
    .attr('class', 'surchargeIcon')
    .append('circle')
    .attr('r', 25)
    .attr('cx', 570)
    .attr('cy', 120)
    .attr('fill', '#66AAD7');
  self.svgContainer
    .select('g.surchargeIcon')
    .append('path')
    .attr(
      'd',
      self.straightLine([
        [565, 130],
        [565, 160],
        [550, 160],
        [570, 180],
        [590, 160],
        [575, 160],
        [575, 130],
      ])
    )
    .attr('fill', '#66AAD7');
  self.svgContainer
    .select('g.surchargeIcon')
    .append('text')
    .attr('text-anchor', 'middle')
    .attr('dx', 570)
    .attr('dy', 126)
    .attr('fill', '#fff')
    .attr('font-family', 'sans-serif')
    .text('SUR');
};

BasinStreamService.prototype.createLegend = function () {
  var self = this;
  //create legend header
  self.svgContainer
    .append('g')
    .attr('class', 'legend')
    .append('text')
    .attr('dx', 1020)
    .attr('dy', 60)
    .attr('font-family', 'sans-serif')
    .attr('font-size', '1.5em')
    .text('Legend');
  self.svgContainer
    .select('g.legend')
    .append('path')
    .attr(
      'd',
      self.straightLine([
        [1010, 70],
        [1220, 70],
      ])
    )
    .attr('stroke', '#B3B3B3')
    .attr('fill', '#B3B3B3')
    .attr('stroke-width', 3);
  //create lake level icon
  self.svgContainer
    .select('g.legend')
    .append('path')
    .attr(
      'd',
      self.straightLine([
        [1010, 90],
        [1010, 80],
        [1020, 80],
        [1020, 90],
        [1010, 90],
      ])
    )
    .attr('fill', '#DCF1F9')
    .attr('stroke', '#B3B3B3')
    .attr('stroke-width', 1);
  self.svgContainer
    .select('g.legend')
    .append('text')
    .attr('dx', 1030)
    .attr('dy', 90)
    .attr('font-family', 'sans-serif')
    .text('Current Lake Level');
  //create tail water icon
  self.svgContainer
    .select('g.legend')
    .append('path')
    .attr(
      'd',
      self.straightLine([
        [1010, 100],
        [1010, 110],
        [1020, 110],
        [1020, 100],
        [1010, 100],
      ])
    )
    .attr('fill', '#83BADF')
    .attr('stroke', '#B3B3B3')
    .attr('stroke-width', 1);
  self.svgContainer
    .select('g.legend')
    .append('text')
    .attr('dx', 1030)
    .attr('dy', 110)
    .attr('font-family', 'sans-serif')
    .text('Tail Water');
  //create inflow icon
  self.svgContainer
    .select('g.legend')
    .append('circle')
    .attr('r', 12)
    .attr('cx', 1015)
    .attr('cy', 130)
    .attr('fill', '#66AAD7');
  self.svgContainer
    .select('g.legend')
    .append('text')
    .attr('dx', 1009)
    .attr('dy', 134)
    .attr('font-family', 'sans-serif')
    .attr('fill', '#fff')
    .attr('font-size', '12px')
    .text('IN');
  self.svgContainer
    .select('g.legend')
    .append('text')
    .attr('dx', 1030)
    .attr('dy', 135)
    .attr('font-family', 'sans-serif')
    .text('Inflow');
  //create surcharge icon
  self.svgContainer
    .select('g.legend')
    .append('circle')
    .attr('r', 12)
    .attr('cx', 1015)
    .attr('cy', 160)
    .attr('fill', '#66AAD7');
  self.svgContainer
    .select('g.legend')
    .append('text')
    .attr('dx', 1005)
    .attr('dy', 164)
    .attr('font-family', 'sans-serif')
    .attr('fill', '#fff')
    .attr('font-size', '10px')
    .text('SUR');
  self.svgContainer
    .select('g.legend')
    .append('text')
    .attr('dx', 1030)
    .attr('dy', 165)
    .attr('font-family', 'sans-serif')
    .text('Surcharge Release');
  //create outflow icon
  self.svgContainer
    .select('g.legend')
    .append('circle')
    .attr('r', 12)
    .attr('cx', 1015)
    .attr('cy', 190)
    .attr('fill', '#0F4868');
  self.svgContainer
    .select('g.legend')
    .append('text')
    .attr('dx', 1005)
    .attr('dy', 194)
    .attr('font-family', 'sans-serif')
    .attr('fill', '#fff')
    .attr('font-size', '10px')
    .text('OUT');
  self.svgContainer
    .select('g.legend')
    .append('text')
    .attr('dx', 1030)
    .attr('dy', 195)
    .attr('font-family', 'sans-serif')
    .text('Outflow');
};

BasinStreamService.prototype.drawMountain = function () {
  var self = this;
  //draw mountain
  self.svgContainer
    .append('g')
    .attr('class', 'mountain')
    .append('path')
    .attr(
      'd',
      self.straightLine([
        [10, 100],
        [20, 60],
        [35, 45],
        [40, 35],
        [60, 25],
        [75, 65],
        [90, 70],
        [110, 100],
      ])
    )
    .attr('stroke', '#B3B3B3')
    .attr('stroke-width', 2)
    .attr('fill', '#B3B3B3');
  //draw mountain accent 1
  self.svgContainer
    .select('g.mountain')
    .append('path')
    .attr(
      'd',
      self.straightLine([
        [20, 100],
        [25, 90],
        [22, 75],
        [30, 55],
        [27, 75],
        [40, 90],
        [40, 100],
      ])
    )
    .attr('fill', '#58595D');
  //draw mountain accent 2
  self.svgContainer
    .select('g.mountain')
    .append('path')
    .attr(
      'd',
      self.straightLine([
        [60, 72],
        [95, 100],
        [85, 100],
        [70, 90],
        [65, 92],
      ])
    )
    .attr('fill', '#58595D');
  // draw mountain accent 3
  self.svgContainer
    .select('g.mountain')
    .append('path')
    .attr(
      'd',
      self.straightLine([
        [60, 60],
        [55, 40],
        [63, 55],
        [62, 57],
        [70, 65],
      ])
    )
    .attr('fill', '#58595D');
};

BasinStreamService.prototype.drawBoat = function () {
  var self = this;
  var translateStr;
  //draw boat
  self.svgContainer
    .append('g')
    .attr('class', 'boat')
    .append('path')
    .attr(
      'd',
      self.straightLine([
        [540, 345],
        [530, 340],
        [500, 340],
        [525, 370],
        [645, 370],
        [655, 340],
        [640, 340],
        [635, 345],
        [630, 345],
        [630, 335],
        [627, 335],
        [627, 330],
        [622, 330],
        [622, 320],
        [612, 320],
        [612, 330],
        [602, 330],
        [602, 335],
        [598, 335],
        [598, 345],
      ])
    )
    .attr('fill', '#58595D');
  //create windows on boat
  for (var i = 0; i < 4; i++) {
    translateStr = 'translate(' + (601 + 7 * i) + ',339)';
    self.svgContainer
      .select('g.boat')
      .append('path')
      .attr('d', self.createBox(5, 3))
      .attr('transform', translateStr)
      .attr('fill', '#fff');
  }
  self.svgContainer
    .select('g.boat')
    .append('path')
    .attr('d', self.createBox(6, 3))
    .attr('transform', 'translate(605, 332)')
    .attr('fill', '#fff');
  //create containers on boat
  for (i = 0; i < 3; i++) {
    translateStr = 'translate(' + (540 + 18 * i) + ',332)';
    //create box for container
    self.svgContainer
      .select('g.boat')
      .append('path')
      .attr('d', self.createBox(15, 12))
      .attr('fill', '#58595D')
      .attr('transform', translateStr);
    //split boxes (container) into ninths
    for (var j = 0; j < 2; j++) {
      var translateStr2 =
        'translate(' + (540 + 18 * i) + ',' + (336 + j * 4) + ')';
      var translateStr3 = 'translate(' + (545 + 18 * i + 5 * j) + ',332)';
      self.svgContainer
        .select('g.boat')
        .append('path')
        .attr(
          'd',
          self.straightLine([
            [0, 0],
            [15, 0],
          ])
        )
        .attr('stroke', '#EEEEEE')
        .attr('stroke-width', 1)
        .attr('transform', translateStr2);
      self.svgContainer
        .select('g.boat')
        .append('path')
        .attr(
          'd',
          self.straightLine([
            [0, 0],
            [0, 12],
          ])
        )
        .attr('stroke', '#EEEEEE')
        .attr('stroke-width', 1)
        .attr('transform', translateStr3);
    }
  }
  self.svgContainer.select('g.boat').attr('transform', 'translate(130, 0)');
};

BasinStreamService.prototype.createBox = function (width, height) {
  return this.straightLine([
    [0, 0],
    [width, 0],
    [width, height],
    [0, height],
  ]);
};
