$(document).ready(function() {
    Scrollbar.initAll();

    $('.jci-bill-head').on('click', function() {
        $(this).next('.jci-bill-detail').toggleClass('show');
    });

    $('.rl-mob-menu-btn').on('click', function() {
        $(this).toggleClass('rl-menu-show');
        $('.jci-dashboard-sidebar ').toggleClass('show');
    });
    $('.jci-dashboard-sidebar-menu .nav-link').on('click', function() {
        $('.rl-mob-menu-btn').toggleClass('rl-menu-show');
        $('.jci-dashboard-sidebar ').toggleClass('show');
    });

    // var hash = window.location.hash.substr(1);
    // $('#jci-checkIn-modal-btn').on('click', function() {
    //     // console.log(hash);
    //     if (hash == 'v-pills-assign-room') {
    //         $('#v-pills-assign-room').tab('show');
    //     }
    // });
})