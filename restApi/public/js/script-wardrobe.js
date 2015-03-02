var DEFAULT_SERVER_URL = "http://clevo-laptop";
var DEFAULT_SERVER_PORT = "9000";
var DEFAULT_SERVER = DEFAULT_SERVER_URL + ":" + DEFAULT_SERVER_PORT;

function constructURL(path) {
    return DEFAULT_SERVER + path;
}

jQuery(document).ready(function(){
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
	var usr = user_name_from_chookie.split("@");
	$('#get_user_name').text(usr[0]);

	//wardrobe
	$.ajax({
			type: "GET",
			url: constructURL("/users/" + usr[0] + "/wardrobe"),
            dataType: "text",
			success: function(data){
				var jresult = $.parseJSON(data);
				$.each(jresult.results.bindings, function(i, value) {
					var id_item = this.subject.value.split("#");

					$.ajax({
						type: "GET",
						url: constructURL("/users/" + usr[0] + "/wardrobe/" + id_item[1]),
						dataType: "text",
						success: function(data){
							var jresult_item = $.parseJSON(data);

							var values = ["http://www.semanticweb.org/ontologies/2015/02/semcloth.owl#isSuitableToBeDressedByGenre",
							"http://rdfs.org/sioc/ns#note",
							"http://www.semanticweb.org/ontologies/2015/02/semcloth.owl#hasTextileComposition",
							"http://www.semanticweb.org/ontologies/2015/02/semcloth.owl#hasColour",
							"http://www.semanticweb.org/ontologies/2015/02/semcloth.owl#hasSize",
							"http://www.semanticweb.org/ontologies/2015/02/semcloth.owl#hasTexture", 
							"http://dbpedia.org/ontology/thumbnail"]; 
							var data = {};
							$.each(jresult_item.results.bindings, function(index, value1) {
									
									var prop = this.property.value;
									data[prop] = this.object.value;
							});

							$.ajax({
                            		 type: "GET",
                            		 url: constructURL("/colorDetails/" + labelLink(data[values[3]])),
                             		 success: function(colorDetails){
                            						var aux = '<li id="item-'+i+'"><div class="t-item"><h3>' +'</h3>'
                                                    	+ '<div class="r-80">'
                                                   	+ '<p class="item-material"><b>Material:</b> '+ data[values[2]].split("/")[data[values[2]].split("/").length-1].replace("_", " " ) +'</p>'
                                                    + '<p class="item-material"><b>Note:</b> '+ data[values[1]]+'</p>'
                                                    + '<p class="item-material"><b>Texture:</b> '+ data[values[5]]+'</p>'
                                                    + '<p class="item-material"><b>Size:</b> '+ data[values[4]].split("#")[1].replace(">", "")+'</p>'
                                                    + '<p class="item-material"><b>Colors:</b> <span class="rectangle" style="background-color: #' + colorDetails.results.bindings[0].colourHexCode.value+ '"></span>' + colorDetails.results.bindings[0].label.value+'</p>'
                                                    + '<button id="iditem-'+i+'" class="delete-item-list"><i class="fa fa-trash-o"></i>Delete Item</button> </div>'
                                                    + '<div class="r-20"><img src="'+ data[values[6]]+'"></div>'
                                                    + '</div>'

                                                    $( ".list-w" ).append( aux);

                            			},
                            			 error: function(error, ob, message) {
                            					    alert("[error color ]: " + message.toString());
                            					    console.log("[error color]: " + message.toString());
                            					  }
                        });

						},
						 error: function(error, ob, message) {
								alert("[Get props each item]: " + message.toString());
						 }
					});

			
				});

			},
			 error: function(error, ob, message) {
					alert("[Get items]: " + message.toString());
			 }
	});




	/*Delete item from list*/
	/*-------------------------------------------------------*/
	/* Delete, Edit */ 
	$('.delete-item-list').on('click',function(e) {
			var contentPanelId = jQuery(this).attr("id");
   			var div = document.getElementById(contentPanelId);
			var sub_str = contentPanelId.split('-');;
			var name_remove = '#item-' + sub_str[1];
			console.log(name_remove);
			$(name_remove).fadeOut();
			/*sterge si din ...................

			...*/
	});


	/* Add new item ----------------------------------------------------------------- */
	$('#add-item').on('click',function(e) {	



		var type_type_vec = $('#item-options-type').find(":selected").val().split("|");
		var type_type = accLink(type_type_vec[0]);
		var type_type1 = type_type_vec[1];


		var type_gender = $('#item-options-gender').find(":selected").val();



		//var type_material = $('#item-options-material').find(":selected").text();
		//var type_color = $('#item-options-color').find(":selected").text(); // de modificat!!!!! 
		var type_size = $('#item-options-size').find(":selected").val();
		var type_texture = $('#item-options-texture').find(":selected").text();
		var type_note = $("#item-note").val();

		var ok=0;
		if(type_type === "none"){
			ok=1;
		}

		var count_gender =0 ;
		var type_gender = [];
		$('.item-gender input:checked').each(function() {
			    type_gender.push(accLink($(this).attr('value')));
			    count_gender++;
		});


		if(type_size === "none"){
			ok=1;
		}

		if(type_texture === "none"){
			ok=1;
		}
		
		if(type_note === ""){ /*Pentru textarea*/
			ok=1;
		}

		var count_mat = 0; 
		var type_material = [];
		$('#add-imaterial input:checked').each(function() {
			    type_material.push(accLink($(this).attr('value')));
			    count_mat++;
		});

		if(count_mat==0){
			ok=1;
		}

		var count_color = 0; 
		var type_color = [];
		$('#add-icolor input:checked').each(function() {
			    type_color.push(accLink($(this).attr('value')));
			    count_color++;
		});

		if(count_color==0){
			ok=1;
		}


		if( ok != 1)
		{
			 
			var new_item = {};
			new_item["clothingType"] = type_type; //JSON.stringify(new_type_type);
			new_item["thumbnail"] = type_type1;

			new_item["fabrics"] = type_material;
			new_item["colors"] = type_color;
			new_item["note"] = type_note; /*e vorba despre text area*/
			new_item["size"] = accLink(type_size);
			new_item["texture"] = type_texture;
			new_item["genres"] = type_gender;

			console.log(new_item);

			var usr = user_name_from_chookie.split("@");
				$.ajax({
				    type: "POST",
				    url: constructURL("/users/" + usr[0] + "/wardrobe"),
				   	contentType: "application/json",
				   	data: JSON.stringify(new_item),
				    success: function(data){
                        location.reload(true);
                        $("#success-error").fadeIn(5000);
                        $("#success-error").removeClass().addClass('alert alert-success').html("Success");
                        $("#success-error").fadeOut(5000);
				  	},
					  error: function(error, ob, message) {
					    alert("[Create new item]: " + message.toString());
					    console.log("[Create new item]: " + message.toString());
					  }
				});
		} else {
				$("#success-error").fadeIn(5000);
				$("#success-error").removeClass().addClass('alert alert-error').html("Check all the fields");
				$("#success-error").fadeOut(5000);
		}


		

	});


	/*Popup add new item ------------------------------------------------------  */

	$("#add-items-db").on('click',function() {	
	 	$(".box-custom").slideToggle(500);//.css("display","block"); 
	});



	$(".close-button").click(function() {
		$("#register-box").fadeOut(500);//.css("display","none"); 
	});	


	/*Populare garderoba ----   clothingMaterials */
	$.ajax({
	    type: "GET",
	    url: constructURL("/clothingMaterials"),
	   	dateType: "json",
	    success: function(data){
		var datAsString = JSON.stringify(data); 
		var clmatc =0; 
		 $.each(data.results.bindings,  function(index) {
			$('#add-imaterial').append("<div class='item-mat'>"+
			//<input type='checkbox' name='material' id='clmatc-"+clmatc+"' value='"+this.clothingMaterial.value+"' >
			// <label for='clmatc-"+clmatc+"' title='"+this.coomment.+""'>"  + labelLink(this.label.value) + "</label>
			 '<input type="checkbox" name="material" value="'+ this.clothingMaterial.value+'" id="clmatc-'+clmatc+'">'+
             '<label for="clmatc-'+clmatc+'" title="'+this.comment.value+'">'+this.label.value+'</label>'
			 +"</div>" );
			clmatc++; 

		 });
	  },
	  error: function(error) {
	    alert("An error occurred while processing XML file." + error);
	  }
	});


	/*Populare garderoba ----   colors */
	$.ajax({
	    type: "GET",
	   	url:  constructURL("/colors"),
	   	dateType: "json",
	    success: function(data){ 

		var datAsString = JSON.stringify(data); 
		var idcol=0;

		$.each(data.results.bindings,  function(index) {
			$('#add-icolor').append('<div class="item-col">'+ 
						'<input type="checkbox" name="color" value="'+ this.color.value+'" id="'+idcol+'">'+
											'<label for="'+idcol+'" title="'+this.comment.value+'"><span class="rectangle" style="background-color:#'+this.colourHexCode.value+'">'+
											'</span>'+this.label.value+'</label>'
									+'</div>');
			idcol++;
		 });
	  },
	  error: function(error) {
	    alert("An error occurred while processing XML file." + error);
	  }
	});


	/*Populare graderoba -------- sizes - */
	$.ajax({
	    type: "GET",
	    url: constructURL("/clothingSizes"),
	   	dateType: "json",
	    success: function(data){ 
		var datAsString = JSON.stringify(data);//(new XMLSerializer()).serializeToString(json);
		$.each(data.results.bindings,  function(index) {
		 	
			$('#item-options-size').append(' <option value="'+ this.size.value+'">'+this.label.value+'</option>');
		 });
	  },
	  error: function(error) {
	    alert("An error occurred while processing XML file." + error);
	  }
	});


	/*Populare graderoba -------- clothingTypes - */
	$.ajax({
	    type: "GET",
        url: constructURL("/clothingTypes"),
	   	dateType: "json",
	    success: function(data){ 
		var datAsString = JSON.stringify(data);//(new XMLSerializer()).serializeToString(json);
		$.each(data.results.bindings,  function(index) {
		 	
			$('#item-options-type').append(' <option value="'+ this.clothing.value + "|" + this.thumbnail.value+'">'+this.label.value+'</option>');
		 });
	  },
	  error: function(error) {
	    alert("An error occurred while processing XML file." + error);
	  }
	});


	/*Populare garderoba -------- texture - */
	$.ajax({
	    type: "GET",
	    url: constructURL("/clothingTextures"),
	   	dateType: "json",
	    success: function(data){ 
		var datAsString = JSON.stringify(data);
		$.each(data.results.bindings,  function(index) {
		 	//....
			$('#item-options-texture').append(' <option value="'+ this.texture.value +'">'+this.label.value+'</option>');
		 });
	  },
	  error: function(error) {
	    alert("An error occurred while processing XML file." + error);
	  }
	});




});


function labelLink(link){
	var string_link = link;
	var arr_str = string_link.split("/");
	return arr_str[arr_str.length-1];
}

function accLink(link){
	var string_link = "<" +  link + ">";
	return  string_link; 
} 
