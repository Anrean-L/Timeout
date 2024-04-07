'use strict'

let now = new Date()
now.setHours(now.getHours(), now.getMinutes() - now.getTimezoneOffset(), 0, 0);
let form = document.forms[0];
form.date.value = now.toISOString().substring(0, now.toISOString().length - 5);
form.addEventListener('submit', (e) => {
    e.preventDefault();
    let eventsList = JSON.parse(localStorage.getItem('events')) || [];
    eventsList.push({
        'title': form.title.value,
        'date': form.date.value,
    });
    localStorage.setItem('events', JSON.stringify(eventsList));
    form.parentNode.classList.toggle('add-event--opened');
});

let eventsList = JSON.parse(localStorage.getItem('events')) || [];
eventsList.forEach(item => {
    let date = new Date(item.date);
    document.getElementsByClassName('events-list')[0].insertAdjacentHTML('beforeend', `
    <div class="events-list__item event">
        <h2 class="event__title">${item.title}</h2>
        <time class="event__date" datetime="2025-01-01T00:00:00+05:00">${date}</time>
        <div class="event__time-container">
            <div class="event__big-date">26 дней</div>
            <div class="event__small-date">09:16:35</div>
        </div>
    </div>`)
});