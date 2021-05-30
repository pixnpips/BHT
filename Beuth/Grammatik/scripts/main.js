

$(document).ready(function () {


 //-----------------input focus und Buttons default----//
  

/*-------------------variablen/Konstanten----------------------*/
    let word="";
    let state=0;
    const AusdruckArray=['S','A','AOA','(A)','Z'];
    const OpArray=['+','-','*','/'];
    var Word=""; 
    let dosequence=false;
    var time=1000;
    let max=10;
    let timeInterval=false;

    var myInterval; /*setInterval(generateRight,time);*/

    $("#speedtext").text(time+"ms");

   


/*-------------------------------Funktionen----------------------*/
function getRandomInt(min, max) { 
  return min + Math.round(Math.random() * max);
}


function ShowWord() {
    setOutput();  /// Hier wird das Array gleich im Output angezeigt, muss nicht zwingend sein
}



/*---------------------------------------------Step Funktionen--------------------------------------------------------*/


function step(){
  const map={
    0:StartST,
    1:replaceSST,
    2:replaceA1ST,
    3:replaceA2ST,
    4:replaceOST,
    5:replaceZST,
  };
  map[state]();
}

function StartST(){
  Start();
  ShowWord();
  State=1;
  $("#statustext").html("Simulation fortsetzen mit Step");
  $("#status").css("background-color", "rgb(190, 229, 255)");
  colors();
}

function replaceSST(){
  replaceS();
  ShowWord();
  state=2;
  colors();
}


function replaceA1ST(){
  let m=getRandomInt(1,max);
  for(i=0;i<=m;i++){
    replaceA1();
  }
  state=3;
  ShowWord();
  colors();
}

function replaceA2ST(){
  replaceA2();
  state=4;
  ShowWord();
  colors();
}


function replaceOST(){
  let z= Indexing('O');

  for(i=0;i<=z;i++){
    replaceO();
  }
  state=5;
  ShowWord();
  colors();
}

function replaceZST(){
  let z=Indexing('Z');
  for (i=0;i<=z;i++){
    replaceZ();
  }
  state=0;
  ShowWord();
  colors();
  $("#statustext").html("G&uumlltige Zahlenfolge generiert");
  $("#status").css("background-color", "rgb(79, 202, 54)");
}



/*-------------------------------------------------Generator Funktionen------------------------------------------------*/

function generateCorrect(){
  //alert(Word);
  Start();
  //alert(Word);
  replaceS();
  //alert(Word);
  let m=getRandomInt(1,max);
  for(i=0;i<=m;i++){
    replaceA1();
  }
  replaceA2();
  //alert(Word);
  let z=Indexing('Z');
  for (i=0;i<=z;i++){
    replaceZ();
  }
  //alert(Word);
  z= Indexing('O')
  for(i=0;i<=z;i++){
    replaceO();
  }
  //alert(Word);
  ShowWord();
  $("#statustext").html("G&uumlltige Zahlenfolge generiert");
  $("#status").css("background-color", "rgb(79, 202, 54)");
}

function Start(){
  Word="S";
  state=1;
}

function replaceS(){
  var x= Word.replace(/S/g,"A");
  Word=x;
  state=2;
}


function replaceA1(){
    var x= Word.replace("A", AusdruckArray[getRandomInt(2,2)]);
    Word = x;
    state=3;
}

function replaceA2(){
  var x= Word.replace(/A/g,"Z")
  Word=x;
  state=4;
}


function replaceO(){
  var x = Word.replace("O",OpArray[getRandomInt(0,3)]);
  Word=x;
  state=5;
}

function replaceZ(){
 
  var num=getRandomInt(1,8);
  var x = Word.replace("Z", num.toString());
  Word=x;
  state=6;
}

function Indexing(z){
  let x = Word;
  let y=0;
  for (i=0; i<x.length; i++){
    if (x.charAt(i)==z){
      y++;
    }
  }
  return y;
}

String.prototype.replaceAt = function(index, replacement) {
  return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}

function generateWrong(){
  generateCorrect();
  let x =Word.replaceAt((getRandomInt(0,Word.length-1))," ");
  Word=x;
  ShowWord(); 
  $("#statustext").html("Ung&uumlltige Zahlenfolge generiert");
  $("#status").css("background-color", "red");
}

/*-----------------------------------------------Sequenzfunktionen--------------------------------------------------*/
function Start1(){
  Word="S";

}

function replaceS1(){
  var x= Word.replace(/S/g,"A");
  Word=x;
}

function replaceA11(){
  let m=getRandomInt(1,max);
  for(i=0;i<=m;i++){
    var x= Word.replace("A", AusdruckArray[getRandomInt(2,2)]);
    Word = x;
  }
}

function replaceA21(){
  var x= Word.replace(/A/g,"Z")
  Word=x;
}

function replaceO1(){
  let z= Indexing('O');
  for(i=0;i<=z;i++){
    var x = Word.replace("O",OpArray[getRandomInt(0,3)]);
    Word=x;
  }
  
}

function replaceZ1(){
  let z=Indexing('Z');
  for (i=0;i<=z;i++){
    replaceZ();
  }
}

function setColors(){
  state+=1;
  colors();
}

function generateSequence(){
  state=0;
  $("#statustext").html("Simulation l&aumluft");
  $("#status").css("background-color", "rgb(190, 229, 255)");
  disablebuttons();
  setTimeout(setColors,0*time);
  setTimeout(Start1(),time);
  setTimeout(ShowWord,2*time);
  setTimeout(replaceSSE(),3*time);
}



function replaceSSE(){
  ShowWord();
  setTimeout(replaceS1,1*time);
  setTimeout(ShowWord,2*time);
  setTimeout(setColors,1*time);
  setTimeout(replaceA1SE(),3*time);
}



function replaceA1SE(){
  setTimeout(ShowWord,1*time);
  setTimeout(replaceA11,1.99*time);
  setTimeout(setColors,2*time);
  setTimeout(ShowWord,3*time);
  setTimeout(replaceA2SE(),3*time);
}


function replaceA2SE(){
  setTimeout(ShowWord,time);
  setTimeout(replaceA21,2*time);
  setTimeout(setColors,3*time);
  setTimeout(ShowWord,3*time);
  setTimeout(replaceOSE(),4*time);
}


function replaceOSE(){
  setTimeout(ShowWord,3*time);
  setTimeout(replaceO1,3*time);
  setTimeout(setColors,4*time);
  setTimeout(ShowWord,4*time);
  setTimeout(replaceZSE(),4*time);
}


function replaceZSE(){
  setTimeout(ShowWord,4*time);
  setTimeout(replaceZ1,4*time);
  setTimeout(ShowWord,5*time);
  setTimeout(setColors,4*time);
  setTimeout(finished,5*time);
  setTimeout(colors,5*time);
}




/*-----------------------------------------------------Buttons-------------------------------------------------------*/
$("#but1").click(generateCorrect);

$("#but2").click(generateWrong);

$("#but3").click(generateSequence);

$("#but4").click(step);




function colors(){
  if (state==0){
    $("#tr1").css("background-color", "rgb(190, 229, 255)");
    $("#tr2").css("background-color", "rgb(190, 229, 255)");
    $("#tr3").css("background-color", "rgb(190, 229, 255)");
    $("#tr4").css("background-color", "rgb(190, 229, 255)");
    $("#tr5").css("background-color", "rgb(190, 229, 255)");
    $("#tr6").css("background-color", "rgb(190, 229, 255)");
  }else if(state==1){

    $("#tr1").css("background-color", "yellow");
    $("#tr2").css("background-color", "rgb(190, 229, 255)");
    $("#tr3").css("background-color", "rgb(190, 229, 255)");
    $("#tr4").css("background-color", "rgb(190, 229, 255)");
    $("#tr5").css("background-color", "rgb(190, 229, 255)");
    $("#tr6").css("background-color", "rgb(190, 229, 255)");
  }else if (state==2){

    $("#tr1").css("background-color", "rgb(190, 229, 255)");
    $("#tr2").css("background-color", "yellow");
    $("#tr3").css("background-color", "yellow");
    $("#tr4").css("background-color", "rgb(190, 229, 255)");
    $("#tr5").css("background-color", "rgb(190, 229, 255)");
    $("#tr6").css("background-color", "rgb(190, 229, 255)");
  }else if (state==3){

    $("#tr1").css("background-color", "rgb(190, 229, 255)");
    $("#tr2").css("background-color", "rgb(190, 229, 255)");
    $("#tr3").css("background-color", "rgb(190, 229, 255)");
    $("#tr4").css("background-color", "yellow");
    $("#tr5").css("background-color", "rgb(190, 229, 255)");
    $("#tr6").css("background-color", "rgb(190, 229, 255)");
  }else if (state==4){

    $("#tr1").css("background-color", "rgb(190, 229, 255)");
    $("#tr2").css("background-color", "rgb(190, 229, 255)");
    $("#tr3").css("background-color", "rgb(190, 229, 255)");
    $("#tr4").css("background-color", "rgb(190, 229, 255)");
    $("#tr5").css("background-color", "yellow");
    $("#tr6").css("background-color", "rgb(190, 229, 255)");
  }else if (state==5){

    $("#tr1").css("background-color", "rgb(190, 229, 255)");
    $("#tr2").css("background-color", "rgb(190, 229, 255)");
    $("#tr3").css("background-color", "rgb(190, 229, 255)");
    $("#tr4").css("background-color", "rgb(190, 229, 255)");
    $("#tr5").css("background-color", "rgb(190, 229, 255)");
    $("#tr6").css("background-color", "yellow");
  }
}

function finished(){
  $("#statustext").text("Simulation erfolgreich abgeschlosen");
  $("#status").css("background-color", "rgb(79, 202, 54)");
  state=0;
  enablebuttons();
};

function setOutput(){
  $("#outputtext").html(Word);
}
  
  
  
    
    //---------------------------------------Button Events--------------------------------------------//
    

function Test2(){
  let A =["A","B","C","B","B"]
  for (i=0;i<A.length;i++){
    if (A[i]=="B"){
      A[i]="D";
    }
  }
  alert(A);
}

function Test(){
  alert(getRandomInt(1,1));
}

    function disablebuttons (){
      $("button").prop('disabled', true);
    }

    function enablebuttons(){
      $("button").prop('disabled', false);
    }



    //--------------------------Speed-------------------------------//



    $("#slider").on("change",function(){
      time = $(this).val();
      $("#speedtext").text(time+"ms");
    });
});

