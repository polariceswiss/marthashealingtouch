import fs from 'node:fs';
export function localEnv(){const env={...process.env}; for(const file of ['../.env','../.env.txt','../novainstallerdesarrollador/nova-license-server/.env.local','.env.local']){if(!fs.existsSync(file))continue;for(const line of fs.readFileSync(file,'utf8').split(/\r?\n/)){const match=line.match(/^([A-Z0-9_]+)=(.*)$/);if(match)env[match[1]]=match[2].replace(/^['"]|['"]$/g,'').trim();}}return env;}
const env=localEnv();
if(process.argv.includes('--inspect')){
 console.log('Configured relevant names',Object.keys(env).filter(k=>/DEEPSEEK|N8N.*API/.test(k)));
 for(const [label,url,headers] of [['eleven','https://api.elevenlabs.io/v1/voices',{'xi-api-key':env.ELEVENLABS_API_KEY||''}],['n8n','https://nova.novan8n.site/healthz',{}]]){try{const r=await fetch(url,{headers,signal:AbortSignal.timeout(12000)});const d=await r.json();console.log(label,r.status,label==='eleven'?d.voices?.map(v=>({id:v.voice_id,name:v.name,labels:v.labels})).slice(0,30)||d.detail:d);}catch(e){console.log(label,e.message)}}
}
