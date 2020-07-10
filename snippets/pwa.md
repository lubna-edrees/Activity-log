# Progressive Web Apps PWA

### start here

* [https://developer.mozilla.org/en-US/docs/Web/API/Service\_Worker\_API/Using\_Service\_Workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers)

### follow this checklist to make sure you have PWA

* [https://web.dev/pwa-checklist/](https://web.dev/pwa-checklist/)

### Regeister worker life cycle

* Regester =&gt; Install =&gt; Activate =&gt; fetch
* you can add event listener to each one of them.
* caching statc files happens in `install`
* caching dynamically happens in `fetch`

### Register

* inside main html file.

  ```markup
    <script>
      if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
          navigator.serviceWorker
            .register('dynamicWorker.js')
            .then(
              function(registration) {
                // Registration was successful
                console.log(
                  'ServiceWorker registration successful with scope: ',
                  registration.scope
                )
              },
              function(err) {
                // registration failed :(
                console.log('ServiceWorker registration failed: ', err)
              }
            )
            .catch(function(err) {
              console.log(err)
            })
        })
      } else {
        console.log('service worker is not supported')
      }
    </script>
  ```

### install and activate

* inside `serviceWorker.js`

  \`\`\`js

  self.addEventListener\('install', function\(event\) {

  event.waitUntil\(

    fetchStuffAndInitDatabases\(\)

  \);

  }\);

self.addEventListener\('activate', function\(event\) { // You're good to go! }\);

```text
### fetch 
- inside `serviceWorker.js`
- listening to any fetch request from the client.
```js
// fetch event
self.addEventListener('fetch', (e) => {
    console.log('fetching ....................');
    e.respondWith(
        fetch(e.request)
            .then(res => {
                // copy the reponse
                const resClone = res.clone();
                //caching the response dynamically
                caches.open(currentChacheName).then(cache => {
                    // puting in the cache
                    cache.put(e.request, resClone);
                })

                // preceeding with the response
                return res;
            })
            // if no reponse 
            .catch((err) => caches.match(e.request).then(res => res)
            ))
})
```

### getInstalledRelatedApps\(\)

* checks if your app installed or not.
* [https://web.dev/get-installed-related-apps/](https://web.dev/get-installed-related-apps/)

### BeforeInstallPromptEvent

* [https://developer.mozilla.org/en-US/docs/Web/API/BeforeInstallPromptEvent](https://developer.mozilla.org/en-US/docs/Web/API/BeforeInstallPromptEvent)

### What does it take to be installable?

[https://web.dev/install-criteria/](https://web.dev/install-criteria/)

### Add a web app manifest

[https://web.dev/add-manifest/](https://web.dev/add-manifest/)

### ways to prompt installations for your app

[https://web.dev/promote-install/](https://web.dev/promote-install/)

## Examples

* [https://web.dev/codelab-make-installable/](https://web.dev/codelab-make-installable/)
* [https://github.com/mdn/pwa-examples](https://github.com/mdn/pwa-examples)

## resourses

* [google official documentaions](https://web.dev/progressive-web-apps/)
* [service worker Explained](https://github.com/w3c/ServiceWorker/blob/master/explainer.md)
* [official react pwa documentation](https://create-react-app.dev/docs/making-a-progressive-web-app/)
* [service worker Extensive Google docs](https://developers.google.com/web/fundamentals/primers/service-workers)

