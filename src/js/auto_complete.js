/* AutoComplete */
$("#query").autocomplete({
    source: function(request, response){
        var apiKey = 'AIzaSyBpNZaCp_3krSiIFImpeNQrBxVLPIbgGy0';
        var query = request.term;

        $.ajax({
            url: "https://suggestqueries.google.com/complete/search?hl=en&ds=yt&client=youtube&hjson=t&cp=1&q="+query+"&key="+apiKey+"&format=5&alt=json&callback=?",  
            dataType: 'jsonp',
            success: function(data, textStatus, request) { 
               response( $.map( data[1], function(item) {
                    return {
                        label: item[0],
                        value: item[0]
                    }
                }));
            }
        });
    },
    select: function( event, ui ) {
        
    }
});