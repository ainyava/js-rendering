const form = document.querySelector('#render');
const url = form.querySelector('.url');
const result = document.querySelector('#result');

form.onsubmit = function(e) {
    e.preventDefault();
    fetch(`/render?url=${url.value}`)
    .then( r=> r.json())
    .then( json => {
        result.querySelector('.html').innerHTML = json.html;
        result.querySelector('.screenshot').src = 'data:image/jpeg;base64,'+json.screenshot;
        result.querySelector('.time').innerHTML = json.renderTime;
    });
}