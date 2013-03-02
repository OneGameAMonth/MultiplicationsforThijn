var middle = 250;
var niveauPicked = -1;
var questioncount = 0;
var correctcount = 0;  
var playing = 0;

var IDLE = 0;
var ISPLAYINGMULTYPLE = 1;
var ISPLAYINGDIVISION = 2;
var ISPLAYINGADDUP = 3;
var ISPLAYINGSUBTRACTION = 4;
var SHOWRESULTS = 50;
var randomQuestion = false;
var tmpArray = new Array();

var selectedtable = 0;

var answer = 0;     

function draw() {
    var canvas = document.getElementById('drawing-surface');
    if (canvas.getContext) {
        var c2d=canvas.getContext('2d');
        var bgcolor="#FFFFFF";
        c2d.fillStyle=bgcolor; 
        c2d.clearRect(0,0, 650, 650);
        c2d.fillRect(0,0, 650, 650);
        
        
        c2d.translate(0, 0);
        
        c2d.font = "bold 45pt Formata-Bold";
        c2d.strokeStyle="#222";
        c2d.fillStyle="#222";
        c2d.moveTo(middle, middle);
        c2d.lineWidth=1;
        c2d.textAlign = "center";
        c2d.fillText("Choose a skill!", middle, middle - 90);
    
        c2d.stroke();
        c2d.restore();
        c2d.restore();
        c2d.restore();
    }
}   

function showresults() {
    var canvas = document.getElementById('drawing-surface');
    if (canvas.getContext) {
        var c2d=canvas.getContext('2d');
        var bgcolor="#FFFFFF";
        c2d.fillStyle=bgcolor; 
        c2d.clearRect(0,0, 650, 650);
        c2d.fillRect(0,0, 650, 650);
        
        c2d.translate(0, 0);
        
        c2d.font = "bold 20pt Formata-Bold";
        c2d.strokeStyle="#222";
        c2d.fillStyle="#222";
        c2d.moveTo(middle, middle);
        c2d.lineWidth=1;
        c2d.textAlign     = "center";
        
        if(playing === ISPLAYINGMULTYPLE) {
            c2d.fillText("Results for Multiplications!", middle, middle - 130);
            c2d.fillText("Total questions: " + questioncount + " Correct: " + correctcount, middle, middle - 90);
        }
        if(playing === ISPLAYINGDIVISION) {
        
        }
        if(playing === ISPLAYINGADDUP) {
        
        }
        if(playing === ISPLAYINGSUBTRACTION) {
        
        }
        playing = IDLE;
        //c2d.fillText("Choose a skill!", middle - 160, middle - 90);
        
        c2d.stroke();
        c2d.restore();
        c2d.restore();
        c2d.restore();
    }
}


function multiplySettingsDraw() {
    var canvas = document.getElementById('drawing-surface');
    if (canvas.getContext) {
        var c2d=canvas.getContext('2d');
        var bgcolor="#FFFFFF";
        c2d.fillStyle=bgcolor; 
        c2d.clearRect(0,0, 650, 650);
        c2d.fillRect(0,0, 650, 650);
        
        
        c2d.translate(0, 0);
        
        c2d.font = "bold 45pt Formata-Bold";
        c2d.strokeStyle="#222";
        c2d.fillStyle="#222";
        c2d.moveTo(middle, middle);
        c2d.lineWidth=1;
        c2d.textAlign = "center";
        c2d.fillText("Choose the table!", middle, middle - 90);
    
        c2d.stroke();
        c2d.restore();
        c2d.restore();
        c2d.restore();
    }
}
        
function multiplyDraw() {
    var canvas = document.getElementById('drawing-surface');
    if (canvas.getContext) {
        var c2d=canvas.getContext('2d');
        var bgcolor="#FFFFFF";
        c2d.fillStyle=bgcolor; 
        c2d.clearRect(0,0, 650, 650);
        c2d.fillRect(0,0, 650, 650);
        
        c2d.translate(0, 0);
        
        c2d.font = "bold 90pt Formata-Bold";
        
        c2d.strokeStyle="#222";
        c2d.fillStyle="#222";
        c2d.moveTo(middle, middle);
        c2d.lineWidth=1;
        c2d.textAlign = "center";
        var str1 = questioncount + 1;
        var str2 = " x ";
        var str3 = selectedtable;///getRandomArbitrary(1, 10);
        var done = 0;
        if(randomQuestion) {
            while(done == 0) {
                done = 1;
                str1 = getRandomArbitrary(1, 10);
            
                for (i=0;i<tmpArray.length;i++) {
                if(tmpArray[i] == str1) {
                        done = 0;
                    }
                }
            }
        }
        tmpArray.push(str1);
        answer = str1 * str3;
            
        var n = str1 + str2 + str3; 
        c2d.fillText(n, middle, middle - 90);
        
        c2d.stroke();
        c2d.restore();
        c2d.restore();
        c2d.restore();
    }
}

// Returns a random number between min and max
function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;//Math.random() * (max - min) + min;
}

function next() {

    var input = document.getElementById('answerText');
    questioncount++;
    if(input.value == answer)
        correctcount++;
    if(tmpArray.length == 10) {
        stop();
    } else {
        if(playing === ISPLAYINGMULTYPLE)
            multiplyDraw();
        $(answerText).val('').focus();
    }
}

function stop() {
    randomQuestion = false;
    if(playing !== IDLE) {
        showresults();
        //TODO: show result here!!
    } else {
        draw();
    }
    $(skillbar).show();
    $(gamebar).hide();
}

function multiply() {
    multiplySettingsDraw();
    $(multiplysettingsbar).hide();
    $(skillbar).hide();
    $(multiplysettingsbar).show();
}

function multiplystart(pselectedtable) {
    selectedtable = pselectedtable;
}

function buttonRandomClick() {
    if(!randomQuestion) {
        $(buttonRandom).html('on');
        randomQuestion = true;
    } else {
        $(buttonRandom).html('off');
        randomQuestion = false;
    }
}

function buttonStartMultiply() {
    $(multiplysettingsbar).hide();
    $(skillbar).hide();
    $(gamebar).show();
    resetvalues();
    playing = ISPLAYINGMULTYPLE;
    multiplyDraw();
    $(answerText).val('').focus();
}

function resetvalues() {
    niveauPicked = -1;
    questioncount = IDLE;
    correctcount = IDLE;  
    tmpArray = [];
}

$(window).load(
    function () { 
        $(gamebar).hide();
        $(multiplysettingsbar).hide();
        draw();
        
        $("#stopButton").click(
            function() {
                stop();
            }
        );
        
        $("#next").click(
            function() {
                next();
            }
        );
        
        $("#multiply").click(
            function() {
                multiply();
            }
        );
        
        $("#buttonmultiply1").click(
            function() {
                $("#buttonmultiply10").css("background-color", "");
                $("#buttonmultiply9").css("background-color", "");
                $("#buttonmultiply8").css("background-color", "");
                $("#buttonmultiply7").css("background-color", "");
                $("#buttonmultiply6").css("background-color", "");
                $("#buttonmultiply5").css("background-color", "");
                $("#buttonmultiply4").css("background-color", "");
                $("#buttonmultiply3").css("background-color", "");
                $("#buttonmultiply2").css("background-color", "");
                $("#buttonmultiply1").css("background-color", "#2846ff");
                multiplystart(1);
            }
        );
        
        $("#buttonmultiply2").click(
            function() {
                $("#buttonmultiply10").css("background-color", "");
                $("#buttonmultiply9").css("background-color", "");
                $("#buttonmultiply8").css("background-color", "");
                $("#buttonmultiply7").css("background-color", "");
                $("#buttonmultiply6").css("background-color", "");
                $("#buttonmultiply5").css("background-color", "");
                $("#buttonmultiply4").css("background-color", "");
                $("#buttonmultiply3").css("background-color", "");
                $("#buttonmultiply2").css("background-color", "#2846ff");
                $("#buttonmultiply1").css("background-color", "");
                multiplystart(2);
            }
        );
        
        $("#buttonmultiply3").click(
            function() {
                $("#buttonmultiply10").css("background-color", "");
                $("#buttonmultiply9").css("background-color", "");
                $("#buttonmultiply8").css("background-color", "");
                $("#buttonmultiply7").css("background-color", "");
                $("#buttonmultiply6").css("background-color", "");
                $("#buttonmultiply5").css("background-color", "");
                $("#buttonmultiply4").css("background-color", "");
                $("#buttonmultiply3").css("background-color", "#2846ff");
                $("#buttonmultiply2").css("background-color", "");
                $("#buttonmultiply1").css("background-color", "");
                multiplystart(3);
            }
        );
        
        $("#buttonmultiply4").click(
            function() {
                $("#buttonmultiply10").css("background-color", "");
                $("#buttonmultiply9").css("background-color", "");
                $("#buttonmultiply8").css("background-color", "");
                $("#buttonmultiply7").css("background-color", "");
                $("#buttonmultiply6").css("background-color", "");
                $("#buttonmultiply5").css("background-color", "");
                $("#buttonmultiply4").css("background-color", "#2846ff");
                $("#buttonmultiply3").css("background-color", "");
                $("#buttonmultiply2").css("background-color", "");
                $("#buttonmultiply1").css("background-color", "");
                multiplystart(4);
            }
        );
        
        $("#buttonmultiply5").click(
            function() {
                $("#buttonmultiply10").css("background-color", "");
                $("#buttonmultiply9").css("background-color", "");
                $("#buttonmultiply8").css("background-color", "");
                $("#buttonmultiply7").css("background-color", "");
                $("#buttonmultiply6").css("background-color", "");
                $("#buttonmultiply5").css("background-color", "#2846ff");
                $("#buttonmultiply4").css("background-color", "");
                $("#buttonmultiply3").css("background-color", "");
                $("#buttonmultiply2").css("background-color", "");
                $("#buttonmultiply1").css("background-color", "");
                multiplystart(5);
            }
        );
        
        $("#buttonmultiply6").click(
            function() {
                $("#buttonmultiply10").css("background-color", "");
                $("#buttonmultiply9").css("background-color", "");
                $("#buttonmultiply8").css("background-color", "");
                $("#buttonmultiply7").css("background-color", "");
                $("#buttonmultiply6").css("background-color", "#2846ff");
                $("#buttonmultiply5").css("background-color", "");
                $("#buttonmultiply4").css("background-color", "");
                $("#buttonmultiply3").css("background-color", "");
                $("#buttonmultiply2").css("background-color", "");
                $("#buttonmultiply1").css("background-color", "");
                multiplystart(6);
            }
        );
        
        $("#buttonmultiply7").click(
            function() {
                $("#buttonmultiply10").css("background-color", "");
                $("#buttonmultiply9").css("background-color", "");
                $("#buttonmultiply8").css("background-color", "");
                $("#buttonmultiply7").css("background-color", "#2846ff");
                $("#buttonmultiply6").css("background-color", "");
                $("#buttonmultiply5").css("background-color", "");
                $("#buttonmultiply4").css("background-color", "");
                $("#buttonmultiply3").css("background-color", "");
                $("#buttonmultiply2").css("background-color", "");
                $("#buttonmultiply1").css("background-color", "");
                multiplystart(7);
            }
        );
        
        $("#buttonmultiply8").click(
            function() {
                $("#buttonmultiply10").css("background-color", "");
                $("#buttonmultiply9").css("background-color", "");
                $("#buttonmultiply8").css("background-color", "#2846ff");
                $("#buttonmultiply7").css("background-color", "");
                $("#buttonmultiply6").css("background-color", "");
                $("#buttonmultiply5").css("background-color", "");
                $("#buttonmultiply4").css("background-color", "");
                $("#buttonmultiply3").css("background-color", "");
                $("#buttonmultiply2").css("background-color", "");
                $("#buttonmultiply1").css("background-color", "");
                multiplystart(8);
            }
        );
        
        $("#buttonmultiply9").click(
            function() {
                $("#buttonmultiply10").css("background-color", "");
                $("#buttonmultiply9").css("background-color", "#2846ff");
                $("#buttonmultiply8").css("background-color", "");
                $("#buttonmultiply7").css("background-color", "");
                $("#buttonmultiply6").css("background-color", "");
                $("#buttonmultiply5").css("background-color", "");
                $("#buttonmultiply4").css("background-color", "");
                $("#buttonmultiply3").css("background-color", "");
                $("#buttonmultiply2").css("background-color", "");
                $("#buttonmultiply1").css("background-color", "");
                multiplystart(9);
            }
        );
        
        $("#buttonmultiply10").click(
            function() {
                $("#buttonmultiply10").css("background-color", "#2846ff");
                $("#buttonmultiply9").css("background-color", "");
                $("#buttonmultiply8").css("background-color", "");
                $("#buttonmultiply7").css("background-color", "");
                $("#buttonmultiply6").css("background-color", "");
                $("#buttonmultiply5").css("background-color", "");
                $("#buttonmultiply4").css("background-color", "");
                $("#buttonmultiply3").css("background-color", "");
                $("#buttonmultiply2").css("background-color", "");
                $("#buttonmultiply1").css("background-color", "");
                multiplystart(10);
            }
        );
        
        $("#buttonRandom").click(
            function() {
                buttonRandomClick();
            }
        );
        
        $("#startbutton").click(
            function() {
                $("#buttonRandom").html('off');
                $("#buttonmultiply10").css("background-color", "");
                $("#buttonmultiply9").css("background-color", "");
                $("#buttonmultiply8").css("background-color", "");
                $("#buttonmultiply7").css("background-color", "");
                $("#buttonmultiply6").css("background-color", "");
                $("#buttonmultiply5").css("background-color", "");
                $("#buttonmultiply4").css("background-color", "");
                $("#buttonmultiply3").css("background-color", "");
                $("#buttonmultiply2").css("background-color", "");
                $("#buttonmultiply1").css("background-color", "");
                buttonStartMultiply();
            }
        );
    }
);