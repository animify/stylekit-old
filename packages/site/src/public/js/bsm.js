import $ from 'jquery';

$('body').on('click', '.toggle, .menu a', function() {
    $(this).parents('.dropdown').toggleClass('open');
    $('.dropdown.open').not($(this).parents('.dropdown')).removeClass('open');
});

$('body').on('mouseenter', '.dropdown.hover', function(e) {
    $(this).addClass('open');
}).on('mouseleave', '.dropdown.hover.open', function(e) {
    $(this).removeClass('open');
});