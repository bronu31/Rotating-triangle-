/// <reference path="typings/gl-matrix/gl-matrix.d.ts" />
'use strict';

const canvas = document.createElement('canvas');
canvas.setAttribute('width', '600px');
canvas.setAttribute('height', '400px');
document.body.appendChild(canvas);

//const gl = canvas.getContext('experimental-webgl');
const gl = canvas.getContext('webgl');

const vshader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vshader, document.getElementById('shader-vs').textContent);
gl.compileShader(vshader);

const fshader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fshader, document.getElementById('shader-fs').textContent);
gl.compileShader(fshader);

const program = gl.createProgram();
gl.attachShader(program, vshader);
gl.attachShader(program, fshader);
gl.linkProgram(program);

const vertexBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
    0.0,  1.0,  0.0,
   -1.0, -1.0,  0.0,
    1.0, -1.0,  0.0
]), gl.STATIC_DRAW);

const mvMatrix:any = mat4.create();
const pMatrix:any = mat4.create();
mat4.perspective(pMatrix, 45, 600 / 400, 0.1, 100.0);
mat4.identity(mvMatrix);
mat4.translate(mvMatrix, mvMatrix, [0.0, 0.0, -7.0]);

const aVertexPosition = gl.getAttribLocation(program, "aVertexPosition") ;
gl.enableVertexAttribArray(aVertexPosition);



gl.useProgram(program);

console.log(mvMatrix);
let rot=mat4.create();
let x=30;
function render() {

gl.clearColor(1.0, 0.0, 0.0, 0.5);
gl.enable(gl.DEPTH_TEST);

mat4.rotate(mvMatrix,mvMatrix,glMatrix.toRadian(1),[0,1,0]);
gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  gl.uniformMatrix4fv(gl.getUniformLocation(program, "uMVMatrix"), false, mvMatrix);
gl.uniformMatrix4fv(gl.getUniformLocation(program, "uPMatrix"), false, pMatrix);
gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
gl.vertexAttribPointer(aVertexPosition, 3, gl.FLOAT, false, 0, 0);
gl.drawArrays(gl.TRIANGLES, 0, 3);
  window.requestAnimationFrame(render);
} 
render();