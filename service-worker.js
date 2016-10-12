'use strict'

// ADD CACHE POLYFILL TO SUPPORT CACHE API IN ALL BROWSERS
importScripts('./cache-polyfill.js');

// CACHE NAME:
var cache_name = 'cache_bmtc_v1';

// TODO: ADD RELEVANT FILES TO THE FOLLOWING ARRAY, TO BE LOADED IN CACHE:
var filesToCache = [
	'/',
	'./index.html'
];

// INSTALL EVENT:
self.addEventListener('install', function(event){

	console.info('[SUCCESS] Service Worker Installation');

	event.waitUntil(

		// LOAD CACHE
		caches.open(cache_name).then(function(cache){

			// ADD FILES TO CACHE
			return cache.addAll(filesToCache).then(function(){

				console.info('[SUCCESS] Loading Cache');

				// FORCE SERVICE WORKER TO GO FROM WAITING STATE TO ACTIVE STATE
				return self.skipWaiting();

			}).catch(function(err){

				console.info('[FAILURE] Loading Cache ' + err);

			});
		})
	);
});


// ACTIVATE EVENT:
// THIS EVENT IS CALLED ONLY AFTER INSTALL EVENT OF SERVICE WORKER
self.addEventListener('activate', function(event){

	console.info('[SUCCESS] Service Worker Activated');

	// INDICATE BROWSER TO MAKE SERVICE WORKER IN ACTIVE STAGE
	// WHEN NEW CODE/FEATURE IS PUSHED, SO THAT USER CAN GET IT
	// FROM SERVER AND CACHES IT WITHOUT REFRESHING THE PAGE
	return self.clients.claim();
});


// FETCH EVENT:
// TRIGGERED ON EVERY FETCH REQUEST MADE BY 'index.html', POST INSTALL EVENT
self.addEventListener('fetch', function(event){

	console.info('[SUCCESS] Service Worker Fetching');

	event.respondWith(

		// TODO: DEFINE RULES HERE

		// RULE TO CHECK NETWORK FIRST
		fetch(event.request).then(function(response){

			// IF BROKEN LINK (PAGE NOT FOUND)
			if( response.status === 404 ){

				console.info('[RESPONSE FORM NETWORK, CUSTOMIZED BY SERVICE WORKER] Page not found');
				return new Response('Page Not Found Response');
			}

			// FETCH FROM NETWORK
			console.info('[RESPONSE FROM NETWORK] Fetch from Network');
			return response;

		}).catch(function(){

			// RULE TO SERVE IT OFFLINE, SINCE NETWORK REQUEST FAILED
			console.info('[RESPONSE OFFLINE] Response from Offline rules');

			// RETURN SOMETHING OFFLINE:
			return new Response('Offline Response');

		})

		// RULE TO CHECK CACHE
		// TODO: DEFINE THE RULE TO READ THE DATA FROM CACHE
	);

});
