var tape = require("@redsift/tape-reel")("<div id='test'></div>"),
    svg = require("@redsift/d3-rs-svg"),
    d3 = require("d3-selection"),
    text = require("../");

var lore = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In in felis egestas, ultricies arcu quis, ullamcorper lectus. Etiam non magna vel lorem pharetra scelerisque ut in augue. Curabitur ut neque nec risus laoreet convallis eget efficitur nunc. Nam vel aliquam diam. Mauris eu mauris ultrices, ullamcorper leo id, cursus enim. Nulla eu dui quis orci blandit tempus in quis mauris. Phasellus elit sapien, faucibus ac tempor vitae, feugiat sit amet eros. Proin egestas lacus volutpat dolor elementum consequat. Fusce commodo libero at auctor mollis. Proin id ultrices libero.';

tape("text() generates 1 tspan", function(t) {
    var host = svg.html();
    var el = d3.select('#test').call(host).select(host.self()).select(host.child());
    var textElm = el.append('text');
    
    textElm.text(lore);

    var wrap = text.text().lineHeight(20).spacing(3);
    textElm.call(wrap);
    
    t.equal(textElm.selectAll('tspan').size(), 1);    
    t.equal(textElm.text(), lore);    

    t.end();
});   


tape("text() generates 2 tspan", function(t) {
    t.plan(3);
    
    var host = svg.html();
    var el = d3.select('#test').call(host).select(host.self()).select(host.child());
    var textElm = el.append('text');
    
    textElm.text(lore);
    
    var lh = 20;
    
    var wrap = text.text().lineHeight(lh).spacing(3).width(1000);
    textElm.call(wrap);
    
    t.equal(textElm.selectAll('tspan').size(), 2);    

    textElm.selectAll('tspan').each(function (d, i) {
        var node = d3.select(this);
        t.equal(parseInt(node.attr('dy')), i*lh);
    });
});   


tape("text() generates 2 tspan with data", function(t) {
    t.plan(5);
    
    var host = svg.html();
    var el = d3.select('#test').call(host).select(host.self()).select(host.child());
    var textElm = el.append('text').data([ lore ]);
    
    var lh = 20;
    
    var wrap = text.text().lineHeight(lh).spacing(3).width(1000);
    textElm.call(wrap);
    
    var result = textElm.text();
    
    t.equal(textElm.selectAll('tspan').size(), 2);    

    textElm.selectAll('tspan').each(function (d, i) {
        var node = d3.select(this);
        t.equal(parseInt(node.attr('dy')), i*lh);
    });
    
    // should be invariant
    textElm.call(wrap);
    
    t.equal(textElm.selectAll('tspan').size(), 2);    
    t.equal(textElm.text(), result);    
}); 