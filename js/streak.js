let streak = 
Number(localStorage.getItem("streak")) || 0;


let lastStudy =
localStorage.getItem("lastStudy");



// 連続日数更新

function updateStreak(){


let today =
new Date().toDateString();



if(lastStudy !== today){


let yesterday =
new Date(Date.now() - 86400000)
.toDateString();



if(lastStudy === yesterday){

    // 昨日も勉強していた
    streak++;

}
else{

    // 途切れた
    streak = 1;

}



localStorage.setItem(
"streak",
streak
);


localStorage.setItem(
"lastStudy",
today
);


}



document.getElementById("streak").innerHTML =

"🔥 "+streak+"日連続";



document.getElementById("streakBonus").innerHTML =

"連日ボーナス ×"
+
getStreakMultiplier().toFixed(2);


}





// 倍率計算

function getStreakMultiplier(){


return Math.pow(1.1, streak);


}
