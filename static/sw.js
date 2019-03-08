//Registration of Service Worker
// global.navigator = {
//     userAgent: 'node.js'
// };
//Check if sw are supported
if('serviceWorker' in navigator) {
    console.log('Service worker supported');
    window.addEventListener('load', () => {
        navigator.serviceWorker
        .register('../static/service-worker.js')
        .then(reg => console.log('Service worker registered'))
        .catch(err => console.log(`Service Worker: Error - ${err}`))
    });

}
