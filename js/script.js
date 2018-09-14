(function (count, fileds) {
    let bombFinder = (id) => {
        return document.getElementById(id) ? (document.getElementById(id).className.indexOf('bomb') !== -1 ? 1 : 0) : 0;
    };

    let bombCount = 0;

    for (i = 0; i < fileds; i++) {

        cell = document.createElement('div');

        if (Math.random() * fileds < count) {
            cell.className = 'bomb close';
            document.getElementById('text').innerHTML = (++bombCount) + ' bomb\'s';
        } else {
            cell.className = 'close'
        }

        cell.id = Math.floor(i / 10) + '_' + i % 10;

        document.body.appendChild(cell);
    }

    for (cl = 0; cl < fileds; cl++) {

        i = Math.floor(cl / 10);

        j = cl % 10;

        num = 0;

        obj = document.getElementById(i + '_' + j);

        for (k = 0; k < 9; k++) {
            num += bombFinder((i - (Math.floor(k / 3) - 1)) + '_' + (j - (k % 3 - 1)));
        }

        obj.innerHTML = num === 0 ? '&nbsp;' : num;

        obj.onclick = function () {
            mix = this.id.split('_');
            open(mix[0], mix[1]);
        };

        obj.oncontextmenu = function () {
            this.className = this.className.indexOf('flag') !== -1 ? this.className.replace(/ flag/, '') : this.className + ' flag';
            return false;
        }
    }

    let open = (i, j) => {
        dom = document.getElementById(i + '_' + j);
        if (!dom || dom.className.indexOf('close') === -1) return;
        if (dom.className.indexOf('bomb') !== -1) {
            divs = document.getElementsByTagName('div');
            for (i = 0; i < divs.length; i++) {
                divs[i].className = divs[i].className.indexOf('bomb') !== -1 ? 'bomb' : '';
            }
            alert('You lose!');
        }
        else {
            dom.className = '';
            let elems = document.getElementsByTagName('div'), len = 0;
            for (ki in elems) {
                if (elems[ki].className && elems[ki].className.indexOf('close') !== -1) {
                    len++;
                }
            }
            if (len <= bombCount) {
                alert('You win!');
            }
        }
        if (dom.innerHTML === '&nbsp;') {
            for (let mn = 0; mn < 9; mn++) {
                open(i - ((Math.floor(mn / 3) - 1)), j - (((mn % 3) - 1)));
            }
        }
    }
}(10, 100));