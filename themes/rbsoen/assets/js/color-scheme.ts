// hugo melakukan IIFE secara otomatis
const d = document, w = window;

let use_local_storage = 'localStorage' in w;
let dark_mode_toggle = <HTMLInputElement> d.getElementById('toggle-dark')!;

const THEME_KEY = 'prefers-theme';

// https://www.quirksmode.org/js/cookies.html
function makeCookie(name:string, value:string, days:number|null = null) {
/* days=null -> cookie akan expire stlh ditutup */
    let expires = '';

    if (days !== null) {
        let date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = 'expires=' + date.toUTCString();
    }

    let cookie = name + '=' + value + ';path=/;'+expires;

    d.cookie = cookie;
}

function getCookie(name:string) {
    let name_eq = name + '=';
    let cookies = d.cookie.split(';');
    for (
        let i = 0, c:string;
        c = cookies[i], i < cookies.length;
        i++
    ) {
        while (c.charAt(0) == ' ') {
            c.substring(1, c.length);
        }
        if (c.indexOf(name_eq) == 0) {
            return c.substring(name_eq.length, c.length);
        }
    }
    return null;
}

function saveTheme() {
    // simpan theme
    if (use_local_storage) {
        w.localStorage.setItem(THEME_KEY, (dark_mode_toggle.checked? 'dark' : 'light'));
    } else { // gunakan cookie jk tdk ada localstorage
        makeCookie(THEME_KEY, (dark_mode_toggle.checked? 'dark' : 'light'), 365);
    }
}

// ambil theme
let set_theme:string|null = null;
{ let t;

    if (use_local_storage) {
        t = w.localStorage.getItem(THEME_KEY);
    } else { // gunakan cookie
        t = getCookie(THEME_KEY);
    }

    switch (t) {
        case 'dark':
        case 'light':
            set_theme = t;
            break;
    }
}

// set darkmode otomatis berdasarkan setingan browser jika ada dan tidak ada preferensi
if (set_theme === null) {
    if ('matchMedia' in w) {
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            dark_mode_toggle.checked = true;
        }
    }
} else {
    if (set_theme == 'dark') {
        dark_mode_toggle.checked = true;
    }
}

saveTheme(); // simpan pertama kali

w.addEventListener('load', function(){ // jika seluruh doc telah loading semua
    let dark_mode_label:HTMLLabelElement | null = null;
    (function(){ // ambil label utk dark_mode_toggle
        for (
            let i = 0, labels = d.getElementsByTagName('label'), l;
            l = labels[i], i < labels.length;
            i++
        ) {
            let k = l.attributes.getNamedItem('for');
            if (k !== null) {
                if (k.value === 'toggle-dark') {
                    dark_mode_label = l;
                }
            }
        }
    })();

    if (dark_mode_label !== null) {
        dark_mode_label.addEventListener('click', function(){
            setTimeout(
                function(){ saveTheme(); },
                100
            ); // simpan utk kali selanjutnya
        });
    }
});