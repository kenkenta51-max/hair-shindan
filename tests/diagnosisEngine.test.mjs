import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { buildDiagnosisResult, isComplete, rankColors, assessBleach, ratingFromGap } from '../src/domain/diagnosisEngine.ts';
import { diagnosisCases } from '../src/data/diagnosisCases.ts';
import { colors, colorTieBreakOrder as ids } from '../src/data/colors.ts';
import { questions } from '../src/data/questions.ts';
import { beforeImages, menuImages } from '../src/data/diagnosisPlans.ts';
const rows = {
 q1: [[5,3,0,2,2],[0,2,5,1,4],[5,2,1,3,2],[2,0,3,5,1],[1,0,5,4,3],[4,5,0,1,2],[4,0,1,5,1],[0,0,0,0,0]],
 q2: [[1,0,1,1,0],[0,1,0,0,1],[0,1,0,0,1],[0,1,0,0,1],[0,0,0,0,0],[0,0,0,0,0],[1,1,0,0,0],[0,0,1,1,1]],
 q4: [[3,5,0,1,2],[4,2,2,4,3],[1,0,5,4,3],[0,0,0,0,0]],
 q5: [[0,0,0,0,0],[2,5,0,1,3],[3,5,1,1,3],[1,0,4,5,3],[3,5,1,2,3],[3,5,0,1,2]],
};
for (const c of diagnosisCases) {
 const result=buildDiagnosisResult(c.answers);
 assert.equal(result.type,c.expectedType,c.id);
 assert.deepEqual(ids.map(id=>result.scores[id]),c.expectedScores,c.id);
}
const base=diagnosisCases[0].answers;
const concernGroups=[];
const opts=questions[1].options;
for(let a=0;a<opts.length;a++) {
 concernGroups.push([a]);
 for(let b=a+1;b<opts.length;b++) {
  concernGroups.push([a,b]);
  for(let c=b+1;c<opts.length;c++) concernGroups.push([a,b,c]);
 }
}
let combinations=0;
for(let a=0;a<8;a++) for(let b=0;b<4;b++) for(let c=0;c<6;c++) for(const group of concernGroups) {
 const answers={...base, impression:questions[0].options[a].value, concerns:group.map(i=>opts[i].value), desiredBrightness:questions[3].options[b].value, priority:questions[4].options[c].value};
 const expected=ids.map((_,i)=>rows.q1[a][i]+rows.q4[b][i]+rows.q5[c][i]+group.reduce((n,j)=>n+rows.q2[j][i],0));
 const order=[0,1,2,3,4].sort((x,y)=>expected[y]-expected[x]||rows.q1[a][y]-rows.q1[a][x]||rows.q4[b][y]-rows.q4[b][x]||rows.q5[c][y]-rows.q5[c][x]||x-y);
 const r=buildDiagnosisResult(answers);
 assert.deepEqual(ids.map(id=>r.scores[id]),expected);
 assert.equal(r.type,ids[order[0]]);
 const gap=expected[order[0]]-expected[order[1]];
 assert.equal(r.recommendationRating,gap>=5?5:gap>=3?4.5:4);
 combinations++;
}
const score=(...n)=>Object.fromEntries(ids.map((id,i)=>[id,n[i]??0]));
assert.equal(rankColors(score(),score(0,1),score(),score())[0],'chocolat_brown');
assert.equal(rankColors(score(),score(),score(0,0,1),score())[0],'milk_tea_beige');
assert.equal(rankColors(score(),score(),score(),score(0,0,0,1))[0],'olive_greige');
assert.deepEqual(rankColors(score(),score(),score(),score()),ids);
for(const [gap,rating] of [[0,4],[2,4],[3,4.5],[4,4.5],[5,5],[20,5]]) assert.equal(ratingFromGap(gap),rating);
let bleachChecks=0;
for(const hair of questions[2].options) for(const bright of questions[3].options) for(const type of ids) {
 const expected=hair.value!=='bleached' && ((type==='milk_tea_beige' && ['black','dark_brown','brown'].includes(hair.value)) || (bright.value==='much_brighter' && ['black','dark_brown'].includes(hair.value) && type!=='chocolat_brown'));
 assert.equal(assessBleach({currentHair:hair.value,desiredBrightness:bright.value},type),expected);bleachChecks++;
}
for(const hair of questions[2].options) for(const plan of questions[5].options) {
 const r=buildDiagnosisResult({...base,currentHair:hair.value,planPreference:plan.value});
 assert.deepEqual(r.scores,buildDiagnosisResult(base).scores);assert.equal(r.type,'ash_brown');
}
for(const [planPreference,price,time,menuLevel] of [['quick',9800,90,'quick'],['balanced',14500,150,'balanced'],['full_change',18800,180,'full'],['result_first',22000,210,'premium']]) {
 const plain=buildDiagnosisResult({...base,planPreference});
 assert.equal(plain.estimatedPrice,price);assert.equal(plain.estimatedTime,time);assert.equal(plain.menuLevel,menuLevel);
 const bleach=buildDiagnosisResult({...diagnosisCases[1].answers,currentHair:'black',planPreference});
 assert.equal(bleach.needsBleach,true);assert.equal(bleach.estimatedPrice,price+6600);assert.equal(bleach.estimatedTime,time+60);
 assert.deepEqual(plain.recommendedMenu.map(m=>m.type),['cut','color','treatment']);
}
for(const [concerns,level] of [[['roots'],'none'],[['damage'],'standard'],[['dryness'],'standard'],[['frizz'],'standard'],[['damage','dryness'],'intensive'],[['damage','dryness','frizz'],'intensive']]) {
 const r=buildDiagnosisResult({...base,concerns});assert.equal(r.treatmentLevel,level);assert.equal(r.needsTreatment,level!=='none');
 if(level==='intensive') assert.equal(r.recommendedMenu[2].name,'集中補修トリートメント');
}
const root=buildDiagnosisResult({...base,concerns:['roots']});assert(root.needsRootCare);assert(root.recommendedMenu[1].description.includes('根元との色差も自然に整えます'));
assert(buildDiagnosisResult({...base,concerns:['volume']}).recommendCut);
assert(buildDiagnosisResult({...base,concerns:['roots'],priority:'easy_care'}).recommendCut);
assert.equal(root.recommendCut,false);
for(const q of questions) {
 const missing={...base};delete missing[q.id];assert.equal(buildDiagnosisResult(missing),null);
 assert.equal(buildDiagnosisResult({...base,[q.id]:'invalid'}),null);
}
for(const concerns of [[],['damage','damage'],['damage','dryness','frizz','roots'],['invalid'],null]) assert.equal(buildDiagnosisResult({...base,concerns}),null);
for(const invalid of [null,undefined,[],42,'answers',{}]) assert.equal(isComplete(invalid),false);
const frozen=Object.freeze({...base,concerns:Object.freeze([...base.concerns])});
const first=buildDiagnosisResult(frozen);first.scores.ash_brown=999;assert.notEqual(buildDiagnosisResult(frozen).scores.ash_brown,999);
for(const path of [...Object.values(beforeImages),...colors.map(c=>c.image.src),...Object.values(menuImages)]) assert(existsSync(new URL('../public'+path,import.meta.url)),path);
console.log(JSON.stringify({cases:'A–E passed',scoringCombinations:combinations,bleachChecks,checks:'tie breaks, rating boundaries, all plans, care, invalid answers, purity, 13 image paths passed'},null,2));
