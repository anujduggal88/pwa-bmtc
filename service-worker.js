'use strict'

// ADD CACHE POLYFILL TO SUPPORT CACHE API IN ALL BROWSERS
importScripts('./cache-polyfill.js');

// CACHE NAME:
var cache_name = 'cache_bmtc_v1';
var array_routeList = [];

// TODO: ADD RELEVANT FILES TO THE FOLLOWING ARRAY, TO BE LOADED IN CACHE:
var filesToCache = [
	'/',
	'./index.html',
	'./routes.html',
	'./user_journey.html',
	'./css/',
	'./css/material_icons_stylesheet.css',
	'./css/material.css',
	'./css/material.min.css',
	'./css/material.min.css.map',
	'./css/style.css',
	'./css/stylesheet.css',
	'./js/',
	'./js/app.js',
	'./js/jquery.js',
	'./js/material.js',
	'./js/material.min.js',
	'./js/material.min.js.map'
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


function getRouteList(url){
	// TODO:
	// FETCH CALL TO NETWORK:

	var request = new XMLHttpRequest();
	request.open("GET", url, false);
	request.send(null);

	// PARSE THE JSON OBJECT:
	var my_JSON_object = JSON.parse(request.responseText);

	// LOOP THROUGH JSON OBJECT FOR ROUTE NUMBERS AND PUSH TO ARRAY:
	for (var i=0;i<my_JSON_object.length;i++){
		array_routeList.push(my_JSON_object[i][1]);
	}

	return (array_routeList);
}


// FETCH EVENT:
self.addEventListener('fetch', function(event){

	if(event.request.url.endsWith('&route')){
		console.log('[FETCH] Fetching Bus Routes');
		// TODO:
		// 0. Parse the querystring
		// 1. Check the Routes Data in Cache:
		//		if available, respond with JSON Object
		//		else Fetch the Data from Web Service (API), Put in Cache and Respond
		//
		// 2. Handle other requests

		// parseQueryString();

		// TODO:
		// GET THE URL FROM LOCAL STORAGE AND REMOVE THIS LINE:
		var apiURL = 'http://localhost:8080/route4';

		//array_routeList = getRouteList(apiURL);
		console.log('[FETCH] Route List Array initiated with list of Routes from JSON Object');
		//console.log(array_routeList);

		fetch('http://localhost:8080/route4')
	 				.then(function(response){
	 					console.log(response.clone().json());
	 					console.log('I have fetced from the network--------------');
	 					caches.open('cache_bmtc_v1')
	 						.then(function(cache){
	 							console.log('Adding files to cache: ------->>>>>----');
	 							cache.put(['http://localhost:8080/route4'], response);
	 						})
	 						.catch(function(err){
	 							console.log('Cannot cache the json ------------');
	 						})
	 				});
	}

	if(event.request.url.endsWith('&userjourney')){
		console.log('[FETCH] Fetching User Journey');
		// TODO:
		// 0. Parse the querystring
		// 1. Check the Bus Stops Data in Cache:
		//		if available, respond with JSON Object
		//		else Fetch the Data from Web Service (API), Put in Cache and Respond
		//
		// 2. Handle other requests

		//routeno = parseQueryString();

	}





















	// ---TRYING ABOVE---

 // console.log('Youre in fetch event');
 //
 // if (event.request.method !== 'GET') {
 //  console.log("This is GET request");
 // }
 //
 // //console.log(event);
 //
 // console.info('[FETCH] Service Worker Fetching');
 //
 //  if (event.request.url.endsWith('/routes.html')) {
 //
 // 	 // TODO:
 // 	 // 1. Make a call to API (get the Available Routes)
 // 	 // 2. Get the JSON Object and store in Cache
 // 	 // 3. Load the rest of the requests as such (Cache/Internet)
 //
 // 	 console.log('Fetching from API at localhost:8080 at routes.html');
 //
 // 	 // CHECK IN CACHE:
 // 	 event.respondWith(
 //
 //  		// CHECK IN CACHE, ELSE FETCH FROM NETWORK IF FAILED:
 //  		caches.match('http://localhost:8080/route4')
 //  			.then(function(response){
 //
 // 				//console.log('Request is: ' + event.request);
 //
 //  				// CACHE HIT - RETURNING RESPONSE FROM CACHED VERSION
 //  				if(response){
 // 					console.log('Testing ...............................');
 //  					console.log('[FETCH] Returning from Service Worker Cache: ', event.request.url);
 // 					console.log('I have fetched from the cache---------------');
 //  					return response;
 //  				}
 //
 //  				// FETCH FROM NETWORK
 //  				console.log('[FETCH] Returning from Server: ', event.request.url);
 //  				return fetch(event.request);
 //      })
 //
 //  	);
 //
 //
 // 	 // NETWORK FETCH AND PUT IN CACHE:
 // 	 fetch('http://localhost:8080/route4')
 // 				.then(function(response){
 // 					console.log(response.clone().json());
 // 					console.log('I have fetced from the network--------------');
 // 					caches.open('cache_bmtc_v1')
 // 						.then(function(cache){
 // 							console.log('Adding files to cache: ------->>>>>----');
 // 							cache.put(['http://localhost:8080/route4'], response);
 // 						})
 // 						.catch(function(err){
 // 							console.log('Cannot cache the json ------------');
 // 						})
 // 				});
 //
 // 		// caches.open('cache_bmtc_v1')
 // 		// .then(function(cache){
 // 		//
 // 		// 	console.info('[CACHE] Loading Cache with localhost:8080 data');
 // 		//
 // 		// 	//var url = 'http://localhost:8080/route4';
 // 		//
 // 		// 	return fetch('http://localhost:8080/route4')
 // 		// 		.then(function(response){
 // 		// 			console.log('Caching the Response is:   -----    ' + response.console().json());
 // 		// 			return response.json();
 // 		// 		})
 // 		// 		.then(function(files){
 // 		// 			console.log('[INSTALL] Adding files from JSON File to Cache: ', files);
 // 		// 			return cache.addAll(['http://localhost:8080/route4']);
 // 		// 		});
 // 		// })
 // 		// .then(function(){
 // 		// 	console.log('[INSTALL] Resources cached, SW Install completed');
 // 		//
 // 		// 	// FORCE ACTIVATION:
 // 		// 	return self.skipWaiting();
 // 		// })
 //
 //
 //
 //
 //  }
 //
 //  if (event.request.url.endsWith('/user_journey.html')) {
 // 	 // TODO:
 // 	 // 1. Make a call to API (get the Route details)
 // 	 // 2. Get the JSON Object and store in Cache
 // 	 // 3. Load the rest of the requests as such (Cache/Internet)
 //
 // 	 console.log('Response from API at localhost:8080 at user_journey.html');
 //
 // 	 // CHECK IN CACHE:
 //
 //
 // 		// NETWORK FETCH AND PUT IN CACHE:
 // 	 fetch('http://localhost:8080/route/2527')
 // 	 	.then(function(response){
 // 			console.log(response.json());
 // 		})
 // 		.catch(function(err){
 // 			console.log('Unable to fetch the API');
 // 		});
 //  }
 //
 //
 // // FETCH THE DATA FROM CACHE:
 // event.respondWith(
 //
 // 	// CHECK IN CACHE, ELSE FETCH FROM NETWORK IF FAILED:
 // 	caches.match(event.request)
 // 		.then(function(response){
 //
 // 			// CACHE HIT - RETURNING RESPONSE FROM CACHED VERSION
 // 			if(response){
 // 				console.log('[FETCH] Returning from Service Worker Cache: ', event.request.url);
 // 				return response;
 // 			}
 //
 // 			// FETCH FROM NETWORK
 // 			console.log('[FETCH] Returning from Server: ', event.request.url);
 // 			return fetch(event.request);
 //    })
 //
 // );
});
