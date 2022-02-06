/**
 * 
 * Polygon to test scan-line algorithm.
 * 
 * @namespace cog1.data
 * @module diamond
 */
define(["exports", "data"], function(exports, data) {
	"use strict";

	/**
	 * @parameter object with fields:
	 * @parameter scale is the edge length of the cube.
	 * @returns instance of this model.
	 */
	exports.create = function(parameter) {
		if(parameter) {
			var scale = parameter.scale;
		}
		// Set default values if parameter is undefined.
		if(scale == undefined){
			scale = 200;
		}
		
		// Instance of the model to be returned.
		var instance = {};
			
		instance.vertices = [
			[0,0,0],
			[-1,0,0],
			[+1,0,0],
			[0,-1,0],
			[0,+1,0],
			[0,0,-1],
			[0,0,+1]
		];
		instance.polygonVertices = [
			[1,6,4],
			[3,6,1],
			[6,3,2],
			[6,2,4],
			[4,2,5],
			[5,1,4],
			[3,5,2],
			[3,1,5]
		];	

		instance.polygonColors=[];
		
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

		setColors(instance);
				
		data.applyScale.call(instance, scale);
		
		return instance;		
	};
});