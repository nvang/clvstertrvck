var nowPlaying;

String.prototype.toMMSS = function () {
    var sec_num = parseInt(this, 10); // don't forget the second param
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    return minutes + ':' + seconds;
};

$(document).ready(function () {
    stopAll();
    startListening();
    $('.track').on('click', play);
});

function play() {
    stopAll();

    $(this).children('div').show();

    var nr = this.id.split('-').pop();

    $(this).children('div.title').addClass('active');

    var track = $('#track-' + nr);

    if (nr === nowPlaying) {
        stopAll();
        nowPlaying = null;
        return;
    }

    track.get(0).play();
    nowPlaying = nr;
}

function setLabel(nr, time) {
    var timeLabel = time.toString().toMMSS();
    $('#ep-1-' + nr + ' .current').text(timeLabel);
}

function startListening() {
    $('audio').each(function (key, el) {
        el.addEventListener('timeupdate', function () {
            setLabel(nowPlaying, this.currentTime);
        })
    });
}

function stopAll() {
    $('.track div.title').removeClass('active');

    $('.track div.current, .track div.total').each(function (key, el) {
        $(el).hide();
    });

    $('audio').each(function (key, el) {
        el.pause();
    });
}