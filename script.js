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
    renderEvents();
});

function renderEvents() {
    let eventsList = JSON.parse(localStorage.getItem('events')) || [];
    eventsList.forEach((item, index) => {
        let date = new Date(item.date);
        let distinction = new Date(date - new Date());
        document.getElementsByClassName('events-list')[0].insertAdjacentHTML('beforeend', `
    <div class="events-list__item event">
        <h2 class="event__title">${item.title}</h2>
        <time class="event__date" datetime="2025-01-01T00:00:00+05:00">${date.toLocaleString()}</time>
        <div class="event__time-container">
            ${distinction >= 86400000 || distinction <= -86400000 ? `<div class="event__big-date">${((date - now) / 86400000).toFixed(0)} дней</div>` : '<div class="event__big-date"></div>'}
            <div class="event__small-date">${distinction.toLocaleTimeString()}</div>
        </div>
    </div>`);
        setInterval(() => {
            let distinction = new Date(date - new Date());
            document.getElementsByClassName('event__small-date')[index].innerHTML = distinction.toLocaleTimeString();
            document.getElementsByClassName('event__big-date')[index].innerHTML = distinction >= 86400000 || distinction <= -86400000 ? `<div class="event__big-date">${((date - now) / 86400000).toFixed(0)} дней</div>` : '';
        }, 1000);
    });
}

renderEvents();