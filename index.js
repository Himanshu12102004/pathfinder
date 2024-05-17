let a = [];
let m = 50;
let n = 100;
let starterX, starterY;
let grid = document.getElementById("container");
// turns = 3;
let endX;
let endY;
let stopWatchVar;
let timer;
let key=true;
 let reload=0;
let hour = 00;
let minute = 00;
let second = 00;
let count = 00;
 const modal=document.getElementsByClassName("modal")[1];
const gameOver=document.getElementsByClassName("modal")[2];
 const overlay=document.getElementById("overlay")

let controllers = document.getElementsByClassName("controllers")[0];
controllers.style.display = "none";
document.getElementsByClassName("modal")[0].style.display="block";
overlay.style.display = "block";

if ("ontouchstart" in document.documentElement) {
  controllers.style.display = "flex";
  m = 25;
  n = 50;
}
if (window.innerWidth < window.innerHeight) {
  n = 25;
  m = 50;
  grid.style.gridTemplateColumns = `repeat(${n},1fr)`;
  grid.style.gridTemplateRows = `repeat(${m},1fr)`;
  grid.style.height = "" + (window.innerHeight - 10) + "px";
  grid.style.width = "" + (window.innerWidth - 10) + "px";
}
const gameEngine = () => {
gameOver.style.display="none"
  
 key = false;
  timer=false;
   
 hour = 00;
 minute = 00;
 second = 00;
 count = 00;
 
  stopWatchVar=true;
    // document.getElementById('hr').innerHTML = "00";
    document.getElementById('min').innerHTML = "00";
    document.getElementById('sec').innerHTML = "00";
    document.getElementById('count').innerHTML = "00";
  for (let i = 0; i < m; i++) {
    a[i] = [];
  }
  for (let i = 0; i < m; i++) for (let j = 0; j < n; j++) {a[i][j] = " ";
      }
  grid.innerHTML="";
let turns = parseInt(Math.random() * 1000 + 1000);
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      let div = document.createElement("div");
      div.setAttribute("id", `${i}-${j}`);
      div.setAttribute("class", `item`);

      grid.appendChild(div);
    }
  }
  
  starterY = parseInt(Math.random() * (n - 1) + 1);
  starterX = parseInt(Math.random() * (m - 1) + 1);

  let x = starterX,
    y = starterY;
  // turns = 10;
  
  a[x][y] = "s";
  let lastDir = parseInt(Math.random() * 4 + 1);
  let path;
  for (let i = 0; i < turns; i++) {
    let dir;
    if (lastDir == 1 || lastDir == 2) dir = parseInt(Math.random() * 2 + 3);
    if (lastDir == 3 || lastDir == 4) dir = parseInt(Math.random() * 2 + 1);
    lastDir = dir;
    if (dir == 1 || dir == 2) path = parseInt(Math.random() * (n - 1) + 1);
    if (dir == 3 || dir == 4) path = parseInt(Math.random() * (m - 1) + 1);

  
    if (dir == 1) {
      if (a[x][path + y + 1] == "~") {
        i--;
        continue;
      }
      let j;
      for (j = y + 1; j <= path + y; j++) {
        if (j >= n || a[x][j] == "%") {
          break;
        }
        a[x][j] = "~";
      }
      y = j - 1;
      if (j < n - 1) {
        a[x][j] = "%";
        if (i == turns - 1)
          if (x == 0 || x == m - 1) i--;
          else a[x][j] = "e";
      }
      if (j >= n - 1 && i == turns - 1) i--;
    }
    // dir = 4;
    if (dir == 2) {
      if (a[x][-path + y - 1] == "~") {
        i--;
        continue;
      }
      let j;
      for (j = y - 1; j >= -path + y; j--) {
        if (j < 0 || a[x][j] == "%") break;
        a[x][j] = "~";
      }
      y = j + 1;
      if (j > 0) {
        a[x][j] = "%";
        if (i == turns - 1)
          if (x == 0 || x == m - 1) i--;
          else a[x][j] = "e";
      }

      if (j <= 0 && i == turns - 1) i--;
    }

    if (dir == 3) {
      if (!(path + x + 1 >= m))
        if (a[path + x + 1][y] == "~") {
          i--;
          continue;
        }
      let j;
      for (j = x + 1; j <= path + x; j++) {
        if (j >= m) break;
        a[j][y] = "~";
      }
      x = j - 1;
      if (j < m - 1) {
        a[j][y] = "%";
        if (i == turns - 1)
          if (y == 0 || y == n - 1) i--;
          else a[j][y] = "e";
      }
      if (j >= m - 1 && i == turns - 1) i--;
    }
    if (dir == 4) {
      if (!(-path + x - 1 <= -1))
        if (a[-path + x - 1][y] == "~") {
          i--;
          continue;
        }
      let j;
      for (j = x - 1; j >= -path + x; j--) {
        if (j < 0 || a[j][y] == "%") break;
        a[j][y] = "~";
      }
      x = j + 1;
      if (j > 0) {
        a[j][y] = "%";
        if (i == turns - 1)
          if (y == 0 || y == n - 1) i--;
          else a[j][y] = "e";
      }
      if (j <= 0 && i == turns - 1) i--;
    }
    
  }
  

  a[starterX][starterY] = "O";
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      let elem = document.getElementById(`${i}-${j}`);
      if (a[i][j] == "~") elem.setAttribute("class", "item black");
      if (a[i][j] == "%") elem.setAttribute("class", "item hide");
      if (a[i][j] == " ") elem.setAttribute("class", "item black");
      if (a[i][j] == "O") elem.setAttribute("class", "item yellow");
      if (a[i][j] == "e") {
        elem.setAttribute("class", "item green");
        endX = i;
        endY = j;
      }
    }
  }
  for (let i = 0; i < 50; i++) {
    let c = parseInt(Math.random() * (m - 1) + 1);
    let d = parseInt(Math.random() * (n - 1) + 1);
    if (a[c][d] == " ") {
      a[c][d] = "$";
      let elem = document.getElementById(`${c}-${d}`);
      elem.setAttribute("class", "item hide rotate");
    }
  }
}
const lose=()=>{
  
  gameOver.style.display="block"
      overlay.style.display="block";
}
const win=()=>{
  // let rnd=parseInt(Math.random());
  let fast=document.getElementById("fast")
  if(second==0)
    fast.innerHTML=(99+0.5+(Math.random())*0.5).toFixed(4);
  else if(second==1)
    fast.innerHTML=(98+0.2+(Math.random())*0.5).toFixed(4);
 else  if(second==2)
    fast.innerHTML=(96+0.3+(Math.random())*0.5).toFixed(4);
  else if(second==3)
    fast.innerHTML=(93+0.7+(Math.random())*6).toFixed(4);
  else if(second==4)
    fast.innerHTML=(90+0.4+(Math.random())*8).toFixed(4);
  else if(second==5)
    fast.innerHTML=(89+0.3+(Math.random())*10).toFixed(4);
  else
    fast.innerHTML=(70+0.8+(Math.random())*10).toFixed(4);
    
  
  
  minute=minute/10<1?`0${minute}`:minute;
  second=second/10<1?`0${second}`:second;
  count=count/10<1?`0${count}`:count;
  
  document.getElementById("myTime").innerHTML=`${minute} min ${second} sec ${count} cs`
  
  modal.style.display="block"
      overlay.style.display="block";
  
}
const gridCreater = () => {
  let h = 0;
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++)
      if (a[i][j] == "%"||a[i][j]=="$") {
        setTimeout(() => {
          // document.getElementById(`${i}-${j}`).classList.toggle("hide");
          document.getElementById(`${i}-${j}`).classList.toggle("red");
        }, 800 + Math.random() * 1000);
      }
  }
}
gameEngine()
gridCreater()
window.addEventListener("keydown", (e) => {
  let start = document.getElementById(`${starterX}-${starterY}`);
  // start.style.backgroundColor = "white";
  if (e.key == "ArrowUp" && key == false) {
    up();
  }
  if (e.key == "ArrowDown" && key == false) {
    down(); 
  }
  if (e.key == "ArrowLeft" && key == false) {
    left();
  }
  if (e.key == "ArrowRight" && key == false) {
    right();
  }
});

// Up functionc
const up = () => {if(stopWatchVar){stopWatchVar=false;timer=true;stopWatch();}
  key = true;
  let i = starterX;
  const f = () => {
    i--;
    if (i == -1) {
      key = false;
      return;
    }
    if (endX == i && endY == starterY) {
      win();
      timer=false;
    return;
    }
    if(a[i][starterY]=="$")
    {
      key=false;
      lose();
      return;
          }
    if (a[i][starterY] == "%") {
      key = false;
      {
        key = false;
        return;
      }
    }

    document.getElementById(`${i}-${starterY}`).style.backgroundColor =
      "yellow";
    document.getElementById(`${i + 1}-${starterY}`).style.backgroundColor =
      "black";
    setTimeout(() => {
      f();
    }, 2);
    starterX = i;

  };
  // starterX = i + 1;
  f();
};
const down = () => {if(stopWatchVar){stopWatchVar=false;timer=true;stopWatch();}
  key = true;
  let i = starterX;
  const f = () => {
    i++;

    if (i == m) {
      key = false;
      return;
    }

    if (endX == i && endY == starterY) {
      win();
      timer=false;
      return;
    }
     if(a[i][starterY]=="$")
    {
      key=false;
      lose();
      return;
          }
    if (a[i][starterY] == "%") {
      key = false;
      return;
    }

    document.getElementById(`${i}-${starterY}`).style.backgroundColor =
      "yellow";
    document.getElementById(`${i - 1}-${starterY}`).style.backgroundColor =
      "black";
    setTimeout(() => {
      f();
    }, 2);
    starterX = i;
  };
  f();
};
const left = () => {if(stopWatchVar){stopWatchVar=false;timer=true;stopWatch();}
  key = true;

  let i = starterY;
  const f = () => {
    i--;

    if (i == -1) {
      key = false;
      return;
    }
    if (endX == starterX && endY == i) {
      win();

      timer=false;
      return
    }
    if (a[starterX][i] == "$") {
      key = false;
      lose();
      return;
    }
    if (a[starterX][i] == "%") {
      key = false;
      return;
    }


    document.getElementById(`${starterX}-${i}`).style.backgroundColor =
      "yellow";
    document.getElementById(`${starterX}-${i + 1}`).style.backgroundColor =
      "black";
    
    setTimeout(() => {
      f();
    }, 2);
    starterY = i;
  };
  f();
};
const right = () => {if(stopWatchVar){stopWatchVar=false;timer=true;stopWatch();}
  key = true;

  let i = starterY;
  const f = () => {
    i++;
    if (i == n) {
      key = false;
      return;
    }
    if (endX == starterX && endY == i) {
      win();

      timer=false;
      return
    }
    if (a[starterX][i] == "$") {
      key = false;
      lose();
      return;
    }
    if (a[starterX][i] == "%") {
      key = false;
      return;
    }

    document.getElementById(`${starterX}-${i}`).style.backgroundColor =
      "yellow";
    document.getElementById(`${starterX}-${i - 1}`).style.backgroundColor =
      "black";
    setTimeout(() => {
      f();
    }, 2);
    starterY = i;
  };
  // starterY = i - 1;
  f();
};
// for phone
document.getElementById("up").addEventListener("click", () => {
  if (key == false) up();

});
document.getElementById("down").addEventListener("click", () => {
  if (key == false) down();
});
document.getElementById("left").addEventListener("click", () => {
  if (key == false) left();
});
document.getElementById("right").addEventListener("click", () => {
  if (key == false) right();
});


function stopWatch() {
    if (timer) {
        count++;
 
        if (count == 100) {
            second++;
            count = 0;
        }
 
        if (second == 60) {
            minute++;
            second = 0;
        }
 
        if (minute == 60) {
            hour++;
            minute = 0;
            second = 0;
        }
 
        let hrString = hour;
        let minString = minute;
        let secString = second;
        let countString = count;
 
        if (hour < 10) {
            hrString = "0" + hrString;
        }
 
        if (minute < 10) {
            minString = "0" + minString;
        }
 
        if (second < 10) {
            secString = "0" + secString;
        }
 
        if (count < 10) {
            countString = "0" + countString;
        }
 
        // document.getElementById('hr').innerHTML = hrString;
        document.getElementById('min').innerHTML = minString;
        document.getElementById('sec').innerHTML = secString;
        document.getElementById('count').innerHTML = countString;
        setTimeout(stopWatch, 10);
    }
}
const again=()=>{
  reload++;
  gameEngine();
  gridCreater();
  modal.style.display="none";
  overlay.style.display="none";

}
document.getElementById("yes").addEventListener("click",()=>{
  key=false;
  document.getElementsByClassName("modal")[0].style.display="none";
overlay.style.display = "none";
})