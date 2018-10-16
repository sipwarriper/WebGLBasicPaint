"use strict";

var canvas;
var gl;

var maxNumTriangles = 200;
var maxNumVertices  = 3 * maxNumTriangles;
var index = 0;

var primitives = [];

var p1;
var p2;

var colors = [
    vec4( 0.0, 0.0, 0.0, 1.0 ),  // black
    vec4( 1.0, 0.0, 0.0, 1.0 ),  // red
    vec4( 1.0, 1.0, 0.0, 1.0 ),  // yellow
    vec4( 0.0, 1.0, 0.0, 1.0 ),  // green
    vec4( 0.0, 0.0, 1.0, 1.0 ),  // blue
    vec4( 1.0, 0.0, 1.0, 1.0 ),  // magenta
    vec4( 0.0, 1.0, 1.0, 1.0 )   // cyan
];

var drawing_mode=0;

window.onload = function init() {
    canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );

    if ( !gl ) { alert( "WebGL isn't available" ); }

    canvas.addEventListener("mousedown", function(event){



        var x = 2*event.clientX/canvas.width-1;
        var y = 2*(canvas.height-event.clientY)/canvas.height-1;
        
        primitives[drawing_mode].add(x,y);
        
    } );

    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0.5, 0.5, 0.5, 1.0 );

    // Load shaders and initialize attribute buffers
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    
    primitives.push(new Point(200,gl, colors[1], 10.0, program));
    primitives.push(new Line(200,gl, colors[1], program, "default"));
    primitives.push(new Triangle(200,gl, colors[1], program, "default"));
    
    


    render();
}

function render() {

    gl.clear( gl.COLOR_BUFFER_BIT );
    for(var i = 0; i<primitives.length; i++){
        primitives[i].draw();
    }

    //console.log("hola");
    window.requestAnimFrame(render);
}

function point_func(){
    drawing_mode = 0;
}

function line_func(){
    drawing_mode = 1;
}

function triangle_func(){
    drawing_mode = 2;
}