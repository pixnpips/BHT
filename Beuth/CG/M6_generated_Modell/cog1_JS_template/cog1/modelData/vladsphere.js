/**
 * Empty object for groups in scenegraph.
 * 
 * @namespace cog1.data
 * @module empty
 */
define(["exports", "data"], function(exports, data) {
	"use strict";

	/**
	 * Create an instance of the model defined in this module.
	 * 
	 * @parameter object with fields:
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
			[0,1,0],
			[1,0,0],
			[0,0,-1],
			[-1,0,0],
			[0,0,1],
			[0,-1,0]
		];

		instance.polygonVertices = [
			[0,4,1],
			[0,1,2],
			[0,2,3],
			[0,3,4],

			[1,4,5],
			[2,1,5],
			[3,2,5],
			[4,3,5]			
		];	


		function halfLines(vert1,vert2){
			let x = (vert1[0]+vert2[0])/2;
			let y = (vert1[1]+vert2[1])/2;
			let z = (vert1[2]+vert2[2])/2;
			return [x,y,z];
		}

		function setonRadius(p){
			
			let f = Math.sqrt (1/(p[0]*p[0]+p[1]*p[1]+p[2]*p[2]));
			let x = p[0]*f;
			let y= p[1]*f;
			let z= p[2]*f;
			return [x,y,z];	
		}

		function generateSphere(loops){
			for (let i=0;i<=loops;i++){

				var polys=instance.polygonVertices.length;
				
				for(let j=0; j<polys; j++){


					//console.log(instance.polygonVertices);

					let v1= halfLines(instance.vertices[instance.polygonVertices[j][0]], instance.vertices[instance.polygonVertices[j][1]]);
					let v2= halfLines(instance.vertices[instance.polygonVertices[j][1]], instance.vertices[instance.polygonVertices[j][2]]);
					let v3= halfLines(instance.vertices[instance.polygonVertices[j][2]], instance.vertices[instance.polygonVertices[j][0]]);

					
					/*
					console.log(v1);
					console.log(v2);
					console.log(v3);
					*/

					v1=setonRadius(v1);
					v2=setonRadius(v2);
					v3=setonRadius(v3);

					
					let vertnum=instance.vertices.length;

					instance.vertices.push(v1,v2,v3);

					instance.polygonVertices.push(
						[instance.polygonVertices[j][0],vertnum,vertnum+2],
						[instance.polygonVertices[j][1],vertnum+1,vertnum],
						[instance.polygonVertices[j][2],vertnum+2,vertnum+1],
						[vertnum,vertnum+1,vertnum+2]);
					
				}

				instance.polygonVertices.splice(0,polys);
				
			}
			
		}


		instance.polygonColors = [];

		function setColors(){
			var colAr=[];
			let i=0;
			let j;
			do {
				for (j =0; j<6; j++){
						colAr.push(j);
						i++;
				} j=0;		
			}while (i< instance.polygonVertices.length);
				
		instance.polygonColors=colAr;
		}
		
		
		generateSphere(2);

		setColors();


		data.applyScale.call(instance, scale);
		
		return instance;		
	};
});