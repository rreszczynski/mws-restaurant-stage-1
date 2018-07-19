self.addEventListener('install', function(ev) {
	ev.waitUntil(
		caches.open('restaurant_v1').then(function(cache) {
			return cache.addAll([
			'/',
			'/index.html',
			'/restaurant.html',
			'/css/styles.css',
			'/css/responsive.css',
			'/data/restaurants.json',
			'/img/1.jpg',
			'/img/2.jpg',
			'/img/3.jpg',
			'/img/4.jpg',
			'/img/5.jpg',
			'/img/6.jpg',
			'/img/7.jpg',
			'/img/8.jpg',
			'/img/9.jpg',
			'/img/10.jpg',
			'js/dbhelper.js',
			'js/main.js',
			'js/restaurant_info.js',
			]).then(function() {
				console.log('Caching successful!');
			}).catch(function(err) {
				console.log('Error while caching: ', err);
			})
		})
	);
});

self.addEventListener('fetch', function(ev) {
  ev.respondWith(
    caches.match(ev.request).then(function(resp) {
      return resp || fetch(ev.request).then(function(response) {
        return caches.open('restaurant_v1').then(function(cache) {
          cache.put(ev.request, response.clone());
          return response;
        });  
      });
    })
  );
});