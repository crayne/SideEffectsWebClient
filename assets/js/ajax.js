var Ajax = {};
Ajax.Get = function(url, params, success, error, complete, ifJson) {

    var xhr = Ti.Network.createHTTPClient();

    xhr.onerror = function(e) {
        if (error) {
            error(e);
        }
        if (complete) {
            complete();
        }
    };

    xhr.onload = function() {
        if (success) {
            success(this.responseText);        		
        }
        if (complete) {
            complete();
        }
    };

    // open the client and encode our URL
 /*   
    if (Ti.Platform.name == "android" || ifJson){

     	xhr.open('GET',url);
     	if (ifJson){
    		xhr.setRequestHeader("Accept", "application/json"); 
    	}

    	xhr.send();
    }
    else {
        xhr.open('POST',url);
        xhr.send(params);
    }
 */   
    if (ifJson){
    	xhr.setRequestHeader("Accept", "application/json"); 
    }
    	
    xhr.open('POST',url);
    xhr.send(params);

        
};



