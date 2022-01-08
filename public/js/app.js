const form = document.querySelector('#render');
const url = form.querySelector('.url');
const renderer = form.querySelector('.renderer');
const result = document.querySelector('#result');

form.onsubmit = function (e) {
  e.preventDefault();
  fetch(`/render?url=${url.value}&renderer=${renderer.value}`)
    .then((r) => r.json())
    .then((json) => {
      if (json.error) {
        result.querySelector('.html').innerHTML = '';
        result.querySelector('.screenshot').src = '';
        result.querySelector('.desc').innerHTML = `<p>خطا: ${json.error}</p>`;
      } else {
        result.querySelector('.html').innerHTML = json.html;
        result.querySelector('.screenshot').src = json.screenshot
          ? `data:image/jpeg;base64,${json.screenshot}`
          : '';
        result.querySelector('.desc').innerHTML = `<p>زمان رندر:‌ ${json.renderTime}میلی‌ثانیه</p>`;
      }
    });
};
