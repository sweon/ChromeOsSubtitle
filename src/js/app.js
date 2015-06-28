var myURL = window.URL || window.webkitURL;

var packaged_app = (window.location.origin.indexOf("chrome-extension") == 0);

var mainMediaElement = null;

$('#main').append('<video id="player" controls="controls"></video>');

var features = ['source', 'settings','playpause','progress','current','duration', 'tracks','subdelay', 'subsize', 'volume', 'settingsbutton', 'info', 'help', 'fullscreen', 'drop', 'stats'];
features.push('opensubtitle');
if (packaged_app)
    features.push('autosrt');

$('#player').mediaelementplayer({
    startLanguage:'en',
    isVideo:true,
    hideCaptionsButtonWhenEmpty:false,
    mode:"native",
    features: features,
    keyActions: [
	{
	    keys: [
		13, // Enter
		32, // SPACE
		179 // GOOGLE play/pause button
	    ],
	    action: function(player, media) {
		if (media.readyState != 4)
		    return;
		
		if (media.paused || media.ended) {
		    media.play();	
            // player.startControlsTimer();
		} else {
		    media.pause();
		}										
	    }
	},
    {
        keys: [221], // ]
        action: function(player, media) {
        var newPlaybackRate = media.playbackRate + 0.1;
        media.playbackRate = newPlaybackRate;
        }
    },
    {
        keys: [219], // [
        action: function(player, media) {
        var newPlaybackRate = media.playbackRate - 0.1;
        media.playbackRate = newPlaybackRate;
        }
    },
    {
        keys: [49], // 1
        action: function(player, media) {
        media.playbackRate = 1.0;
        }
    },
    {
        keys: [50], // 2
        action: function(player, media) {
        media.playbackRate = 2.0;
        }
    },
    {
        keys: [51], // 3
        action: function(player, media) {
        media.playbackRate = 1.3;
        }
    },
    {
        keys: [52], // 4
        action: function(player, media) {
        media.playbackRate = 1.4;
        }
    },
    {
        keys: [53], // 5
        action: function(player, media) {
        media.playbackRate = 1.5;
        }
    },
    {
        keys: [54], // 6
        action: function(player, media) {
        media.playbackRate = 1.6;
        }
    },
    {
        keys: [55], // 7
        action: function(player, media) {
        media.playbackRate = 1.7;
        }
    },
	{
	    keys: [38], // UP
	    action: function(player, media) {
		var newVolume = Math.min(media.volume + 0.1, 1);
		media.setVolume(newVolume);
	    }
	},
	{
	    keys: [40], // DOWN
	    action: function(player, media) {
		var newVolume = Math.max(media.volume - 0.1, 0);
		media.setVolume(newVolume);
	    }
	},
	{
	    keys: [
		37, // LEFT
		227 // Google TV rewind
	    ],
	    action: function(player, media) {
		if (!isNaN(media.duration) && media.duration > 0) {
		    if (player.isVideo) {
			player.showControls();
			player.startControlsTimer();
		    }
		    
		    // 5%
		    var newTime = Math.max(media.currentTime - player.options.defaultSeekBackwardInterval(media), 0);
		    media.setCurrentTime(newTime);
		}
	    }
	},
    {
        keys: [
        57 // 9
        ],
        action: function(player, media) {
        if (!isNaN(media.duration) && media.duration > 0) {
            if (player.isVideo) {
            player.showControls();
            player.startControlsTimer();
            }

            // 5%
            var newTime = Math.max(media.currentTime - player.options.defaultSeekBackwardIntervalSmall(media), 0);
            media.setCurrentTime(newTime);
        }
        }
    },
    {
        keys: [
        188 // ,
        ],
        action: function(player, media) {
        if (!isNaN(media.duration) && media.duration > 0) {
            if (player.isVideo) {
            player.showControls();
            player.startControlsTimer();
            }

            // 5%
            var newTime = Math.max(media.currentTime - player.options.defaultSeekBackwardIntervalBig(media), 0);
            media.setCurrentTime(newTime);
        }
        }
    },
	{
	    keys: [
		39, // RIGHT
		228 // Google TV forward
	    ], 
	    action: function(player, media) {
		if (!isNaN(media.duration) && media.duration > 0) {
		    if (player.isVideo) {
			player.showControls();
			player.startControlsTimer();
		    }
		    
		    // 5%
		    var newTime = Math.min(media.currentTime + player.options.defaultSeekForwardInterval(media), media.duration);										
		    media.setCurrentTime(newTime);
		}
	    }
	},
    {
        keys: [
        48 // 0
        ],
        action: function(player, media) {
        if (!isNaN(media.duration) && media.duration > 0) {
            if (player.isVideo) {
            player.showControls();
            player.startControlsTimer();
            }

            // 5%
            var newTime = Math.min(media.currentTime + player.options.defaultSeekForwardIntervalSmall(media), media.duration);
            media.setCurrentTime(newTime);
        }
        }
    },
    {
        keys: [
        190 // .
        ],
        action: function(player, media) {
        if (!isNaN(media.duration) && media.duration > 0) {
            if (player.isVideo) {
            player.showControls();
            player.startControlsTimer();
            }

            // 5%
            var newTime = Math.min(media.currentTime + player.options.defaultSeekForwardIntervalBig(media), media.duration);
            media.setCurrentTime(newTime);
        }
        }
    },
	{
	    keys: [70], // f
	    action: function(player, media) {
		if (typeof player.enterFullScreen != 'undefined') {
		    if (player.isFullScreen) {
			player.exitFullScreen();
		    } else {
			player.enterFullScreen();
		    }
		}
	    }
	},
    {
        keys: [86], // O
        action: function(player, media) {
			if (player.options.alwaysShowControls == true) {
				player.options.alwaysShowControls = false;
				player.hideControls();
			} else {
				player.options.alwaysShowControls = true; 
				player.showControls();
			}
        }
    },
	{
	    keys: [79], // O
	    action: function(player, media) {
		player.openFileForm();
	    }
	},
	{
	    keys: [68],  // D
	    action: function(player, media) {
		if (!player.openedFile)
		    return;
		player.openSubtitleLogIn();
	    }
	},
	{
	    keys: [73],  // I
	    action: function(player, media) {
		player.openInfoWindow();
	    }
	},
	{
	    keys: [83],  // S
	    action: function(player, media) {
		player.openSettingsWindow();
	    }
	},
	{
	    keys: [72],  // H
	    action: function(player, media) {
		player.openHelpWindow();
	    }
	},
	{
	    keys: [189],  // -
	    action: function(player, media) {
		player.decCaptionSize();
	    }
	},
	{
	    keys: [187],  // +
	    action: function(player, media) {
		player.incCaptionSize();
	    }
	},
	{
	    keys: [90],  // z
	    action: function(player, media) {
		player.decCaptionDelay();
	    }
	},
	{
	    keys: [88],  // x
	    action: function(player, media) {
		player.incCaptionDelay();
	    }
	},
    {
        keys: [67, 166],  // Escape
        action: function(player, media) {
        player.toggleCaption();
        }
    },
    ],
    success: function (mediaElement, domObject) { 
	mainMediaElement = mediaElement;

	mainMediaElement.player.container
	    .addClass('mejs-container-fullscreen');
	mainMediaElement.player.container
	    .width('100%')
	    .height('100%');

	var t = mainMediaElement.player;
	if (mainMediaElement.player.pluginType === 'native') {
	    t.$media
		.width('100%')
		.height('100%');
	} else {
	    t.container.find('.mejs-shim')
		.width('100%')
		.height('100%');
	    
	    //if (!mejs.MediaFeatures.hasTrueNativeFullScreen) {
	    t.media.setVideoSize($(window).width(),$(window).height());
	    //}
	}

	t.layers.children('div')
	    .width('100%')
	    .height('100%');

	t.setControlsSize();


	function openCmdLineVideo() {
	    if (!window.launchData)
		return false;
	    if (!window.launchData.items)
		return false;
	    if (window.launchData.items.length != 1)
		return false;
	    entry = window.launchData.items[0].entry;
	    if (entry == null)
		return false;

	    mainMediaElement.stop();
	    entry.file(function fff(file) {
		mainMediaElement.player.openedFile = file;
		mainMediaElement.player.openedFileEntry = entry;

		var path = window.URL.createObjectURL(file);
		mainMediaElement.setSrc(path);		
		mainMediaElement.play();
	    });
	    return true;
	}

	$(document).trigger("appStarted"); 

	if (!openCmdLineVideo())
	    mediaElement.player.openInfoWindow();
    }
});
