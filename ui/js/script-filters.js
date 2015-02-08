jQuery(document).ready(function(){
	/*Filters*/

	$('#events').change(function() {
		if(this.checked) {
			$(".list-events").fadeIn(300);	
		}else {
			$(".list-events").fadeOut(300);
		}
	});
	$('#style').change(function() {
		if(this.checked) {
			$(".list-pref").fadeIn(300);	
		}else {
			$(".list-pref").fadeOut(300);
		}
	});
	//weather
	$('#weather').change(function() {
		if(this.checked) {
			$(".ws-pref").fadeIn(300);	
		}else {
			$(".ws-pref").fadeOut(300);
		}
	});
	
	//season
	$('#season').change(function() {
		if(this.checked) {
			$(".list-season").fadeIn(300);	
		}else {
			$(".list-season").fadeOut(300);
		}
	});

	//material
	$('#material').change(function() {
		if(this.checked) {
			$(".list-material").fadeIn(300);	
		}else {
			$(".list-material").fadeOut(300);
		}
	});



	//Colect all filters
	$( "#app-filters" ).click(function() {
		$( ".list-w li" ).each(function( index ) {
				$(this).fadeIn(50);
		});

		/*Get selected events --------------------------------- */
		var result = "events:";
		if($('#events').is(':checked')) { /*events*/
			result += $('.filters-item :radio:checked').val();
		}else{
			result += "no";
		}

		

		/*Get selected style --------------------------------- */
		result += "|style:";
		if($('#style').is(':checked')) { /*style*/
			var ok = 0; 
			$('.list-pref input[type="checkbox"]:checked').each(function() {
			    result += ($(this).attr('value'))+", ";
			    ok++;
			});
			
			if(ok==0)
				result += "no";
			 
		}else {
			result += "no";
		}


		/*Get weather --------------------------------- */
		result = result.substring(0, result.length-2);
		result += "|";

		if($('#weather').is(':checked')) { /*Weather*/
			result += 'weather:yes';
		}else {
			result  += 'weather:no';
		}

		result += "|";

		/*Season-----------------------------------------------*/
		result += "season:";
		if($('#season').is(':checked')) { /*season*/
			result += $('.list-season :radio:checked').val();
		}else {
			result += 'no';
			$('list-season').fadeOut();
		}


		result += "|";
		/*Material-----------------------------------------------*/
		result += "material:";
		if($('#material').is(':checked')) { /*material*/
			result += $('.list-material :radio:checked').val();
		}else {
			result += 'no';
			$('list-material').fadeOut();
		}


		var jsonResultFilter = {}; 
		jsonResultFilter = {
				// toate datele si filtere


		};



		//alert(result);
		console.log(result);
		/* filtrez div-urile ------------------------------------- */
		var count_item = 0 ; 
		var values_results = result.split("|");
		var indexs = [];

		jQuery.each( values_results, function( i, val ) { 
			var aux = values_results[i].split(":");
			if(aux[1] !== "no") { 
				console.log(aux[1]);

				var temp = aux[0]; 
				switch (temp) { 
					case 'events': 
					      $( ".list-w li" ).each(function( index ) {
							  	//item-events
							  	var events = $('.list-events :radio:checked').val().toLowerCase();
							  	var events_item =  $( this ).find(".item-events").text().toLowerCase();
							  	if (events_item.toLowerCase().indexOf(events) >= 0){
							  		indexs.push(index);
							  	} //else {
							  	//	$(this).fadeOut();
							  	//}
							});	

					        break;
					case 'prototype': 
					        alert('prototype Wins!');
					        break;
					case 'mootools': 
					        alert('mootools Wins!');
					        break;      
					case 'season': 
					        $( ".list-w li" ).each(function( index ) {
							  	//item-events
							  	var events = $('.list-season :radio:checked').val().toLowerCase();
							  	var events_item =  $( this ).find(".item-season").text().toLowerCase();
							  	if (events_item.toLowerCase().indexOf(events) >= 0){
							  		indexs.push(index);
							  	} //else {
							  		//$(this).fadeOut();
							  	//}
							});	
					        break;
					case 'material':  
					        $( ".list-w li" ).each(function( index ) {
							  	//item-events
							  	var events = $('.list-material :radio:checked').val().toLowerCase();
							  	var events_item =  $( this ).find(".item-material").text().toLowerCase();
							  	if (events_item.toLowerCase().indexOf(events) >= 0){
							  		indexs.push(index);
							  	} //else {
							  	//	$(this).fadeOut();
							  	//}
							});	
					        break;
					}
			
				

			}

		});
		
		/* caut in vector doar valorile unice de atatea ori cate filtre am !!! ----------------------------- */
		//jQuery.inArray( "John", arr )
		jQuery.each( indexs, function( i, val ) { 
			console.log(indexs[i]);
		});

		console.log("--------------------------------------------");

		jQuery.each( indexs, function( i, val ) { 
				console.log(jQuery.inArray( 11, indexs ) + "  " + i + " " + indexs);
		});
		
		
		//$( ".list-w li" ).each(function( index ) {

		//}


		

		//jQuery.each( indexs, function( i, val ) {  
		//	 console.log(val);
		//});



	
		

	}); /* --------------------- end of click button*/

	/*Reset filters --------------------------------------- */
	$('#reset-filters').click(function() {
		 location.reload(500);
		 $("html, body").animate({ scrollTop: 0 }, "slow");
 		// return false;
	});


});