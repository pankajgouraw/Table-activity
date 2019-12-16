$(function() {
    let questionIndex = 0;
    let newurl='';
    $("#headerText span").text(headerText);
    $("#instruction").css({color: headerInstructionColor});
    $("#instruction").text(Instruction);
    $('body').css({'background-image': 'url('+bg+')'});
    let innerTableContainer = $('.innerTableContainer');
    dragDrop();
    listOfTable();

    // url value
    let url = window.location.href;
    if (url.indexOf('?') > 0) {
        let params = new URLSearchParams(url.substring(1));
        tableFor = parseInt(params.get('tableFor'));
        // generateOptions();
        dragDrop();
        optionRandPosition();
        // console.log("url variable available....");
    } else {
        // console.log("url variable not available...");
    }


    //function to generate table
    generateTable()
    function generateTable(){
        let htmlData = '';
        for(let i=1; i<= tabelTill; i++){
            let ans = tableFor * i;
            let html = `<div>
                            <span class="firstNumber">${tableFor}</span>
                            <span class="multiplicationSign">x</span>
                            <span class="secondNumber">${i}</span>
                            <span class="equalSign">=</span>
                            <span class="result" data-ans='${ans}' data-user=''>${ans}</span>
                        </div>`;
            htmlData +=html;
        }
        innerTableContainer.html(htmlData);
    }  // end generate table


    //function to generateFirstQuestion
    function generateQuestion(){
        let htmlData = '';
        let ans = '';
        let html = '';

        // question one
        if(questionIndex === 1){
            for(let i=1; i<= tabelTill; i++){
                ans = tableFor * i;
                if( i%2 === 0){
                    html = `<div>
                                <span class="firstNumber">${tableFor}</span>
                                <span class="multiplicationSign">x</span>
                                <span class="secondNumber">${i}</span>
                                <span class="equalSign">=</span>
                                <span class="result">
                                    <input class='drop' data-ans='${ans}' type='text'  data-user=''/>
                                </span>
                            </div>`
                }else{
                    html = `<div>
                                <span class="firstNumber">${tableFor}</span>
                                <span class="multiplicationSign">x</span>
                                <span class="secondNumber">${i}</span>
                                <span class="equalSign">=</span>
                                <span class="result" >${ans}</span>
                            </div>`
                }

                htmlData +=html;
            }
        } // end question one

        // question two
        if(questionIndex === 2){
            let qindex = 0;


            for(let i=1; i<= tabelTill; i++){

                if(qindex==3){qindex=0}

                ans = tableFor * i;

                if(qindex === 0){
                    html = `<div>
                                <span class="firstNumber">${tableFor}</span>
                                <span class="multiplicationSign">x</span>
                                <span class="secondNumber">${i}</span>
                                <span class="equalSign">=</span>
                                <span class="result" >${ans}</span>

                            </div>`
                }else{
                    html = `<div>
                                <span class="firstNumber">${tableFor}</span>
                                <span class="multiplicationSign">x</span>
                                <span class="secondNumber">${i}</span>
                                <span class="equalSign">=</span>
                                <span class="result">
                                    <input class='drop' data-ans='${ans}' type='text'  data-user=''/>
                                </span>
                            </div>`
                }
                qindex++;

                htmlData +=html;
            }
        } // end question two
        

        // question three
        if(questionIndex === 3){
            for(let i=1; i<= tabelTill; i++){
                ans = tableFor * i;
           
                    html = `<div>
                                <span class="firstNumber">${tableFor}</span>
                                <span class="multiplicationSign">x</span>
                                <span class="secondNumber">${i}</span>
                                <span class="equalSign">=</span>
                                <span class="result">
                                    <input class='drop' data-ans='${ans}' type='text'  data-user=''/>
                                </span>
                            </div>`
                htmlData +=html;
            }
        } // end question three


        innerTableContainer.html(htmlData);
    }  // end generateFirstQuestion

    // load next question
    $('#next').click(function(){
        $('#check').show();
        $('#reset').show();
        $('#check').show();

        $('.dropContainer ul').css({'opacity':0});
        questionIndex++;
        console.log(questionIndex)

        if(questionIndex === 3){
            $(this).hide();
            if(tableFor >= lastTable){
                $('#nextTable').hide();
            }else{
                $('#nextTable').show();
            }
            $('#nextTable span').text();
            $('#playAgain').show();   
        }

        $('.innerTableContainer').removeClass('slideInRight');
        $('.innerTableContainer').addClass('zoomOut');
        
        setTimeout(function(){
              $('.innerTableContainer').removeClass('zoomOut').hide();
              generateQuestion();
        },500) 

        setTimeout(function(){
           $('.innerTableContainer').addClass('zoomIn').show();
           //generateOptions()
           dragDrop();
           optionRandPosition();
           if(questionIndex ===3){
            tableFor++;

            //console.log('table for', tableFor)
            let url2 = window.location.pathname;
            newurl = url2 + `?data=all&tableFor=${tableFor}`;
            $('#nextTable span').text(tableFor);
           }
        },1000)

        

    })  // end to load the next question



        // function for drag and drop
    function dragDrop() {

        $('.drag').draggable({
            revert: 'invalid',
            snapMode: 'inner',
            // helper: 'clone'
        });

        $(".drop").droppable({

            accept: ".drag",
            // tolerance: 'intersect',
            drop: function(event, ui) {

                // if ($(event.target).attr('data-user') == '') {
                $(event.target).attr('data-user', ui.draggable.text())

                // centering element when drop
                var drop_el = $(this).offset();
                var drag_el = ui.draggable.offset();
                var left_end = (drop_el.left + ($(this).width() / 2)) - (drag_el.left + (ui.draggable.width() / 2));
                var top_end = (drop_el.top + ($(this).height() / 2)) - (drag_el.top + (ui.draggable.height() / 2));
                ui.draggable.animate({
                    top: '+=' + top_end,
                    left: '+=' + left_end
                });
                // centering element when drop end

            } // drop method end here
        });

    } //end here drag and drop 

    // generate options
    // function generateOptions(){
    //     $('.dropContainer ul').css({'opacity':1});
    //     let htmlData = '';
    //         for(let i=1; i<= tabelTill; i++){
    //             ans = tableFor * i;
           
    //                 html = `<li><span class="drag">${ans}</span></li>`;

    //             htmlData +=html;
    //         }
    //         $('.dropContainer ul').html(htmlData);
    // } 
    // end generate random position

    // arrange the options to the random position
    function optionRandPosition() {
        let dragElement = $('.dropContainer ul li');
        $.each(dragElement, function(i, value) {
            $(this).css({
                order: Math.floor(Math.random() * dragElement.length) + 1
            });
        })
    }
    // end arrange the options to the random position
    
  $('#nextTable').click(function(){
      window.location.href = newurl;
  })

    $('#playAgain').click(function(){
        window.location.href = 'main.html'
    })


        //reset question function
    $('#reset').click(function() {
        $('.drop').attr('data-user', '').css({
            'backgroundColor': '#f9f9f957'
        });
        $('.drop').val('');

    })
    //reset question function end

    // check answer function  
    let correctAns = '';
    $('#check').click(function() {
        let dropLength = $('.drop').length;
        console.log('dropLength', dropLength)
        $.each($('.drop'), function(index, value) {
            let dataUser = $(value).attr('data-user');
            let dataAns = $(value).attr('data-ans');
            // console.log(dataUser, dataAns);
            if (dataUser == dataAns) {
                $(value).css({
                    'backgroundColor': 'green'
                })
                correctAns++;

            } else {
                
                $(value).css({
                    'backgroundColor': 'red'
                })
            }
        })

        if(correctAns == dropLength){
            //console.log('all are correct ans..')
            $('.wellDone').fadeIn();
            let audio = new Audio('audio/welldone.mp3');
            audio.play();
            setTimeout(function(){
              $('.wellDone').fadeOut();  
          },2000)
        }else{
           $('.errors').fadeIn();
            let audio = new Audio('audio/tryAgain.mp3');
            audio.play();
            setTimeout(function(){
              $('.errors').fadeOut();  
          },2000)
            
        }

        correctAns = 0;

    }) // check answer function  end


    // get the user data
    $('body').on('keyup', '.drop', function(e)
    {
        let inputValue = $(this).val();
        $(this).attr('data-user',inputValue);
    })
    // get the user data end

    //listOfTable
    
    function listOfTable(){
        let htmlData = '';
        for(let i=tableFor; i <= lastTable; i++){
            let html = `<option value='${i}'>${i}</option>`;
            htmlData += html;
        }
        // console.log('hello world');
        $('#listOfTable').html(htmlData);
    }
    //listOfTable end

    $('#listOfTable').change(function(){
            let url2 = window.location.pathname;
            let selectValue = $(this).val();
            newurl = url2 + `?data=all&tableFor=${selectValue}`;
            // $('#nextTable span').text(tableFor);
             window.location.href = newurl;
            // tableFor++;

             $(this).val(tableFor);
    })

    $('#listOfTable').val(tableFor);
}); // end document function 