//Kilde: https://github.com/maoesx/Sudoku-/tree/master/Sudoku //
let time = 300;
let teller = 0;
let tilfeldigtall = Math.floor((Math.random()*2)+1)
console.log(tilfeldigtall);

//Timer//
function startTimer(){
    if (time === 300){
        timeoutFunction()
        
    }
}

function timeoutFunction() {
    time--;
    var elem = document.getElementById("myBar");
  document.getElementById("time").innerHTML = time;
  document.getElementById("teller").innerHTML = teller;
        elem.style.width = time/3 + "%"; //Progressbaren følger timeren//
        var tid = setTimeout(timeoutFunction, 1000)
        if (time === 0) {
    alert("Tiden er ute");
    clearTimeout(tid);
} 
}

var Sudoku = {

    //-------------------------------SPILLINNHOLD---------------------------------
    //Innholdet til sudokuen. Sudokuen endres hvis verdiene her endres
    matrise2:[  
        [[],[],[5],[3],[],[],[],[],[]],
        [[8],[],[],[],[],[],[],[2],[]],
        [[],[7],[],[],[1],[],[5],[],[]],
        [[4],[],[],[],[],[5],[3],[],[]],
        [[],[1],[],[],[7],[],[],[],[6]],
        [[],[],[3],[2],[],[],[],[8],[]],
        [[],[6],[],[5],[],[],[],[],[9]],
        [[],[],[4],[],[],[],[],[3],[]],
        [[],[],[],[],[],[9],[7],[],[]]
],
    
    //-----------------------------START FUNCTION-------------------------------
    //Viser spillet og legger inn nummer
    start: function(){

        //render game board
        //matrise1 funker ikke helt enda. 
            if(tilfeldigtall == 1){
                for (var i = 0; i < 9; i++) {
                    var rad = $('<tr></tr>');
                    for(var j = 0; j < 9; j++){
                        var sBlock = $('<td class="sBox edit"></td>');
                        sBlock.attr('id','Block'+'_'+ i + '_' + j).text(Sudoku.matrise2[i][j]);   //Lagre rutens lokasjon i id
                        rad.append(sBlock);
                        if(Sudoku.matrise2[i][j] != ''){  //Nummeret i ruten kan endres hvis ruten er redigerbar
                            sBlock.removeClass('edit');
                        }
                        var valg = Math.floor(Math.sqrt(9));  //Bruker ulike farger til de ulike valgene
                        var gA = Math.floor(i / valg);
                        var gB = Math.floor(j / valg);
                        if (gA % 2 == gB % 2) {
                            sBlock.addClass('sGroup');
                        }else{
                            sBlock.addClass('sGroup2');
                        }
                    $('#sTable').append(rad);
                    }
                }
                
            }
        
        else if(tilfeldigtall == 2){
            for (var i = 0; i < 9; i++) {
                var rad = $('<tr></tr>');
                for(var j = 0; j < 9; j++){
                    var sBlock = $('<td class="sBox edit"></td>');
                    sBlock.attr('id','Block'+'_'+ i + '_' + j).text(Sudoku.matrise2[i][j]);   //Lagre rutens lokasjon i id
                    rad.append(sBlock);
                    if(Sudoku.matrise2[i][j] != ''){  //Nummeret i ruten kan endres hvis ruten er redigerbar
                        sBlock.removeClass('edit');
                    }
                    var valg = Math.floor(Math.sqrt(9));  //Bruker ulike farger til de ulike valgene
                    var gA = Math.floor(i / valg);
                    var gB = Math.floor(j / valg);
                    if (gA % 2 == gB % 2) {
                        sBlock.addClass('sGroup');
                    }else{
                        sBlock.addClass('sGroup2');
                    }
                $('#sTable').append(rad);
                }
            }
            
        }
    },

    //------------------------------------PLAY FUNCTION-------------------------
    //Håndterer ulike museklikk fra bruker
    play : function(){
        $('.sBox').click(function(event){   //Hvis ruten blir klikket på
            event.stopPropagation();
            if($(this).hasClass('edit') == true){   //Sjekker om denne ruten kan endres
                $('.selectActive').removeClass('selectActive');
                $(this).addClass('selectActive');
                    $('.select').css('top',event.pageY).css('left',event.pageX).addClass('active');
            }
        });

        $('.select div').click(function(){  //Hvis sudokuen blir klikket på
            startTimer(); //starter timeren ved første klikk på sudokuen//
            var inputen = $(this).text();
            var location = $('.selectActive').attr('id').split('_');    //Sjekker id'en for å få lokasjonen på den valgte ruten
            var raden = parseInt(location[1]);    //X-aksen
            var kolonnen = parseInt(location[2]);    //Y-aksen
            Sudoku.matrise2[raden][kolonnen] = parseInt(inputen);  //Fyller inn valgt input

            //Sjekker input
            $('.sWrong').removeClass('sWrong');
            Sudoku.sjekk();   //Sjekker inputen ved å kalle på funksjonen "sjekk"

            //Etter bruker har valgt innput
            $('.selectActive').text(parseInt(inputen));            //Fyller inn valgt tall
            $('.selectActive').removeClass('selectActive');
            $('.select').removeClass('active');
        });

        $('html').click(function(){     //Bruker kan klikke hvor som helst på siden for å få bort menyen
            $('.selectActive').removeClass('selectActive');
            $('.select').removeClass('active');
        })

    },

    //--------------------------------SJEKK FUNCTION--------------------------
    //Sjekker verdiene på brettet for å finne evt feil
    sjekk : function(){
        teller++; //øker oversikten over antall trekk som er foretatt//
        var matrise2 = Sudoku.matrise2;
         for(var i=0; i<9; i++){
             for(var j=0; j<9; j++){
                 for(var h=0; h<9; h++){
                     if(
                         (matrise2[i][j] == matrise2[i][h] && j != h)   //Gyldige rader i sudoku
                         || (matrise2[i][j] == matrise2[h][j] && i != h)    //Gyldige kolonner i sudoku
                       ){
                         $('#Block_'+i+'_'+j).addClass('sWrong');  //Hvis input er feil, vis dette med rød bakgrunn
                     };
                 for(var k = 0; k < 3; k++) //Gyldig valg innenfor reglene
                     for(var l = 0; l < 3; l++)
                         if(
                            (matrise2[i][j] == matrise2[parseInt(i / 3) * 3 + k][parseInt(j / 3) * 3 + l])
                            && (!(i == parseInt(i / 3) * 3+k && j == parseInt(j / 3) * 3+l))
                            ){
                                 $('#Block_'+i+'_'+j).addClass('sWrong');
                             };
                 }
             }
         }
    }
};

$(document).ready(function(){
    Sudoku.start();
    Sudoku.play();
});