import React from "react";
import {Composition, registerRoot, AbsoluteFill, useCurrentFrame, interpolate} from "remotion";

const scenes = [
  {from:0,to:120,title:"FORTNITE",subtitle:"3 ERRORI DA EVITARE"},
  {from:120,to:360,title:"ERRORE 1",subtitle:"Combattere senza copertura"},
  {from:360,to:600,title:"ERRORE 2",subtitle:"Ignorare scudi e risorse"},
  {from:600,to:840,title:"ERRORE 3",subtitle:"Muoversi troppo tardi verso la zona"},
  {from:840,to:1200,title:"GIOCA MEGLIO",subtitle:"Quale errore fai più spesso?"}
];
const Video=()=>{
 const f=useCurrentFrame();
 const scene=scenes.find(s=>f>=s.from&&f<s.to)||scenes[0];
 const local=f-scene.from;
 const opacity=interpolate(local,[0,12,Math.max(13,scene.to-scene.from-12),scene.to-scene.from],[0,1,1,0],{extrapolateLeft:"clamp",extrapolateRight:"clamp"});
 return <AbsoluteFill style={{background:"linear-gradient(145deg,#101936,#263b73 60%,#0a1025)",color:"white",fontFamily:"Arial,sans-serif",justifyContent:"center",alignItems:"center",padding:75,textAlign:"center"}}>
  <div style={{fontSize:38,letterSpacing:8,color:"#71f6f1",marginBottom:42}}>FORTNITE • CONSIGLI</div>
  <div style={{opacity,fontSize:110,fontWeight:900,lineHeight:1.05}}>{scene.title}</div>
  <div style={{opacity,fontSize:53,fontWeight:700,marginTop:45,lineHeight:1.25}}>{scene.subtitle}</div>
  <div style={{position:"absolute",bottom:95,fontSize:28,color:"#a7b6e5"}}>TEST REMOTION • GRAFICA PROVVISORIA</div>
 </AbsoluteFill>;
};
const Root=()=> <Composition id="FortniteTips" component={Video} durationInFrames={1200} fps={30} width={1080} height={1920}/>;
registerRoot(Root);
