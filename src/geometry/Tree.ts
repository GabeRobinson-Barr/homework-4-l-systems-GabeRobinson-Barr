import {vec3, vec4} from 'gl-matrix';
import Drawable from '../rendering/gl/Drawable';
import {gl} from '../globals';

class Tree extends Drawable {
    indices: Uint32Array;
    positions: Float32Array;
    normals: Float32Array;
    //center: vec4;

    constructor() {
        super();
        //this.center = vec4.fromValues(center[0], center[1], center[2], 1);
        this.positions = new Float32Array([]);
        this.normals = new Float32Array([]);
        this.indices = new Uint32Array([]);

    }

    static createBranchPos(): number[] {
        let center = vec3.fromValues(0,0,0);
        // Side length of 1
        let offset = 0.5;

        // Create the positions for the cube
        let branchPos = [center[0] - offset, center[1] - offset, center[2] - offset, 1, // -Z face
                                        center[0] + offset, center[1] - offset, center[2] - offset, 1,
                                        center[0] + offset, center[1] + offset, center[2] - offset, 1,
                                        center[0] - offset, center[1] + offset, center[2] - offset, 1,

                                        center[0] + offset, center[1] - offset, center[2] + offset, 1, // +Z face
                                        center[0] - offset, center[1] - offset, center[2] + offset, 1,
                                        center[0] - offset, center[1] + offset, center[2] + offset, 1,
                                        center[0] + offset, center[1] + offset, center[2] + offset, 1,

                                        center[0] - offset, center[1] - offset, center[2] + offset, 1, // -X face
                                        center[0] - offset, center[1] - offset, center[2] - offset, 1,
                                        center[0] - offset, center[1] + offset, center[2] - offset, 1,
                                        center[0] - offset, center[1] + offset, center[2] + offset, 1,

                                        center[0] + offset, center[1] - offset, center[2] - offset, 1, // +X face
                                        center[0] + offset, center[1] - offset, center[2] + offset, 1,
                                        center[0] + offset, center[1] + offset, center[2] + offset, 1,
                                        center[0] + offset, center[1] + offset, center[2] - offset, 1,

                                        center[0] - offset, center[1] - offset, center[2] + offset, 1, // -Y face
                                        center[0] + offset, center[1] - offset, center[2] + offset, 1,
                                        center[0] + offset, center[1] - offset, center[2] - offset, 1,
                                        center[0] - offset, center[1] - offset, center[2] - offset, 1,

                                        center[0] - offset, center[1] + offset, center[2] - offset, 1, // +Y face
                                        center[0] + offset, center[1] + offset, center[2] - offset, 1,
                                        center[0] + offset, center[1] + offset, center[2] + offset, 1,
                                        center[0] - offset, center[1] + offset, center[2] + offset, 1];

        return branchPos;
    }

    static createBranchNor(): number[] {

        let branchNor = [0, 0, -1.0, 1,
                                        0, 0, -1.0, 1,
                                        0, 0, -1.0, 1,
                                        0, 0, -1.0, 1,
                                    
                                        0, 0, 1.0, 1,
                                        0, 0, 1.0, 1,
                                        0, 0, 1.0, 1,
                                        0, 0, 1.0, 1,

                                        -1, 0, 0, 1,
                                        -1, 0, 0, 1,
                                        -1, 0, 0, 1,
                                        -1, 0, 0, 1,

                                        1, 0, 0, 1,
                                        1, 0, 0, 1,
                                        1, 0, 0, 1,
                                        1, 0, 0, 1,

                                        0, -1, 0, 1,
                                        0, -1, 0, 1,
                                        0, -1, 0, 1,
                                        0, -1, 0, 1,

                                        0, 1, 0, 1,
                                        0, 1, 0, 1,
                                        0, 1, 0, 1,
                                        0, 1, 0, 1,];

        return branchNor;
    }

    createIdx() {
        let vertNum = this.positions.length / 4;
        let branchIdx: number[] = [];
        let idx = 0;

        for (let i = 0; i < vertNum; i += 4) {
            branchIdx[idx] = i;
            branchIdx[idx + 1] = i + 1;
            branchIdx[idx + 2] = i + 2;

            branchIdx[idx + 3] = i;
            branchIdx[idx + 4] = i + 2;
            branchIdx[idx + 5] = i + 3;
            idx = idx + 6;
        }

        this.indices = new Uint32Array(branchIdx);
    }

    createTree(pos: number[], nor: number[]) {
        this.positions = new Float32Array(pos);
        this.normals = new Float32Array(nor);
        this.createIdx();

        this.create();
    }

    create() {

        this.generateIdx();
        this.generatePos();
        this.generateNor();

        this.count = this.indices.length;
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.bufIdx);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.indices, gl.STATIC_DRAW);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.bufNor);
        gl.bufferData(gl.ARRAY_BUFFER, this.normals, gl.STATIC_DRAW);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.bufPos);
        gl.bufferData(gl.ARRAY_BUFFER, this.positions, gl.STATIC_DRAW);

        console.log(`Created Tree`);
    }


};

export default Tree;