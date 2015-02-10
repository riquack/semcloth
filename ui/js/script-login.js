jQuery(document).ready(function(){
	 

	/*Log in -------------------------------------------------------------*/
	$("#register").click(function() {

			var email_add = $("#email-r").val();
			var pass_add = $("#passwordInput").val();
			var checkpass_add = $("#confirmPasswordInput").val();
			var error_pass = $("#passwordStrength").text();
			var error_email = $("#validationEmail").text();

			//console.log(email_add + " " + pass_add + " " + checkpass_add + " " + error_pass + " " + error_email    );

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
									hash  = hash.toString(CryptoJS.enc.Base64);
									 
									console.log(hash);	
									var Users = Parse.Object.extend("Users");
									var user = new Users();
									user.set("email", email_add);
									user.set("password",  hash);

									user.save(null, {
										  success: function(gameScore) {
										    // Execute any logic that should take place after the object is saved.
										    //alert('New object created with objectId: ' + gameScore.valueOf());
										    //adaug utilizator
										    $("#validResults")
										    	.removeClass()
										    		.addClass('alert alert-success').html("Success");

										    $('#register-box').fadeOut(300);
											$.cookie('email', email_add  , { expires: 9999999 });
				    						window.location.replace("./your-wardrobe.html");
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
								$('#validResults').fadeOut(300);
						    }

						  
					  },
					  error: function(error) {
					    alert("Error: " + error.code + " " + error.message);
					  }
					});




			}		
			else {
				$("#validResults").removeClass().addClass('alert alert-error').html("Please check again the form.");
				$("#validResults").fadeOut(7000);
			}
			

	});

 
 	/* Login -------------------------------------------------------------*/
 
 	$("#login").click(function() {
 			var email_login = $("#email-add").val();
 			var pass_login = $('#pass').val();
 			var text_verif =  $('#validationEmailLg').val();
 			
 			

			if(email_login!=="" && pass_login !== "" ){
				var hash1 = CryptoJS.SHA3(pass_login);
			 console.log(hash1);
				 hash1 = hash1.toString(CryptoJS.enc.Base64);
				 
				 console.log(hash1);
				var Users = Parse.Object.extend("Users");
				var query = new Parse.Query(Users);
				query.equalTo("email", email_login);
				query.find({
				  success: function(results) {
				   // alert("Successfully retrieved " + results.length + " scores.");
				    // Do something with the returned Parse.Object value
				    console.log(results);
				    if (results[0].get('password') === hash1) {
				    	// ok
				    	console.log("ok");
				    	$.cookie('email', results[0].get('email') , { expires: 9999999 });
				    	window.location.replace("./your-wardrobe.html");

				    	console.log(hash1 + " -- " + results[0].get('password'));
				    } else {
				    	// not ok
				    	//console.log(hash1 + " -- " + results[0].get('password'));
				    	$('#loginEmailLg').removeClass().addClass('alert alert-error').html('Password and email doesn\'t match.');
				    	$('#loginEmailLg').fadeOut(7000);
				   }
				  },
				  error: function(error) {
				    alert("Error: " + error.code + " " + error.message);
				  }
				});



			}else {
					$("#loginEmailLg").removeClass().addClass('alert alert-error').html('Please check again the form');
					$('#loginEmailLg').fadeOut(300);
			}


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
	
	



	

});