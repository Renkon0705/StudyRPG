let totalXP = Number(localStorage.getItem("totalXP")) || 0;


// 苦手科目倍率
const weakMultiplier = 1.3;


// XP設定

const xpTable = {

video:30,
normal:25,
hard:40,
words:20,
quiz:15

};


// 日替わりボーナス

let todayBonus =
localStorage.getItem("todayBonus");


let today =
new Date().toDateString();



if(localStorage.getItem("bonusDate") !== today){

let bonuses=[

"全XP +20%",
"数学XP ×1.5",
"映像授業XP ×1.5",
"難問XP ×1.5"

];


todayBonus =
bonuses[Math.floor(Math.random()*bonuses.length)];


localStorage.setItem(
"todayBonus",
todayBonus
);


localStorage.setItem(
"bonusDate",
today
);

}



document.getElementById("dailyBonus").innerHTML =
"🎲 "+todayBonus;



// 強化週間

let week =
Math.floor(
Date.now()/(1000*60*60*24*7)
);


let weeks=[

"数学週間",
"英語週間",
"化学週間",
"物理週間"

];


document.getElementById("weekBonus").innerHTML =
"🔥 今週: "+weeks[week%4];




// レベル計算

function getLevel(xp){

let level=1;

let need=100;


while(xp>=need){

xp-=need;

level++;

need=Math.floor(need*1.2);

}


return {

level,
current:xp,
next:need

};

}




function calculateXP(){


let xp=0;


// 入力

let video=
Number(document.getElementById("video").value);


let normal=
Number(document.getElementById("normal").value);


let hard=
Number(document.getElementById("hard").value);


let words=
Number(document.getElementById("words").value);


let quiz=
Number(document.getElementById("quiz").value);



xp += video*xpTable.video;

xp += normal*xpTable.normal;

xp += hard*xpTable.hard;

xp += words*xpTable.words;

xp += quiz*xpTable.quiz;



// 苦手補正

let weak=false;


if(
document.getElementById("mathWeak").checked ||
document.getElementById("chemWeak").checked ||
document.getElementById("physicsWeak").checked ||
document.getElementById("englishWeak").checked
){

weak=true;

}



if(weak){

xp*=weakMultiplier;

}



// 日替わり補正

if(todayBonus.includes("+20")){

xp*=1.2;

}


if(todayBonus.includes("×1.5")){

xp*=1.5;

}



xp=Math.floor(xp);



// コンボ

let lastSubject =
localStorage.getItem("lastSubject");


let subject =
getSubject();



if(lastSubject && lastSubject!==subject){

xp+=50;


document.getElementById("combo").innerHTML =
"🔥 科目コンボ発生！ +50XP";


}


localStorage.setItem(
"lastSubject",
subject
);



totalXP+=xp;


localStorage.setItem(
"totalXP",
totalXP
);



document.getElementById("todayXP").innerHTML =
"+"+xp+" XP";


updateStatus();


}




function getSubject(){

if(Number(video.value)>0)
return "映像";

if(Number(normal.value)>0 ||
Number(hard.value)>0)
return "演習";

if(Number(words.value)>0)
return "英語";

return "その他";

}





function updateStatus(){


let data=getLevel(totalXP);



document.getElementById("level").innerHTML=
data.level;


document.getElementById("currentXP").innerHTML=
data.current;


document.getElementById("nextXP").innerHTML=
data.next;


document.getElementById("totalXP").innerHTML=
totalXP;


document.getElementById("xpBar").style.width=
(data.current/data.next*100)+"%";

}


updateStatus();
