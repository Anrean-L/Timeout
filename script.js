'use strict'

let now = new Date()
now.setHours(now.getHours(), now.getMinutes() - now.getTimezoneOffset(), 0, 0);
let form = document.forms[0];
form.date.value = now.toISOString().substring(0, now.toISOString().length - 5);
form.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log(form.checkValidity());
    let eventsList = JSON.parse(localStorage.getItem('events')) || [];
    eventsList.push({
        'title': form.title.value,
        'date': form.date.value,
    });
    localStorage.setItem('events', JSON.stringify(eventsList));
    form.parentNode.classList.toggle('add-event--opened');
    document.getElementsByClassName('events-list')[0].innerHTML = ''
    renderEvents();
});

function renderEvents() {
    let eventsList = JSON.parse(localStorage.getItem('events')) || [];
    if (eventsList.length > 0) document.getElementsByClassName('events-list')[0].innerHTML = ''
    eventsList.forEach((item, index) => {
        let date = Date.parse(item.date);
        let distinction = new Date(Math.abs(date - Date.now()));
        distinction.setHours(distinction.getHours(), distinction.getMinutes() + distinction.getTimezoneOffset());
        document.getElementsByClassName('events-list')[0].insertAdjacentHTML('beforeend', `
    <div class="events-list__item event">
        <div class="event__title-wrapper">
            <h2 class="event__title">${item.title}</h2>
            <button class="event__remove" onclick="removeEvent(${index})"><img src="imgs/cross.svg"></button>
        </div>
        <time class="event__date" datetime="2025-01-01T00:00:00+05:00">${new Date(date).toLocaleString()}</time>
        <div class="event__time-container">
            <div class="event__big-date"></div>
            <div class="event__small-date"></div>
        </div>
    </div>`);
        renderTime(date, index);
        setInterval(renderTime, 1000, date, index);
    });
}

function removeEvent(i) {
    let eventsList = JSON.parse(localStorage.getItem('events')) || [];
    eventsList.splice(i, 1);
    localStorage.setItem('events', JSON.stringify(eventsList));
    renderEvents();
}

function renderTime(date, index) {
    let distinction = new Date(Math.abs(date - Date.now()));
    distinction.setHours(distinction.getHours(), distinction.getMinutes() + distinction.getTimezoneOffset());
    document.getElementsByClassName('event__small-date')[index].innerHTML = (date < Date.now() ? '-' : '') + distinction.toLocaleTimeString();
    document.getElementsByClassName('event__big-date')[index].innerHTML = +distinction >= 86400000 || +distinction <= -86400000 ? (distinction / 86400000).toFixed(0) + ' дней' : '';
}

renderEvents();