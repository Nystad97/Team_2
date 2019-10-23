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
        elem.style.width = time/3 + "%"; //progressbaren følger timeren//
  if (time === 0) {
    alert("Tiden er ute");} 
  setTimeout(timeoutFunction, 1000)
}

var Sudoku = {

    //-------------------------------GAME DATA---------------------------------
    //the Sudoku game data, game can be different if the data changes
    matrix1:[  [[7],[2],[],[9],[4],[5],[],[3],[]],
        [[],[3],[9],[2],[],[6],[],[],[4]],
        [[1],[5],[],[7],[3],[8],[6],[9],[2]],
        [[6],[4],[7],[1],[],[3],[],[2],[]],
        [[9],[8],[2],[6],[5],[7],[4],[1],[3]],
        [[3],[],[5],[4],[9],[2],[7],[],[6]],
        [[4],[9],[3],[],[6],[1],[],[5],[7]],
        [[5],[7],[],[3],[2],[],[8],[6],[9]],
        [[],[],[8],[5],[7],[9],[3],[4],[]]
    ],
    matrix2:[  
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
    //render game board and input Sudoku numbers
    start: function(){

        //render game board
        //Matrix1 funker ikke helt enda. 
        if(tilfeldigtall == 1){
        for (var i = 0; i < 9; i++) {
            var row = $('<tr></tr>');
            for(var j = 0; j < 9; j++){
                var sBlock = $('<td class="sBox edit"></td>');
                sBlock.attr('id','Block'+'_'+ i + '_' + j).text(Sudoku.matrix2[i][j]);   //store the block location in the id
                row.append(sBlock);
                if(Sudoku.matrix2[i][j] != ''){  //the number in block with edit class can be changed
                    sBlock.removeClass('edit');
                }
                var groups = Math.floor(Math.sqrt(9));  //use different color to distinguish different groups
                var gA = Math.floor(i / groups);
                var gB = Math.floor(j / groups);
                if (gA % 2 == gB % 2) {
                    sBlock.addClass('sGroup');
                }else{
                    sBlock.addClass('sGroup2');
                }
            $('#sTable').append(row);
            }
        }
        }
        else if(tilfeldigtall == 2){
            for (var i = 0; i < 9; i++) {
                var row = $('<tr></tr>');
                for(var j = 0; j < 9; j++){
                    var sBlock = $('<td class="sBox edit"></td>');
                    sBlock.attr('id','Block'+'_'+ i + '_' + j).text(Sudoku.matrix2[i][j]);   //store the block location in the id
                    row.append(sBlock);
                    if(Sudoku.matrix2[i][j] != ''){  //the number in block with edit class can be changed
                        sBlock.removeClass('edit');
                    }
                    var groups = Math.floor(Math.sqrt(9));  //use different color to distinguish different groups
                    var gA = Math.floor(i / groups);
                    var gB = Math.floor(j / groups);
                    if (gA % 2 == gB % 2) {
                        sBlock.addClass('sGroup');
                    }else{
                        sBlock.addClass('sGroup2');
                    }
                $('#sTable').append(row);
                }
            }
            
        }
    },

    //------------------------------------PLAY FUNCTION-------------------------
    //handle click event in the game playing
    play : function(){
        $('.sBox').click(function(event){   //if the block in the table been clicked
            event.stopPropagation();
            if($(this).hasClass('edit') == true){   //if it's a editable block
                $('.selectActive').removeClass('selectActive');
                $(this).addClass('selectActive');
                    $('.select').css('top',event.pageY).css('left',event.pageX).addClass('active');
            }
        });

        $('.select div').click(function(){  //if the select panel been clicked
            startTimer(); //starter timeren ved første klikk på sudokuen//
            var thisInput = $(this).text();
            var location = $('.selectActive').attr('id').split('_');    //analyze the id to get the location of the block selected
            var thisRow = parseInt(location[1]);    //the x-axis of the block
            var thisCol = parseInt(location[2]);    //the y-axis of the block
            Sudoku.matrix2[thisRow][thisCol] = parseInt(thisInput);  //update the input to the data matrix

            //check the number input
            $('.sWrong').removeClass('sWrong');
            Sudoku.compare();   //check the input by calling the compare function

            //after select a number
            $('.selectActive').text(parseInt(thisInput));            //set the number to block
            $('.selectActive').removeClass('selectActive');
            $('.select').removeClass('active');
        });

        $('html').click(function(){     //the user can click any other part of the page (like background) to close the select panel
            $('.selectActive').removeClass('selectActive');
            $('.select').removeClass('active');
        })

    },

    //--------------------------------COMPARE FUNCTION--------------------------
    //compare numbers on the board to find potential mistake
    compare : function(){
        teller++; //øker oversikten over antall trekk som er foretatt//
        var matrix2 = Sudoku.matrix2;
         for(var i=0; i<9; i++){
             for(var j=0; j<9; j++){
                 for(var h=0; h<9; h++){
                     if(
                         (matrix2[i][j] == matrix2[i][h] && j != h)   //valid rows in Sudoku rules
                         || (matrix2[i][j] == matrix2[h][j] && i != h)    //valid cols in Sudoku rules
                       ){
                         $('#Block_'+i+'_'+j).addClass('sWrong');  //if the number is wrong, show it with a red background
                     };
                 for(var k = 0; k < 3; k++) //valid groups in Sudoku rules
                     for(var l = 0; l < 3; l++)
                         if(
                            (matrix2[i][j] == matrix2[parseInt(i / 3) * 3 + k][parseInt(j / 3) * 3 + l])
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

