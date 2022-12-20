$(document).ready(function () {
    if (localStorage.getItem('secret') === null) {
        ls.config.encrypt = true;
        var userSecret = prompt('Silahkan Tentukan PIN Anda');
        if (userSecret === null || userSecret === '') {
            alert('Anda Harus Membuat PIN Terlebih Dahulu');
            window.location.href = '/';
        } else if (userSecret.length < 6) {
            alert('PIN Harus Terdiri dari 6 Karakter atau Lebih');
            window.location.href = '/';
        } else {
            // Menyimpan secret ke local storage
            ls.set('secret', userSecret);
        }
    }

    // Untuk Handle Login
    $('#login-form').submit(function (e) {
        e.preventDefault();
        // Cek Apakah Saldo Sudah Ada di Local Storage
        var saldo = ls.get('saldo');
        if (saldo === null) {
            localStorage.setItem('saldo', 0);
        }
        var npm = $('#npm').val();
        var pin = $('#pin').val();

        // Validasi Login Disini
        var secret = ls.get('secret', { decrypt: true });
        if (npm === '123456' && pin === secret) {
            window.location.href = '/menu.html';
            localStorage.setItem('auth', true);
        } else {
            alert('NPM atau PIN Salah');
        }
    });
});


// Script Halaman Menu Digabung Sekalian :D


// Ambil Saldo dari Local Storage
var saldo = localStorage.getItem('saldo');

// Display Saldo di Halaman Menu
$('#saldo').text(saldo);

// Dah segitu aja, sisanya di handle client side aja :D

// Untuk Handle Logout
$('#logout-btn').click(function () {
    localStorage.removeItem('saldo');
    localStorage.removeItem('secret');
    localStorage.removeItem('auth');
    window.location.href = '/';
});
