'use strict';

document.addEventListener("DOMContentLoaded", function(event) {
/*DigitalClock*/
    document.body.insertAdjacentHTML('afterbegin', '<div id="digital-clock"><span class="hours"></span>:<span class="minuts"></span>:<span class="seconds"></span></div>');

    function clock() {
        let digitalClock = document.querySelector('#digital-clock');
        let hoursSpan = document.querySelector('.hours');
        let minutesSpan = document.querySelector('.minuts');
        let secondsSpan = document.querySelector('.seconds');

        digitalClock.style.background = 'orange';
        hoursSpan.style.color = 'yellow';
        minutesSpan.style.color = 'yellow';
        secondsSpan.style.color = 'yellow';

        setInterval( () => {
            let date = new Date();
            let hrs = date.getHours();
            let mnts = date.getMinutes();
            let sec = date.getSeconds();

            if (hrs <= 9) {
                hoursSpan.innerHTML = '0' + date.getHours();
            } else {
                hoursSpan.innerHTML = date.getHours();
            }

            if (mnts <= 9) {
                minutesSpan.innerHTML = '0' + date.getMinutes();
            } else {
                minutesSpan.innerHTML = date.getMinutes();
            }

            if (sec <= 9) {
                secondsSpan.innerHTML = '0' + date.getSeconds();
            } else {
                secondsSpan.innerHTML = date.getSeconds();
            }
        },1000);
    }

    clock();


/*Galery*/
    function galery() {
        let thumbs = document.querySelector('#thumbs');
        let largeImg = document.querySelector('#largeImg');
        let links = document.querySelectorAll('#thumbs a');
        let current = 0;
        
        links.forEach(function(item, index) {
            item.setAttribute('number', index);
        });

        setInterval( () => {
            largeImg.src = links[current].href;

            current++;

            if (current === links.length) {
                current = 0;
            }
        }, 2000 );
        
        thumbs.addEventListener('click', function(event) {
            event.preventDefault();

            let link = event.target.closest('a');

            if (link.nodeName !== 'A') return;

            largeImg.src = link.href;
            largeImg.alt = link.title;

            current = link.getAttribute('number');
        });  
    }

    galery();

/*selectedLi*/
    let ul = document.querySelector('#ul');

    ul.addEventListener('mousedown', function(event) {
        event.preventDefault();
    });

    let selectedLi;

    ul.addEventListener('click', function(event) {
        let li = event.target.closest('li');

        if (!li) return;

        if (event.ctrlKey === false && event.metaKey === false) {
            select(li);
        } else {
            ctrlSelected(li);
        }
    });

    function ctrlSelected(li) {
        li.classList.toggle('selected');
    }

    function select(li) {
        let arr = Array.from(ul.children);

        arr.forEach(function(item) {
            item.classList.remove('selected');
        });

        selectedLi = li;
        selectedLi.classList.add('selected');
    }

//Arrow
    function arrowVizible() {
        let arrow = document.createElement('span');
        arrow.classList.add('arrow');
        arrow.innerHTML = '▲';
        document.body.append(arrow);

        window.addEventListener('scroll', function(event) {
            if (window.pageYOffset > document.documentElement.clientHeight) {
                arrow.style.display = 'inline-block';
            } else {
                arrow.style.display = 'none';
            }
        });

        arrow.addEventListener('click', function(event) {
            document.documentElement.scrollTo(0, 0);
        });
    }

    arrowVizible();

//Slider
    function slider() {
        let btnLeft = document.querySelectorAll('.slider-btn')[0];
        let btnRight = document.querySelectorAll('.slider-btn')[1];
        let sliderImages = document.querySelectorAll('.slider-img');
        let current = sliderImages.length;

        btnLeft.addEventListener('click', function() {
            sliderImages.forEach(function(item) {
                item.classList.add('hidden');
            });

            if (current === sliderImages.length) {
                current--;
            }

            if (current === 0) {
                current = sliderImages.length;
            }  
        
            current--;
            sliderImages[current].classList.remove('hidden'); 
        });

        btnRight.addEventListener('click', function() {
            sliderImages.forEach(function(item) {
                item.classList.add('hidden');
            }); 

            if (current === sliderImages.length || current === sliderImages.length - 1) {
                current = -1;
            }  

            current++;
            sliderImages[current].classList.remove('hidden');
        });
    }

    slider();

//Editable div
    function changeDivToTextarea() {
        let view = document.querySelector('#view');
        let edit = document.createElement('textarea');

        edit.classList.add('edit');
        view.setAttribute('tabindex', 1);

        edit.addEventListener('keydown', function(event) {
            if (event.key === 'Enter') {
                this.blur();
            }
        });

        view.addEventListener('focus', function(event) {
            edit.value = view.innerHTML;
            view.replaceWith(edit);
        });
        
        edit.addEventListener('blur', function(event) {
            view.innerHTML = edit.value;
            edit.replaceWith(view);
        });
    }

    changeDivToTextarea();

//Editable table
    function editableTable() {
        let table = document.querySelector('#bagua-table');
        let tdCollection = document.querySelectorAll('#bagua-table td');
        let textarea = document.createElement('textarea');
        let okButton = document.createElement('button');
        let cancelButton = document.createElement('button');
        let editInProcces;
        let textareaCords;
        let tdCords;
        let tableCords;
        let td;

        okButton.classList.add('ok-button');
        cancelButton.classList.add('cancel-button');

        okButton.textContent = 'OK';
        cancelButton.textContent = 'CANCEL';

        tdCollection.forEach(function(item) {
            item.setAttribute('tabindex', 1);
        });

        table.addEventListener('focusin', function(event) {
            if (event.target.nodeName !== 'TD') return;
            if (editInProcces === true) return;

            td = event.target.closest('td');

            tdCords = td.getBoundingClientRect();

            editInProcces = true;

            td.replaceWith(textarea);

            textarea.value = td.innerHTML;
            
            textarea.focus();
        });

        textarea.addEventListener('focusin', function(event) {
            textarea.style.height = tdCords.height + 'px';
            textarea.style.width = tdCords.width + 'px';

            textareaCords = textarea.getBoundingClientRect();
            tableCords = table.getBoundingClientRect();

            okButton.style.top = textareaCords.bottom - tableCords.top + 'px';
            okButton.style.left = textareaCords.left - tableCords.left + 'px';
            cancelButton.style.top = textareaCords.bottom - tableCords.top + 'px';
            cancelButton.style.left = textareaCords.left - tableCords.left + 35 + 'px';

            table.append(okButton);
            table.append(cancelButton);
        });

        okButton.addEventListener('click', function(event) {
            editInProcces = false;
            okButton.remove();
            cancelButton.remove();
            textarea.replaceWith(td);
            td.innerHTML = textarea.value;
        });

        cancelButton.addEventListener('click', function(event) {
            editInProcces = false;
            okButton.remove();
            cancelButton.remove();
            textarea.replaceWith(td);
        });
    }

    editableTable();
});