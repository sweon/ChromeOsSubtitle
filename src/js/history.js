var packaged_app = (window.location.origin.indexOf("chrome-extension") == 0);

(function($) {
    $.extend(MediaElementPlayer.prototype, {
	buildhistory: function(player, controls, layers, media) {
	    var t = this;
	    var historyText = 
		'<div class="me-window" style="color:#fff;margin: auto;position: absolute;top: 0; left: 0; bottom: 0; right: 0;width:650px;display: table; height: auto;background: url(background.png);background: rgba(50,50,50,0.7);border: solid 1px transparent;padding: 10px;overflow: hidden;-webkit-border-radius: 0;-moz-border-radius: 0;border-radius: 0;font-size: 16px;visibility: hidden;"></div>';

	    var history = $(historyText
	    ).appendTo(controls[0].parentElement);

	    function hideHistory(e) {
		history.css('visibility','hidden');
		if (player.media.paused)
		    $(".mejs-overlay-play").show();
		
		e.preventDefault();
		e.stopPropagation();
		player.container.off("click", hideHistory);
		return false;
	    }

	    t.openHistoryWindow = function() {

        var srtFiles = {};
        var historyFiles = '<ol>';
        for (var key in player.history) {
            var file = player.history[key];
            srtFiles[key] = file.srtFile;
            historyFiles = historyFiles + '<li><a href="' + file.path + '" data-currentTime="' + file.currentTime + '" data-volume="' + file.volume + '" style="text-decoration: none;">' + file.file + '</li>';
        }
        historyFiles = historyFiles + '</ol>';

        history.html(historyFiles);

        history.find("a").click(function (e) {
            if (document.title != this.innerText) {
                player.history[document.title].currentTime = media.currentTime;
                player.history[document.title].volume = media.volume;
                var currentTime = this.getAttribute('data-currentTime');
                var volume = this.getAttribute('data-volume');
                var playbackRate = media.playbackRate;
                t.openedFile = this.innerText;
                media.setSrc(this.href);
                var srtFile = srtFiles[this.innerText];
                if (srtFile) {
                    player.openSrtEntry(srtFile);
                    $('.mejs-captions-layer').css('visibility','visible');
                } else {
                    $('.mejs-captions-layer').css('visibility','hidden');
                }
                media.setCurrentTime(currentTime);
                media.setVolume(volume);
                media.playbackRate = playbackRate;
                if (player.options.alwaysShowControls == false) {
                    player.startControlsTimer();                
                };
                document.title = t.openedFile;
            }
        });

		$('.me-window').css('visibility','hidden');
		history.css('visibility','visible');
		$(".mejs-overlay-play").hide();
		player.container.click(hideHistory);
	    };

        var open  = 
            $('<div class="mejs-button mejs-history-button mejs-history" >' +
              '<button type="button" aria-controls="' + t.id + '" title="' + mejs.i18n.t('Open video...') + '" aria-label="' + mejs.i18n.t('Open history...') + '"></button>' +
              '</div>')
        .prependTo(controls)
        .click(function(e) {
            e.preventDefault();
            t.openHistoryWindow();
            return false;
        });

	}
    });
})(mejs.$);
