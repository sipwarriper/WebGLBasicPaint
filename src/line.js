class Line{
    constructor(MaxElements, gl, initialColor, program, linetype){
      this.MaxVertexs = MaxElements*2;
      this.gl=gl;
      this.program=program;
      this.currentColor=flatten(initialColor);
      this.index=0;
      this.type=linetype;
      //buffer with the positions
      this.vertexBuffer=gl.createBuffer();
      gl.bindBuffer( gl.ARRAY_BUFFER, this.vertexBuffer );
      gl.bufferData( gl.ARRAY_BUFFER,this.MaxVertexs*8, gl.STATIC_DRAW );
      
      //buffer with the colors
      this.colorBuffer=gl.createBuffer();
      gl.bindBuffer( gl.ARRAY_BUFFER, this.colorBuffer );
      gl.bufferData( gl.ARRAY_BUFFER,this.MaxVertexs*16, gl.STATIC_DRAW );  
    }

    add(x, y){
        let pos = vec2(x,y);
        gl.bindBuffer( gl.ARRAY_BUFFER, this.vertexBuffer );
        gl.bufferSubData(gl.ARRAY_BUFFER, 8*index, flatten(pos));

        gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer);
        gl.bufferSubData(gl.ARRAY_BUFFER, 16*index, flatten(this.currentColor));

        index++;

    }

    changeColor(r, g, b, a){
        let newColor = vec4(r,g,b,a);
        this.currentColor=newColor;
    }

    draw(){
        gl.bindBuffer( gl.ARRAY_BUFFER, this.vertexBuffer );
        let vertexPos = gl.getAttribLocation(this.program, "vPosition");
        gl.vertexAttribPointer(vertexPos, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(vertexPos);

        gl.bindBuffer( gl.ARRAY_BUFFER, this.colorBuffer  );
        let vertexColor = gl.getAttribLocation( this.program, "vColor" );
        gl.vertexAttribPointer( vertexColor, 4, gl.FLOAT, false, 0, 0 );
        gl.enableVertexAttribArray( vertexColor );

        switch (this.type){
            case "strip":
                gl.drawArrays( gl.LINE_STRIP, 0, index );
                break;
            case "loop":
                gl.drawArrays( gl.LINE_LOOP, 0, index );
                break;
            default:
                gl.drawArrays( gl.LINES, 0, index );
                break;

        }        
    }    
}