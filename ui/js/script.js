jQuery(document).ready(function(){
 
	/*Check password*/
    $('#passwordInput, #confirmPasswordInput').on('keyup', function(e) {

        if($('#passwordInput').val() == '' && $('#confirmPasswordInput').val() == '')
        {
            $('#passwordStrength').removeClass().html('');

            return false;
        }

    	if($('#passwordInput').val() != '' && $('#confirmPasswordInput').val() != '' && $('#passwordInput').val() != $('#confirmPasswordInput').val())
    	{
    		$('#passwordStrength').removeClass().addClass('alert alert-error').html('Passwords do not match!');

        	return false;
    	}

        // Must have capital letter, numbers and lowercase letters
        var strongRegex = new RegExp("^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$", "g");

        // Must have either capitals and lowercase letters or lowercase and numbers
        var mediumRegex = new RegExp("^(?=.{7,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$", "g");

        // Must be at least 6 characters long
        var okRegex = new RegExp("(?=.{6,}).*", "g");

        if (okRegex.test($(this).val()) === false) {
            // If ok regex doesn't match the password
        	$('#passwordStrength').removeClass().addClass('alert alert-error').html('Password must be 6 characters long.');

        } else if (strongRegex.test($(this).val())) {
            // If reg ex matches strong password
            $('#passwordStrength').removeClass().addClass('alert alert-success').html('Good Password!');
        } else if (mediumRegex.test($(this).val())) {
            // If medium password matches the reg ex
           // $('#passwordStrength').removeClass().addClass('alert alert-info').html('Make your password stronger with more capital letters, more numbers and special characters!');
		   $('#passwordStrength').removeClass().addClass('alert alert-success').html('Good Password!');
        } else {
            // If password is ok
            $('#passwordStrength').removeClass().addClass('alert alert-error').html('Weak Password, try using numbers and capital letters.');
        }

        return true;
    });



	/*Register with parse ---------------------------------------------------------------------------------------------*/
	Parse.initialize("H8BnSQkIlQpkUoETUrIZrtDxhgAvffirQoJQuXnL", "Xm9SuFuJ86h1xZzN53sne5WFt5NNfdQugepAHnow");

	$("#register").click(function() {

			var email_add = $("#email-r").val();
			var pass_add = $("#passwordInput").val();
			var checkpass_add = $("#confirmPasswordInput").val();
			var error_pass = $("#passwordStrength").text();
			var error_email = $("#validationEmail").text();

			console.log(email_add + " " + pass_add + " " + checkpass_add + " " + error_pass + " " + error_email    );

			if(email_add!="" && pass_add != "" && checkpass_add !="" && error_pass == "Good Password!" && error_email == "Email is valid."  ){
					//console.log("ok");

					var Users = Parse.Object.extend("Users");
					var query = new Parse.Query(Users);
					query.equalTo("email", email_add);
					query.find({
					  success: function(results) { /*Query realizat cu succes*/
					    //alert("Successfully retrieved " + results.length + " scores.");
						    // Do something with the returned Parse.Object values

						    if (results.length==0) { // nu exista user cu acest email

									var hash = CryptoJS.SHA3(pass_add);
									 
									console.log(user);	
									var Users = Parse.Object.extend("Users");
									var user = new Users();
									user.set("email", email_add);
									user.set("password", hash);

									user.save(null, {
										  success: function(gameScore) {
										    // Execute any logic that should take place after the object is saved.
										    //alert('New object created with objectId: ' + gameScore.valueOf());
										    //adaug utilizator
										    $("#validResults")
										    	.removeClass()
										    		.addClass('alert alert-success').html("Success");
										  },
										  error: function(gameScore, error) {
										    // Execute any logic that should take place if the save fails.
										    // error is a Parse.Error with an error code and message.
										   $("#validResults")
										   		.removeClass() 
										   			.addClass('alert alert-error').html('Failed to create new object, with error code: ' + error.message);
								  		}
								 });

						    } else { // exista user cu acest email
								$("#validResults").removeClass().addClass('alert alert-error').html("This email exists. Please login.");
						    }

						  
					  },
					  error: function(error) {
					    alert("Error: " + error.code + " " + error.message);
					  }
					});




			}		
			else {
				$("#validResults").removeClass().addClass('alert alert-error').html("Please check again the form.");
			}
			

	});

 
 	/* Login -------------------------------------------------------------*/

 	$("#login").click(function() {
 			var email_login = $("#email-add").val();
 			var pass_login = $('#pass').val();


 			/*var Users = Parse.Object.extend("Users");
			var query = new Parse.Query(Users);
			query.equalTo("playerName", "Dan Stemkoski");
			query.find({
			  success: function(results) {
			    alert("Successfully retrieved " + results.length + " scores.");
			    // Do something with the returned Parse.Object values
			    for (var i = 0; i < results.length; i++) { 
			      var object = results[i];
			      alert(object.id + ' - ' + object.get('playerName'));
			    }
			  },
			  error: function(error) {
			    alert("Error: " + error.code + " " + error.message);
			  }
			});*/
 	});


	/*Popup - register--------------------------------------------------------- */
	$("#register-form").click(function() {
		$("#register-box").fadeIn(500);//.css("display","block"); 
		var aux = $("#email-add").val();
		$("#email-r").val(aux); 
	});
	
	$(".close-button").click(function() {
		$("#register-box").fadeOut(500);//.css("display","none"); 
	});

	/*Popup - forgot pass-------------------------------------------------------------- */
	$("#f-pass").click(function() {
		$("#fbox-box").fadeIn(500);//.css("display","block"); 
		var aux = $("#email-add").val();
		$("#email-fp").val(aux); 
	});
	
	$(".close-button").click(function() {
		$("#fbox-box").fadeOut(500);//.css("display","none"); 
		
	});
	
	/*Popup - Edit profile-----------------------------------------------------------------*/
	$("#edit-profile").click(function() {
		$("#profile-edit").fadeIn(500);//.css("display","block");
		//var name = $('#basic-info #name').val();
		//console.log(name);
		//$('#new-name').val(name);

		//var aux = $("#email-add").val();
		//$("#email-fp").val(aux); 
	});
	
	$(".close-button").click(function() {
		$("#profile-edit").fadeOut(500);//.css("display","none"); 
		
	});
	
	/*Check email address---------------------------------------------------------------------*/
	$("#email-add").on('keyup', function(e){
		var sEmail = $("#email-add").val();
		if($.trim(sEmail).lenght == 0){
			$('#validationEmail').removeClass().addClass('alert alert-error').html("Please enter valid email address.");
			e.preventDefault();
		}
		if (validateEmail(sEmail)) {
		    $('#validationEmail').removeClass().addClass('alert alert-success').html('Email is valid.');
        }else {
           // alert('Invalid Email Address');
		   $('#validationEmail').removeClass().addClass('alert alert-error').html('Please enter valid email address.');
            e.preventDefault();
        }
	});
	
	/*Check email addres forgot pass*/
	$("#email-fp").on('keyup', function(e){
		var sEmail1 = $("#email-fp").val();
		if($.trim(sEmail1).lenght == 0){
			$('#passwordValidFP').removeClass().addClass('alert alert-error').html("Please enter valid email address.");
			e.preventDefault();
		}
		if (validateEmail(sEmail1)) {
		    $('#passwordValidFP').removeClass().addClass('alert alert-success').html('Email is valid.');
        }else {
           // alert('Invalid Email Address');
		   $('#passwordValidFP').removeClass().addClass('alert alert-error').html('Please enter valid email address.');
            e.preventDefault();
        }
	});
	
	/*Check email addres register---------------------------------------------------------------*/
	var aux2 = $("#email-add").val();
	$("#email-r").val(aux2);
	$("#email-r").on('keyup', function(e){

		var sEmail1 = $("#email-r").val();
		if($.trim(sEmail1).lenght == 0){
			$('#validationEmail').removeClass().addClass('alert alert-error').html("Please enter valid email address.");
			//$('#validationEmail').fadeOut(7000);
			e.preventDefault();
		}
		if (validateEmail(sEmail1)) {
		    $('#validationEmail').removeClass().addClass('alert alert-success').html('Email is valid.');
		   // $('#validationEmail').fadeOut(7000);
        }else {
           // alert('Invalid Email Address');
		   $('#validationEmail').removeClass().addClass('alert alert-error').html('Please enter valid email address.');
		   //$('#validationEmail').fadeOut(7000);
            e.preventDefault();
        }
	});
	
	
	/*Your wardrobe ---------------------------------------------------------------------------*/

	$('button').on('click',function(e) {
		if ($(this).hasClass('grid')) {
			$('#container ul').removeClass('list').addClass('grid');
		}
		else if($(this).hasClass('list')) {
			$('#container ul').removeClass('grid').addClass('list');
		}
	});
	
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
	var xml = "<?xml version='1.0' ?><warderobe><item><name>T-shirt1</name><events>Funeral</events></item><item><name>T-shirt2</name><events>Interview</events></item><item><name>T-shirt3</name><events>Funeral|Interview</events></item><item><name>T-shirt4</name><events>Funeral|Interview</events></item><item><name>T-shirt5</name><events>Funeral|Interview</events></item><item><name>T-shirt6</name><events>Funeral|Interview</events></item><item><name>T-shirt7</name><events>Funeral|Interview</events></item><item><name>T-shirt8</name><events>Funeral|Interview</events></item><item><name>T-shirt9</name><events>Funeral|Interview</events></item><item><name>T-shirt10</name><events>Funeral|Interview</events></item></warderobe>";

	    
	//Parse the givn XML
	var xmlDoc = $.parseXML( xml ); 
	    
	var $xml = $(xmlDoc);

	  // Find Person Tag
	var $item = $xml.find("item");
	var i=0;
	$item.each(function(){
	    i++;
	    var name = $(this).find('name').text(),
	        events = $(this).find('events').text();

	    events = events.replace(/\|/g, ', ');
	    
	   // $("#ProfileList" ).append('<li>' +name+ ' - ' +events+ '</li>');
	    var aux = '<li id="item-'+i+'"><div class="t-item"><h3>'+name+'</h3><p class="item-events"><b>Events:</b> '+events+'</p></div>'
	   				+'<div class="e-item"> <button id="item-e-'+i+'" class="options edit-item">Edit</button> '
	   				+'<button id="item-d-'+i+'" class="options delete-item">Delete</button> </div></li>';
		$( ".list-w" ).append( aux);
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
			$(name_remove).remove();
			/*sterge si din fisier/vector...*/
	});



	
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
	$('#weather_season').change(function() {
		if(this.checked) {
			$(".ws-pref").fadeIn(300);	
		}else {
			$(".ws-pref").fadeOut(300);
		}
	});
	
	//Colect all filters
	$( "#app-filters" ).click(function() {

		var result = "events: ";
		if($('#events').is(':checked')) { /*events*/
			result += $('.filters-item :radio:checked').val();
		}

		result += "|style: ";

		if($('#style').is(':checked')) { /*style*/
			
			$('.list-pref input:checked').each(function() {
			    result += ($(this).attr('value'))+", ";
			});
			//result += $('.filters-item :radio:checked').val();
		}

		result = result.substring(0, result.length-2);
		result += "|";

		if($('#weather_season').is(':checked')) { /*Weather and seasons*/
			result += 'weather: yes';
		}else {
			result  += 'weather: no';
		}

		alert(result);
		console.log(result);
		/* filtrez div-urile*/

		$( ".list-w li" ).each(function( index ) {
		  	
		  	//item-events
		  	//if($('.filters-item :radio:checked').val().toLowerCase() === $( this ).find(".item-events").text().toLowerCase())
		  	var events = $('.filters-item :radio:checked').val().toLowerCase();
		  	var events_item =  $( this ).find(".item-events").text().toLowerCase();


		  	if (events_item.toLowerCase().indexOf(events) >= 0){
		  		console.log( index + ": " + $( this ).find(".item-events").text() );
		  	}else {
		  		$(this).remove();
		  	}

		});




		/*$('.filters-item').each(function(){
			if($(this).find('input[type="radio"]:checked').length > 0){
				console.log($('input[type="radio"]:checked').val());
			}    
		});
		
		$('.list-pref').each(function(){
			if($('.list-pref').find('input[type="checkbox"]:checked').length > 0){
				console.log($('input[type="checkbox"]:checked').val());
			}    
		});*/
		/*var selected = [];
		$('.filters-item input[type="radio"]:checked').each(function() {
			selected.push($(this).attr('name'));
		});

		var i=0;
		for(i=0; i<selected.length; i++){
			console.log(selected[i]);
		}*/

		//alert( "Handler for .click() called." );

		/*$('.list-pref').each(function(){
			var selected = $(".list-pref input[type='radio']:checked").map(function(i,el){return el.value;}).get();
		    console.log("selected = [" + selected + "]\nas string = \"" + selected.join(";") + "\"");

		});

		$('.filters-item').each(function(){
			var selected = $(".filters-item input[type='checkbox']:checked").map(function(i,el){return el.value;}).get();
		    console.log("selected = [" + selected + "]\nas string = \"" + selected.join(";") + "\""); 
		});*/


	});






});


function validateEmail(sEmail){
	var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
	if (filter.test(sEmail)) {
		return true;
	}
	else { 
		return false; 
	}

	
}
