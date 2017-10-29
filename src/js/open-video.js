var packaged_app = (window.location.origin.indexOf("chrome-extension") == 0);

(function($) {
    $.extend(MediaElementPlayer.prototype, {
        buildsource: function(player, controls, layers, media) {
            var 
            t = this,
                openFileInput = $('<input style="display:none" type="file" multiple id="openfile_input"/>')
            .appendTo(controls);
            t.openedFile = null;
            var open  = 
                $('<div class="mejs-button mejs-source-button mejs-source" >' +
                  '<button type="button" aria-controls="' + t.id + '" title="' + mejs.i18n.t('Open video...') + '" aria-label="' + mejs.i18n.t('Open video...') + '"></button>' +
                  '</div>')
            .appendTo(controls);
            var fileInputFormOpened = fileInputFormOpened || false;
            player.openFileForm = function () {
                if (packaged_app) {
                    chrome.fileSystem.chooseEntry({
                        type: "openFile"
                    }, function (entry) {
                        entry.file(function fff(file) {
                            media.stop();
                            player.tracks = [];             
                            var path = window.URL.createObjectURL(file);
                            t.openedFile = file;
                            t.openedFileEntry = entry;
                            mainMediaElement.setSrc(path);
                            mainMediaElement.play();
                        });
                    });
                }
                else {
                    openFileInput[0].click();
                    if (!fileInputFormOpened) {
                        openFileInput[0].click();
                        fileInputFormOpened = true;
                    }
                }
            };
            open.click(function(e) {
                e.preventDefault();
                player.openFileForm();
                return false;
            });
            openFileInput.change(function (e) {
            if (openFileInput[0].files[0]) {
                media.stop();
                var prevTitle = document.title;
                var prevTime = media.currentTime;
                var prevVolume = media.volume;
                player.tracks = [];
                if (openFileInput[0].files[0].type.indexOf("subrip") >= 0) {
                    player.openSrtEntry(openFileInput[0].files[0]);
                    player.history[document.title].srtFile = openFileInput[0].files[0];
                } else {
                    var path = window.URL.createObjectURL(openFileInput[0].files[0]);
                    t.openedFile = openFileInput[0].files[0];
                    media.setSrc(path);
                    media.play();
                    media.stop();
                    document.title = t.openedFile.name;
                    if (openFileInput[0].files[1]) {
                        player.openSrtEntry(openFileInput[0].files[1]);
                        var srtFile = openFileInput[0].files[1];
                    }
                    if (player.options.alwaysShowControls == false) {
                        player.startControlsTimer();                
                    };
                    player.history = player.history || {};
                    if (prevTitle != "Subtitle Videoplayer") {
                        player.history[prevTitle].currentTime = prevTime;
                        player.history[prevTitle].volume = prevVolume;
                    }
                    player.history[document.title] = {"path": path, "srtFile": srtFile, "currentTime": 0, "volume": 1.0, "file":document.title};
                    return false;
                }
            }
            });
        }
    });
})(mejs.$);
