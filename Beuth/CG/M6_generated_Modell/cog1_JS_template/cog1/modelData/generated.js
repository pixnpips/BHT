/**
 * Empty object for groups in scenegraph.
 * 
 * @namespace cog1.data
 * @module empty
 */
define(["exports", "data"], function (exports, data) {
	"use strict";

	/**
	 * Create an instance of the model defined in this module.
	 * 
	 * @parameter object with fields:
	 * @returns instance of this model.
	 */
	exports.create = function (parameter) {
		if (parameter) {
			var scale = parameter.scale;
		}
		// Set default values if parameter is undefined.
		if (scale == undefined) {
			scale = 200;
		}

		function rot(v, a, Achse) {
			let rotvec = [];
			let RotMat;
			let c = Math.cos(a);
			let s = Math.sin(a);

			//console.log(a);
			//console.log (s);
			//console.log (c);

			const RotMatX = [1, 0, 0, 0, c, -s, 0, s, c];
			const RotMatY = [c, 0, s, 0, 1, 0, -s, 0, c];
			const RotMatZ = [c, -s, 0, s, c, 0, 0, 0, 1];

			switch (Achse) {

				case "x":
					RotMat = RotMatX;
					break;
				case "y":
					RotMat = RotMatY;
					break;
				case "z":
					RotMat = RotMatZ;
					break;

			}

			rotvec[0] = v[0] * RotMat[0] + v[1] * RotMat[1] + v[2] * RotMat[2];
			rotvec[1] = v[0] * RotMat[3] + v[1] * RotMat[4] + v[2] * RotMat[5];
			rotvec[2] = v[0] * RotMat[6] + v[1] * RotMat[7] + v[2] * RotMat[8];

			//console.log(v);
			//console.log(rotvec);

			return rotvec;
		}



		function DtoR(degrees) {
			var pi = Math.PI;
			//console.log(" Winkel in Grad: "+degrees);
			return degrees * (pi / 180);

		};


		function Part() {

			// Instance of the model to be returned.
			let instance = {};

			instance.polygonColors = [];

			instance.vertices = [
				[0, 0.1, 0],
				[0.1, 0, 0],
				[0, 0, -1],
				[-0.1, 0, 0],
				[0, 0, 1],
				[0, -0.1, 0]
			];

			instance.polygonVertices = [
				[0, 4, 1],
				[0, 1, 2],
				[0, 2, 3],
				[0, 3, 4],
				[1, 4, 5],
				[2, 1, 5],
				[3, 2, 5],
				[4, 3, 5]
			];

			return instance;
		}


		function generate(a) {

			let instance1 = {};
			let polys = a.polygonVertices;
			let vert = a.vertices;
			const lenvert = vert.length;
			const lenpolys = polys.length;
			const originalVertlen= a.vertices.length;
			


			function createvert(n) {
				let gedrehtX;
				let gedrehtY;
				let Winkel=90;
				
				//console.log(polys);

				
			
				for(let loops=1; loops<=n; loops++){

					for (let i=0; i<lenvert; i++){
						gedrehtX= rot(vert[i+(loops-1)*lenvert], Winkel,"x");
						vert.push(gedrehtX);
					}

					for (let i=0; i<lenvert; i++){
						gedrehtY= rot(vert[i+(loops-1)*lenvert], Winkel,"y");
						vert.push(gedrehtY);
					}
					//console.log(vert);

					Winkel=Winkel/2;
					createPolys(loops);		
				}

				//console.log(vert);
				//console.log(polys);
	
			}


			function createPolys(n) {
			
				for (let i = 0; i< lenpolys; i++) {

					let newPolX=[];
					let newPolY=[];

					for (let j=0; j< polys[i].length;j++){
						newPolX.push(polys[i][j]+(2*n-1)*lenvert);
						newPolY.push(polys[i][j]+2*n*lenvert);
					}
					
					//console.log("New Poly X: "+newPolX);
					//console.log("New Poly Y: "+newPolY);

					polys.push(newPolX);
					polys.push(newPolY);

					//console.log(polys);	
				}
			}


			createvert(10);

			instance1.polygonVertices = polys;
			instance1.vertices = vert;
			instance1.polygonColors = [];

			//console.log(instance1.polygonVertices);
			//console.log(instance1.vertices);

			return instance1;
		}


		function setColors(a) {
			var colAr = [];
			let i = 0;
			let j;
			do {
				for (j = 0; j < 6; j++) {
					colAr.push(j);
					i++;
				} j = 0;
			} while (i < a.polygonVertices.length);
			a.polygonColors = colAr;

			//console.log(colAr);
		}

		let figure = generate(Part(), 2);
		setColors(figure);
		data.applyScale.call(figure, scale);
		return figure;

	};
});