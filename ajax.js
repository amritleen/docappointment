function allAppointments(divID){
	jQuery(divID).show();
    return new Promise(function(resolve, reject) {
		var xhrAllApp= new XMLHttpRequest();
		xhrAllApp.onreadystatechange = function(){
			if(xhrAllApp.readyState == 4 && xhrAllApp.status == 200){				
				var nodeID=JSON.parse(xhrAllApp.responseText);
				resolve(nodeID);
			}
		}
        xhrAllApp.open("POST",'http://localhost/retreive.php',true);
        xhrAllApp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhrAllApp.send();
    });
}

allAppointments().then(function(data){
   
      var tempArr2 = [];
      for(var i=0; i<data['data'].length; i++){
      //    console.log(data['data'][i]);
          var tempArr = [];
          for(key in data['data'][i]){
              tempArr.push(data['data'][i]['ID']);
              tempArr.push(data['data'][i]['username']);
              tempArr.push(data['data'][i]['mobile']);
              tempArr.push(data['data'][i]['date']);
              tempArr.push(data['data'][i]['starttime']);
              tempArr.push(data['data'][i]['endtime']);
              tempArr.push(data['data'][i]['reason']);
          }
          tempArr2.push(tempArr);
      
      }
      dataSet = tempArr2;
  });

function deleteAppointment(ID){
//	jQuery(divID).show();
    return new Promise(function(resolve, reject) {
		var xhrAllApp= new XMLHttpRequest();
		xhrAllApp.onreadystatechange = function(){
			if(xhrAllApp.readyState == 4 && xhrAllApp.status == 200){				
				var nodeID=JSON.parse(xhrAllApp.responseText);
				resolve(nodeID);
			}
        }
       
        xhrAllApp.open("GET",'http://localhost/delete.php?id='+ID,true);
        xhrAllApp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhrAllApp.send();
    });
}

function updateAppointment(name,mobile,reason,date,starttime,endtime,ID){
	
    return new Promise(function(resolve, reject) {
		var xhrAllApp= new XMLHttpRequest();
		xhrAllApp.onreadystatechange = function(){
			if(xhrAllApp.readyState == 4 && xhrAllApp.status == 200){				
				var nodeID=JSON.parse(xhrAllApp.responseText);
				resolve(nodeID);
			}
        }
        xhrAllApp.open("POST",'http://localhost/update.php',true);
        xhrAllApp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      
       xhrAllApp.send(JSON.stringify({"name":name,'reason' : reason,'mobile':mobile,'date' : date,'starttime':starttime,'endtime': endtime,'id' : ID}));
    });
}

function insertAppointment(name,mobile,reason,date,starttime,endtime){

    return new Promise(function(resolve, reject) {
		var xhrInsertApp= new XMLHttpRequest();
		xhrInsertApp.onreadystatechange = function(){
			if(xhrInsertApp.readyState == 4 && xhrInsertApp.status == 200){				
				var nodeID=JSON.parse(xhrInsertApp.responseText);
				resolve(nodeID);
			}
        }     
        xhrInsertApp.open("POST",'http://localhost/insert.php',true);
        xhrInsertApp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");     
        xhrInsertApp.send(JSON.stringify({"name":name,'reason':reason,'mobile':mobile,'date' : date,'starttime':starttime,'endtime': endtime}));
    });
}