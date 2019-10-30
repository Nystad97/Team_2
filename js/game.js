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
    matrise: undefined,
    
    //-----------------------------START FUNCTION-------------------------------
    //Viser spillet og legger inn nummer
    start: function(){

        //render game board
        //matrise1 funker ikke helt enda. 
            $('#sTable').empty()
            
                for (var i = 0; i < 9; i++) {
                    var rad = $('<tr></tr>');
                    for(var j = 0; j < 9; j++){
                        var sBlock = $('<td class="sBox edit"></td>');
                        sBlock.attr('id','Block'+'_'+ i + '_' + j).text(Sudoku.matrise[i][j]);   //Lagre rutens lokasjon i id
                        rad.append(sBlock);
                        if(Sudoku.matrise[i][j] != ''){  //Nummeret i ruten kan endres hvis ruten er redigerbar
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
    ,

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
            Sudoku.matrise[raden][kolonnen] = parseInt(inputen);  //Fyller inn valgt input

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
        var matrise = Sudoku.matrise;
         for(var i=0; i<9; i++){
             for(var j=0; j<9; j++){
                 for(var h=0; h<9; h++){
                     if(
                         (matrise[i][j] == matrise[i][h] && j != h)   //Gyldige rader i sudoku
                         || (matrise[i][j] == matrise[h][j] && i != h)    //Gyldige kolonner i sudoku
                       ){
                         $('#Block_'+i+'_'+j).addClass('sWrong');  //Hvis input er feil, vis dette med rød bakgrunn
                     };
                 for(var k = 0; k < 3; k++) //Gyldig valg innenfor reglene
                     for(var l = 0; l < 3; l++)
                         if(
                            (matrise[i][j] == matrise[parseInt(i / 3) * 3 + k][parseInt(j / 3) * 3 + l])
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

//brett


function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function getRandomListElement(list) {
    return list[getRandomInt(list.length)]
}

var Sudokulett = [

    [  [[7],[2],[],[9],[4],[5],[],[3],[]],
        [[],[3],[9],[2],[],[6],[],[],[4]],
        [[1],[5],[],[7],[3],[8],[6],[9],[2]],
        [[6],[4],[7],[1],[],[3],[],[2],[]],
        [[9],[8],[2],[6],[5],[7],[4],[1],[3]],
        [[3],[],[5],[4],[9],[2],[7],[],[6]],
        [[4],[9],[3],[],[6],[1],[],[5],[7]],
        [[5],[7],[],[3],[2],[],[8],[6],[9]],
        [[],[],[8],[5],[7],[9],[3],[4],[]]
    ],

    //lett
    [  
       [[],[],[5],  [1],[],[],   [],[4],[]],
       [[],[6],[],  [],[],[],   [],[],[9]],
       [[],[9],[7],  [],[6],[3],   [],[],[]],

       [[],[],[1],  [],[],[7],   [],[9],[2]],
       [[],[2],[],  [8],[],[6],   [],[5],[]],
       [[3],[5],[],  [9],[],[],   [1],[],[]],
       
       [[],[],[],  [2],[3],[],   [5],[7],[]],
       [[2],[],[],  [],[],[],   [],[3],[]],
       [[],[1],[],  [],[],[9],   [6],[],[]]
    ],

    [  
        [[],[8],[],  [],[],[4],   [],[2],[5]],
        [[],[4],[],  [],[],[7],   [],[1],[]],
        [[5],[],[7],  [2],[],[],   [],[9],[]],
        
        [[],[2],[],  [],[],[],   [],[3],[]],
        [[],[],[4],  [],[1],[],   [8],[],[]],
        [[1],[],[],  [],[],[6],   [],[],[]],
        
        [[],[],[],  [5],[7],[],   [],[],[2]],
        [[],[],[],  [1],[],[],   [4],[],[3]],
        [[7],[],[],  [6],[],[9],   [],[],[]]
    ],
]


var Sudokumiddels = [

    [  
        [[],[3],[1],  [],[6],[],   [],[],[]],
        [[],[],[],  [],[],[],   [],[],[]],
        [[6],[],[],  [8],[],[],   [],[7],[]],
    
        [[1],[5],[],  [],[9],[],   [8],[],[]],
        [[8],[],[7],  [2],[],[],   [6],[1],[3]],
        [[],[],[],  [],[],[],   [],[],[]],
    
        [[],[8],[],  [],[1],[],   [],[],[]],
        [[],[4],[],  [],[],[6],   [5],[],[]],
        [[],[],[],  [],[7],[3],   [2],[9],[]]
    ],
    
    [  
        [[],[],[],  [],[],[],   [9],[7],[2]],
        [[],[9],[],  [],[4],[1],   [],[8],[]],
        [[],[3],[],  [],[],[],   [],[],[]],
    
        [[],[],[2],  [],[8],[9],   [3],[],[4]],
        [[7],[],[],  [],[],[],   [],[],[]],
        [[],[],[1],  [],[3],[],   [6],[],[]],
    
        [[],[],[5],  [],[9],[7],   [],[4],[]],
        [[8],[],[],  [2],[],[],   [],[5],[]],
        [[],[],[],  [],[],[4],   [],[],[]]
    ],
    
    [  
        [[],[2],[],  [],[],[],   [],[1],[]],
        [[],[],[],  [7],[],[2],   [9],[],[6]],
        [[8],[7],[],  [1],[],[6],   [],[],[]],
    
        [[],[3],[],  [],[],[],   [],[],[2]],
        [[4],[],[],  [],[],[],   [7],[],[3]],
        [[9],[],[],  [],[],[],   [],[5],[]],
    
        [[],[],[],  [4],[],[1],   [],[7],[5]],
        [[7],[],[],  [9],[],[8],   [],[],[]],
        [[],[4],[],  [],[],[],   [],[2],[]]
    ],
]



var Sudokuvanskelig = [

    [  
        [[],[],[5], [3],[],[],  [],[],[]],
        [[8],[],[], [],[],[],   [],[2],[]],
        [[],[7],[], [],[1],[],  [5],[],[]],
        
        [[4],[],[], [],[],[5],  [3],[],[]],
        [[],[1],[], [],[7],[],  [],[],[6]],
        [[],[],[3], [2],[],[],  [],[8],[]],
        
        [[],[6],[], [5],[],[],  [],[],[9]],
        [[],[],[4], [],[],[],   [],[3],[]],
        [[],[],[],  [],[],[9],  [7],[],[]]
],

    [  
        [[8],[],[], [],[],[],   [],[],[]],
        [[],[],[7], [],[],[],   [2],[],[1]],
        [[],[],[],  [2],[7],[], [],[3],[]],
    
        [[6],[],[], [9],[],[7], [],[],[]],
        [[],[],[],  [8],[],[],  [5],[],[]],
        [[9],[],[2],[],[],[5],  [3],[],[]],
    
        [[],[],[4], [7],[],[],  [],[],[]],
        [[2],[],[], [],[],[6],  [],[4],[5]],
        [[],[],[5], [],[8],[4], [1],[],[]]
    ],

    [  
        [[6],[],[], [],[],[8],  [],[],[7]],
        [[5],[],[], [],[7],[],  [3],[],[]],
        [[],[],[8], [],[],[],   [],[],[]],
        
        [[2],[7],[],[5],[],[9], [],[4],[]],
        [[9],[],[],[1],[],[3],  [],[],[2]],
        [[],[8],[],[7],[],[6],  [],[5],[9]],
        
        [[],[],[],  [],[],[],   [2],[],[]],
        [[],[],[3], [],[9],[],  [],[],[1]],
        [[1],[],[], [2],[],[],  [],[],[5]]
],
]

function lett() {
    Sudoku.matrise = getRandomListElement(Sudokulett)
    Sudoku.start();
    Sudoku.play();
    Sudoku.sjekk();
    teller = 0;
    time = 300;
}

function middels() {
    Sudoku.matrise = getRandomListElement(Sudokumiddels)
    Sudoku.start();
    Sudoku.play();
    teller = 0;
    time = 300;
}

function vanskelig() {
    Sudoku.matrise = getRandomListElement(Sudokuvanskelig)
    Sudoku.start();
    Sudoku.play();
    Sudoku.sjekk();
    teller = 0;
    time = 300;
}

middels()

//Mal
/*brettx:[  
    [[],[],[],  [],[],[],   [],[],[]],
    [[],[],[],  [],[],[],   [],[],[]],
    [[],[],[],  [],[],[],   [],[],[]],

    [[],[],[],  [],[],[],   [],[],[]],
    [[],[],[],  [],[],[],   [],[],[]],
    [[],[],[],  [],[],[],   [],[],[]],

    [[],[],[],  [],[],[],   [],[],[]],
    [[],[],[],  [],[],[],   [],[],[]],
    [[],[],[],  [],[],[],   [],[],[]]
],
*/