if (localStorage.getItem('expressvet-token')) {
    $('#top_access').attr('style', 'display:none');
    $('#profile').removeAttr('style');
    $('#logout').removeAttr('style');
} else {
    $('#profile').attr('style', 'display:none');
    $('#logout').attr('style', 'display:none');
    $('#top_access').removeAttr('style');
}