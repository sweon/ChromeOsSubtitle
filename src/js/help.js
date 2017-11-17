(function($) {
    $.extend(MediaElementPlayer.prototype, {
        buildhelp: function(player, controls, layers, media) {
            var 
            t = this;

            var helpPanel = $(
                '<div class="me-window" style="color:#fff;margin: auto;position: absolute;top: 0; left: 0; bottom: 0; right: 0;width:560px;display: table; height: auto;background: url(background.png);background: rgba(50,50,50,0.7);border: solid 1px transparent;padding: 10px;overflow: hidden;-webkit-border-radius: 0;-moz-border-radius: 0;border-radius: 0;font-size: 16px;visibility: hidden;">'+
                '<h2>Help</h2>' +
                '<div>' +
                '<table style="color:#fff; font-size:16px">' +
                '<tr><td style="width:60px">space</td><td style="width:210px">play/pause</td></tr>'+
                '<tr><td>up</td><td style="width:210px">volume up</td>'+
                '<td style="width:60px">down</td><td style="width:210px">volume down</td></tr>'+
                '<tr><td>left</td><td>rewind</td>'+
                '<td>right</td><td>forward</td></tr>'+
                '<tr><td>9</td><td>short rewind</td>'+
                '<td>0</td><td>short forward</td></tr>'+
                '<tr><td>,</td><td>long rewind</td>'+
                '<td>.</td><td>long forward</td></tr>'+
                '<tr><td>[</td><td>slow down -0.1x</td>'+
                '<td>]</td><td>speed up +0.1x</td></tr>'+
                '<tr><td>1, 2</td><td>set speed 1, 2x</td>'+
                '<td>3 to 7</td><td>set speed 1.3 to 1.7x</td></tr>'+
                '<tr><td>wheel</td><td>volume control</td>'+
                '<td>v</td><td>show control</td></tr>'+
                '<tr><td>i</td><td>info</td>'+
                '<td>s</td><td>settings</td></tr>'+
                '<tr><td>h</td><td>help</td>'+
                '<td>l</td><td>default subtitle margin</td></tr>'+
                '<tr><td>f</td><td>fullscreen</td>'+
                '<td>j</td><td>subtitle margin -10px</td></tr>'+
                '<tr><td>o</td><td>open video</td>'+
                '<td>k</td><td>subtitle margin +10px</td></tr>'+
                '<tr><td>c</td><td>toggle subtitle</td>'+
                '<td>;</td><td>subtitle margin -100px</td></tr>'+
                '<tr><td>d</td><td>download subtitle</td>'+
                '<td>&#39;</td><td>subtitle margin +100px</td></tr>'+
                '<tr><td>u</td><td>shrink video for subtitle</td>'+
                '<td>y</td><td>restore video size</td></tr>'+
                '<tr><td>-</td><td>decrease subtitle size</td>'+
                '<td>+</td><td>increase subtitle size</td></tr>'+
                '<tr><td>z</td><td>decrease subtitle delay</td>'+
                '<td>x</td><td>increase subtitle delay</td></tr>'+
                '<tr><td>m</td><td>toggle multi-line subtitle</td>'+
                '<td>p</td><td>history</td></tr>'+
                '</table>'+
                '</div><br/>' +
                '[Click outside the box to close the help page]</div>'
            ).appendTo(controls[0].parentElement);

            function hide(e) {
                helpPanel.css('visibility','hidden');
                if (player.media.paused)
                    $(".mejs-overlay-play").show();

                e.preventDefault();
                e.stopPropagation();
                player.container.off("click", hide);

                $(document).trigger("helpClosed"); 

                return false;
            }

            helpPanel.on("click", function (e) {
                e.preventDefault();
                e.stopPropagation();
                hide(e);
                return false;
            });

            t.openHelpWindow = function() {
                $('.me-window').css('visibility','hidden');
                helpPanel.css('visibility','visible');
                $(".mejs-overlay-play").hide();
                player.container.click(hide);
            };
            var open  = 
                $('<div class="mejs-button mejs-help-button mejs-help" >' +
                  '<button type="button" aria-controls="' + t.id + '" title="' + mejs.i18n.t('Help...') + '" aria-label="' + mejs.i18n.t('Help...') + '"></button>' +
                  '</div>')
            .appendTo(controls)
            .click(function(e) {
                e.preventDefault();
                t.openHelpWindow();
                return false;
            });
        }
    });
})(mejs.$);
