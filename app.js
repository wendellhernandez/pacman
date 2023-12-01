
let left = 0;
let tops = 0;
let leftg = 450;
let topsg = 330;
let box = document.querySelector('.box');
let boxc = box.children;
let ninx = 0;
let niny = 0;
let gx = 15;
let gy = 11;
let scores = document.querySelector('#scores');
let score = 0;
let map = [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],];

function r(num){
    return Math.floor(Math.random()*num);
}

function mapper(){
    for(let i=0; i<20; i++){
        for(let j=0; j<20; j++){
            map[i][j] = 0; 
        }
    }

    for(let i=0; i<20; i += 2){
        for(let j=0; j<20; j += 2){
            map[i][j] = r(2); 
        }
    }

    for(let i=0; i<20; i += r(4)){
        for(let j=0; j<20; j += r(4)){
            map[i][j] = r(2);
        }
    }

    for(let i=1; i<19; i++){
        for(let j=1; j<19; j++){
            if(map[i-1][j] == 1 && map[i+1][j] == 1 && map[i][j-1] == 1 && map[i][j+1] == 1){
                map[i][j] = 1;
            }
        }
    }

    for(let i=0; i<4; i++){
        for(let j=0; j<4; j++){
            map[i][j] = 0; 
        }
    }

    for(let i=8; i<12; i++){
        for(let j=4; j<16; j++){
            map[i][j] = 2; 
        }
    }

    map[0][0] = 2;
    map[1][2] = 1;
    map[2][0] = 1;
    map[2][2] = 1;
}

mapper();

function addMapElement(){
    let ninja = document.createElement('div');
    ninja.className = 'ninja';
    box.appendChild(ninja);

    for(let i=0; i<map.length; i++){
        for(let j=0; j<map[i].length; j++){
            switch (map[i][j]) {
                case 0:
                    let element = document.createElement('div');
                    element.className = 'dot';
                    box.appendChild(element);
                    break;

                case 1:
                    let elements = document.createElement('div');
                    elements.className = 'wall';
                    box.appendChild(elements);
                    break;

                case 2:
                    let elementss = document.createElement('div');
                    elementss.className = 'blank';
                    box.appendChild(elementss);
                    break;
            
                default:
                    break;
            }
        }
    }

    let ghost = document.createElement('div');
    ghost.className = 'ghost';
    box.appendChild(ghost);
}

addMapElement();

let ninja = document.querySelector('.ninja');
let ghost = document.querySelector('.ghost');

document.addEventListener('keydown' , e => {
    if(e.key == 'ArrowDown' || e.key == 'ArrowUp' || e.key == 'ArrowLeft' || e.key == 'ArrowRight'){
        e.preventDefault();
    }

    switch (e.key) {
        case "ArrowLeft":
            if(left>0 && left <=570){
                if(map[niny][ninx-1] !== 1){
                    left -= 30;
                    ninja.style.left = left + "px";
                    ninx--;
                    boxc[niny*20 +  ninx+1].className = 'blank';
                    scoring();
                }
            }

            ninjanimate("left");
            break;

        case "ArrowRight":
            if(left>=0 && left <570){
                if(map[niny][ninx+1] !== 1){
                    left += 30;
                    ninja.style.left = left + "px";
                    ninx++;
                    boxc[niny*20 +  ninx+1].className = 'blank'; 
                    scoring();
                }
            }

            ninjanimate("right");
            break;

        case "ArrowUp":
            if(tops>0 && tops <=570){
                if(map[niny-1][ninx] !== 1){
                    tops -= 30;
                    ninja.style.top = tops + "px";
                    niny--;
                    boxc[niny*20 +  ninx+1].className = 'blank';
                    scoring();
                }
            }

            ninjanimate("top");
            break;

        case "ArrowDown":
            if(tops>=0 && tops <570){
                if(map[niny+1][ninx] !== 1){
                    tops += 30;
                    ninja.style.top = tops + "px";
                    niny++;
                    boxc[niny*20 +  ninx+1].className = 'blank';
                    scoring();
                }            
            }

            ninjanimate("down");
            break;
    
        default:
            break;
    }

    killCheck(200);
})

function ninjanimate(direction){
    if(ninja.style.backgroundImage == `url("img/${direction}1.png")`){
        ninja.style.backgroundImage = `url("img/${direction}2.png")`;
    }else{
        ninja.style.backgroundImage = `url("img/${direction}1.png")`
    }
}

function scoring(){
    if(map[niny][ninx] == 0){
        map[niny][ninx] = 2;
        score += 20;
        scores.innerText = score;
    }
}

function ghostMove(){
    setInterval(()=>{
        killCheck(0);

        switch (r(4)+1) {
            case 1:
            if(leftg>0 && leftg <=570){
                if(map[gy][gx-1] !== 1){
                    leftg -= 30;
                    ghost.style.left = leftg + "px";
                    gx--;
                }
            }
            break;

            case 2:
                if(leftg>=0 && leftg <570){
                    if(map[gy][gx+1] !== 1){
                        leftg += 30;
                        ghost.style.left = leftg + "px";
                        gx++;
                    }
                }
                break;

            case 3:
                if(topsg>0 && topsg <=570){
                    if(map[gy-1][gx] !== 1){
                        topsg -= 30;
                        ghost.style.top = topsg + "px";
                        gy--;
                    }
                }
                break;

            case 4:
                if(topsg>=0 && topsg <570){
                    if(map[gy+1][gx] !== 1){
                        topsg += 30;
                        ghost.style.top = topsg + "px";
                        gy++;
                    }            
                }
                break;
        
            default:
                break;
        }
    }, 30)
}

ghostMove();

function killCheck(timeout){
    if(gx == ninx && gy == niny){
        setTimeout( ()=>{
            box.innerHTML = '<div class="gameover">GAME OVER</div>';
        }, timeout)
    }
}