$("#searchbutton").on("click", function(event) {
  $("#articles").empty();
  event.preventDefault();
  var baseUrl = "https://api.nytimes.com/svc/search/v2/articlesearch.json?";
  var apiKey = "C1AbIqs6kBrMS5sbGKJp47cAAOELpSFj";
  var question = $("#searchterm").val().trim();
  var records = $("#numberofrecords").val().trim();
  var startYear = $("#startyear").val().trim()+"0101";
  var endYear = $("#endyear").val().trim()+"0101";
  if(question!=="" && records!==""){
    var url = baseUrl+"api-key="+apiKey+"&q="+question;
    if(startYear!=="0101")
    {
      url += "&begin_date="+startYear;
    }
    if(endYear!=="0101")
    {
      url += "&end_date="+endYear;
    }
    console.log(url);
    $.ajax({
      url: url,
      method: 'GET',
    }).then(function(result) {
        console.log(result);
        for(var i = 0; i<records; i++){
          var theTitle = result.response.docs[i].headline.main;
          var theYear = result.response.docs[i].pub_date;
          
          var theURL = result.response.docs[i].web_url;
          var theSnippet = result.response.docs[i].snippet;

          var articleDiv = $("<div>");
          articleDiv.addClass("p-3 m-3 border border-secondary rounded bg-light");
          articleDiv.css("word-wrap", "break-word");

          articleDiv.append("<h1><span class='badge badge-secondary'>"+(i+1)+" </span> "+theTitle+"</h1>");
          articleDiv.append("<p>"+theYear+"</p>");
          articleDiv.append("<p><a href='"+theURL+"'>" + theURL + "</a></p>")
          articleDiv.append("<p>"+theSnippet+"</p>");
          $("#articles").append(articleDiv);
        }
    });
  }
});

$("#clearresults").on("click", function() {
  $("#searchterm, #numberofrecords, #startyear, #endyear").val("");
  $("#articles").empty();
});