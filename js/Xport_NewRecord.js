'use strict';

(function () {

    var colArray = [];

    $(document).ready(function () {

        tableau.extensions.initializeDialogAsync().then(function (payload) {

            $('#xport_insert_record_button').click(closeDialog);

            // Clear out the existing list
            $('#xport_new_values').empty();
            $('#xport_new_values').empty();

            colArray = JSON.parse(payload);
            //$('#save').click($('#newSetting').modal('toggle'));
            for(var i = 0;i< colArray.length ; i++){
                $('#xport_new_values').append(
                    `<div class="input">
                    <label for="val${i}">${colArray[i]}</label>
                    <input id="val${i}" type="text" class="form-control"></div>`
                );
            };
        });
    });

    function closeDialog() {
        tableau.extensions.settings.saveAsync().then(() => {
            var jsonvals ={vals:[]};

            var activetab =  $("ul#xport_new_tabs li.active");
            if(activetab[0].id == "new_record_tab"){
                for(var i = 0;i< colArray.length ; i++){
                    jsonvals.vals.push($(`#val${i}`).val());
                };
                 
            }else{
                jsonvals.vals.push($(`#col1`).val());
            }
            jsonvals.id = activetab[0].id;
            tableau.extensions.ui.closeDialog(JSON.stringify(jsonvals));
        });
      }

})();