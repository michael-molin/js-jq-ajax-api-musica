$(document).ready(function () {
    var source = $("#card-template").html();
    var cardTemplate = Handlebars.compile(source);

    $('.select-genere').change(function() {
        var genereSelezionato = $(this).val();
        checkGenera(genereSelezionato);
    });

    $.ajax({
        url: "https://flynn.boolean.careers/exercises/api/array/music",
        method: "GET",
        success: function(data){
            var albums = data.response;
            compilaMusica(albums);
        },
        error: function(data){
            alert('ERRORE');
        }
    })

    function compilaMusica(data) {
        for (var i = 0; i < data.length; i++) {
            var album = data[i];
            var albumCompilato = {
                immagineAlbum : album.poster,
                nomeAlbum: album.title,
                autore: album.author,
                anno: album.year,
                genere: album.genre
            }
            var cardCompilata = cardTemplate(albumCompilato);
            $('.card-container').append(cardCompilata);
        }
    }

    function checkGenera(genere) {
        if (genere == "") {
            $('.card-container').addClass('card-allineamento');
            $('.card').show();
        } else {
            $('.card').each(function() {
                if (genere.toLowerCase() == $(this).data('genere').toLowerCase()) {
                    $('.card-container').removeClass('card-allineamento');
                    $(this).show();
                } else {
                    $('.card-container').removeClass('card-allineamento');
                    $(this).hide();
                }
            });
        }
    }

});
