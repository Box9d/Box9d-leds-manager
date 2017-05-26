$(function () {
    var playback = $.connection.playbackHub;
    playback.client.broadcastMessage = function (name, message) {
        if (name.toLowerCase() === 'blackout') {
            $('#display').empty();
        }

        if (name.toLowerCase() === 'frame') {

            var currentNumberOfRows = $('.row').length;
            var currentNumberOfPixels = $('.pixel').length;


            if (currentNumberOfRows != $('#rowcount').val() || currentNumberOfPixels != message.length) {
                var html = '';
                var pixelsPerRow = Math.ceil(message.length / $('#rowcount').val());
                
                for (var i = 0; i < $('#rowcount').val(); i++) {
                    var rowDiv = '<div class=\'row\' style=\'width:' + pixelsPerRow * 15 + 'px;\'>';
                    for (var j = 0; j < pixelsPerRow; j++) {
                        var color = message[i * pixelsPerRow + j];
                        rowDiv += '<div id="' + (i * pixelsPerRow + j) + '" class=\'pixel\'/>';
                    }

                    rowDiv += '</div>';
                    html += rowDiv;
                }

                $('#display').html(html);
            }

            for (var i = 0; i < message.length; i++) {
                $('#' + i).css('background-color', message[i]);
            }
        }
    };

    var log = $.connection.loggerHub;
    log.client.broadcastMessage = function (name, message) {
        if (name.toLowerCase() === 'log') {
            $('#log').append('<tr><td>' + message[0] + '</td><td>' + message[1] + '</td><td>' + message[2] + '</td><tr>');
        }
    }

    $.connection.hub.start().done(function () {
    });
});

$(function () {
    $('#rowcount').bind('input', function () {
        if ($(this).val() === "0") {
            $(this).val("1"); // Do not allow 0 value
        }
    });
});