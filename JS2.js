$(document).ready(function(){
    var artist=getQueryParameter("term");
    $.ajax({
        url:"http://itunes.apple.com/search?term=" + artist,
        dataType: 'jsonp',
        success:processObject,
    });
});

function processObject(object) {
    var song=getQueryParameter("song");
    var songInteger=parseInt(song);
    var specificSong=object.results[songInteger];
    console.log(specificSong);

    $("#songNameResult").html(specificSong.trackName);

    $("#songRankResult").html(songInteger+1);

    $("#artistNameResult").html(specificSong.artistName);

    var audio=document.createElement("audio");
    document.getElementById("audioPreviewResult").appendChild(audio);
    audio.setAttribute("controls", "");
    var source=document.createElement("source");
    audio.appendChild(source);
    source.setAttribute("src", specificSong.previewUrl);

    $("#albumNameResult").html(specificSong.collectionName);

    var img=document.createElement("img");
    document.getElementById("albumArtResult").appendChild(img);
    img.setAttribute("src", specificSong.artworkUrl100);

    var date = new Date(specificSong.releaseDate);
    $("#releaseDateResult").html(date.toDateString());

    var time=specificSong.trackTimeMillis;
    var seconds=time/1000;
    var mins=seconds/60;
    var minsDisplayed=Math.floor(mins);
    var remainingTime= time - (minsDisplayed*60*1000);
    remainingSeconds=remainingTime/1000;
    var secondsDisplayed=Math.floor(remainingSeconds);
    $("#songLengthResult").html(minsDisplayed+":"+secondsDisplayed);

    $("#genreResult").html(specificSong.primaryGenreName);

    if(specificSong.trackExplicitness=="notExplicit"){
        var explicit="No";
    }else{
        var explicit="Yes";
    }
    $("#explicitResult").html(explicit);

    $("#linkToAppleMusicResult").attr("href", specificSong.trackViewUrl);
    $("#linkToAppleMusicResult").html(specificSong.trackViewUrl);

    $("#backToList").attr("href", "HTML.html?term=" + getQueryParameter("term")+"&number="+getQueryParameter("number"));
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