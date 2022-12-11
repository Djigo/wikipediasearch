/*jslint browser: true*/
/*global $, jQuery, alert, moment*/

var nextBox;

function showResults(data) {
    'use strict';
    var i;
    for (i = 1; i < data[1].length; i += 1) {
        $('.resultBox .inner').append('<div class="card searchResult"><div class="card-body"><h5 class="card-title">' + data[1][i] + '</h5><p class="card-text">' + data[2][i] + '</p><a href="' + data[3][i] + '" class="btn btn-primary">Go to Wiki</a></div></div>');
    }
    console.log(data);
}

function getResults() {
    'use strict';
    var query = $('.query').val();
    $.ajax({
        type: "GET",
        url: 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' + query + '&callback=?',
        dataType: 'json',
        async: false,
        success: showResults
    });
}

function boxHeight() {
    'use strict';
    $('.box').css("height", ($(document).height()));
}


function switchBox(event) {
    $('.box').fadeOut(500);
    $('.' + event.data.nextBox).fadeIn(500).css('display','table');    
}




$(document).ready(function () {
    'use strict';
    $.ajaxSetup({
        cache: false
    });
   
    $('.search').click(getResults);
    $('.mainBox .searchButton').click({nextBox: "searchBox"}, switchBox);
    $('.searchBox .search').click({nextBox: "resultBox"}, switchBox);
    
    $('.searchBox .close').click({nextBox: "mainBox"}, switchBox);
    $('.resultBox .close').click({nextBox: "searchBox"}, switchBox);
    
    boxHeight();
    $('.mainBox').fadeIn(1000).css('display','table');
    
    /*Press enter to search*/
    $('.searchBox input').on('keyup', function (e) {
    if (e.keyCode == 13) {
        $('.search').click();
    }
    });
    
});