var invalidChars = [",",".","-","+","e",];
inputNumber.addEventListener("keydown", function(e) {
  if (invalidChars.includes(e.key)) e.preventDefault();
});

var ctrlActive = false,
    vActive = false;

document.body.addEventListener('keyup', event => {
  if(event.key == 'Control') ctrlActive = false;
  if(event.code == 'KeyV') vActive = false;
})

document.body.addEventListener('keydown', event => {
  if(event.key == 'Control') ctrlActive = true;
  if(ctrlActive == true && event.code == 'KeyV') {
    event.preventDefault()
    alert(`'CONTROL' + 'V' is not allowed on this webpage.`)
  }
})

function toggleCheck() {
    // var check = [document.getElementById("checkboxProcess").checked, document.getElementById("checkboxTable").checked, document.getElementById("checkboxGraph").checked],
    //     checkName = ['process','table','graph'];
    // for(let i = 0; i < check.length; i++) {
    //     if(check[i]) console.log('check:\t'+check+'\n\t\t'+checkName)
    // }
}

function wipeProcess(){
    document.getElementById('displayProcess').innerHTML = '';
    document.getElementById('displayProcess').style.display = 'none';
}

function calculate() {
    var check = [document.getElementById("checkboxProcess").checked, document.getElementById("checkboxTable").checked, document.getElementById("checkboxGraph").checked];
    // toggleCheck();
    let number = document.getElementById('inputNumber').value;
    // if(number == '') return console.log('There is no input.');
    // console.log('The input is '+number+', which rounded is '+(Math.round(number))+'.')
    if(number == '') {
        tEM('input', 'block'); tEM('check', 'none');
        wipeProcess();
        return;
    } else if(check[0] == false && check[1] == false && check[2] == false) {
        tEM('input', 'none'); tEM('check', 'block');
        wipeProcess();
        return;
    } else {
        tEM('input', 'none'); tEM('check', 'none');
    }
    // calculating data
    var data = [number];
    while(number != 1) {
        if(Number.isInteger(0.5 * number)) {
            number = number * 0.5;
            data.push(number);
        } else {
            number = number * 3 + 1;
            data.push(number);
            number = number * 0.5;
            data.push(number);
        }
    }
    // console.log(data)
    // end of data calculation
    var textProcess = "";
    // console.log(check[0])
    if(check[0]) {
        for(let i = 0; i < (data.length - 1); i++) {
            if(Number.isInteger((data[i])*0.5)) {
                textProcess += data[i]+' is even → the new number is '+data[i]+' ÷ 2 = '+(data[i]/2)+'<br>';
            } else {
                textProcess += data[i]+' is odd → the new number is '+data[i]+' × 3 + 1 = '+(data[i]*3+1)+'<br>';
            }
        }
        // console.log(textProcess+'\nWe have ended up in an endless loop of 1 --> 4 --> 2 --> 1.')
        document.getElementById('displayProcess').innerHTML = textProcess;
        tDMC('displayProcess', 'block');
        // console.log(`${textProcess.split('<')[0].length*10}px`);
        document.getElementById('splitright').style.width = `${textProcess.split('<')[0].length*10 + 10}px`;
    }
}

function tDMC(id, displayName){ // tDMC = toggleDisplayMainContent
    document.getElementById(id).style.display = displayName;
}
function tEM(id, displayName){ // tEM = toggleErrorMessage
    id = 'errorMessage-'+id+'=null';
    document.getElementById(id).style.display = displayName;
}

// testForWindowWidth can be ignored temporarily, and will be used in the next update.
// ---------------------------------------------------------------------------------------
// setInterval(testForWindowWidth, 20);

function testForWindowWidth() {
    var sufficientFontSize = 35,
        titleBarHeight = window.getComputedStyle(document.querySelector('#bar')).height.toString(),
        windowWidth = window.innerWidth;
    console.log(windowWidth);
    document.getElementById("splitleft").style.top = titleBarHeight;
    document.getElementById("splitright").style.top = titleBarHeight;
    if(windowWidth > 508) {
        document.getElementById("title").style.fontSize = '35px';
    } else {
        sufficientFontSize = (windowWidth)/14.5;
        document.getElementById("title").style.fontSize = `${sufficientFontSize}px`;
    }
    // if(windowWidth > 800) {
    //     document.getElementById('homepagelink').style.right = '10px';
    // } else {
    //     document.getElementById('homepagelink').style.right = '0px';
    // }
}