let studyItems =
JSON.parse(
localStorage.getItem("studyItems")
)
||
[
    {
        name:"映像授業30分",
        xp:30
    },

    {
        name:"英単語100語",
        xp:20
    }
];


let addCost =
Number(localStorage.getItem("addCost")) || 1;



function saveItems(){

    localStorage.setItem(
        "studyItems",
        JSON.stringify(studyItems)
    );

}



// =================
// 表示
// =================

function renderItems(){


let setting =
document.getElementById("settingList");


let study =
document.getElementById("studyList");



if(!setting || !study){
    return;
}



setting.innerHTML="";

study.innerHTML="";



studyItems.forEach((item,index)=>{


setting.innerHTML +=

`
<p>

${item.name}

(${item.xp}XP)


<button onclick="deleteItem(${index})">

削除

</button>


</p>

`;



study.innerHTML +=

`
<p>

${item.name}


<input

type="number"

min="0"

id="study${index}"

value="0">


</p>

`;



});


updateAddCost();


}





// =================
// 項目追加
// =================

function addStudyItem(){


let name =
document.getElementById("newName").value;


let xp =
Number(
document.getElementById("newXP").value
);



let level =
Number(
localStorage.getItem("level")
)
||
1;



if(name === "" || xp <= 0){

alert("項目名とXPを入力してください");

return;

}



if(level < addCost){

alert(
"必要Lv："+addCost
);

return;

}



// 項目追加

studyItems.push({

    name:name,

    xp:xp

});




// Lv消費

level -= addCost;


localStorage.setItem(
"level",
level
);



console.log(
"購入後Lv",
level
);




// 次回コスト増加

addCost++;


localStorage.setItem(
"addCost",
addCost
);



saveItems();


renderItems();


updateStatus();


}





// =================
// 削除
// =================

function deleteItem(index){


studyItems.splice(
index,
1
);


saveItems();


renderItems();


}





// =================
// XP計算
// =================

function calculateCustomXP(){



let xp=0;



studyItems.forEach((item,index)=>{


let input =
document.getElementById(
"study"+index
);



if(!input){
    return;
}



let count =
Number(input.value)
||
0;



xp += count * item.xp;



});




// 連日ボーナス

let multiplier =
getStreakMultiplier();



xp *= multiplier;



xp =
Math.floor(xp);



if(xp <= 0){

return;

}




addXP(xp);



document.getElementById("todayXP").innerHTML =

"+" + xp + " XP";



updateStreak();


}





// =================
// 設定開閉
// =================

function toggleSetting(){


let menu =
document.getElementById("settingMenu");



if(menu.style.display === "none"){

menu.style.display="block";

}

else{

menu.style.display="none";

}


}





// =================
// 追加コスト表示
// =================

function updateAddCost(){


let text =
document.getElementById("addCostText");



if(!text){
    return;
}



text.innerHTML =

"次の項目解放コスト：Lv."
+
addCost;


}
