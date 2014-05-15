FlickrLatestSetPhotos is a simple plugin that let's you retrieve all photos from the latest photo set from your flickr and display it in a list. 

It has no external dependencies other than jQuery.

##How to Use##

Include css inside a head element:

    <link rel="stylesheet" href="jquery.flickr.latest-set-photos.min.css">

Include javascript inside a head element:

    <script src="jquery.flickr.latest-set-photos.min.js"></script>

Load the plugin:
    
    <script>
    $('#latest-photos').flickrLatestPhotos({
        apiKey: '9f5337057b64cadb27d022faa01ce9ae',
        username: 'Mario Dian',
        userUrl: 'mariodian',
        userID: '41025442@N03'
    });
    </script>
    
Add little bit of html where tags would be inserted:

    <ul id="latest-photos"></ul>
    
##Parameters##
**apiKey** - your flickr API key that you need to [register](https://www.flickr.com/services/apps/create/apply)

**username** - your screen name from your [settings](https://www.flickr.com/account)

**userUrl** - last part of your flickr web addresses. E.g. flickr.com/photos/__mariodian__/

**userID** - your flickr user ID that can be found [here](http://idgettr.com/)

**maxPhotos** [default: 10] - maximum photos to be displayed

**startPage** [0 | 1, default: 0] - set to 1 if flickr limits photoset results in future, otherwise don't be bothered with it

**size** ['s' | 'q' | 't' | 'm' | 'n' | 'z' | '-' | 'c' | 'b' | 'o', default: 's'] - change the image size and type. See the [description]https://www.flickr.com/services/api/misc.urls.html)
