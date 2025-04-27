let gameSeq = [];
let userSeq = [];
let colors = ["one", "two", "three", "four"];

let started = false;
let level = 0;
let highestScore = 0;
h2 = document.querySelector("h2");

document.addEventListener("keypress", function(){
   if(started == false){
        started = true;
       
        levelUp();
   }
});

function btnFlash(btn){
    btn.classList.add("flash");

    setTimeout(() => {
        btn.classList.remove("flash");
    }, 500);
}

function levelUp(){
    userSeq = [];
    level++;
    h2.innerText = `level ${level}`;

    let randIdx = Math.floor(Math.random() * 3);
    let randColor = colors[randIdx];
    gameSeq.push(randColor);
    let randBtn = document.querySelector(`.${randColor}`);
    
    btnFlash(randBtn);
}

function checkAns(idx){
    if(userSeq[idx] === gameSeq[idx]){
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp, 1000);
        }
    }else {
        h2.innerHTML = `Game Over! Your score was <b>${level}</b> <br> Press any key to start.`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = "white";
        }, 500);

        setHighestScore();
        reset();
    }
}

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click", function(){
        btnFlash(this); // btnFlas(event.target);
        let userColor = this.getAttribute("id");
        userSeq.push(userColor);

        idx = userSeq.length-1;
        checkAns(idx);
    });
}


function reset(){
    started = false;
    level = 0;
    userSeq = [];
    gameSeq = [];
}

function setHighestScore(){
    let h2Par = document.createElement("h2");
    if(level > highestScore) highestScore = level;
    h2Par.innerText = `Your highest score is ${highestScore}.`;

    h2.appendChild(h2Par);
}