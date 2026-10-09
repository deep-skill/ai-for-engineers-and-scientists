'use strict';
// Spherical surface distance between epicenters. Depth is not part of this metric.
const QUAKE_MATH=Object.freeze({
 distance(lat1,lon1,lat2,lon2){
  const rad=n=>n*Math.PI/180;
  const a=Math.sin(rad(lat2-lat1)/2)**2+Math.cos(rad(lat1))*Math.cos(rad(lat2))*Math.sin(rad(lon2-lon1)/2)**2;
  return 6371*2*Math.asin(Math.sqrt(Math.min(1,Math.max(0,a))));
 },
 nearest(features,point){
  return features.filter(f=>f.geometry?.type==='Point'&&Array.isArray(f.geometry.coordinates)&&f.geometry.coordinates.slice(0,2).every(Number.isFinite)&&Number.isFinite(f.properties?.mag))
   .map(f=>({id:f.id,place:f.properties.place,mag:f.properties.mag,depth:f.geometry.coordinates[2],lon:f.geometry.coordinates[0],lat:f.geometry.coordinates[1],distance:this.distance(point.lat,point.lon,f.geometry.coordinates[1],f.geometry.coordinates[0])}))
   .sort((a,b)=>a.distance-b.distance||String(a.id).localeCompare(String(b.id))).slice(0,5);
 }
});
