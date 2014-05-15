/**
*	Create list of flickr photos from latest set
**/
$.fn.flickrLatestPhotos = function(options){	
	var settings = $.extend({
		username: null,
		userUrl: null,
		userID: null,
		maxPhotos: 10,
		startPage: 0, // set to 1 if flickr limits photoset results in future,
		size: 's' // supported
	}, options );
	
	var self = this;
	
	/**
	*	Create urls and display photos
	**/
	var displayLastPhotos = function(photos){
		var list = '';
			
		for( var i = 0; i < photos.length; i++ )
		{
			var photo = photos[i],
				thumb = 'http://farm' + photo.farm + '.staticflickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '_' + settings.size + '.jpg',
				url = 'https://www.flickr.com/photos/' + (settings.userUrl || settings.userID) + '/' + photo.id;
			
			list += '<li><a href="' + url + '" target="_blank" title="' + photo.title + '"><img src="' + thumb + '" alt="' + photo.title + '"></a></li>';
		}

		$(self).html(list);
	}

	/**
	* Get photos by last photoset
	**/	
	var getLastPhotos = function(data){
		$.getJSON('https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=' + settings.apiKey + '&photoset_id=' + data.id + '&per_page=' + settings.maxPhotos + '&format=json&jsoncallback=?', function(result){
			if( result.stat == 'ok' )
			{
				var photos = result.photoset.photo;
				
				if( photos.length )
				{
					displayLastPhotos(photos);
				}
			}
		});
	}
	
	/**
	* Get last photoset
	**/	
	var getLastPhotoSet = function(page){
		$.getJSON('https://api.flickr.com/services/rest/?method=flickr.photosets.getList&api_key=' + settings.apiKey + '&user_id=' + settings.userID + '&page=' + page +'&per_page=1&format=json&jsoncallback=?', function(result){
			if( result.stat == 'ok' )
			{
				var photosets = result.photosets,
					pages = photosets.pages,
					page = parseInt(photosets.page);
					
				if( photosets.total > 0 )
				{
					// Stop loading more
					if( page >= pages )
					{
						getLastPhotos(photosets.photoset[photosets.photoset.length - 1]);
						
						return;
					}
				
				getLastPhotoSet(pages);
				}
			}
		});
	}
	
	if( settings.username )
	{
		if( settings.userID )
		{
			getLastPhotoSet(settings.startPage);
		}
		else
		{
			// Get user id
			$.getJSON('https://api.flickr.com/services/rest/?method=flickr.people.findByUsername&api_key=' + settings.apiKey + '&username=' + settings.username + '&format=json&jsoncallback=?', function(result){
				if( result.stat == 'ok' )
				{
					settings.userID = result.user.nsid;
					 
					getLastPhotoSet(settings.startPage);
				}
			});
		}
	}
};
