var topics= ['astronaut', 'black holes', 'galaxies', 'sun', 'space shuttle'];
// var topic= 'space shuttle';
var titleSplit=[];

function displayGifs(){

    var topic = $(this).attr('data-name');
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=@nasa+"+topic+"&api_key=6a2iTvIO64De1NV02DyBhJYA58zOUDkX&limit=10";


    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        $('.search').text(topic);
        //create title of search/button
        // var titleSplit=topic.split('');
        
        // for(var j=0; j<titleSplit.length;j++){
        //     console.log(titleSplit[j]);
        //     $('.search').append(`<span class='animate'>${titleSplit[j]}</split>`);
        // }

        //the rest
        for(var i=0;i<10;i++){
            console.log(response.data[i].images.fixed_height_still.url);
            $('.display-gifs').prepend(`<img class='topic gif' src='${response.data[i].images.fixed_height_still.url}' data-still='${response.data[i].images.fixed_height_still.url}' data-animate='${response.data[i].images.fixed_height.url}' data-state='still'><span class='rate'>${response.data[i].rating}</span>`);
        }

            $(".gif").on("click", function() {
                var state = $(this).attr("data-state");
                // console.log(state);
                if (state === "still") {
                    $(this).attr("src", $(this).attr("data-animate"));
                    $(this).attr("data-state", "animate");
                } else {
                    $(this).attr("src", $(this).attr("data-still"));
                    $(this).attr("data-state", "still");
                }
            });
    });
}

    function addNavLinks() {
        $('.dropdown-menu').empty();
        
        for (var i=0;i<topics.length;i++){
            console.log(topics[i]);
            var a=$('<a>');
            a.addClass('dropdown-item');
            a.attr('data-name', topics[i]);
            a.text(topics[i]);
            $('.dropdown-menu').append(a);
        }
    }

    $('#add-search').on('click',function(event){
        event.preventDefault();
        var topic=$('#add-gif').val().trim();
        topics.push(topic);
        addNavLinks();
        console.log(this);
        // $('.nav-link').addClass('.search-clicked');
        // dropdown.classList.add('.search-clicked');
        // $('#add-search').text('Search');
    });


    // var dropdown = document.querySelectorAll('.dropdown');
    $(document).on('click','.dropdown-item', displayGifs);

    addNavLinks();
