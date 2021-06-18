

$(document).ready(function () {

/*-------------------variablen/Konstanten----------------------*/
    
    let state=0;
    let way=0;
    let max=8;
    const AusdruckArray=['S','A','AOA','(A)','Z'];
    const OpArray=['+','-','*','/'];
    const ZahlArray=['1','2','3','4','5','6','7','8','9','0'];
    const KlammerArray=['(',')'];
    const GesamtArray=['+','-','*','/','1','2','3','4','5','6','7','8','9','0','(',')',' '];
    var WordArray;
    var Word=""; 
    let dosequence=false;
    var time=1000;
    var Stackarray=[];
    let fk2=false;
    let isfinished=false;
    var myInterval; /*setInterval(generateRight,time);*/

    $("#speedtext").text(time+"ms")

    $("#but3").hide()
    $("#but4").hide()
    




  Array.prototype.insert = function ( index, item ) {
      this.splice( index, 0, item );
  };  
  
  String.prototype.replaceAt = function(index, replacement) {
    return this.substr(0, index) + replacement + this.substr(index + replacement.length);
  }

   


/*-------------------------------Funktionen----------------------*/
function getRandomInt(min, max) { 
  return min + Math.round(Math.random() * max);
}


function ShowWord() {
  $("#eingabefeld").val(Word);  /// Hier wird das Array gleich im Output angezeigt, muss nicht zwingend sein
}

function ShowArray(){
  $("#array").html(WordArray);
}






/*-------------------------------------------------Generator Funktionen------------------------------------------------*/

function generateCorrect(){
  //alert(Word);
  Start();
  //alert(Word);
  replaceS();
  //alert(Word);
  let m=getRandomInt(1,max)+2;
  
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
  $("#statustext").html("G&uumlltige Zahlenfolge generiert <br> Read Input um Kellerautomat zu starten");
  $("#status").css("background-color", "rgb(79, 202, 54)");
  $("#array").html("");

  $("#but3").hide()
  $("#but4").hide()


}

function Start(){
  Word="S";
  
}

function replaceS(){
  var x= Word.replace(/S/g,"A");
  Word=x;
  
}


function replaceA1(){
    var x= Word.replace("A", AusdruckArray[getRandomInt(2,2)]);
    Word = x;
    
}

function replaceA2(){
  var x= Word.replace(/A/g,"Z")
  Word=x;
  
}


function replaceO(){
  var x = Word.replace("O",OpArray[getRandomInt(0,3)]);
  Word=x;
  
}

function replaceZ(){
 
  var num=getRandomInt(1,8);
  var x = Word.replace("Z", num.toString());
  Word=x;
  
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



function generateWrong(){
  generateCorrect();
  let x =Word.replaceAt((getRandomInt(0,Word.length-1))," ");
  let y= x.replace(" ", "");
  Word=y;
  ShowWord(); 
  $("#statustext").html("Ung&uumlltige Zahlenfolge generiert <br> <br> Read Input um Kellerautomat zu starten");
  $("#status").css("background-color", "red");
  $("#but3").hide()
  $("#but4").hide()
}


//---------------------------------------------------Input Funktion------------------------------------------------------//

function WordtoArray(){
  isfinished=false;
  let input= document.getElementById("eingabefeld").value;
  WordArray =input.split('');
  $("#array").html(WordArray);
  var iscorrect=true;
  for(i=0;i<input.length;i++){
    if (GesamtArray.includes(input.charAt(i))){
      iscorrect=true;
    }else{
      iscorrect=false;
    }
  }

  if (iscorrect){
    $("#statustext").html("Zu verarbeitendes Restwort:");
    $("#status").css("background-color", "rgb(190, 229, 255)");
  }else{
    $("#status").css("background-color", "red");
    $("#statustext").html("Zeichen nicht im Alphabet enthalten"); 
  }

  if(input===""||input===" "){
    $("#status").css("background-color", "red");
    $("#statustext").html("Bitte geben sie mindestens ein Zeichen ein"); 
    $("#but3").hide();
    $("#but4").hide();
  }else{
    $("#but3").show();
    $("#but4").show();
  }
  
  F0();
}

/*---------------------------------------------Step Funktionen--------------------------------------------------------*/


function step(){
  const map={
    0:F0,
    1:F1,
    2:F2,
    3:F3,
    4:F4,
    5:F5,
    6:finished,
  };
  map[state]();
}

function F0(){
  state=0;
  way=0;
  colors();
  stepcolors();
  state=1;
  way=1;
  Stackarray=[];
  $("#keller").html("-");
  if(isfinished){
    $("#status").css("background-color", "rgb(190, 229, 255)");
    $("#statustext").html("Zu verarbeitendes Restwort:");
    let input= document.getElementById("eingabefeld").value;
    WordArray =input.split('');
    ShowArray();
  }
}

function F1(){
  colors();
  stepcolors();
  Stackarray.push('$');
  $("#keller").html(Stackarray);
  state=2;
}

function F2(){
  
  colors();
  if (WordArray[0]==KlammerArray[0]){
    way=22;
    stepcolors();
    state=4;
    Stackarray.insert(0,'K');
  } else if(ZahlArray.includes(WordArray[0])){
    way=21;
    stepcolors();
    state=3;
  } else {
    fault();
  }
}

function F3(){
  
  WordArray.shift();
  ShowArray(); 
  colors();
  if (WordArray.length<1){
    way=32;
    stepcolors();
    state=3
    //ShowArray();
    state=6;
  } else if(OpArray.includes(WordArray[0])){
    way=31;
    stepcolors();
    state=4;
  } else {
    fault();
  }
}

function F4(){
  $("#keller").html(Stackarray);
  WordArray.shift();
  ShowArray(); 
  colors();
  if(ZahlArray.includes(WordArray[0])){
    way=42;
    stepcolors();
    state=5;
  }else if (WordArray[0]==KlammerArray[0]){
    Stackarray.insert(0,'K');
    way=41;
    stepcolors();
    state=4;
  } else {
    fault();
  }
}

function F5(){
  $("#keller").html(Stackarray);
  WordArray.shift();
  ShowArray(); 
  colors();
  if (OpArray.includes(WordArray[0])){
    way=51;
    stepcolors();
    state=4;
  }else if (WordArray[0]==KlammerArray[1]&&Stackarray[0]=='K'){
    way=53;
    stepcolors();
    state=5;
    Stackarray.shift();
  }else if(WordArray.length<1&&Stackarray[0]=='$'){
    way=52;
    stepcolors();
    state=3;
  }else if(WordArray.length==0&&Stackarray[0]!='$'){
    faultkeller();
  }else if (WordArray[0]==KlammerArray[1]&&Stackarray[0]!='K'){
    fk2=true;
    faultkeller();
  }
  else {
    fault();
  }  
}



function finished(){
  $("#statustext").text("Endzustand 3 erreicht, Wort akzeptiert");
  $("#status").css("background-color","rgb(0,255,0)");
  $("#tr5").css("background-color","rgb(0,255,0)");
  $("#k3").css("background-color","rgb(0,255,0)");
  $("#ph5").css("color","rgb(79, 202, 54)");
  state=0;
  enablebuttons();
  let input= document.getElementById("eingabefeld").value;
  WordArray =input.split('');
  isfinished=true;
  $("#keller").html("-");
};

function fault(){
  $("#statustext").html( "&Uumlbergang nicht definiert bei Zustand "+state+" Zeichen: " +WordArray[0]+" Wort nicht akzeptiert");
  $("#status").css("background-color", "red");
  if (state==1){
    $("#k1").css("background-color", "red");
  }else if(state==2){
    $("#k2").css("background-color", "red");
  }else if(state==3){
    $("#k3").css("background-color", "red");
  }else if(state==4){
    $("#k4").css("background-color", "red");
  }else if(state==5){
    $("#k5").css("background-color", "red");
  }
  way=0;
  stepcolors();
  isfinished=false;
  state=0;
  $("#but3").hide();
  $("#but4").hide();
  if(WordArray.length<1){
    $("#statustext").html("Wort zu Ende, Endzustand nicht erreicht, Wort nicht akzeptiert")
  }
  
};

function faultkeller(){
  if(fk2){
    $("#statustext").html("Kein K im Keller, &Uumlbergang nicht akzeptiert bei Zustand: "+ state);
  } else {
    $("#statustext").html( "&Uumlbergang nicht definiert bei Zustand "+state+" Zeichen: K im Keller, Wort nicht akzeptiert");
  }
  
  $("#status").css("background-color", "red");
  if (state==1){
    $("#k1").css("background-color", "red");
  }else if(state==2){
    $("#k2").css("background-color", "red");
  }else if(state==3){
    $("#k3").css("background-color", "red");
  }else if(state==4){
    $("#k4").css("background-color", "red");
  }else if(state==5){
    $("#k5").css("background-color", "red");
  }
  
  way=0;
  stepcolors();
  isfinished=false;
  state=0;
  $("#but3").hide();
  $("#but4").hide();
  fk2=false;
};




/*-----------------------------------------------Sequenzfunktionen--------------------------------------------------*/

 //--------------------------Speed-------------------------------//
$("#slider").on("change",function(){
  time = $(this).val();
  $("#speedtext").text(time+"ms");
});



/*-----------------------------------------------------Buttons-------------------------------------------------------*/
$("#but5").click(WordtoArray);


$("#but1").click(generateCorrect);

$("#but2").click(generateWrong);

$("#but3").click();

$("#but4").click(step);



function test(){
  alert(" State: "+state+" way: "+ way+ " WordArray: "+WordArray);
}

function Test2(){
  let A =["A","B","C","B","B"]
  for (i=0;i<A.length;i++){
    if (A[i]=="B"){
      A[i]="D";
    }
  }
  alert(A);
}

function disablebuttons (){
  $("button").prop('disabled', true);
}

function enablebuttons(){
  $("button").prop('disabled', false);
}

function EnalbeStepSeq(){
  $("#b4").prop('disabled', false);
    $("#b3").prop('disabled', false);

}

/*----------------------------------Farben und Highlights Mouseover-------------------------------*/



  $("#eingabefeld").focus(function(){
    $(this).css("background-color", "yellow");
    $("#but3").hide()
    $("#but4").hide()
    $("#statustext").html("Geben sie ein Wort ein");
    $("#status").css("background-color", "rgb(190, 229, 255)");

  });
  $("#eingabefeld").blur(function(){
    $(this).css("background-color", "white"); 
  });

  $("#k1").on({
    mouseenter: function(){
      $(this).css("background-color", "rgb(250, 250, 58)");
      $("#tr1").css("background-color", "rgb(250, 250, 58)");
    },
        
    mouseleave: function(){
      $(this).css("background-color", "rgb(79, 202, 54)");;
      $("#tr1").css("background-color", "rgb(190, 229, 255)");
    },
  });

  $("#k2").on({
    mouseenter: function(){
      $(this).css("background-color", "rgb(250, 250, 58)");
      $("#tr2").css("background-color", "rgb(250, 250, 58)");
      $("#tr3").css("background-color", "rgb(250, 250, 58)");
    },
        
    mouseleave: function(){
      $(this).css("background-color", "rgb(79, 202, 54)");
      $("#tr2").css("background-color", "rgb(190, 229, 255)");
      $("#tr3").css("background-color", "rgb(190, 229, 255)");
    },
  });
  $("#k3").on({
    mouseenter: function(){
      $(this).css("background-color", "rgb(250, 250, 58)");
      $("#tr4").css("background-color", "rgb(250, 250, 58)");
      $("#tr5").css("background-color", "rgb(250, 250, 58)");
    },
        
    mouseleave: function(){
      $(this).css("background-color", "rgb(79, 202, 54)");
      $("#tr4").css("background-color", "rgb(190, 229, 255)");
      $("#tr5").css("background-color", "rgb(190, 229, 255)");
    },
  });
  $("#k4").on({
    mouseenter: function(){
      $(this).css("background-color", "rgb(250, 250, 58)");
      $("#tr6").css("background-color", "rgb(250, 250, 58)");
      $("#tr7").css("background-color", "rgb(250, 250, 58)");
      
    },
        
    mouseleave: function(){
      $(this).css("background-color", "rgb(79, 202, 54)");
      $("#tr6").css("background-color", "rgb(190, 229, 255)");
      $("#tr7").css("background-color", "rgb(190, 229, 255)");
    },
  });

  
  $("#k5").on({
    mouseenter: function(){
      $(this).css("background-color", "rgb(250, 250, 58)");
      $("#tr8").css("background-color", "rgb(250, 250, 58)");
      $("#tr9").css("background-color", "rgb(250, 250, 58)");
      $("#tr10").css("background-color", "rgb(250, 250, 58)");
    },
        
    mouseleave: function(){
      $(this).css("background-color", "rgb(79, 202, 54)");
      $("#tr8").css("background-color", "rgb(190, 229, 255)");
      $("#tr9").css("background-color", "rgb(190, 229, 255)");
      $("#tr10").css("background-color", "rgb(190, 229, 255)");
    },
  });


  
 
 

  


  /*---------------------------Color Functions Kreise, Tabelle, Übergänge-----------------*/
  
  
  function colors(){
    if (state==0){
      $("#tr1").css("background-color", "rgb(190, 229, 255)");
      $("#tr2").css("background-color", "rgb(190, 229, 255)");
      $("#tr3").css("background-color", "rgb(190, 229, 255)");
      $("#tr4").css("background-color", "rgb(190, 229, 255)");
      $("#tr5").css("background-color", "rgb(190, 229, 255)");
      $("#tr6").css("background-color", "rgb(190, 229, 255)");
      $("#tr6").css("background-color", "rgb(190, 229, 255)");
      $("#tr7").css("background-color", "rgb(190, 229, 255)");
      $("#tr8").css("background-color", "rgb(190, 229, 255)");
      $("#tr9").css("background-color", "rgb(190, 229, 255)");
      $("#tr10").css("background-color", "rgb(190, 229, 255)");

      $("#k1").css("background-color", "rgb(79, 202, 54)");
      $("#k2").css("background-color", "rgb(79, 202, 54)");
      $("#k3").css("background-color", "rgb(79, 202, 54)");
      $("#k4").css("background-color", "rgb(79, 202, 54)");
      $("#k5").css("background-color", "rgb(79, 202, 54)");


    }else if(state==1){

     

      $("#k1").css("background-color", "rgb(250, 250, 58)");
      $("#k2").css("background-color", "rgb(79, 202, 54)");
      $("#k3").css("background-color", "rgb(79, 202, 54)");
      $("#k4").css("background-color", "rgb(79, 202, 54)");
      $("#k5").css("background-color", "rgb(79, 202, 54)");

    }else if (state==2){

      

      $("#k1").css("background-color", "rgb(79, 202, 54)");
      $("#k2").css("background-color", "rgb(250, 250, 58)");
      $("#k3").css("background-color", "rgb(79, 202, 54)");
      $("#k4").css("background-color", "rgb(79, 202, 54)");
      $("#k5").css("background-color", "rgb(79, 202, 54)");
      

    }else if (state==3){

      

      $("#k1").css("background-color", "rgb(79, 202, 54");
      $("#k2").css("background-color", "rgb(79, 202, 54)");
      $("#k3").css("background-color", "rgb(250, 250, 58)");
      $("#k4").css("background-color", "rgb(79, 202, 54)");
      $("#k5").css("background-color", "rgb(79, 202, 54)");

    }else if (state==4){

      

      $("#k1").css("background-color", "rgb(79, 202, 54)");
      $("#k2").css("background-color", "rgb(79, 202, 54)");
      $("#k3").css("background-color", "rgb(79, 202, 54)");
      $("#k4").css("background-color", "rgb(250, 250, 58)");
      $("#k5").css("background-color", "rgb(79, 202, 54)");

    }else if (state==5){

      $("#k1").css("background-color", "rgb(79, 202, 54)");
      $("#k2").css("background-color", "rgb(79, 202, 54)");
      $("#k3").css("background-color", "rgb(79, 202, 54)");
      $("#k4").css("background-color", "rgb(79, 202, 54)");
      $("#k5").css("background-color", "rgb(250, 250, 58)");
    }
  }


  function stepcolors(){
    if(way==0) {

      $("#tr1").css("background-color", "rgb(190, 229, 255)");
      $("#tr2").css("background-color", "rgb(190, 229, 255)");
      $("#tr3").css("background-color", "rgb(190, 229, 255)");
      $("#tr4").css("background-color", "rgb(190, 229, 255)");
      $("#tr5").css("background-color", "rgb(190, 229, 255)");
      $("#tr6").css("background-color", "rgb(190, 229, 255)");
      $("#tr6").css("background-color", "rgb(190, 229, 255)");
      $("#tr7").css("background-color", "rgb(190, 229, 255)");
      $("#tr8").css("background-color", "rgb(190, 229, 255)");
      $("#tr9").css("background-color", "rgb(190, 229, 255)");
      $("#tr10").css("background-color", "rgb(190, 229, 255)");

      $("#ph1").css("color","black");
      $("#ph2").css("color","black");
      $("#ph3").css("color","black");
      $("#ph4").css("color","black");
      $("#ph5").css("color","black");
      $("#ph6").css("color","black");
      $("#ph7").css("color","black");
      $("#ph8").css("color","black");
      $("#ph9").css("color","black");
      $("#ph10").css("color","black");

    } else if(way==1){

      $("#tr1").css("background-color", "yellow");
      $("#tr2").css("background-color", "rgb(190, 229, 255)");
      $("#tr3").css("background-color", "rgb(190, 229, 255)");
      $("#tr4").css("background-color", "rgb(190, 229, 255)");
      $("#tr5").css("background-color", "rgb(190, 229, 255)");
      $("#tr6").css("background-color", "rgb(190, 229, 255)");
      $("#tr6").css("background-color", "rgb(190, 229, 255)");
      $("#tr7").css("background-color", "rgb(190, 229, 255)");
      $("#tr8").css("background-color", "rgb(190, 229, 255)");
      $("#tr9").css("background-color", "rgb(190, 229, 255)");
      $("#tr10").css("background-color", "rgb(190, 229, 255)");
      
      $("#ph1").css("color","yellow");
      $("#ph2").css("color","black");
      $("#ph3").css("color","black");
      $("#ph4").css("color","black");
      $("#ph5").css("color","black");
      $("#ph6").css("color","black");
      $("#ph7").css("color","black");
      $("#ph8").css("color","black");
      $("#ph9").css("color","black");
      $("#ph10").css("color","black");
    }

    else if(way==21){

      $("#tr1").css("background-color", "rgb(190, 229, 255)");
      $("#tr2").css("background-color", "yellow");
      $("#tr3").css("background-color", "rgb(190, 229, 255)");
      $("#tr4").css("background-color", "rgb(190, 229, 255)");
      $("#tr5").css("background-color", "rgb(190, 229, 255)");
      $("#tr6").css("background-color", "rgb(190, 229, 255)");
      $("#tr6").css("background-color", "rgb(190, 229, 255)");
      $("#tr7").css("background-color", "rgb(190, 229, 255)");
      $("#tr8").css("background-color", "rgb(190, 229, 255)");
      $("#tr9").css("background-color", "rgb(190, 229, 255)");
      $("#tr10").css("background-color", "rgb(190, 229, 255)");

      $("#ph1").css("color","black");
      $("#ph2").css("color","yellow");
      $("#ph3").css("color","black");
      $("#ph4").css("color","black");
      $("#ph5").css("color","black");
      $("#ph6").css("color","black");
      $("#ph7").css("color","black");
      $("#ph8").css("color","black");
      $("#ph9").css("color","black");
      $("#ph10").css("color","black");

    }

    else if(way==22){
      $("#tr1").css("background-color", "rgb(190, 229, 255)");
      $("#tr2").css("background-color", "rgb(190, 229, 255)");
      $("#tr3").css("background-color", "yellow");
      $("#tr4").css("background-color", "rgb(190, 229, 255)");
      $("#tr5").css("background-color", "rgb(190, 229, 255)");
      $("#tr6").css("background-color", "rgb(190, 229, 255)");
      $("#tr6").css("background-color", "rgb(190, 229, 255)");
      $("#tr7").css("background-color", "rgb(190, 229, 255)");
      $("#tr8").css("background-color", "rgb(190, 229, 255)");
      $("#tr9").css("background-color", "rgb(190, 229, 255)");
      $("#tr10").css("background-color", "rgb(190, 229, 255)");

      $("#ph1").css("color","black");
      $("#ph2").css("color","black");
      $("#ph3").css("color","yellow");
      $("#ph4").css("color","black");
      $("#ph5").css("color","black");
      $("#ph6").css("color","black");
      $("#ph7").css("color","black");
      $("#ph8").css("color","black");
      $("#ph9").css("color","black");
      $("#ph10").css("color","black");
      
    }
    else if(way==31){
      $("#tr1").css("background-color", "rgb(190, 229, 255)");
      $("#tr2").css("background-color", "rgb(190, 229, 255)");
      $("#tr3").css("background-color", "rgb(190, 229, 255)");
      $("#tr4").css("background-color", "yellow");
      $("#tr5").css("background-color", "rgb(190, 229, 255)");
      $("#tr6").css("background-color", "rgb(190, 229, 255)");
      $("#tr6").css("background-color", "rgb(190, 229, 255)");
      $("#tr7").css("background-color", "rgb(190, 229, 255)");
      $("#tr8").css("background-color", "rgb(190, 229, 255)");
      $("#tr9").css("background-color", "rgb(190, 229, 255)");
      $("#tr10").css("background-color", "rgb(190, 229, 255)");

      $("#ph1").css("color","black");
      $("#ph2").css("color","black");
      $("#ph3").css("color","black");
      $("#ph4").css("color","yellow");
      $("#ph5").css("color","black");
      $("#ph6").css("color","black");
      $("#ph7").css("color","black");
      $("#ph8").css("color","black");
      $("#ph9").css("color","black");
      $("#ph10").css("color","black");
      
    }
    else if(way==32){

      $("#tr1").css("background-color", "rgb(190, 229, 255)");
      $("#tr2").css("background-color", "rgb(190, 229, 255)");
      $("#tr3").css("background-color", "rgb(190, 229, 255)");
      $("#tr4").css("background-color", "rgb(190, 229, 255)");
      $("#tr5").css("background-color", "yellow");
      $("#tr6").css("background-color", "rgb(190, 229, 255)");
      $("#tr6").css("background-color", "rgb(190, 229, 255)");
      $("#tr7").css("background-color", "rgb(190, 229, 255)");
      $("#tr8").css("background-color", "rgb(190, 229, 255)");
      $("#tr9").css("background-color", "rgb(190, 229, 255)");
      $("#tr10").css("background-color", "rgb(190, 229, 255)");

      $("#ph1").css("color","black");
      $("#ph2").css("color","black");
      $("#ph3").css("color","black");
      $("#ph4").css("color","black");
      $("#ph5").css("color","yellow");
      $("#ph6").css("color","black");
      $("#ph7").css("color","black");
      $("#ph8").css("color","black");
      $("#ph9").css("color","black");
      $("#ph10").css("color","black");
      
    }
    else if(way==41){

      $("#tr1").css("background-color", "rgb(190, 229, 255)");
      $("#tr2").css("background-color", "rgb(190, 229, 255)");
      $("#tr3").css("background-color", "rgb(190, 229, 255)");
      $("#tr4").css("background-color", "rgb(190, 229, 255)");
      $("#tr5").css("background-color", "rgb(190, 229, 255)");
      $("#tr6").css("background-color", "rgb(190, 229, 255)");
      $("#tr6").css("background-color", "yellow");
      $("#tr7").css("background-color", "rgb(190, 229, 255)");
      $("#tr8").css("background-color", "rgb(190, 229, 255)");
      $("#tr9").css("background-color", "rgb(190, 229, 255)");
      $("#tr10").css("background-color", "rgb(190, 229, 255)");

      $("#ph1").css("color","black");
      $("#ph2").css("color","black");
      $("#ph3").css("color","black");
      $("#ph4").css("color","black");
      $("#ph5").css("color","black");
      $("#ph6").css("color","yellow");
      $("#ph7").css("color","black");
      $("#ph8").css("color","black");
      $("#ph9").css("color","black");
      $("#ph10").css("color","black");
      
    }
    else if(way==42){

      $("#tr1").css("background-color", "rgb(190, 229, 255)");
      $("#tr2").css("background-color", "rgb(190, 229, 255)");
      $("#tr3").css("background-color", "rgb(190, 229, 255)");
      $("#tr4").css("background-color", "rgb(190, 229, 255)");
      $("#tr5").css("background-color", "rgb(190, 229, 255)");
      $("#tr6").css("background-color", "rgb(190, 229, 255)");
      $("#tr6").css("background-color", "rgb(190, 229, 255)");
      $("#tr7").css("background-color", "yellow");
      $("#tr8").css("background-color", "rgb(190, 229, 255)");
      $("#tr9").css("background-color", "rgb(190, 229, 255)");
      $("#tr10").css("background-color", "rgb(190, 229, 255)");

      $("#ph1").css("color","black");
      $("#ph2").css("color","black");
      $("#ph3").css("color","black");
      $("#ph4").css("color","black");
      $("#ph5").css("color","black");
      $("#ph6").css("color","black");
      $("#ph7").css("color","yellow");
      $("#ph8").css("color","black");
      $("#ph9").css("color","black");
      $("#ph10").css("color","black");
      
    }
    else if(way==51){

      $("#tr1").css("background-color", "rgb(190, 229, 255)");
      $("#tr2").css("background-color", "rgb(190, 229, 255)");
      $("#tr3").css("background-color", "rgb(190, 229, 255)");
      $("#tr4").css("background-color", "rgb(190, 229, 255)");
      $("#tr5").css("background-color", "rgb(190, 229, 255)");
      $("#tr6").css("background-color", "rgb(190, 229, 255)");
      $("#tr6").css("background-color", "rgb(190, 229, 255)");
      $("#tr7").css("background-color", "rgb(190, 229, 255)");
      $("#tr8").css("background-color", "yellow");
      $("#tr9").css("background-color", "rgb(190, 229, 255)");
      $("#tr10").css("background-color", "rgb(190, 229, 255)");

      $("#ph1").css("color","black");
      $("#ph2").css("color","black");
      $("#ph3").css("color","black");
      $("#ph4").css("color","black");
      $("#ph5").css("color","black");
      $("#ph6").css("color","black");
      $("#ph7").css("color","black");
      $("#ph8").css("color","yellow");
      $("#ph9").css("color","black");
      $("#ph10").css("color","black");
      
    }
    else if(way==52){

      $("#tr1").css("background-color", "rgb(190, 229, 255)");
      $("#tr2").css("background-color", "rgb(190, 229, 255)");
      $("#tr3").css("background-color", "rgb(190, 229, 255)");
      $("#tr4").css("background-color", "rgb(190, 229, 255)");
      $("#tr5").css("background-color", "rgb(190, 229, 255)");
      $("#tr6").css("background-color", "rgb(190, 229, 255)");
      $("#tr6").css("background-color", "rgb(190, 229, 255)");
      $("#tr7").css("background-color", "rgb(190, 229, 255)");
      $("#tr8").css("background-color", "rgb(190, 229, 255)");
      $("#tr9").css("background-color", "rgb(190, 229, 255)");
      $("#tr10").css("background-color", "yellow");

      $("#ph1").css("color","black");
      $("#ph2").css("color","black");
      $("#ph3").css("color","black");
      $("#ph4").css("color","black");
      $("#ph5").css("color","black");
      $("#ph6").css("color","black");
      $("#ph7").css("color","black");
      $("#ph8").css("color","black");
      $("#ph9").css("color","yellow");
      $("#ph10").css("color","black");
      
    }
    else if(way==53){
      $("#tr1").css("background-color", "rgb(190, 229, 255)");
      $("#tr2").css("background-color", "rgb(190, 229, 255)");
      $("#tr3").css("background-color", "rgb(190, 229, 255)");
      $("#tr4").css("background-color", "rgb(190, 229, 255)");
      $("#tr5").css("background-color", "rgb(190, 229, 255)");
      $("#tr6").css("background-color", "rgb(190, 229, 255)");
      $("#tr6").css("background-color", "rgb(190, 229, 255)");
      $("#tr7").css("background-color", "rgb(190, 229, 255)");
      $("#tr8").css("background-color", "rgb(190, 229, 255)");
      $("#tr9").css("background-color", "yellow");
      $("#tr10").css("background-color", "rgb(190, 229, 255)");

      $("#ph1").css("color","black");
      $("#ph2").css("color","black");
      $("#ph3").css("color","black");
      $("#ph4").css("color","black");
      $("#ph5").css("color","black");
      $("#ph6").css("color","black");
      $("#ph7").css("color","black");
      $("#ph8").css("color","black");
      $("#ph9").css("color","black");
      $("#ph10").css("color","yellow");
      
    }
  }
  
});

