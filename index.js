/*global $ APIKEY*/
$(document).ready(function() {
    $.ajax({
            method: "GET",
            url: "https://newsapi.org/v2/sources",
            data: { category: "business", country: "us", language: "en", apiKey: APIKEY },
            success: function(data) {
                if (data.status == "ok") {
                    console.log(data)
                    for (var i = 0; i < data.sources.length; i++) {
                        var source = document.createElement("OPTION");
                        source.setAttribute("value", data.sources[i].id)
                        source.innerHTML = data.sources[i].name;
                        document.getElementById('selection').appendChild(source);
                    }
                }
                else {
                    alert(data.message)
                }
            }
        })
        .done(function(data) {
            console.log(data)
            console.log(data.status);
        });
    $('#source').submit(function(event) {
        event.preventDefault();
        //alert(document.getElementById('selection').value)
        var id = document.getElementById('selection').value
        $.ajax({
            method: "GET",
            url: "https://newsapi.org/v2/top-headlines",
            data: { sources: id, apiKey: APIKEY },
            success: function(data) {
                if (data.status == "ok") {
                    console.log(data)
                    for (var i = 0; i < data.articles.length; i++) {
                        var article = document.createElement("LI");
                        article.innerHTML = data.articles[i].title;
                        document.getElementById("headline-list").appendChild(article);
                    }
                }
            }

        })
    })
})
