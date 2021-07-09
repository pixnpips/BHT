

$(document).ready(function () {

    


       /*-------------------variablen/Konstanten----------------------*/
    
      
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
    let zweitesZeichen;
    let isreset=false;

    let arword=["B"];
    var ar1=["T","P"];
    var ar2=["S","X"];
    var ar3=["T","V"];
    var ar4=["S","X"];
    var ar5=["V","P"];

    $("#but4").hide();

    

    
      
      /*-------------------------------Funktionen----------------------*/

    
  
    function check(){
       
      let fehler;
      let checkinput=document.getElementById("eingabefeld").value;
      let checkarray=[];
      let word1=checkinput;
      let isreeber1=true;
      for(i=0;i<word1.length; i++){
          checkarray.push(word1.charAt(i));
            if(letters.includes(word1.charAt(i))){
              
            }else{
              isreeber1=false;
              fehler=word1.charAt(i);
            break;
        }
      }
      
      if (isreeber1){
        $("#statustext").html("Zeichen sind im Alphabet enthalten. <br/> Reeber Validierung starten/fortetzen mit Sequenz oder Step");
        $("#status").css("background-color", "rgb(190, 229, 255)");
      }else{
        $("#statustext").html("Fehlerhafte Eingabe, das Zeichen "+fehler+" ist nicht im Alphabet enthalten. <br> Eingabealphabet:  \u03A3={B,T,P,S,X,V,E}");
        $("#status").css("background-color", "red");
      }
    
      if(checkinput===""||checkinput===" "){
        $("#statustext").html("Das Eingabefeld darf nicht leer sein.");
        $("#status").css("background-color", "red");  
      }
    };
/*------------------------------------------------Sequence/Step-----------------------------------------------------------------------*/

  function step(){
    time=200;
    let input= document.getElementById("eingabefeld").value;
    //state=0;
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
      11:a,
      12:b,
      13:d,
      14:e,
      15:f,
      16:zwischeng,
      17:zwischenh,
      18:g,
      19:h,
      20:i1,
    };
    map[currentstep]();
  };

    function startsequence(){
      time = $("#slider").val();
      stepstate=false;
      $("tr").css("background-color", "rgb(190, 229, 255)");
      $(".pfeil").css("filter", "invert(45%) sepia(100%) hue-rotate(16deg) saturate(70)");
      disablebuttons();
      start();
    };
    // Farbwahl gelb
    //$("p").css("filter", "invert(45%) sepia(100%) hue-rotate(16deg) saturate(70)");

    //Farbwahl schwarz
    //$(".pfeil").css("filter", "invert(0%) sepia(100%) hue-rotate(16deg) saturate(70)");

    function kopfsposition(){
      var pos1 = $('#zustand').position();
      $('#zustand').animate({ 'top': pos1.top + 0, 'left': pos1.left + 20},50,'linear');

      if(state==0){
        $('#qtext').html("St");
      }else if(state==11){
        $('#qtext').html("a");
      }else if(state==12){
        $('#qtext').html("b");
      }else if(state==1){
        $('#qtext').html("1");
      }else if(state==2){
        $('#qtext').html("2");
      }else if(state==3){
        $('#qtext').html("3");
      }else if(state==4){
        $('#qtext').html("4")
      }else if(state==5){
        $('#qtext').html("5")
      }else if(state==6){
        $('#qtext').html("6")
      }else if(state==13){
        $('#qtext').html("d")
      }else if(state==14){
        $('#qtext').html("e")
      }else if(state==15){
        $('#qtext').html("f")
      }else if(state==16){
        $('#qtext').html("g")
      }else if(state==17){
        $('#qtext').html("h")
      }else if(state==18){
        $('#qtext').html("i")
      }
    }
    
    function start(){
      //reeberarray=Array.from(input);
      $(".pfeil").css("filter", "invert(0%) sepia(100%) hue-rotate(16deg) saturate(70)");
      
      $("tr").css("background-color", "rgb(190, 229, 255)");
      $(".kreis").css("background-color", "rgb(79, 202, 54)");
      $(".kreis2").css("background-color", "rgb(79, 202, 54)");
      $("#zustand").css("background-color", "yellow");
      $('#qtext').html("St");
      $('#zustand').animate({'left': 0},0,'linear');
      let startinput= document.getElementById("eingabefeld").value;
      input=startinput;
      reeberarray=Array.from(startinput);
      $("#aniarray").html(reeberarray);
      $("#statustext").html(reeberarray);
      state=0;                                                             // Achtung neuer State!!!--> aktualisieren
      index=0;
      $("#status").css("background-color", "rgb(190, 229, 255)");
      $("pst").css("filter", "invert(45%) sepia(100%) hue-rotate(16deg) saturate(70)");
      isreset=false;
      
      isreeber=true;
      switch(reeberarray[0]){
      case "B": 
        isreeber=true;
        state=11;
        $("#pst").css("filter", "invert(45%) sepia(100%) hue-rotate(16deg) saturate(70)");
        $("#kSt").css("background-color", "yellow"); 
        $("#trst").css("background-color", "yellow");
        
        if(!stepstate){
          setTimeout(a,time);
        }else{
          currentstep=11;
        }
        reeberarray[index]="_";
        
      break;
      default: 
        isreeber=false;
        checkfault();
      break;
      };
    };



    function a (){
      state=11;
      index+=1;
      $(".pfeil").css("filter", "invert(0%) sepia(100%) hue-rotate(16deg) saturate(70)");
      $("tr").css("background-color", "rgb(190, 229, 255)");
      $("#status").css("background-color", "rgb(190, 229, 255)");
      $(".kreis").css("background-color","rgb(79, 202, 54)");
      $("#kA").css("background-color", "yellow");
      kopfsposition();
      switch(reeberarray[index]){
        case "T":
        $("#tra1").css("background-color", "yellow"); 
        $("#statustext").html(reeberarray);
        $("#aniarray").html(reeberarray);
        if(!stepstate){
          setTimeout(b,time);
        }else{
          currentstep=12;
        }
        break;
        case "P":
        $("#tra2").css("background-color", "yellow");
        $("#statustext").html(reeberarray);
        $("#aniarray").html(reeberarray);
        $("#pa").css("filter", "invert(45%) sepia(100%) hue-rotate(16deg) saturate(70)");
        if(!stepstate){
          setTimeout(b,time);
        }else{
          currentstep=12;
        }
        break;
        default:
          isreeber=false;
          checkfault();
        break;
      }
  };

  function b (){
    state=12;
    index+=1;
    $(".pfeil").css("filter", "invert(0%) sepia(100%) hue-rotate(16deg) saturate(70)");
    $("tr").css("background-color", "rgb(190, 229, 255)");
    $(".kreis").css("background-color","rgb(79, 202, 54)");
    $("#kB").css("background-color", "yellow");
    $("#status").css("background-color", "rgb(190, 229, 255)");
    $("#statustext").html(reeberarray);
    $("#aniarray").html(reeberarray);
    kopfsposition();
    switch(reeberarray[index]){
      case "B": 
      $("#trb1").css("background-color", "rgb(250, 250, 58)");
      $("#p1").css("filter", "invert(45%) sepia(100%) hue-rotate(16deg) saturate(70)");
      reeberarray[index]="_";
      
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
    }
};

  

    

    function state1 (){
        state=1;
        index+=1;
        $(".pfeil").css("filter", "invert(0%) sepia(100%) hue-rotate(16deg) saturate(70)");
        $("tr").css("background-color", "rgb(190, 229, 255)");
        $(".kreis").css("background-color","rgb(79, 202, 54)");
        $("#k1").css("background-color", "yellow");
        $("#status").css("background-color", "rgb(190, 229, 255)");
        kopfsposition();
        $("#statustext").html(reeberarray);
        $("#aniarray").html(reeberarray);
        switch(reeberarray[index]){
          case "T":
          $("#tr11").css("background-color", "rgb(250, 250, 58)");
          $("#p3").css("filter", "invert(45%) sepia(100%) hue-rotate(16deg) saturate(70)");
          reeberarray[index]="_";
          
          if(!stepstate){
            setTimeout(state2,time);
          }else{
            currentstep=2;
          }
          break;
          case "P": 
          $("#tr12").css("background-color", "rgb(250, 250, 58)");
          $("#p2").css("filter", "invert(45%) sepia(100%) hue-rotate(16deg) saturate(70)");
          reeberarray[index]="_";
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
        $(".pfeil").css("filter", "invert(0%) sepia(100%) hue-rotate(16deg) saturate(70)");
        $("tr").css("background-color", "rgb(190, 229, 255)");
        $(".kreis").css("background-color","rgb(79, 202, 54)");
        $("#k2").css("background-color", "yellow");
        $("#statustext").html(reeberarray);
        $("#aniarray").html(reeberarray);
        $("#status").css("background-color", "rgb(190, 229, 255)");
        kopfsposition();
        switch(reeberarray[index]){
          case "S":
            $("#tr21").css("background-color", "rgb(250, 250, 58)");
            reeberarray[index]="_";
            setTimeout(k2green,(1*time/3));
            setTimeout(k2yellow,(2*time/3));
            if(!stepstate){
              setTimeout(state2,time);
            }else{
              currentstep=2;
            };
          break;
          case "X": 
            $("#tr22").css("background-color", "rgb(250, 250, 58)");
            $("#p7").css("filter", "invert(45%) sepia(100%) hue-rotate(16deg) saturate(70)");
            reeberarray[index]="_";
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
      $("#p11").css("filter", "invert(0%) sepia(100%) hue-rotate(16deg) saturate(70)");
    };

    function k2yellow(){
      $("#k2").css("background-color", "rgb(250, 250, 58)");
      $("#p11").css("filter", "invert(45%) sepia(100%) hue-rotate(16deg) saturate(70)");
    };

    function k3green(){
      $("#k3").css("background-color", "rgb(79, 202, 54)");
      $("#p12").css("filter", "invert(0%) sepia(100%) hue-rotate(16deg) saturate(70)");
    };

    function k3yellow(){
      $("#k3").css("background-color", "rgb(250, 250, 58)");
      $("#p12").css("filter", "invert(45%) sepia(100%) hue-rotate(16deg) saturate(70)");
    };
      
      

    function state3(){
      
        state=3;
        index+=1;
        $(".pfeil").css("filter", "invert(0%) sepia(100%) hue-rotate(16deg) saturate(70)");
        $("tr").css("background-color", "rgb(190, 229, 255)");
        $(".kreis").css("background-color","rgb(79, 202, 54)");
        $("#k3").css("background-color", "yellow");
        $("#statustext").html(reeberarray);
        $("#aniarray").html(reeberarray);
        $("#status").css("background-color", "rgb(190, 229, 255)");
        kopfsposition();
        switch(reeberarray[index]){
          case "T":
            $("#tr31").css("background-color", "rgb(250, 250, 58)");
            
            reeberarray[index]="_";
            setTimeout(k3green,(1*time/3));
            setTimeout(k3yellow,(2*time/3));
            if(!stepstate){
              setTimeout(state3,time);
            }else{
              currentstep=3;
            }; 
          break;
          case "V":
            $("#tr32").css("background-color", "rgb(250, 250, 58)");
            $("#p6").css("filter", "invert(45%) sepia(100%) hue-rotate(16deg) saturate(70)");
            reeberarray[index]="_";
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
      
        state=4;
        index+=1;
        $(".pfeil").css("filter", "invert(0%) sepia(100%) hue-rotate(16deg) saturate(70)");
        $("tr").css("background-color", "rgb(190, 229, 255)");
        $(".kreis").css("background-color","rgb(79, 202, 54)");
        $("#k4").css("background-color", "yellow");
        $("#statustext").html(reeberarray);
        $("#aniarray").html(reeberarray);
        $("#status").css("background-color", "rgb(190, 229, 255)");
        kopfsposition();
        switch(reeberarray[index]){
          case "S": 
            $("#tr42").css("background-color", "rgb(250, 250, 58)");
            $("#p4").css("filter", "invert(45%) sepia(100%) hue-rotate(16deg) saturate(70)");
            reeberarray[index]="_";
            if(!stepstate){
              setTimeout(state6,time);
            }else{
              currentstep=6;
            };
          break;
          case "X":  
            $("#tr41").css("background-color", "rgb(250, 250, 58)");
            $("#p9").css("filter", "invert(45%) sepia(100%) hue-rotate(16deg) saturate(70)");
            reeberarray[index]="_";
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
      $(".pfeil").css("filter", "invert(0%) sepia(100%) hue-rotate(16deg) saturate(70)");
      $("tr").css("background-color", "rgb(190, 229, 255)");
      $(".kreis").css("background-color","rgb(79, 202, 54)");
      $("#k5").css("background-color", "yellow");
      $("#statustext").html(reeberarray);
      $("#aniarray").html(reeberarray);
      $("#status").css("background-color", "rgb(190, 229, 255)");
      kopfsposition();
      
      switch(reeberarray[index]){
        case "P": 
          $("#tr51").css("background-color", "rgb(250, 250, 58)");
          $("#p8").css("filter", "invert(45%) sepia(100%) hue-rotate(16deg) saturate(70)");
          reeberarray[index]="_";
          if(!stepstate){
            setTimeout(state4,time);
          }else{
            currentstep=4;
          };
        break;
        case "V": 
          $("#tr52").css("background-color", "rgb(250, 250, 58)");
          $("#p5").css("filter", "invert(45%) sepia(100%) hue-rotate(16deg) saturate(70)");
          reeberarray[index]="_";
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
      $(".pfeil").css("filter", "invert(0%) sepia(100%) hue-rotate(16deg) saturate(70)");
      $("tr").css("background-color", "rgb(190, 229, 255)");
      $(".kreis").css("background-color","rgb(79, 202, 54)");
      $("#k6").css("background-color", "yellow");
      $("#statustext").html(reeberarray);
      $("#aniarray").html(reeberarray);
      $("#status").css("background-color", "rgb(190, 229, 255)");
      kopfsposition();
      switch(reeberarray[index]){
        case "E":
          $("#tr61").css("background-color", "rgb(250, 250, 58)");
          $("#p10").css("filter", "invert(45%) sepia(100%) hue-rotate(16deg) saturate(70)");
          reeberarray[index]="_";
          if(!stepstate){
            setTimeout(d,time);
          }else{
            currentstep=13;
          };

          break;
        default:
          isreeber=false;
          checkfault();
        break;
        }
    };

    function d (){
      state=13;
      index+=1;
      $(".pfeil").css("filter", "invert(0%) sepia(100%) hue-rotate(16deg) saturate(70)");
      $("tr").css("background-color", "rgb(190, 229, 255)");
      $(".kreis").css("background-color","rgb(79, 202, 54)");
      $("#kD").css("background-color", "yellow");
      $("#statustext").html(reeberarray);
      $("#aniarray").html(reeberarray);
      $("#status").css("background-color", "rgb(190, 229, 255)");
      kopfsposition();
      switch(reeberarray[index]){
        case "T":
        $("#trd2").css("background-color", "rgb(250, 250, 58)");
        $("#pd2").css("filter", "invert(45%) sepia(100%) hue-rotate(16deg) saturate(70)");
        reeberarray[index]="_";
        if(!stepstate){
          setTimeout(f,time);
        }else{
          currentstep=15;
        }
        break;
        case "P": 
        $("#trd1").css("background-color", "rgb(250, 250, 58)");
        $("#pd1").css("filter", "invert(45%) sepia(100%) hue-rotate(16deg) saturate(70)");
        reeberarray[index]="_";
        if(!stepstate){
          setTimeout(e,time);
        }else{
          currentstep=14;
        }
        break;
        default:
          isreeber=false;
          checkfault();
        break;
      }
      };

    function e (){
      state=14;
      index+=1;
      $(".pfeil").css("filter", "invert(0%) sepia(100%) hue-rotate(16deg) saturate(70)");
      $("tr").css("background-color", "rgb(190, 229, 255)");
      $(".kreis").css("background-color","rgb(79, 202, 54)");
      $("#kE").css("background-color", "yellow");
      $("#statustext").html(reeberarray);
      $("#aniarray").html(reeberarray);
      $("#status").css("background-color", "rgb(190, 229, 255)");
      kopfsposition();
      switch(reeberarray[index]){
        case "E": 
        $("#tre1").css("background-color", "rgb(250, 250, 58)");
        $("#pe").css("filter", "invert(45%) sepia(100%) hue-rotate(16deg) saturate(70)");
        reeberarray[index]="_";
        if(!stepstate){
          setTimeout(zwischeng,time);
        }else{
          currentstep=16;
        }
        break;
        default:
          isreeber=false;
          checkfault();
        break;
      }
    };

    function f (){
      state=15;
      index+=1;
      $(".pfeil").css("filter", "invert(0%) sepia(100%) hue-rotate(16deg) saturate(70)");
      $("tr").css("background-color", "rgb(190, 229, 255)");
      $(".kreis").css("background-color","rgb(79, 202, 54)");
      $("#kF").css("background-color", "yellow");
      $("#statustext").html(reeberarray);
      $("#aniarray").html(reeberarray);
      $("#status").css("background-color", "rgb(190, 229, 255)");
      kopfsposition();
      switch(reeberarray[index]){
        case "E": 
        $("#tre1").css("background-color", "rgb(250, 250, 58)");
        $("#pf").css("filter", "invert(45%) sepia(100%) hue-rotate(16deg) saturate(70)");
        reeberarray[index]="_";
        if(!stepstate){
          setTimeout(zwischenh,time);
        }else{
          currentstep=17;
        }
        break;
        default:
          isreeber=false;
          checkfault();
        break;
      }
    };

    function zwischeng(){
      index=1;
      state=16
      //reeberarray[index]="_";
      $("#statustext").html(reeberarray);
      $("#aniarray").html(reeberarray);
      $(".pfeil").css("filter", "invert(0%) sepia(100%) hue-rotate(16deg) saturate(70)");
      $("tr").css("background-color", "rgb(190, 229, 255)");
      $(".kreis").css("background-color","rgb(79, 202, 54)");
      kopfsposition();
      $("#pg2").css("filter", "invert(45%) sepia(100%) hue-rotate(16deg) saturate(70)");
      $("#kG").css("background-color", "yellow");
      $("#trg1").css("background-color", "rgb(250, 250, 58)");

       $('#qtext').html("g");
  
          if(!stepstate){
            setTimeout(g,time);
          }else{
            currentstep=18;
          } 
        
    }

    function g(){
      
      state=18;
      index=1;
      $(".pfeil").css("filter", "invert(0%) sepia(100%) hue-rotate(16deg) saturate(70)");
      $("tr").css("background-color", "rgb(190, 229, 255)");
      $(".kreis").css("background-color","rgb(79, 202, 54)");
      $("#kG").css("background-color", "yellow");
      $("#statustext").html(reeberarray);
      $("#aniarray").html(reeberarray);
      $("#status").css("background-color", "rgb(190, 229, 255)");
      $('#zustand').animate({'left': 20},0,'linear');
      
      $('#qtext').html("g");
      switch(reeberarray[index]){
        case "P":
          $("#trg2").css("background-color", "rgb(250, 250, 58)");
          $("#pg1").css("filter", "invert(45%) sepia(100%) hue-rotate(16deg) saturate(70)");
          //reeberarray[index]="_";
          if(!stepstate){
            setTimeout(i1,time);
          }else{
            currentstep=20;
          } 
        break;
        default:
          isreeber=false;
          checkfault();
        break;   
      }   
    };

    function zwischenh(){
      index=1;
      state=17;
      //reeberarray[index]="_";
      $("#statustext").html(reeberarray);
      $("#aniarray").html(reeberarray);
        
      $("tr").css("background-color", "rgb(190, 229, 255)");
      $(".kreis").css("background-color","rgb(79, 202, 54)");
      kopfsposition();
      $("#ph2").css("filter", "invert(45%) sepia(100%) hue-rotate(16deg) saturate(70)");
       $('#qtext').html("h");
       $("#trh1").css("background-color", "rgb(250, 250, 58)");
       $("#kH").css("background-color", "yellow");

          if(!stepstate){
            setTimeout(h,time);
          }else{
            currentstep=19;
          } 
        
    
    };

    function h(){
      
      state=19;
      index=1;
      $(".pfeil").css("filter", "invert(0%) sepia(100%) hue-rotate(16deg) saturate(70)");
      $("tr").css("background-color", "rgb(190, 229, 255)");
      $(".kreis").css("background-color","rgb(79, 202, 54)");
      $("#kH").css("background-color", "yellow");
      $("#statustext").html(reeberarray);
      $("#aniarray").html(reeberarray);
      $("#status").css("background-color", "rgb(190, 229, 255)");
      $('#qtext').html("h");
      $('#zustand').animate({'left': 20},0,'linear');
      switch(reeberarray[index]){
        case "T":
          $("#trh2").css("background-color", "rgb(250, 250, 58)");
          $("#ph1").css("filter", "invert(45%) sepia(100%) hue-rotate(16deg) saturate(70)");
          //reeberarray[index]="_";
          
          if(!stepstate){
            setTimeout(i1,time);
          }else{
            currentstep=20;
          } 
        break;
        default:
          isreeber=false;
          checkfault();
        break;   
      }   
    };
    
    

    function i1(){
      state=20;
      $(".pfeil").css("filter", "invert(0%) sepia(100%) hue-rotate(16deg) saturate(70)");
      $("tr").css("background-color", "rgb(190, 229, 255)");
      $(".kreis").css("background-color","rgb(79, 202, 54)");
      $('#qtext').html("i");
      kopfsposition();
      finished();
    }



    

  

  


    function checkfault(){
      
      let x;
      $("#status").css("background-color", "red");
      if (state==1){
        $("#k1").css("background-color", "red");
        x="1";
      }else if(state==2){
        $("#k2").css("background-color", "red");
        x="2";
      }else if(state==3){
        $("#k3").css("background-color", "red");
        x="3";
      }else if(state==4){
        $("#k4").css("background-color", "red");
        x="4";
      }else if(state==5){
        $("#k5").css("background-color", "red");
        x="5";
      }else if(state==6){
        $("#k6").css("background-color", "red");
        x="6";
      }else if(state==0){
        $("#kSt").css("background-color", "red");
        x="St";
      
      }else if(state==11){
        $("#kA").css("background-color", "red");
        x="a";
      }else if(state==12){
        $("#kB").css("background-color", "red");
        x="b";
      }else if(state==13){
        $("#kD").css("background-color", "red");
        x="d";
      }
      else if(state==14){
        $("#kE").css("background-color", "red");
        x="e";
      }else if(state==15){
        $("#kF").css("background-color", "red");
        x="f";
      }else if(state==16){
        $("#kG").css("background-color", "red");
        x="g";
      }else if(state==18){
        $("#kG").css("background-color", "red");
        x="g";
      }else if(state==17){
        $("#kH").css("background-color", "red");
        x="h";
      }else if(state==19){
        $("#kH").css("background-color", "red");
        x="h";
      }
      $("#statustext").html( "Q Reject erreicht bei Knoten: "+x+" Zeichen: " +reeberarray[index]);
      ar4=["S","X"];
      ar5=["P","V"];
      enablebuttons();
      stepstate=true;
      currentstep=0;
      state=0;
      $("#zustand").css("background-color", "red");

      if(input===""||input===" "){
        $("#statustext").html("Das Eingabefeld darf nicht leer sein.");
        $("#status").css("background-color", "red");  
      }

      if (isreset){
        $("#statustext").html("Sequenz abgebrochen, erneut Reset dr&uuml;cken zum Zur&uuml;cksetzen ");
      }
    };



      

    function checkstate(){
      alert("Array: "+reeberarray+"-----State: "+state +"-----isreeber: "+isreeber+"-----index: "+ index+ "-----Zeichen:"+ reeberarray[index]+" position 1: " +reeberarray[1]);
    };

    function finished(){
      
      $("#statustext").html("Simulation erfolgreich abgeschlosen <br>"+reeberarray.join(""));
      $("#status").css("background-color", "rgb(30, 255, 30)");
      currentstep=0;
      state=0;
      stepstate=false;
      enablebuttons();
      $("#tri1").css("background-color", "rgb(30, 255, 30)");
      $("#kI").css("background-color", "rgb(30, 255, 30)");
      $("#zustand").css("background-color", "rgb(30, 255, 30)");
      $('#qtext').html("i");
      
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
      arword=["B"];
      $(".pfeil").css("filter", "invert(0%) sepia(100%) hue-rotate(16deg) saturate(70)");
      $(".kreis").css("background-color", "rgb(79, 202, 54)");
      $("tr").css("background-color", "rgb(190, 229, 255)");
      let rannumber2=getRandomInt(2);
      zweitesZeichen=ar1[rannumber2];
      arword.push(zweitesZeichen);
      arword.push("B");
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
        arword.push(zweitesZeichen);
        arword.push("E");
        index2=0;
        $("#eingabefeld").val(arword.join(""));
        $("#status").css("background-color", "rgb(190, 229, 255)");
        $("#statustext").html("Ein zuf&aumllliges Reeberwort wurde generiert! <br/> Reeber Validierung starten mit Sequenz oder Step ");
        currentstep=0;
        stepstate=false;
        let startinput= document.getElementById("eingabefeld").value;
        input=startinput;
        reeberarray=Array.from(startinput);
        $("#aniarray").html(reeberarray);
        $("#zustand").css("background-color", "yellow");
        $('#qtext').html("St");
        $('#zustand').animate({'left': 0},0,'linear');
      };


    function generatenonreeber(){
      let x= getRandomInt(2);
      if(x==1){
        $(".kreis").css("background-color", "rgb(79, 202, 54)");
        $("tr").css("background-color", "rgb(190, 229, 255)");
        ar4=["P","V"];
        ar5=["S","X"];
        f1();
        currentstep=0;
        stepstate=false;
      }else{
        $(".kreis").css("background-color", "rgb(79, 202, 54)");
        $("tr").css("background-color", "rgb(190, 229, 255)");
        ar5=["P","V"];
        ar4=["S","X"];
        f1();
        currentstep=0;
        stepstate=false;
        if (arword[1]==="T"){
          arword[arword.length-2]="P";
        }else if(arword[1]=="P"){
          arword[arword.length-2]="T";
        }
      }
      $("#eingabefeld").val(arword.join(""));
      $("#aniarray").html(reeberarray);
      $("#zustand").css("background-color", "yellow");
      
    };


    function reset(){
      $("#statustext").text("Bitte geben sie ihr Wort in das Eingabefeld ein!");
      $("#eingabefeld").focus();
      $("#status").css("background-color", "rgb(190, 229, 255)");
      $("#eingabefeld").val("");
      $("tr").css("background-color", "rgb(190, 229, 255)");
      $(".kreis").css("background-color", "rgb(79, 202, 54)");
      $(".pfeil").css("filter", "invert(0%) sepia(100%) hue-rotate(16deg) saturate(70)");
      $('#qtext').html("St");
      $('#zustand').animate({'left': 0},10,'linear');
      
      
      stepstate=false;
      state=0;
      currentstep=0;
      reeberarray=[];
      $("#aniarray").html(reeberarray);
      $("#zustand").css("background-color", "yellow");
      isreset=true;
      enablebuttons();

    }

      
      
    
    //---------------------------------------Button Events--------------------------------------------//
      

    $("#but1").click(reset);//Reset Button

    $("#but2").click(f1); //generate Reeber

    $("#but3").click(generatenonreeber); // generate nonReeber

    $("#but5").click(startsequence); //Sequence

    $("#but6").click(step); //Step

    $("#but7").click(check);

    $("#but4").click(checkstate);// check BUtton

    function disablebuttons (){
      $("button").prop('disabled', true);
      $("#but1").prop('disabled', false);
      $("#but4").prop('disabled', false);

    }

    function enablebuttons(){
      $("button").prop('disabled', false);
    }



    //--------------------------Speed-------------------------------//



    $("#slider").on("change",function(){
      time = $(this).val();
      $("#speedtext").text(time+"ms");
    });
      
//--------------------------------------------------------Colors--------------------------------------------------------------



 //-----------------input focus und Buttons default----//
  


 $("input").focus(function(){
  $(this).css("background-color", "yellow");
});
$("input").blur(function(){
  $(this).css("background-color", "white"); 
});

$("#kA").on({
  mouseenter: function(){
    $(this).css("background-color", "rgb(250, 250, 58)");
    $("#tra1").css("background-color", "rgb(250, 250, 58)");
    $("#tra2").css("background-color", "rgb(250, 250, 58)");
  },
      
  mouseleave: function(){
    $(this).css("background-color", "rgb(79, 202, 54)");;
    $("#tra1").css("background-color", "rgb(190, 229, 255)");
    $("#tra2").css("background-color", "rgb(190, 229, 255)");
  },
});

$("#kSt").on({
  mouseenter: function(){
    $(this).css("background-color", "rgb(250, 250, 58)");
    $("#trst").css("background-color", "rgb(250, 250, 58)");
    
  },
      
  mouseleave: function(){
    $(this).css("background-color", "rgb(79, 202, 54)");;
    $("#trst").css("background-color", "rgb(190, 229, 255)");
    
  },
});

$("#kB").on({
  mouseenter: function(){
    $(this).css("background-color", "rgb(250, 250, 58)");
    $("#trb1").css("background-color", "rgb(250, 250, 58)");
  },
      
  mouseleave: function(){
    $(this).css("background-color", "rgb(79, 202, 54)");;
    $("#trb1").css("background-color", "rgb(190, 229, 255)");
  },
});

$("#kB").on({
  mouseenter: function(){
    $(this).css("background-color", "rgb(250, 250, 58)");
    $("#trb1").css("background-color", "rgb(250, 250, 58)");
  },
      
  mouseleave: function(){
    $(this).css("background-color", "rgb(79, 202, 54)");;
    $("#trb1").css("background-color", "rgb(190, 229, 255)");
  },
});

$("#kD").on({
  mouseenter: function(){
    $(this).css("background-color", "rgb(250, 250, 58)");
    $("#trd1").css("background-color", "rgb(250, 250, 58)");
    $("#trd2").css("background-color", "rgb(250, 250, 58)");
  },
      
  mouseleave: function(){
    $(this).css("background-color", "rgb(79, 202, 54)");;
    $("#trd1").css("background-color", "rgb(190, 229, 255)");
    $("#trd2").css("background-color", "rgb(190, 229, 255)");
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

$("#kE").on({
  mouseenter: function(){
    $(this).css("background-color", "rgb(250, 250, 58)");
    $("#tre1").css("background-color", "rgb(250, 250, 58)");
  },
      
  mouseleave: function(){
    $(this).css("background-color", "rgb(79, 202, 54)");;
    $("#tre1").css("background-color", "rgb(190, 229, 255)");
  },
});

$("#kF").on({
  mouseenter: function(){
    $(this).css("background-color", "rgb(250, 250, 58)");
    $("#trf1").css("background-color", "rgb(250, 250, 58)");
  },
      
  mouseleave: function(){
    $(this).css("background-color", "rgb(79, 202, 54)");;
    $("#trf1").css("background-color", "rgb(190, 229, 255)");
  },
});

$("#kG").on({
  mouseenter: function(){
    $(this).css("background-color", "rgb(250, 250, 58)");
    $("#trg1").css("background-color", "rgb(250, 250, 58)");
    $("#trg2").css("background-color", "rgb(250, 250, 58)");
  },
      
  mouseleave: function(){
    $(this).css("background-color", "rgb(79, 202, 54)");
    $("#trg1").css("background-color", "rgb(190, 229, 255)");
    $("#trg2").css("background-color", "rgb(190, 229, 255)");
  },
});

$("#kH").on({
  mouseenter: function(){
    $(this).css("background-color", "rgb(250, 250, 58)");
    $("#trh1").css("background-color", "rgb(250, 250, 58)");
    $("#trh2").css("background-color", "rgb(250, 250, 58)");
  },
      
  mouseleave: function(){
    $(this).css("background-color", "rgb(79, 202, 54)");
    $("#trh1").css("background-color", "rgb(190, 229, 255)");
    $("#trh2").css("background-color", "rgb(190, 229, 255)");
  },
});

$("#kI").on({
  mouseenter: function(){
    $(this).css("background-color", "rgb(30, 255, 30)");
    $("#tri1").css("background-color", "rgb(30, 255, 30)");
    
  },
      
  mouseleave: function(){
    $(this).css("background-color", "rgb(79, 202, 54)");
    $("#tri1").css("background-color", "rgb(190, 229, 255)");
    
  },
  });


});

