

$(document).ready(function () {


 //-----------------input focus und Buttons default----//
  


    $("input").focus(function(){
      $(this).css("background-color", "yellow");
    });
    $("input").blur(function(){
      $(this).css("background-color", "white"); 
    });

    $("#start").on({
      mouseenter: function(){
        $(this).css("background-color", "rgb(250, 250, 58)");
        $("#tr10").css("background-color", "rgb(250, 250, 58)");
      },
          
      mouseleave: function(){
        $(this).css("background-color", "rgb(79, 202, 54)");;
        $("#tr10").css("background-color", "rgb(190, 229, 255)");
      },
    });

    $("#ende").on({
      mouseenter: function(){
        $(this).css("background-color", "rgb(250, 250, 58)");
        $("#tr61").css("background-color", "rgb(79, 202, 54)");
      },
          
      mouseleave: function(){
        $(this).css("background-color", "rgb(79, 202, 54)");;
        $("#tr61").css("background-color", "rgb(190, 229, 255)");
      },
    });

    $("#k1").on({
      mouseenter: function(){
        $(this).css("background-color", "rgb(250, 250, 58)");
        $("#tr11").css("background-color", "rgb(250, 250, 58)");
        $("#tr12").css("background-color", "rgb(250, 250, 58)");
      },
          
      mouseleave: function(){
        $(this).css("background-color", "rgb(79, 202, 54)");;
        $("#tr11").css("background-color", "rgb(190, 229, 255)");
        $("#tr12").css("background-color", "rgb(190, 229, 255)");
      },
    });

    $("#k2").on({
      mouseenter: function(){
        $(this).css("background-color", "rgb(250, 250, 58)");
        $("#tr21").css("background-color", "rgb(250, 250, 58)");
        $("#tr22").css("background-color", "rgb(250, 250, 58)");
      },
          
      mouseleave: function(){
        $(this).css("background-color", "rgb(79, 202, 54)");
        $("#tr21").css("background-color", "rgb(190, 229, 255)");
        $("#tr22").css("background-color", "rgb(190, 229, 255)");
      },
    });
    $("#k3").on({
      mouseenter: function(){
        $(this).css("background-color", "rgb(250, 250, 58)");
        $("#tr31").css("background-color", "rgb(250, 250, 58)");
        $("#tr32").css("background-color", "rgb(250, 250, 58)");
      },
          
      mouseleave: function(){
        $(this).css("background-color", "rgb(79, 202, 54)");
        $("#tr31").css("background-color", "rgb(190, 229, 255)");
        $("#tr32").css("background-color", "rgb(190, 229, 255)");
      },
    });
    $("#k4").on({
      mouseenter: function(){
        $(this).css("background-color", "rgb(250, 250, 58)");
        $("#tr41").css("background-color", "rgb(250, 250, 58)");
        $("#tr42").css("background-color", "rgb(250, 250, 58)");
        
      },
          
      mouseleave: function(){
        $(this).css("background-color", "rgb(79, 202, 54)");
        $("#tr41").css("background-color", "rgb(190, 229, 255)");
        $("#tr42").css("background-color", "rgb(190, 229, 255)");
      },
    });
    $("#k5").on({
      mouseenter: function(){
        $(this).css("background-color", "rgb(250, 250, 58)");
        $("#tr51").css("background-color", "rgb(250, 250, 58)");
        $("#tr52").css("background-color", "rgb(250, 250, 58)");
      },
          
      mouseleave: function(){
        $(this).css("background-color", "rgb(79, 202, 54)");
        $("#tr51").css("background-color", "rgb(190, 229, 255)");
        $("#tr52").css("background-color", "rgb(190, 229, 255)");
      },
    });
    $("#k6").on({
      mouseenter: function(){
        $(this).css("background-color", "rgb(250, 250, 58)");
        $("#tr61").css("background-color", "rgb(250, 250, 58)"); 
      },
          
      mouseleave: function(){
        $(this).css("background-color", "rgb(79, 202, 54)");
        $("#tr61").css("background-color", "rgb(190, 229, 255)");
      },
    });


    


       /*-------------------variablen/Konstanten----------------------*/
    let word="";
    let isreeber=true;
    let state=0;
    const letters= ["B","T","P","S","X","V","E"];
    var reeberarray=[];
    let index;
    var time=1000;
    let stepstate=false;
    let currentstep=0;
    $("#speedtext").text(time+"ms");
    let input;

    let arword=["B"];
    var ar1=["T","P"];
    var ar2=["S","X"];
    var ar3=["T","V"];
    var ar4=["S","X"];
    var ar5=["V","P"];
      
      /*-------------------------------Funktionen----------------------*/

    
  
    function check(){
      state=0;
      reeberarray=[];
      isreeber=true,
      index=0;
      currentstep=0;
      word="";
      let fehler;
      let input=document.getElementById("eingabefeld").value;
      if(input===""){
        $("#statustext").text("Bitte geben sie ein Wort ein");
      }
      word=input.toUpperCase();
      for(i=0;i<word.length; i++){
        reeberarray.push(word.charAt(i));
        if(letters.includes(word.charAt(i))){
          isreeber=true;
        }else{
          isreeber=false;
          fehler=word.charAt(i);
          break;
        }
      }
      $("#status").css("background-color", "rgb(190, 229, 255)");
      if (isreeber){
        $("#statustext").html("Zeichen sind im Alphabet enthalten. <br/> Reeber Validierung starten mit Sequenz oder Step");
      }else{
        $("#statustext").html("Fehlerhafte Eingabe, das Zeichen "+fehler+" ist nicht im Alphabet enthalten Eingabealphabet: \u03A3={B,T,P,S,X,V,E}");
        $("#status").css("background-color", "red");
      }
      $(".kreis").css("background-color", "rgb(79, 202, 54)");
    };
/*------------------------------------------------Sequence/Step-----------------------------------------------------------------------*/

  function step(){
    let input= document.getElementById("eingabefeld").value;
    reeberarray=Array.from(input);
    state=0;
    isreeber=true;
    stepstate=true;
    const map={
      0:start,
      1:state1,
      2:state2,
      3:state3,
      4:state4,
      5:state5,
      6:state6,
    };
    map[currentstep]();
  };

    function startsequence(){
      stepstate=false;
      $("tr").css("background-color", "rgb(190, 229, 255)"); 
      disablebuttons();
      start();
    };
    
    function start(){
      $("tr").css("background-color", "rgb(190, 229, 255)");
      $(".kreis").css("background-color", "rgb(79, 202, 54)");
      let startinput= document.getElementById("eingabefeld").value;
      input=startinput;
      reeberarray=Array.from(startinput);
      state=0;
      index=0;
      $("#status").css("background-color", "rgb(190, 229, 255)");
      $("#statustext").html(" Wort: "+ input +"<br/> 	&Uumlbergebenes Zeichen: " + reeberarray[index]+"  Neuer Zustand: " +(state+1));
      isreeber=true;
      switch(reeberarray[0]){
      case "B": 
        isreeber=true;
        state=1;
        $("#k1").css("background-color", "yellow"); 
        $("#tr10").css("background-color", "rgb(250, 250, 58)"); 
        if(!stepstate){
          setTimeout(state1,time);
        }else{
          currentstep=1;
        }
      break;
      default: 
        isreeber=false;
        checkfault();
      break;
      };
    };

    function state1 (){
        state=1;
        index+=1;
        $("#tr10").css("background-color", "rgb(190, 229, 255)");
        $("#statustext").html(" Wort: "+ input +"<br/> 	&Uumlbergebenes Zeichen: " + reeberarray[index] +"  Neuer Zustand: " +(state+1));
        $("#status").css("background-color", "rgb(190, 229, 255)");
        switch(reeberarray[index]){
          case "T": 
          $("#k1").css("background-color", "rgb(79, 202, 54");
          $("#k2").css("background-color", "yellow");
          $("#tr11").css("background-color", "rgb(250, 250, 58)");
          if(!stepstate){
            setTimeout(state2,time);
          }else{
            currentstep=2;
          }
          break;
          case "P": 
          $("#k1").css("background-color", "rgb(79, 202, 54");
          $("#k3").css("background-color", "yellow");
          $("#tr12").css("background-color", "rgb(250, 250, 58)");
          if(!stepstate){
            setTimeout(state3,time);
          }else{
            currentstep=3;
          }
          break;
          default:
            isreeber=false;
            checkfault();
          break;
        }
    };
    
    function state2(){  
        state=2;  
        index+=1; 
        $("#tr11").css("background-color", "rgb(190, 229, 255)");
        $("#statustext").html(" Wort: "+ input +"<br/> 	&Uumlbergebenes Zeichen: " + reeberarray[index] +"  Neuer Zustand: "  +(state+1));   
        $("#status").css("background-color", "rgb(190, 229, 255)");
        switch(reeberarray[index]){
          case "S":
            $("#k2").css("background-color", "yellow");
            $("#tr21").css("background-color", "rgb(250, 250, 58)");
            setTimeout(k2green,(3*time/4));
            if(!stepstate){
              setTimeout(state2,time);
            }else{
              currentstep=2;
            };
          break;
          case "X": 
            $("#k2").css("background-color", "rgb(79, 202, 54");
            $("#k4").css("background-color", "yellow");
            $("#tr22").css("background-color", "rgb(250, 250, 58)");
            $("#tr21").css("background-color", "rgb(190, 229, 255)"); 
            if(!stepstate){
              setTimeout(state4,time);
            }else{
              currentstep=4;
            };
          break;
          default:
            isreeber=false;
            checkfault();
          break;
        };
    };

    function k2green(){
      $("#k2").css("background-color", "rgb(79, 202, 54)");
    };

    function k3green(){
      $("#k3").css("background-color", "rgb(79, 202, 54)");
    };
      
      

    function state3(){
      $("#tr12").css("background-color", "rgb(190, 229, 255)"); 
      $("#tr41").css("background-color", "rgb(190, 229, 255)"); 
        state=3;
        index+=1;
        $("#statustext").html(" Wort: "+ input +"<br/> 	&Uumlbergebenes Zeichen: " + reeberarray[index] +"  Neuer Zustand:  " +(state+1));
        $("#status").css("background-color", "rgb(190, 229, 255)");
        switch(reeberarray[index]){
          case "T":
            $("#tr31").css("background-color", "rgb(250, 250, 58)");
            $("#k3").css("background-color", "yellow");
            setTimeout(k3green,(3*time/4));
            if(!stepstate){
              setTimeout(state3,time);
            }else{
              currentstep=3;
            }; 
          break;
          case "V": 
            $("#k3").css("background-color", "rgb(79, 202, 54");
            $("#k5").css("background-color", "yellow");
            $("#tr32").css("background-color", "rgb(250, 250, 58)");
            $("#tr31").css("background-color", "rgb(190, 229, 255)"); 
            if(!stepstate){
              setTimeout(state5,time);
            }else{
              currentstep=5;
            };
          break;
          default:
            isreeber=false;
            checkfault();
          break;   
        }   
    };
      
    function state4(){
      $("#tr51").css("background-color", "rgb(190, 229, 255)"); 
      $("#tr22").css("background-color", "rgb(190, 229, 255)"); 
       state=4;
        index+=1;
        $("#statustext").html(" Wort: "+ input +"<br/> 	&Uumlbergebenes Zeichen: " + reeberarray[index] +"  Neuer Zustand: " +(state+1));
        $("#status").css("background-color", "rgb(190, 229, 255)");
        switch(reeberarray[index]){
          case "S": 
            $("#k4").css("background-color", "rgb(79, 202, 54");
            $("#k6").css("background-color", "yellow");
            $("#tr42").css("background-color", "rgb(250, 250, 58)");
            if(!stepstate){
              setTimeout(state6,time);
            }else{
              currentstep=6;
            };
          break;
          case "X":  
            $("#k4").css("background-color", "rgb(79, 202, 54");
            $("#k3").css("background-color", "yellow");
            $("#tr41").css("background-color", "rgb(250, 250, 58)");
            if(!stepstate){
              setTimeout(state3,time);
            }else{
              currentstep=3;
            };
          break;
          default:
            isreeber=false;
            checkfault();
          break;
        }  
    };

      
    function state5(){
      state=5;
      index+=1;
      $("#statustext").html(" Wort: "+ input +"<br/> 	&Uumlbergebenes Zeichen: " + reeberarray[index] +"  Neuer Zustand: " +(state+1));
      $("#status").css("background-color", "rgb(190, 229, 255)");
      $("#tr31").css("background-color", "rgb(190, 229, 255)");
      $("#tr32").css("background-color", "rgb(190, 229, 255)"); 
      switch(reeberarray[index]){
        case "P": 
          $("#k5").css("background-color", "rgb(79, 202, 54");
          $("#k4").css("background-color", "yellow");
          $("#tr51").css("background-color", "rgb(250, 250, 58)");
          if(!stepstate){
            setTimeout(state4,time);
          }else{
            currentstep=4;
          };
        break;
        case "V": 
          $("#k5").css("background-color", "rgb(79, 202, 54");
          $("#k6").css("background-color", "yellow");
          $("#tr52").css("background-color", "rgb(250, 250, 58)");
          if(!stepstate){
            setTimeout(state6,time);
          }else{
            currentstep=6;
          };
        break;
        default:
          isreeber=false;
          checkfault();
          break;
      }   
    };

    function state6(){
      state=6;
      index+=1;
      $("#statustext").html(" Wort: "+ input +"<br/> 	&Uumlbergebenes Zeichen: " + reeberarray[index] +"  Neuer Zustand: " +(state+1));
      $("#status").css("background-color", "rgb(190, 229, 255)");
      $("#tr42").css("background-color", "rgb(190, 229, 255)"); 
      $("#tr52").css("background-color", "rgb(190, 229, 255)"); 
      switch(reeberarray[index]){
        case "E":
          finished();
          $("#k6").css("background-color", "rgb(79, 202, 54");
          break;
        default:
          isreeber=false;
          checkfault();
        break;
        }
    };


    function checkfault(){
      $("#statustext").html( "&Uumlbergang nicht definiert bei Zustand "+state+" Zeichen: " +reeberarray[index]);
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
      }else if(state==6){
        $("#k6").css("background-color", "red");
      }
      ar4=["S","X"];
      ar5=["P","V"];
      enablebuttons();
    };



      

    function checkstate(){
      alert("Array: "+reeberarray+"-----State: "+state +"-----isreeber: "+isreeber+"-----index: "+ index+ "-----Zeichen:"+ reeberarray[index]);
    };

    function finished(){
      $("#statustext").text("Simulation erfolgreich abgeschlosen");
      $("#status").css("background-color", "rgb(79, 202, 54)");
      $("#tr61").css("background-color", "rgb(79, 202, 54)"); 
      currentstep=0;
      stepstate=false;
      enablebuttons();
    };
    
    /*----------------------------------------------Wort Generator---------------------------------------------------*/

 


    function getRandomInt(max) {
      return Math.floor(Math.random() * max);
    };
    /*
    let rannumber= getRandomInt(2);
    arword.push(ar1[rannumber]);
    */

    function f1(){
      $(".kreis").css("background-color", "rgb(79, 202, 54)");
      $("tr").css("background-color", "rgb(190, 229, 255)");
      let rannumber= getRandomInt(2);
      let x=ar1[rannumber];
      arword.push(x);
      switch(x){
        case "T":
          f2();
        break;
        case "P":
         f3();
        break;
      };
    };

      

      function f2(){
        let rannumber= getRandomInt(2);
        let x=ar2[rannumber];
        arword.push(x);
        switch(x){
          case "S":
            f2();
          break;
          case "X":
           f4();
          break;
        };
      };


      function f3(){
        let rannumber= getRandomInt(2);
        let x=ar3[rannumber];
        arword.push(x);
        switch(x){
          case "T":
            f3();
          break;
          case "V":
           f5();
          break;
        };
      };


      function f4(){
        let rannumber= getRandomInt(2);
        let x=ar4[rannumber];
        arword.push(x);
        switch(x){
          case "S":
            f6();
          break;
          case "X":
           f3();
          break;
        default:
          f5();
        };
      };

      function f5(){
        let rannumber= getRandomInt(2);
        let x=ar5[rannumber];
        arword.push(x);
        switch(x){
          case "V":
            f6();
          break;
          case "P":
           f4();
          break;
          default:
            f6();
        };
      };

      function f6(){
        arword.push("E");
        index2=0;
        $("#eingabefeld").val(arword.join(""));
        arword=["B"];
        $("#status").css("background-color", "rgb(190, 229, 255)");
        $("#statustext").html("Ein zuf&aumllliges Reeberwort wurde generiert! <br/> Reeber Validierung starten mit Sequenz oder Step ");
        currentstep=0;
        stepstate=false;
      };


    function generatenonreeber(){
      $(".kreis").css("background-color", "rgb(79, 202, 54)");
      $("tr").css("background-color", "rgb(190, 229, 255)");
      ar4=["P","V"];
      ar5=["S","X"];
      f1();
      currentstep=0;
      stepstate=false;
    };
      
    
    //---------------------------------------Button Events--------------------------------------------//
      

    $("#but1").click(function(){
      $("#statustext").text("Bitte geben sie ihr Wort in das Eingabefeld ein!");
      $("#eingabefeld").focus();
      $("#status").css("background-color", "rgb(190, 229, 255)");
      $("#eingabefeld").val("");
      $("tr").css("background-color", "rgb(190, 229, 255)");
    });

    $("#but2").click(f1);

    $("#but4").click(checkstate);

    $("#but5").click(startsequence);

    $("#but3").click(generatenonreeber);

    $("#but6").click(step);

    $("#but7").click(check);

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

