var nameSearched;

function search() {
    nameSearched=$("#artistName").val();
    var numberOfSongs=$("#numberOfSongs").val();
    $.ajax({
        url:"http://itunes.apple.com/search?term=" + nameSearched + "&&limit=" + numberOfSongs,
        dataType: 'jsonp',
        success:processResults,
    });


}

$(document).ready(function(){
    if(getQueryParameter("term")!=null){
        var originalArtistName=getQueryParameter("term");
        var spaceInName=false;
        for(var i=0;i<originalArtistName.length;i++){
            if(originalArtistName[i]=="%"){
                spaceInName=true;
            }
        }
        if(spaceInName){
            var twoTerms= originalArtistName.split("%");
            var firstTerm=twoTerms[0];
            var secondPart=twoTerms[1].split("0");
            var secondTerm=secondPart[1];
            $("#artistName").attr("value", firstTerm+ " " + secondTerm);
        }else{
            $("#artistName").attr("value", originalArtistName);
        }
        var numberOfSongs=parseInt(getQueryParameter("number"));
        $("#numberOfSongs").val(numberOfSongs);
        search();
    }
});

function processResults(data){
    console.log(data);
    $("#mainTable").empty();
    var headerRow=document.createElement("tr");
    var rank=document.createElement("td");
    rank.innerHTML="Rank";
    rank.setAttribute("class", "header");
    var song=document.createElement("td");
    song.innerHTML="Song";
    song.setAttribute("class", "header");
    var blank=document.createElement("td");
    blank.innerHTML="";
    blank.setAttribute("class", "header");
    var album=document.createElement("td");
    album.innerHTML="Album";
    album.setAttribute("class", "header");
    var preview=document.createElement("td");
    preview.innerHTML="Preview";
    preview.setAttribute("class", "header");
    preview.style.position="relative";
    preview.style.left="110px";
    document.getElementById("mainTable").appendChild(headerRow);
    headerRow.appendChild(rank);
    headerRow.appendChild(blank);
    headerRow.appendChild(song);
    headerRow.appendChild(album);
    headerRow.appendChild(preview);
    for(var i=0; i < data.results.length; i++){
        var row = document.createElement("tr");
        document.getElementById("mainTable").appendChild(row);

        var td1 = document.createElement("td");
        row.appendChild(td1);
        td1.innerHTML = i+1;

        var td2 = document.createElement("td");
        row.appendChild(td2);
        var img=document.createElement("img");
        td2.appendChild(img);
        img.setAttribute("src", data.results[i].artworkUrl100);

        var td3 = document.createElement("td");
        row.appendChild(td3);
        td3.innerHTML = data.results[i].trackName;

        var td4 = document.createElement("td");
        row.appendChild(td4);
        td4.innerHTML = data.results[i].collectionName;

        var td5 = document.createElement("td");
        row.appendChild(td5);
        var audio=document.createElement("audio");
        td5.appendChild(audio);
        audio.setAttribute("controls", "");
        var source=document.createElement("source");
        audio.appendChild(source);
        source.setAttribute("src", data.results[i].previewUrl);

        var td6 = document.createElement("td");
        row.appendChild(td6);
        var moreInfo=document.createElement("a");
        moreInfo.setAttribute("href", "detail.html?term=" + nameSearched + "&song=" + i + "&number="+data.results.length);
        moreInfo.innerHTML="Details";
        td6.appendChild(moreInfo);
        td6.style.position="relative";
        td6.style.top="35px";
        td6.style.right="1px";
    }
}

function getQueryParameter(parameter) {
    var query=window.location.search.substring(1);
    var parts=query.split("&");
    for(var i=0;i<parts.length; i++){
        var pair=parts[i].split("=");
        if(pair[0]==parameter){
            return pair[1];
        }
    }
}