var City = [{
		name: 'Rose Garden',
		lat: 30.7461,
		lng: 76.7820,
		id: '4c0ba827009a0f47975cebbf',
		selected: false,
		show: true
	},
	{
		name: 'Elante Mall',
		lat: 30.7058,
		lng: 76.8010,
		id: '5114cd90e4b06bb0ed15a97f',
		selected: false,
		show: true
	},
	{
		name: 'Sector-17',
		lat: 30.7398,
		lng: 76.7827,
		id: '4c0a1876bbc676b0154e49d5',
		selected: false,
		show: true
	},
	{
		name: 'Rock Garden',
		lat: 30.7525,
		lng: 76.8101,
		id: '4b6fe660f964a5206dff2ce3',
		selected: false,
		show: true
	},
	{
		name: 'Pal Dhaba',
		lat: 30.7191,
		lng: 76.8016,
		id: '4f452610e4b061ee9870084d',
		selected: false,
		show: true
	}

];
var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
// ------------- model end --------------------

var locations = []; 	//	array of markers
//viewmodel
var viewmodel = function(){
	var defaultMarker = makeMarkerIcon('FFFFFF'); // default color of marker is stored in default icon
	var highlightedMarker = makeMarkerIcon('FFFF24');// color when we highlight it
	var Infowindow = new google.maps.InfoWindow();// info window of marker
	
	function makeMarkerIcon(markerColor){ // passing marker color and building marker icon in this 
		var markerImage = new google.maps.MarkerImage(
            'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|' + markerColor +
            '|40|_|%E2%80%A2', //type of marker we choose.			
			new google.maps.Size(21, 34), // Size of marker height and width
			new google.maps.Point(0, 0),
			new google.maps.Point(10, 34), // accuracy when they are pointing.
			new google.maps.Size(21, 34));
		return markerImage;
	}
	
	for(i = 0; i < City.length; i++){
		var marker = new google.maps.Marker({ // we are setting markers details in marker variable
			position: {
				lat: City[i].lat, 
				lng: City[i].lng
			},
			icon: defaultMarker, // setting icon to default marker
			map: map, // set markers on map
			title: City[i].name, // title of markers
			rating: '', // ratings of places
			venues: City[i].id, // foursquare id
			selected: City[i].selected, // marker is selected or not
			image: '', // setting image when click on marker
			show: ko.observable(true)
		});
		
		locations.push(marker); // adding marker in location array
		
		marker.addListener('mouseover', function(){ // color changes
			this.setIcon(highlightedMarker)
		});
		
		marker.addListener('mouseout', function(){ // default color
			this.setIcon(defaultMarker);
		});
		
		// bounce marker when click on it
		
		var makeBounce = null;
		var clickListener = function(){
			if(makeBounce!=null)
				makeBounce.setAnimation(null);
			if(makeBounce != this){
				this.setAnimation(google.maps.Animation.BOUNCE);
				setTimeout(function(){makeBounce.setAnimation(null);}, 500)
				makeBounce = this;
			}
			else
				makeBounce = null;
		}
		google.maps.event.addListener(marker, 'click', clickListener);
			marker.addListener('click', function(){
				openInfoWindow(this, Infowindow); // on clicking marker calling function openInfoWindow()
			});
		
	}
	
	// get rating for each marker
		locations.forEach(function(m){
			// passing m for marker
			$.ajax({
				method: 'GET',
				dataType: "json",
				url: "https://api.foursquare.com/v2/venues/" + m.venues + "?client_id=2JYEJY5E54SCTS2TJRILIIVLFPXCLQFXF0MPWI2YS2UQCJY3&client_secret=TH4C4MYFH44B2V02JS3YZEXYTKND5IEI4CTX0U51UT4JTKZ4&v=20170303",
				success: function(data){ // if data is successfully fetch than function will execute
					var venue = data.response.venue;
					var imgurl = data.response.venue.photos.groups[0].items[0];
					if ((venue.hasOwnProperty('rating')) || ((imgurl.hasOwnProperty('prefix')) && (imgurl.hasOwnProperty('suffix')))) {
						m.rating = venue.rating;
						m.image = imgurl.prefix + "100x100" + imgurl.suffix;
					}
					else{
						m.rating = '';
						m.imgurl = '';
					}
				},
				 error: function(e) { //if any error occur in fetching data
                alert('There is some error in fetching data');
            }
			});
		});
	
	function openInfoWindow(marker, infowindow) // opening info window on click of marker
	{
		if (infowindow.marker != marker){
			
			infowindow.marker = marker;
			
			infowindow.setContent('<div>' + '<h3>' + marker.title + '</h3>' + "<h4>Ratings:" + marker.rating + '</h4></div><div><img src="' + marker.image + '"></div>'); //setting content which should appear in infowindow
			
			if(marker.rating!=null || marker.image!=null){
				infowindow.open(map, marker);
			}
			// Make sure the marker property is cleared if the infowindow is closed
			
			infowindow.addListener('closeclick', function(){
				infowindow.marker = null;
			});
		}
	};
	
	// the marker which is selected open its pop up window
	this.selectAll = function(marker){
		openInfoWindow(marker, Infowindow);
		marker.selected = true;
		marker.setAnimation(google.maps.Animation.BOUNCE);
		setTimeout(function(){marker.setAnimation(null);}, 500)
	};
	
	// function for search bar
	this.inputText = ko.observable('');
	this.filtersearch = function(){
		Infowindow.close(); // close all the info window that are previously opened window
		var inputSearch = this.inputText();
		if (inputSearch.length === 0){
			this.showAll(true);
		}
		else{
			for(i=0; i< locations.length; i++){
				if (locations[i].title.toLowerCase().indexOf(inputSearch.toLowerCase()) > -1){
					locations[i].show(true);
					locations[i].setVisible(true);
				}
				else{
					locations[i].show(false);
					locations[i].setVisible(false);
				}
			}
		}
		Infowindow.close();
	};
	
	this.showAll = function(variable){
		for(i=0; i<locations.length; i++){
			locations[i].show(variable);
			locations[i].setVisible(variable);
		}
	};
	

};
	