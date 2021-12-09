$(document).ready(function() {
    Scrollbar.initAll();

    $('.jci-bill-head').on('click', function() {
        $(this).next('.jci-bill-detail').toggleClass('show');
    });

    // var hash = window.location.hash.substr(1);
    // $('#jci-checkIn-modal-btn').on('click', function() {
    //     // console.log(hash);
    //     if (hash == 'v-pills-assign-room') {
    //         $('#v-pills-assign-room').tab('show');
    //     }
    // });
})