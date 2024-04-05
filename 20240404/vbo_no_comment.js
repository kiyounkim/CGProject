function showTriangle() {
    
    const canvas = document.getElementById('demo-canvas');
    const gl = canvas.getContext('webgl2');
    if (!gl) {
        const isWebGl1Supported = !!(document.createElement('canvas')).getContext('webgl');
        if (isWebGl1Supported) {
            showError('WebGL 1 is supported, but not v2 - try using a different device or browser');
        } 
        else {
            showError('WebGL is not supported on this device - try using a different device or browser');
        }
        return;
    }
    
    const vertexShaderSourceCode = `#version 300 es
    precision mediump float;

    in vec3 vertexPosition;

    void main() {
        gl_Position = vec4(vertexPosition, 1.0);
    }`;

    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertexShaderSourceCode);
    gl.compileShader(vertexShader);
    if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
        const errorMessage = gl.getShaderInfoLog(vertexShader);
        showError(`Failed to compile vertex shader: ${errorMessage}`);
        return;
    }
    const fragmentShaderSourceCode = `#version 300 es
    precision mediump float;

    out vec4 outputColor;

    void main() {
        outputColor = vec4(0.294, 0.0, 0.51, 1.0);
    }`;

    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragmentShaderSourceCode);
    gl.compileShader(fragmentShader);
    if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
        const errorMessage = gl.getShaderInfoLog(fragmentShader);
        showError(`Failed to compile fragment shader: ${errorMessage}`);
        return;
    }
    //When using WebGL, we alwys combine Vertex and Fragment shaders together
    const TriangleProgram = gl.createProgram();
    gl.attachShader(TriangleProgram, vertexShader);
    gl.attachShader(TriangleProgram, fragmentShader);
    gl.linkProgram(TriangleProgram);
    if (!gl.getProgramParameter(TriangleProgram, gl.LINK_STATUS)) {
        const errorMessage = gl.getProgramInfoLog(TriangleProgram);
        showError(`Failed to link GPU program: ${errorMessage}`);
        return;
    }
    
    const vertices = new Float32Array([
        -0.9, -0.9, 0.0,
        0.85, -0.9, 0.0,
        -0.9, 0.85, 0.0,
    ]);

    //Create a Buffer Object containting the vertices thus names"Vertex Buffer Object" in OpenGL
    const vbo = gl.createBuffer();

    //Binding the data means to set the ata so that it can be used by the GPU
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    //Attribute location allow us to talk about whihc shaer input should read from 
    //whichGPU buffer in the later "vertexAttribPonter" call.
    const vertexPositionAttributeLocation = gl.getAttribLocation(TriangleProgram, 'vertexPosition');
    if (vertexPositionAttributeLocation < 0) {
        showError(`Failed to get attribute location for vertexPosition`);
        return;
    }

    //Set up GPU program
    gl.useProgram(TriangleProgram);
    gl.enableVertexAttribArray(vertexPositionAttributeLocation);
    
    //Input assembler(how to read the data from the buffer)
    gl.vertexAttribPointer( vertexPositionAttributeLocation, /* Index vertex attribute position */
        3, /*size*/
        gl.FLOAT, /* */
        false, /* */
        3* Float32Array.BYTES_PER_ELEMENT, /* */
        0);
    //Output merger
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    gl.clearColor(0.08, 0.08, 0.08, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    //Rasterizer
    gl.viewport(0, 0, canvas.width, canvas.height);
    //Draw call
    gl.drawArrays(gl.TRIANGLES, 0, 3);
}
try {
  showTriangle();
} 
catch (e) {
  showError(`Uncaught JavaScript exception: ${e}`);
}


