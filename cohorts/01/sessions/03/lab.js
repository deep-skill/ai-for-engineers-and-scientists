'use strict';
// Pure computations for the illustrative filesystem and archived data chart.
const LAB=Object.freeze({
 resolve(cwd,input){
  const parts=(input.startsWith('/')?input:cwd+'/'+input).split('/'),resolved=[];
  for(const part of parts){if(!part||part==='.')continue;if(part==='..')resolved.pop();else resolved.push(part);}
  return '/'+resolved.join('/');
 },
 count(features,minimum){return features.filter(f=>Number.isFinite(f.properties?.mag)&&f.properties.mag>=minimum).length;}
});
