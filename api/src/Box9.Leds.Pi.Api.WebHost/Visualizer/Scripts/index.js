$(function () {
    var playback = $.connection.playbackHub;
    playback.client.broadcastMessage = function (name, message) {
        if (name.toLowerCase() === 'blackout') {
            $('#display').empty();
        }

        if (name.toLowerCase() === 'frame') {
            var html = '';
            var pixelsPerRow = Math.ceil(message.length / $('#rowcount').val());

            for (var i = 0; i < $('#rowcount').val(); i++) {
                var rowDiv = '<div class=\'row\' style=\'width:' + pixelsPerRow * 15 + 'px;\'>';
                for (var j = 0; j < pixelsPerRow; j++) {
                    var color = message[i * pixelsPerRow + j];
                    rowDiv += '<div class=\'pixel\' style=\'background-color:' + color + '\'/>';
                }

                rowDiv += '</div>';
                html += rowDiv;
            }

            $('#display').html(html);
        }
    };

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