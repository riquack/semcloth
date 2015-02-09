jQuery(document).ready(function(){
	/*Your wardrobe ---------------------------------------------------------------------------*/
	/*Your wardrobe ---------------------------------------------------------------------------*/

	$('button').on('click',function(e) {
		if ($(this).hasClass('grid')) {
			$('#container ul').removeClass('list').addClass('grid');
		}
		else if($(this).hasClass('list')) {
			$('#container ul').removeClass('grid').addClass('list');
		}
	});

	var user_name_from_chookie = $.cookie('email');
	//console.log(user_name_from_chookie);
	var usr = user_name_from_chookie.split("@");

	$('#get_user_name').text(usr[0]);


	


	/*Populare garderoba*/
	/*$.ajax({
	    type: "GET",
	    url: "http://students.info.uaic.ro/~oana.gagea/wade-ui/date.xml",
	    dataType: "xml",
	    success: function(xml){
	    $(xml).find('Book').each(function(){
	      var sTitle = $(this).find('Title').text();
	      var sPublisher = $(this).find('Publisher').text();
	      $("<li></li>").html(sTitle + ", " + sPublisher).appendTo("#dvContent ul");
	    });
	  },
	  error: function() {
	    alert("An error occurred while processing XML file.");
	  }
	});*/
	//Sample XML    
	//var xml = "<?xml version='1.0' ?><warderobe><item><name>T-shirt1</name><events>Funeral</events></item><item><name>T-shirt2</name><events>Interview</events></item><item><name>T-shirt3</name><events>Funeral|Interview</events></item><item><name>T-shirt4</name><events>Funeral|Interview</events></item><item><name>T-shirt5</name><events>Funeral|Interview</events></item><item><name>T-shirt6</name><events>Funeral|Interview</events></item><item><name>T-shirt7</name><events>Funeral|Interview</events></item><item><name>T-shirt8</name><events>Funeral|Interview</events></item><item><name>T-shirt9</name><events>Funeral|Interview</events></item><item><name>T-shirt10</name><events>Funeral|Interview</events></item></warderobe>";

	 
	var xml =  	"<?xml version='1.0' ?> " 
					+ "<warderobe> <item> <name>T-shirt0</name> <events> <event>Funneral</event>  	<event>Date</event> <event>Romantic Date</event> </events> <styles> <style>Rock</style> <style>Sport</style></styles> <materials><material>cotton</material></materials></item>"
					+ "				<item> <name>T-shirt1</name> <events> <event>Funneral</event>  	<event>Date</event> <event>Romantic Date</event> </events> <styles> <style>Rock</style> </styles></item>"
					+ " 			<item> <name>T-shirt2</name> <events> <event>Business Meeting</event>  	<event>Interview</event> </events> <styles> <style>Rock</style> <style>Conservative</style></styles></item>"
					+ " 			<item> <name>T-shirt3</name> <events> <event>Club</event>  	<event>Pyjama Party</event> </events>  <styles> <style>Casual</style> <style>Conservative</style></styles> </item>"
					+ " 			<item> <name>T-shirt4</name> <events> <event>Funneral</event>  	<event>Interview</event> </events> <seasons><season>Autumn</season><season>Summer</season></seasons> <materials><material>cotton</material><material>wool</material></materials> </item>"
					+ " 			<item> <name>T-shirt5</name> <events> <event>Wedding</event>  	<event>Interview</event> </events> <styles> <style>Rock</style> <style>Conservative</style></styles> </item>"
					+ " 			<item> <name>T-shirt6</name> <events> <event>Funneral</event>  	<event>Interview</event> </events> <styles> <style>Casual</style> <style>Conservative</style></styles> <materials><material>wool</material></materials></item>"
					+ " 			<item> <name>T-shirt7</name> <events> <event>Funneral</event>  	<event>Pyjama Party</event> </events> <styles> <style>Casual</style> <style>Conservative</style></styles></item>"
					+ " 			<item> <name>T-shirt8</name> <events> <event>Club</event>  	<event>Interview</event> </events> <materials><material>cotton</material><material>wool</material></materials> </item>"
					+ " 			<item> <name>T-shirt9</name> <events> <event>Funneral</event>  	<event>Interview</event> </events>  <seasons><season>Winter</season></seasons></item>"
					+ " 			<item> <name>T-shirt10</name> <events> <event>Funneral</event>  <event>Interview</event> </events> <styles> <style>Casual</style> <style>Conservative</style></styles> </item>"
					+ " 			<item> <name>T-shirt10</name> <events> <event>Date</event>  <event>Interview</event> </events> <seasons><season>Winter</season></seasons></item>"
				+"</warderobe>";

	//Parse the givn XML
	var xmlDoc = $.parseXML( xml ); 
	    
	var $xml = $(xmlDoc);

	  // Find Person Tag
	var $item = $xml.find("item");
	var i=0;
	$item.each(function(){
	  
	  	/*Parsez events ---------------------------- */
	    var name = $(this).find('name').text();
		var events = "";
	    $(this).find('events>event').each(function(){
	    	events +=  $(this).text() + "<br/>";
		});

	    events = events.replace(/\|/g, ', ');

	    /*Parsez sezoane --------------------------- */
	    var season = ""; 
		$(this).find('seasons>season').each(function(){
	    	season +=  $(this).text() + "<br/>";
		});
	    if(season==="")
	    	season = '-';

	    /*Parsez styles ----------------------------- */
	    var styles = ""; 
		$(this).find('styles>style').each(function(){
	    	styles +=  $(this).text() + "<br/>";
		});
	    if(styles==="")
	    	styles = '-';


	    /*Parsez materials*/
	   	var material = ""; 
		$(this).find('materials>material').each(function(){
	    	material +=  $(this).text() + "<br/>";
		});
	    if(material==="")
	    	material = '-';

	   // $("#ProfileList" ).append('<li>' +name+ ' - ' +events+ '</li>');
	    var aux = '<li id="item-'+i+'"><div class="t-item"><h3>'+ name +'</h3>'
	   			 	+ '<p class="item-events"><b>Events:</b> '+ events +'</p>'
    				+ '<p class="item-season"><b>Season:</b> '+ season +'</p>'
    				+ '<p class="item-styles"><b>Styles:</b> '+ styles +'</p>' 
    				+ '<p class="item-material"><b>Material:</b> '+ material +'</p>'
    				+ '<p class="item-material"><b>Note:</b> .... </p>'
    				+ '</div>'
	   				//+'<div class="e-item"> <button id="item-e-'+i+'" class="options edit-item">Edit</button> '
	   				//+'<button id="item-d-'+i+'" class="options delete-item">Delete</button> </div>';
	   				+ '</li>';
		$( ".list-w" ).append( aux);
		  i++;
	});
    


	/*var items = [];
	var items = ["Item1", "Item2", "Item3", "Item4", "Item5", "Item6", "Item7", "Item8", "Item9"];
	
	var i;
	for (i = 0; i < items.length; i++) {
		
	}*/
	

	/*-------------------------------------------------------*/
	/* Delete, Edit */ 
	$('.delete-item').on('click',function(e) {
			var contentPanelId = jQuery(this).attr("id");
   			//alert(contentPanelId);
   			var div = document.getElementById(contentPanelId);
			//div.parentNode.removeChild(div);
			//div.parent().parent().removeChild(div)
			var sub_str = contentPanelId.split('-');;
			var name_remove = '#item-' + sub_str[2];
			console.log(name_remove);
			$(name_remove).fadeOut();
			/*sterge si din fisier/vector...*/
	});

	/* Add new item ----------------------------------------------------------------- */

	$('#add-item').on('click',function(e) {	
		var type_type = $('#item-options-type').find(":selected").text();
		var type_material = $('#item-options-material').find(":selected").text();
		var type_color = $('#item-options-color').find(":selected").text();
		var type_size = $('#item-options-size').find(":selected").text();
		var type_texture = $('#item-options-texture').find(":selected").text();
		var item_note = $("#item-note").val();

		var new_item = { "item" : {}};
		new_item.item.type = type_type;
		new_item.item.material = type_material;
		new_item.item.color = type_color;
		new_item.item.size = type_size;
		new_item.item.texture = type_texture;
		new_item.item.note = item_note;

		console.log(new_item);

	});

});