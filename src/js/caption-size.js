(function($) {
    $.extend(MediaElementPlayer.prototype, {
	buildsubsize: function(player, controls, layers, media) {
	    var captionSelector = player.captionsButton.find('.mejs-captions-selector');
	    var t = this;

	    function updateCaptionSize(value) {
		$('.mejs-captions-layer').css({
		    "line-height":function( index, oldValue ) {
			return value + "px";
		    },
		    "font-size":function( index, oldValue ) {
			return value + "px";
		    }
		});
	    };

	    var value =
		$('<input style="background-color: transparent; width: 41px; color: white; font-size: 10px;clear: none; margin:0px 0px 0px 0px;"></input>').
		on('input',function(e){
		    updateCaptionSize(Number(t.capSizeInput.value));
		});


	    t.capSizeInput = value[0];
	    
	    t.decCaptionSize = function() {
		t.capSizeInput.value = (Number(t.capSizeInput.value) / 1.2).toFixed(0);
		updateCaptionSize(Number(t.capSizeInput.value));
	    }
	    t.incCaptionSize = function() {
		t.capSizeInput.value = (Number(t.capSizeInput.value) * 1.2).toFixed(0);
		updateCaptionSize(Number(t.capSizeInput.value));
	    }

        t.decCaptionMargin = function() {
            $('.mejs-captions-layer').css("bottom", "-=10");
        }
        t.incCaptionMargin = function() {
            $('.mejs-captions-layer').css("bottom", "+=10");
        }
        t.decCaptionMarginBig = function() {
            $('.mejs-captions-layer').css("bottom", "-=100");
        }
        t.incCaptionMarginBig = function() {
            $('.mejs-captions-layer').css("bottom", "+=100");
        }

        t.toggleCaption = function() {
		if (t.captionVisible) {
	        $('.mejs-captions-layer').css({
   	         "visibility":function( index, oldValue ) {
				t.captionVisible = false
				return "hidden";
			}
   	        });
			} else {
            $('.mejs-captions-layer').css({
             "visibility":function( index, oldValue ) {
			t.captionVisible = true
             return "visible";
			}
   	        });
			}
        }

        t.toggleCaptionMultiLine = function() {
            if (t.captionMultiLine) {
                t.captionMultiLine = false;
                player.hideControls();
                $('.mejs-container-fullscreen video').css("width", "100%");
                $('.mejs-captions-layer').css("margin-left", "0%");
                $('.mejs-captions-layer').css("text-align", "center");
                $('.mejs-captions-layer').css("font-size", $("#defaultSubSize")[0].value);
                $('.mejs-captions-position').css("width", "100%");
                t.hideControls();
            } else {
                t.captionMultiLine = true;
                $('.mejs-container-fullscreen video').css("width", "75%");
                $('.mejs-captions-layer').css("margin-left", "75.5%");
                $('.mejs-captions-layer').css("text-align", "left");
                $('.mejs-captions-layer').css("font-size", "16px");
                $('.mejs-captions-position').css("width", "24.5%");
                t.showControls();
            }
            if (media.paused) {
                media.play();
                media.pause();
                if (t.captionMultiLine) {
                    t.showControls();
                }
            }
        }

	    // create the buttons
	    var dec =
		$('<div class="mejs-button mejs-reduce-button mejs-reduce" >' +
		  '<button type="button" aria-controls="' + t.id + '" title="' + mejs.i18n.t('Decrease caption size') + '" aria-label="' + mejs.i18n.t('Decrease caption size') + '"></button>' +  '</div>')
		.click(function() {
		    t.decCaptionSize();
		}); 
	    var inc = 
		$('<div class="mejs-button mejs-increase-button mejs-increase" >' +
		  '<button type="button" aria-controls="' + t.id + '" title="' + mejs.i18n.t('Increase caption size') + '" aria-label="' + mejs.i18n.t('Increase caption size') + '"></button>' +  '</div>')
		.click(function() {
		    t.incCaptionSize();
		});  

	    var line =
		$('<li class="mejs-captionsize"></li>')
		.append($('<label style="width:74px;float: left;padding: 0px 0px 0px 5px;">Caption size</label>'))
		.append(dec)
		.append(value)
		.append(inc);
	    captionSelector.find('ul').append(line);

	    var settingsList = $('#settings_list')[0];
	    $('<li/>')
    		.appendTo(settingsList)
    		.append($('<label style="width:250px; float:left;">Default subtitle font size</label>'))
    		.append($('<input id="defaultSubSize" style="width:100px;background-color: transparent; color: white;"/>'));

	    getFromSettings(
		'default_sub_size',
		22,
		function (value) {
		    t.capSizeInput.value = value;
		    $("#defaultSubSize")[0].value = value;
		    updateCaptionSize(Number(t.capSizeInput.value));
		});


	    $(document).bind("settingsClosed", function() { 
		var defaultValue = $("#defaultSubSize")[0].value;
		setIntoSettings(
		    "default_sub_size",
		    defaultValue,
		    function(obj) {
		});
	    });
	}
    })
})(mejs.$);
