/*global $ APIKEY*/
$(document).ready(function() {
    var headline = $("#headline-list");

    $.ajax({
        method: "GET",
        url: "https://newsapi.org/v2/sources",
        data: {
            category: "business",
            country: "us",
            language: "en",
            apiKey: APIKEY
        },
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
    }).done(function(data) {
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
            data: {
                sources: id,
                apiKey: APIKEY
            },
            success: function(data) {

                while (headline.children().length) {
                    headline.empty();
                }

                if (data.status == "ok") {
                    console.log(data)
                    for (var i = 0; i < data.articles.length; i++) {
                        var articleTitle = document.createElement("DT");
                        var articleAuthor = document.createElement("DD");
                        var articleDesc = document.createElement("DD");


                        articleTitle.innerHTML = `<a href="${data.articles[i].url}">${data.articles[i].title}</a>`;
                        articleAuthor.innerHTML = `<strong>By ${data.articles[i].author}</strong>`;
                        articleDesc.innerHTML = data.articles[i].description;
                        document.getElementById("headline-list").appendChild(articleTitle);
                        if (data.articles[i].author) {
                            document.getElementById("headline-list").appendChild(articleAuthor);
                        }
                        document.getElementById("headline-list").appendChild(articleDesc);
                    }
                }
            }
        })
    })
})
