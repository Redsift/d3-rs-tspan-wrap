import { select } from 'd3-selection';

export default function text(id) {
  var classed = 'tspan-wrap', 
      split = /\s+/, 
      join = ' ', 
      width = 0,
      spacing = 0,
      lineHeight = 0;

  function _impl(context) {
    var selection = context.selection ? context.selection() : context;

    selection.each(function(data) {
      var text = d3.select(this),
            words = text.text().split(split).reverse(),
            word,
            line = [],
            spans = [],
            dy = 0,
            x = text.attr('x'),
            y = text.attr('y'),
            w = text.attr('width'),
            h = text.attr('height'),     
            tspan = text.text(null).append('tspan').attr('class', classed);
        
        if (x == null) {
          x = 0;
        }
        
        if (y == null) {
          y = 0;
        }
        
        if (w != null) {
            w = parseInt(w);
        } else {
            w = width;
        }

        if (h != null) {
            h = parseInt(h);
        }

        while (word = words.pop()) {
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
            
            if (len > w) {
                var popped = line.pop();
                if (line.length === 0) {
                    line = [ popped ];
                    word = null;
                }
                
                tspan.attr('x', x).attr('y', y);

                // update the dy later to keep the BBox predictable
                spans.push([tspan, dy]);

                var height = lineHeight;
                if (lineHeight === 0) {
                  height = tspan.node().getBBox().height;
                }
                
                dy = dy + height;
                
                var txt = line.join(join);
                if (word !== null) {
                    line = [ word ];
                } else {
                    line = [];
                }
                
                if (h != null && dy > h) {
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
        }

        // this workaround is due to odd behaviour with getBBox and the height
        spans.forEach(function (d) {
            d[0].attr('dy', d[1]);
        });
    });
  }
  
  _impl.self = function() { return 'g' + (id ?  '#' + id : '.' + classed); }

  _impl.id = function() {
    return id;
  };
    
  _impl.classed = function(value) {
    return arguments.length ? (classed = value, _impl) : classed;
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
