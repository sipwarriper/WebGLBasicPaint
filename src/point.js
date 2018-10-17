class Point{
    constructor(MaxElements, gl, initialColor, initialSize, program){
		this.MaxVertexs = MaxElements;
		this.gl=gl;
		this.program=program;
		this.currentColor=flatten(initialColor);
		this.size=new Float32Array([initialSize]);
		this.index=0;
      
		//buffer with the positions
		this.vertexBuffer=gl.createBuffer();
		gl.bindBuffer( gl.ARRAY_BUFFER, this.vertexBuffer );
		gl.bufferData( gl.ARRAY_BUFFER,this.MaxVertexs*8, gl.STATIC_DRAW );

		//buffer with the colors
		this.colorBuffer=gl.createBuffer();
		gl.bindBuffer( gl.ARRAY_BUFFER, this.colorBuffer );
		gl.bufferData( gl.ARRAY_BUFFER,this.MaxVertexs*16, gl.STATIC_DRAW );

		//buffer with the size off each point
		this.sizeBuffer=gl.createBuffer();
		gl.bindBuffer( gl.ARRAY_BUFFER, this.sizeBuffer );
		gl.bufferData( gl.ARRAY_BUFFER,this.MaxVertexs*4, gl.STATIC_DRAW );  
    }

    add(x, y){
        let pos = vec2(x,y);
        gl.bindBuffer( gl.ARRAY_BUFFER, this.vertexBuffer );
        gl.bufferSubData(gl.ARRAY_BUFFER, 8*index, flatten(pos));

        gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer);
        gl.bufferSubData(gl.ARRAY_BUFFER, 16*index, flatten(this.currentColor));

        gl.bindBuffer(gl.ARRAY_BUFFER, this.sizeBuffer);
        gl.bufferSubData(gl.ARRAY_BUFFER, 4*index, this.size);

        index++;

    }

    changeColor(r, g, b, a){
        let newColor = vec4(r,g,b,a);
        this.currentColor=newColor;
    }

    changeSize(newSize){
        this.size=new Float32Array([newSize]);
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

        gl.bindBuffer( gl.ARRAY_BUFFER, this.sizeBuffer  );
        let vertexSize = gl.getAttribLocation( this.program, "vSize" );
        gl.vertexAttribPointer( vertexSize, 1, gl.FLOAT, false, 0, 0 );
        gl.enableVertexAttribArray( vertexSize );

        gl.drawArrays( gl.POINTS, 0, index );
        
    }
	
	reset(){
		//no és imprescindible...
		gl.deleteBuffer(this.vertexBuffer);
		gl.deleteBuffer(this.colorBuffer);
		gl.deleteBuffer(this.sizeBuffer);
		
		//buffer with the positions
		this.vertexBuffer=gl.createBuffer();
		gl.bindBuffer( gl.ARRAY_BUFFER, this.vertexBuffer );
		gl.bufferData( gl.ARRAY_BUFFER,this.MaxVertexs*8, gl.STATIC_DRAW );

		//buffer with the colors
		this.colorBuffer=gl.createBuffer();
		gl.bindBuffer( gl.ARRAY_BUFFER, this.colorBuffer );
		gl.bufferData( gl.ARRAY_BUFFER,this.MaxVertexs*16, gl.STATIC_DRAW );

		//buffer with the size off each point
		this.sizeBuffer=gl.createBuffer();
		gl.bindBuffer( gl.ARRAY_BUFFER, this.sizeBuffer );
		gl.bufferData( gl.ARRAY_BUFFER,this.MaxVertexs*4, gl.STATIC_DRAW );     
	}

    
}