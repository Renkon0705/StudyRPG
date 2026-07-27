let totalXP = Number(localStorage.getItem("totalXP")) || 0;


// XP設定

const xpTable = {

video:30,      // 映像授業30分

normal:25,     // 標準問題

hard:40,       // 難問

words:20,      // 単語100語

quiz:15        // 一問一答

};


// レベル計算

function getLevel(xp){

let level = 1;

let need = 100;


while(xp >= need){

xp -= need;

level++;

need = Math.floor(need * 1.2);

}


return {

level:level,

current:xp,

next:need

};

}




function calculateXP(){


let xp = 0;


xp += document.getElementById("video").value * xpTable.video;

xp += document.getElementById("normal").value * xpTable.normal;

xp += document.getElementById("hard").value * xpTable.hard;

xp += document.getElementById("words").value * xpTable.words;

xp += document.getElementById("quiz").value * xpTable.quiz;



totalXP += xp;


localStorage.setItem(
"totalXP",
totalXP
);



document.getElementById("todayXP").innerHTML =
"+"+xp+" XP";



updateStatus();


checkLevelUp();

}





let oldLevel = getLevel(totalXP).level;



function updateStatus(){


let data = getLevel(totalXP);


document.getElementById("level").innerHTML =
data.level;


document.getElementById("currentXP").innerHTML =
data.current;


document.getElementById("nextXP").innerHTML =
data.next;


document.getElementById("totalXP").innerHTML =
totalXP;


let percent =
(data.current / data.next)*100;


document.getElementById("xpBar")
.style.width =
percent+"%";


}



function checkLevelUp(){

let newLevel =
getLevel(totalXP).level;


if(newLevel > oldLevel){

showPopup();

}


oldLevel=newLevel;


}



function showPopup(){

let p=document.getElementById("popup");

p.style.display="block";


setTimeout(()=>{

p.style.display="none";

},2000);


}



updateStatus();
