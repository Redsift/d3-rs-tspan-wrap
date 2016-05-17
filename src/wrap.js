import { select } from 'd3-selection';

export default function text(id) {
  var classed = 'tspan-wrap', 
      split = /\s+/, 
      join = ' ', 
      xPos = 0,
      yPos = 0,
      width = 0,
      height = 0,
      spacing = 0,
      lineHeight = 0;

  function _impl(context) {
    var selection = context.selection ? context.selection() : context;
    var tdy = 0;
    
    selection.each(function(data) {
      
      var text = select(this), 
          toWrap = data, 
          x = xPos, 
          y = yPos,
          w = width, 
          h = height;
      var tx = text.attr('x');
      var ty = text.attr('y');
      var tw = text.attr('width');
      var th = text.attr('height');
      
      x = (tx === null) ? x : parseInt(tx);
      y = (ty === null) ? y : parseInt(ty);
      w = (tw === null) ? w : parseInt(tw);
      h = (th === null) ? h : parseInt(th);      
      
      if (toWrap == null) {
        toWrap = text.text();
      }
      
      var words = toWrap.split(split).reverse(),
            word,
            line = [],
            spans = [],
            dy = 0,
            tspan = text.text(null).append('tspan').attr('class', classed);

        while ((word = words.pop())) {
            line.push(word);
            var option = line.join(join);
            tspan.text(option);
            
            var len = 0;
            
            if (spacing !== 0) {
              // if tspan.node().getComputedTextLength() does not work, we need a hardcode
              len = option.length * spacing;
            } else {
              len = tspan.node().getComputedTextLength(); 
            }
            
            if (w > 0 && len > w) {
                var popped = line.pop();
                if (line.length === 0) {
                    line = [ popped ];
                    word = null;
                }
                
                tspan.attr('x', x).attr('y', y);

                // update the dy later to keep the BBox predictable
                spans.push([tspan, dy]);

                var lh = lineHeight;
                if (lineHeight === 0) {
                  lh = tspan.node().getBBox().height;
                }
                
                dy = dy + lh;
                
                var txt = line.join(join);
                if (word !== null) {
                    line = [ word ];
                } else {
                    line = [];
                }
                
                if (h > 0 && dy > h) {
                    tspan.text(txt + '…');
                    tspan = null;
                    line = [];
                    break;
                } else {
                    tspan.text(txt);
                    tspan = text.append('tspan').text(null).attr('class', classed);
                }
            }
        }
        if (line.length !== 0) {
            tspan.text(line.join(join));
            tspan.attr('x', x).attr('y', y);
            spans.push([tspan, dy]);
            
            lh = lineHeight;
            if (lineHeight === 0) {
              lh = tspan.node().getBBox().height;
            }
            
            dy = dy + lh;
        }

        if (spans.length > 0) {
          // this workaround is due to odd behaviour with getBBox and the height
          spans.forEach(function (d) {
              d[0].attr('dy', d[1] + tdy);
          });
          tdy = tdy + dy;
        }
    });
  }
  
  _impl.self = function() { return 'g' + (id ?  '#' + id : '.' + classed); }

  _impl.id = function() {
    return id;
  };
    
  _impl.classed = function(value) {
    return arguments.length ? (classed = value, _impl) : classed;
  };

  _impl.x = function(value) {
    return arguments.length ? (xPos = value, _impl) : xPos;
  };
  
  _impl.y = function(value) {
    return arguments.length ? (yPos = value, _impl) : yPos;
  };

  _impl.height = function(value) {
    return arguments.length ? (height = value, _impl) : height;
  };

  _impl.width = function(value) {
    return arguments.length ? (width = value, _impl) : width;
  };
  
  _impl.split = function(value) {
    return arguments.length ? (split = value, _impl) : split;
  };

  _impl.join = function(value) {
    return arguments.length ? (join = value, _impl) : join;
  };  

  _impl.spacing = function(value) {
    return arguments.length ? (spacing = value, _impl) : spacing;
  };   
  
  _impl.lineHeight = function(value) {
    return arguments.length ? (lineHeight = value, _impl) : lineHeight;
  };  
  
  return _impl;
}