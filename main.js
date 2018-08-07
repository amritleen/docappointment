var index = [];
$(document).ready(function () {
    $("#pickyDateStart").datetimepicker({
        format: "dd MM yyyy - hh:ii",
        autoclose: true,
        todayBtn: true,
        pickerPosition: "bottom-left"
    });
    $("#pickyDateEnd").datetimepicker({
        format: "dd MM yyyy - hh:ii",
        autoclose: true,
        todayBtn: true,
        pickerPosition: "bottom-left"
    });

    $('#example').DataTable( {
        data: dataSet,
        dom: 'Bfrtip',
        select: true,
        buttons: [
            'copy', 'csv', 'excel', 'pdf'	
        ],
        columns: [
            { title: "ID" },
            { title: "User name " },
            { title: "Mobile" },
            { title: "Date" },
            { title: "Start Time" },
            { title: "End Time" },
            { title: "Reason" }
        ],
        "columnDefs": [
            {
                "targets": [ 0 ],
                "visible": false,
                "searchable": false
            }
        ]
    } );
    var table = $('#example').DataTable();
    table
    .on( 'select', function ( e, dt, type, indexes ) {
        var rowData = table.rows( indexes ).data().toArray();
        index = [];
        for(var i=0; i<6; i++)
            index.push(rowData[i]);
    } );

});

function updateRecord(){
    jQuery('#todayAppDiv').hide();
    jQuery('#appointmentForm').show(); 
    jQuery('#updateHeading').show(); 
    jQuery('#btn-update').show();
    jQuery('#btn-submit').hide();
    
    jQuery('#username').val(index[0][1]);
    jQuery('#mobileNo').val(index[0][2]);
    jQuery('#reasonTextArea').val(index[0][6]);

    var date = new Date(index[0][3]+'T00:00:00');
 
    var startdate = date.getDate() + ' ' + fullMonthName(index[0][3]) + ' ' + date.getFullYear() + ' - ' + index[0][4];    
    var endDate = date.getDate() + ' ' + fullMonthName(index[0][3]) + ' ' + date.getFullYear() + ' - ' + index[0][5];  
    jQuery('#pickyDateStart').val(startdate);
    jQuery('#pickyDateEnd').val(endDate);   

}

function fullMonthName(tempDate){
    var date = new Date(tempDate);
    var locale = "en-us";
    return date.toLocaleString(locale, {month: "long"});
}

var dataSet = [];
function resetForm(){
   
    document.getElementById("appointmentForm").reset();	
}

function bookNewApp(){
    jQuery('#todayAppDiv').hide();
    jQuery('#updateHeading').hide(); 
    jQuery('#btn-update').hide(); 
    jQuery('#btn-submit').show();
    jQuery('#appointmentForm').show(); 
    document.getElementById("appointmentForm").reset();	  
}

function cancelForm(){
    jQuery('#todayAppDiv').show();
    jQuery('#updateHeading').hide(); 
    jQuery('#btn-update').hide();
    jQuery('#appointmentForm').hide();   
}
function deleteRecord(){
    deleteAppointment(index[0][0]);
    location.reload();
}

function submitAppointment(isSubmit){
    var name = jQuery('#username').val();
    var mobile = jQuery('#mobileNo').val();
    var reason = jQuery('#reasonTextArea').val();
   
    var tempStarttime = jQuery('#pickyDateStart').val();
    var tempEndTime = jQuery('#pickyDateEnd').val();

    var tempDate = new Date(tempStarttime.split('-')[0].trim());

    var date = tempDate.getFullYear() + '-' +  (tempDate.getMonth() + 1) + '-' + tempDate.getDate();  

    var tempString = tempStarttime.split('-')[1].trim();
    var tempStartTime = new Date(tempDate.getFullYear(),tempDate.getMonth(),tempDate.getDate(),tempString.split(':')[0],tempString.split(':')[1]);

    var starttime = tempStartTime.getHours() + ':' + tempStartTime.getMinutes() + ':' + tempStartTime.getSeconds();
   
    var tempDate = new Date(tempEndTime.split('-')[0].trim());

    var tempString = tempEndTime.split('-')[1].trim();
    var tempEndTimeValue = new Date(tempDate.getFullYear(),tempDate.getMonth(),tempDate.getDate(),tempString.split(':')[0],tempString.split(':')[1]);

    var endtime = tempEndTimeValue.getHours() + ':' + tempEndTimeValue.getMinutes() + ':' + tempEndTimeValue.getSeconds();

   console.log(endtime);
    if(isSubmit)
        insertAppointment(name,mobile,reason,date,starttime,endtime).then(function(){
            location.reload();
            cancelForm();
        });
    else
        updateAppointment(name,mobile,reason,date,starttime,endtime,index[0][0]).then(function(){
            location.reload();
            cancelForm();
        });
    
  
}