
// var data_url= "http://192.168.1.200:1000"

// var data_url= "http://localhost"

function loadDataTable(tblId, data_uril){
    var tbl_id = '#' + tblId;
    var table = $(tbl_id).DataTable({
       "ajax": {
            "type": "GET",
            "url": data_uril,
            "dataSrc": function(data) {
                console.log(data);
                return data;
            }
        },
        "columnDefs": [
            {
                "targets": [0],
                "visible": false,
                "searchable": false
            }
        ]
        ,
        dom: 'Bfrtip',
        buttons: [
            {
                extend: 'print',
                text: '<span class="glyphicon glyphicon-print" aria-hidden="true"></span>',
                filename: 'file',
                title: '',
                titleAttr: 'Print'
            },
            {
                extend: 'excel',
                text: '<span class="glyphicon glyphicon-list-alt" aria-hidden="true"></span>',
                filename: 'file',
                title: '',
                titleAttr: 'Export to excel'
            }
        ],
        // "order":[[1,"asc"]],
        "stripeClasses": [],
        paging: true,
        searching: true,
    });
}



// function recalc_table_withdata(tbl,cols,datas) {
//     if ($.fn.DataTable.isDataTable(tbl)) {
//         $(tbl).DataTable().destroy();
//     }
//     var table;
//     let prom = new Promise( (resolve, reject)=> {
//         table =  $(tbl).DataTable( {
//             dom: 'Bfrtip',
//             data:datas,
//             columns: cols,
//             buttons: [
//                 {
//                     extend: 'print',
//                     text: '<i class="fa fa-print" aria-hidden="true"></i>',
//                     filename: 'file',
//                     title: '',
//                     titleAttr: 'Print'
//                 }
//             ],
//             responsive: true
//         });
//         resolve(table);
//     })
    
// }