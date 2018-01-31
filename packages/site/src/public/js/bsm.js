import $ from 'jquery';

$('body').on('click', '.toggle', function() {
    $(this).parents('.dropdown').toggleClass('open');
    $('.dropdown.open').not($(this).parents('.dropdown')).removeClass('open');
});
