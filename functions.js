let patternCon = document.getElementById('pat-con');
let numberInput = document.getElementById('numberInput');
let submitBtn = document.getElementById('submit-btn');
let resetBtn = document.getElementById('reset-btn');
let screenWidth = window.innerWidth;

let text = document.getElementById('letter');
let reg = /[a-w\s\W\d]/gi;

let patOrientation = document.getElementById('pat-con');
let selectOrient = document.getElementById('orientation')


submitBtn.addEventListener('click', ()=>{
    let orientationValue = selectOrient.value;
    let textval = text.value;
    let inputSize = parseInt(numberInput.value);
    forOrientation(orientationValue);
    let forCond = textval.match(reg)

    if(forCond != null || inputSize%2 == 0 || isNaN(inputSize) || textval == "" || textval.indexOf(" ") >=0) {
        error();
        text.value = "";
    } else {
        submitBtn.setAttribute('disabled', true);
        submitBtn.classList.add('isDisabled');

        if(screenWidth<=767) {
            setTimeout(() => {
                mainContainer.style.transform = "translateX(-50%)";
                directBtnSlider.classList.add('isRight');
            }, 500);
        }
        for(let i = 0; i<textval.length; i++) {
            if(textval[i] === 'x' || textval[i] === 'X') {
                patternCon.append(xPattern(inputSize));
            } else if(textval[i] === 'y' || textval[i] === 'Y') {
                patternCon.append(yPattern(inputSize));
            } else {
                patternCon.append(zPattern(inputSize));
            }
        }  
    }

});

resetBtn.addEventListener('click', ()=>{
    text.value = "";
    numberInput.value = 3;
    selectOrient.value = 'h';
    while (patternCon.firstChild) {
        patternCon.removeChild(patternCon.firstElementChild);
    }
    submitBtn.removeAttribute("disabled");
    submitBtn.classList.remove('isDisabled');
});

function xPattern(size) {
    let xcontainer = document.createElement('div');
    xcontainer.setAttribute('class', 'letter-container');
    xcontainer.style.gridTemplateColumns = `repeat(${size},1fr)`;
    xcontainer.style.gridTemplateRows = `repeat(${size},1fr)`;
    for(let i=0; i<size; i++) {
        for(let j=0; j<size; j++) {
            if(i === j || i+j === size-1) {
                xcontainer.innerHTML += "<p>O</p>"; 
            } else {
                xcontainer.innerHTML += "<p></p>"; 
            }
        }
    }

    return xcontainer;

    
}

function yPattern(size) {
    let ycontainer = document.createElement('div');
    ycontainer.setAttribute('class', 'letter-container');
    let count = parseInt(size/2) + 1;
    let count2 = parseInt(size/2);
    ycontainer.style.gridTemplateColumns = `repeat(${size},1fr)`;
    ycontainer.style.gridTemplateRows = `repeat(${size},1fr)`;

    for (let i = 1; i <=size; i++) {
        for (let j = 1; j <=size; j++) {
            if(((j===i || j=== size-i+1) && i<=count) || (j===count && i>count2) ) {
                ycontainer.innerHTML += "<p>O</p>"; 
            } else {
                ycontainer.innerHTML += "<p></p>"; 
            }    
        }
    }

    return ycontainer;
}

function zPattern(size) {
    let zcontainer = document.createElement('div');
    zcontainer.setAttribute('class', 'letter-container');
    zcontainer.style.gridTemplateColumns = `repeat(${size},1fr)`;
    zcontainer.style.gridTemplateRows = `repeat(${size},1fr)`;

    for (let i = 1; i <=size; i++) {
        for (let j = 1; j <=size; j++) {
            if(i===1 || i===size || i+j===size+1) {
                zcontainer.innerHTML += "<p>O</p>"; 
            } else {
                zcontainer.innerHTML += "<p></p>"; 
            }
              
        }
    }
    return zcontainer;
}

function forOrientation(orientationValue) {
    if(orientationValue === "h") {
        patOrientation.style.flexDirection = "column";
    } else {
        patOrientation.style.flexDirection = "row";
    }
}

let inputTabBtn = document.getElementById('input-tab-btn');
let patternTabBtn = document.getElementById('pattern-tab-btn');
let mainContainer = document.getElementById('main-container');
let directBtnSlider = document.getElementById('direct-slider');

inputTabBtn.addEventListener('click',()=>{
    mainContainer.style.transform = "translateX(0%)";
    directBtnSlider.classList.remove('isRight');
});

patternTabBtn.addEventListener('click',()=>{
    mainContainer.style.transform = "translateX(-50%)";
    directBtnSlider.classList.add('isRight');
});


let errorModal = document.getElementById('modal');
let errorClose = document.getElementById('close-btn');
let errorMessage = document.getElementById('error-message');

function error() {
    errorModal.style.display = 'flex';
    setTimeout(() => {
        errorMessage.classList.add('slide-down');
    }, 200);
}

errorClose.addEventListener('click', ()=>{
    numberInput.value = "3";
    errorMessage.classList.remove('slide-down');
    setTimeout(() => {
        errorModal.style.display = 'none';
    }, 1200);
});