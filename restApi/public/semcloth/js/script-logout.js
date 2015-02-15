jQuery(document).ready(function(){
	 

	/* Logout ----------------------------------------*/
	$( "#logout" ).click(function() {
			//alert("dddd");
		//$.cookie('email', null);  
		$.cookie('email', '', { expires: -7 });
	});


});