"use strict";

var canvas;
var gl;

var maxNumTriangles = 200;
var maxNumVertices  = 3 * maxNumTriangles;
var index = 0;

var primitives = [];

var colorPicker;

var colors = [
    vec4( 0.0, 0.0, 0.0, 1.0 ),  // black
    vec4( 1.0, 1.0, 1.0, 1.0 ), //white
    vec4( 1.0, 0.0, 0.0, 1.0 ),  // red
    vec4( 1.0, 1.0, 0.0, 1.0 ),  // yellow
    vec4( 0.0, 1.0, 0.0, 1.0 ),  // green
    vec4( 0.0, 0.0, 1.0, 1.0 ),  // blue
    vec4( 1.0, 0.0, 1.0, 1.0 ),  // magenta
    vec4( 0.0, 1.0, 1.0, 1.0 )   // cyan
];

var drawing_mode=0;
const point = 0; //point primitive position in the primitives array

window.onload = function init() {
    canvas = document.getElementById( "gl-canvas" );

    colorPicker = document.getElementById( "colorPicker" );

    colorPicker.addEventListener("change", changeColor, false);


    gl = WebGLUtils.setupWebGL( canvas );

    if ( !gl ) { alert( "WebGL isn't available" ); }

	var slider = document.getElementById("slider_point_size");
	
	slider.oninput = function() {
		primitives[point].changeSize(this.value);
	} 
	
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

    
    primitives.push(new Point(200,gl, colors[1], slider.value, program));
    primitives.push(new Line(200,gl, colors[1], program, "default"));
    primitives.push(new Triangle(200,gl, colors[1], program, "default"));
    primitives.push(new Line(200,gl, colors[1], program, "strip"));
    primitives.push(new Line(200,gl, colors[1], program, "loop"));
    primitives.push(new Triangle(200,gl, colors[1], program, "strip"));
    primitives.push(new Triangle(200,gl, colors[1], program, "fan"));


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
function line2_func(){
    drawing_mode = 3;
}
function line3_func(){
    drawing_mode = 4;
}
function triangle2_func(){
    drawing_mode = 5;
}
function triangle3_func(){
    drawing_mode = 6;
}

function reset(){
	for(var i = 0; i<primitives.length; i++){
        primitives[i].reset();
    }
}


function changeColor(event){
    var cObj = w3color(event.target.value);
    
    let r = cObj.red/255;
    let g = cObj.green/255;
    let b = cObj.blue/255;
    let o = cObj.opacity;



    for(var i = 0; i<primitives.length; i++){
        primitives[i].changeColor(r, g, b, o);
    }


    console.log(r, g, b, o);
        
}