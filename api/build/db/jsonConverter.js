const{isValid,parseISO}=require("date-fns"),fs=require("node:fs"),{parse,format}=require("node:path"),path=require("path"),adresses=["Isotry","Antskaviro","Besarety","Ampahibe","Ambohimanarina"],data=[{matricule:"345",date:"2023-03-02T07:53:32.261Z",heure_de_travail:10,heure_normale:0,hs_de_dimanche:0,hs_jours_feries:0,hs_de_nuit:0,hs_normale:0},{matricule:"345",date:"2023-02-15T18:02:55.147Z",heure_de_travail:10,heure_normale:7,hs_de_dimanche:0,hs_jours_feries:0,hs_de_nuit:0,hs_normale:0},{matricule:"345",date:"2023-02-17T07:30:10.206Z",heure_de_travail:9,heure_normale:6,hs_de_dimanche:0,hs_jours_feries:0,hs_de_nuit:0,hs_normale:0},{matricule:"345",date:"2023-02-15T23:59:49.979Z",heure_de_travail:9,heure_normale:0,hs_de_dimanche:0,hs_jours_feries:0,hs_de_nuit:0,hs_normale:0},{matricule:"345",date:"2023-02-06T06:50:34.248Z",heure_de_travail:10,heure_normale:1,hs_de_dimanche:0,hs_jours_feries:0,hs_de_nuit:0,hs_normale:0},{matricule:"345",date:"2023-02-21T06:31:21.633Z",heure_de_travail:12,heure_normale:6,hs_de_dimanche:0,hs_jours_feries:0,hs_de_nuit:0,hs_normale:0},{matricule:"345",date:"2023-01-25T02:52:30.035Z",heure_de_travail:10,heure_normale:4,hs_de_dimanche:0,hs_jours_feries:0,hs_de_nuit:0,hs_normale:0},{matricule:"345",date:"2023-01-11T17:42:59.984Z",heure_de_travail:12,heure_normale:1,hs_de_dimanche:0,hs_jours_feries:0,hs_de_nuit:0,hs_normale:0},{matricule:"345",date:"2023-02-24T02:10:18.812Z",heure_de_travail:12,heure_normale:5,hs_de_dimanche:0,hs_jours_feries:0,hs_de_nuit:0,hs_normale:0},{matricule:"345",date:"2023-01-15T23:20:27.794Z",heure_de_travail:11,heure_normale:2,hs_de_dimanche:0,hs_jours_feries:0,hs_de_nuit:0,hs_normale:0},{matricule:"345",date:"2023-01-04T20:07:03.894Z",heure_de_travail:11,heure_normale:8,hs_de_dimanche:0,hs_jours_feries:0,hs_de_nuit:0,hs_normale:0},{matricule:"345",date:"2023-01-13T04:45:03.022Z",heure_de_travail:9,heure_normale:7,hs_de_dimanche:0,hs_jours_feries:0,hs_de_nuit:0,hs_normale:0},{matricule:"345",date:"2023-01-19T20:04:01.626Z",heure_de_travail:9,heure_normale:6,hs_de_dimanche:0,hs_jours_feries:0,hs_de_nuit:0,hs_normale:0},{matricule:"345",date:"2023-02-23T21:44:00.139Z",heure_de_travail:10,heure_normale:4,hs_de_dimanche:0,hs_jours_feries:0,hs_de_nuit:0,hs_normale:0},{matricule:"345",date:"2023-01-04T02:15:54.759Z",heure_de_travail:8,heure_normale:2,hs_de_dimanche:0,hs_jours_feries:0,hs_de_nuit:0,hs_normale:0},{matricule:"345",date:"2023-01-31T21:22:37.708Z",heure_de_travail:12,heure_normale:2,hs_de_dimanche:0,hs_jours_feries:0,hs_de_nuit:0,hs_normale:0},{matricule:"345",date:"2023-01-15T12:24:15.431Z",heure_de_travail:9,heure_normale:7,hs_de_dimanche:0,hs_jours_feries:0,hs_de_nuit:0,hs_normale:0},{matricule:"345",date:"2023-02-06T18:04:36.779Z",heure_de_travail:12,heure_normale:7,hs_de_dimanche:0,hs_jours_feries:0,hs_de_nuit:0,hs_normale:0},{matricule:"345",date:"2023-02-09T23:35:42.526Z",heure_de_travail:8,heure_normale:4,hs_de_dimanche:0,hs_jours_feries:0,hs_de_nuit:0,hs_normale:0},{matricule:"345",date:"2023-01-15T21:13:29.043Z",heure_de_travail:11,heure_normale:5,hs_de_dimanche:0,hs_jours_feries:0,hs_de_nuit:0,hs_normale:0},{matricule:"345",date:"2023-02-18T01:21:46.317Z",heure_de_travail:11,heure_normale:2,hs_de_dimanche:0,hs_jours_feries:0,hs_de_nuit:0,hs_normale:0},{matricule:"345",date:"2023-02-10T15:13:34.656Z",heure_de_travail:12,heure_normale:8,hs_de_dimanche:0,hs_jours_feries:0,hs_de_nuit:0,hs_normale:0},{matricule:"345",date:"2023-02-09T20:11:37.559Z",heure_de_travail:10,heure_normale:2,hs_de_dimanche:0,hs_jours_feries:0,hs_de_nuit:0,hs_normale:0},{matricule:"345",date:"2023-01-20T05:55:44.832Z",heure_de_travail:11,heure_normale:6,hs_de_dimanche:0,hs_jours_feries:0,hs_de_nuit:0,hs_normale:0},{matricule:"345",date:"2023-03-01T21:22:55.097Z",heure_de_travail:8,heure_normale:7,hs_de_dimanche:0,hs_jours_feries:0,hs_de_nuit:0,hs_normale:0},{matricule:"345",date:"2023-02-20T23:57:15.850Z",heure_de_travail:10,heure_normale:6,hs_de_dimanche:0,hs_jours_feries:0,hs_de_nuit:0,hs_normale:0},{matricule:"345",date:"2023-01-03T07:04:59.117Z",heure_de_travail:10,heure_normale:5,hs_de_dimanche:0,hs_jours_feries:0,hs_de_nuit:0,hs_normale:0},{matricule:"345",date:"2023-01-13T03:08:05.437Z",heure_de_travail:8,heure_normale:3,hs_de_dimanche:0,hs_jours_feries:0,hs_de_nuit:0,hs_normale:0},{matricule:"345",date:"2023-01-24T21:12:50.903Z",heure_de_travail:10,heure_normale:1,hs_de_dimanche:0,hs_jours_feries:0,hs_de_nuit:0,hs_normale:0},{matricule:"345",date:"2023-03-02T11:01:04.736Z",heure_de_travail:8,heure_normale:5,hs_de_dimanche:0,hs_jours_feries:0,hs_de_nuit:0,hs_normale:0},{matricule:"345",date:"2023-01-17T17:25:20.303Z",heure_de_travail:11,heure_normale:4,hs_de_dimanche:0,hs_jours_feries:0,hs_de_nuit:0,hs_normale:0},{matricule:"345",date:"2023-02-03T09:21:59.495Z",heure_de_travail:10,heure_normale:7,hs_de_dimanche:0,hs_jours_feries:0,hs_de_nuit:0,hs_normale:0},{matricule:"345",date:"2023-02-09T18:32:28.330Z",heure_de_travail:8,heure_normale:3,hs_de_dimanche:0,hs_jours_feries:0,hs_de_nuit:0,hs_normale:0},{matricule:"345",date:"2023-02-19T02:52:20.539Z",heure_de_travail:10,heure_normale:8,hs_de_dimanche:0,hs_jours_feries:0,hs_de_nuit:0,hs_normale:0},{matricule:"345",date:"2023-01-08T13:17:58.825Z",heure_de_travail:10,heure_normale:3,hs_de_dimanche:0,hs_jours_feries:0,hs_de_nuit:0,hs_normale:0},{matricule:"345",date:"2023-02-15T18:33:18.567Z",heure_de_travail:12,heure_normale:5,hs_de_dimanche:0,hs_jours_feries:0,hs_de_nuit:0,hs_normale:0},{matricule:"345",date:"2023-02-28T15:22:01.558Z",heure_de_travail:9,heure_normale:7,hs_de_dimanche:0,hs_jours_feries:0,hs_de_nuit:0,hs_normale:0},{matricule:"345",date:"2023-03-01T07:51:42.847Z",heure_de_travail:12,heure_normale:1,hs_de_dimanche:0,hs_jours_feries:0,hs_de_nuit:0,hs_normale:0},{matricule:"345",date:"2023-01-29T20:28:38.804Z",heure_de_travail:11,heure_normale:2,hs_de_dimanche:0,hs_jours_feries:0,hs_de_nuit:0,hs_normale:0},{matricule:"345",date:"2023-02-22T12:04:24.255Z",heure_de_travail:8,heure_normale:2,hs_de_dimanche:0,hs_jours_feries:0,hs_de_nuit:0,hs_normale:0},{matricule:"345",date:"2023-01-30T22:20:04.144Z",heure_de_travail:9,heure_normale:1,hs_de_dimanche:0,hs_jours_feries:0,hs_de_nuit:0,hs_normale:0},{matricule:"345",date:"2023-02-06T17:24:55.476Z",heure_de_travail:8,heure_normale:6,hs_de_dimanche:0,hs_jours_feries:0,hs_de_nuit:0,hs_normale:0},{matricule:"345",date:"2023-02-01T17:07:01.006Z",heure_de_travail:10,heure_normale:7,hs_de_dimanche:0,hs_jours_feries:0,hs_de_nuit:0,hs_normale:0},{matricule:"345",date:"2023-02-14T00:46:50.523Z",heure_de_travail:12,heure_normale:3,hs_de_dimanche:0,hs_jours_feries:0,hs_de_nuit:0,hs_normale:0},{matricule:"345",date:"2023-01-16T08:05:56.262Z",heure_de_travail:12,heure_normale:3,hs_de_dimanche:0,hs_jours_feries:0,hs_de_nuit:0,hs_normale:0},{matricule:"345",date:"2023-01-05T02:04:51.673Z",heure_de_travail:12,heure_normale:7,hs_de_dimanche:0,hs_jours_feries:0,hs_de_nuit:0,hs_normale:0},{matricule:"345",date:"2023-01-08T02:39:09.341Z",heure_de_travail:12,heure_normale:7,hs_de_dimanche:0,hs_jours_feries:0,hs_de_nuit:0,hs_normale:0},{matricule:"345",date:"2023-01-31T00:06:27.515Z",heure_de_travail:9,heure_normale:6,hs_de_dimanche:0,hs_jours_feries:0,hs_de_nuit:0,hs_normale:0},{matricule:"345",date:"2023-01-17T15:01:25.042Z",heure_de_travail:12,heure_normale:4,hs_de_dimanche:0,hs_jours_feries:0,hs_de_nuit:0,hs_normale:0},{matricule:"345",date:"2023-02-19T13:38:08.019Z",heure_de_travail:10,heure_normale:2,hs_de_dimanche:0,hs_jours_feries:0,hs_de_nuit:0,hs_normale:0},{matricule:"345",date:"2023-01-16T17:00:21.019Z",heure_de_travail:11,heure_normale:8,hs_de_dimanche:0,hs_jours_feries:0,hs_de_nuit:0,hs_normale:0},{matricule:"345",date:"2023-02-06T23:39:23.395Z",heure_de_travail:9,heure_normale:0,hs_de_dimanche:0,hs_jours_feries:0,hs_de_nuit:0,hs_normale:0},{matricule:"345",date:"2023-01-01T13:25:19.624Z",heure_de_travail:12,heure_normale:7,hs_de_dimanche:0,hs_jours_feries:0,hs_de_nuit:0,hs_normale:0},{matricule:"345",date:"2023-02-05T10:03:32.087Z",heure_de_travail:8,heure_normale:1,hs_de_dimanche:0,hs_jours_feries:0,hs_de_nuit:0,hs_normale:0},{matricule:"345",date:"2023-01-09T01:35:22.785Z",heure_de_travail:10,heure_normale:6,hs_de_dimanche:0,hs_jours_feries:0,hs_de_nuit:0,hs_normale:0},{matricule:"345",date:"2023-02-24T20:09:06.529Z",heure_de_travail:9,heure_normale:4,hs_de_dimanche:0,hs_jours_feries:0,hs_de_nuit:0,hs_normale:0},{matricule:"345",date:"2023-02-18T03:31:21.057Z",heure_de_travail:12,heure_normale:2,hs_de_dimanche:0,hs_jours_feries:0,hs_de_nuit:0,hs_normale:0}],out=data.map((e=>{const _=parseISO(e.date);if(console.log(`Original Date: ${e.date}`),console.log(`Parsed Date: ${_}`),isValid(_)){const r=`${_.getDate().toString().padStart(2,"0")}/${(_.getMonth()+1).toString().padStart(2,"0")}/${_.getFullYear()}`;return console.log(`Formatted Date: ${r}`),{...e,date:r}}return console.error(`Invalid date for item: ${JSON.stringify(e)}`),null})).filter((e=>null!==e&&""!==e.date)),filePath=path.join(__dirname,"jsonConverted.json");fs.writeFile(filePath,JSON.stringify([...out]),(e=>{e?console.error(e):console.log("Fichier mis à jour avec succès.")}));