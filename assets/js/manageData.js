let session=localStorage.getItem("session");
let baseUrl=localStorage.getItem("baseUrl");

let showAlert=(alertDom, color, message) => {
  $(alertDom).append(`
	<div class="alert alert-${color} alert-dismissible" role="alert">
		${message}
	</div>
`);
}

let readData=(dtDom, table, columnsConfig) => {
  $(dtDom).DataTable({
    ajax: {
      url: baseUrl+'/api/getAll',
      type: "GET",
      beforeSend: (request) => {
        request.setRequestHeader("session", session);
        request.setRequestHeader("table", table);
      },
      dataSrc: "output",
    },
    columns: columnsConfig
  });
}

let showData=(title, table, id, data, editMode=false) => {
  $('#bbaModalTitle').html(title);
  $('#bbaModal').modal('show');
  $('#bbaModalBody').empty();
  $.ajax({
    url: baseUrl+'/api/getById/'+id,
    type: "GET",
    beforeSend: (request) => {
      request.setRequestHeader("session", session);
      request.setRequestHeader("table", table);
    },
    dataSrc: "output",
    success: (response) => {
      if (response.status==200) {
        for (var key in response.output) {
          if (response.output.hasOwnProperty(key)) {
            if (key=='roleId') {
              switch (response.output[key]) {
                case "1":
                  response.output[key]="Admin";
                  break;
                case "2":
                  response.output[key]="Supervisor";
                  break;
                case "3":
                  response.output[key]="Staff";
                  break;
              }
            }
          }
        }
        let form=new FormBuilder(data, response.output);
        $('#bbaModalBody').html(form.generate());
      } else {
        showAlert('#bbaModalBody', 'danger', `(${response.status}) ${response.message}`);
      }
    }, error: (error) => {
      console.error(error);
      showAlert('#bbaModalBody', 'danger', error.responseJSON.message);
    }
  });
}

// manageUsers
readData('#users', 'users', [
  {
    data: "id",
    render: (data, type, row, meta) => {
      return meta.row+1;
    }
  },
  { data: "name" },
  {
    data: "id",
    render: (data, type, row, meta) => {
      // generate button edit & delete
      return `
        <button class="btn btn-sm btn-primary" onclick="detailUser('${data}')"><i class='bx bx-info-circle'></i></button>
        <button class="btn btn-sm btn-warning" onclick="editData('users','${data}')"><i class='bx bx-edit'></i></button>
        <button class="btn btn-sm btn-danger" onclick="deleteData('users','${data}')">Hapus</button>
      `;
    }
  },
]);
let detailUser=(id) => {
  showData('Detail User', 'users', id, [
    {
      key: 'id',
      type: 'InputBox',
      options: {
        label: 'Id',
        type: 'text',
        name: 'id',
        isEnabled: false,
        help: ''
      }
    },
    {
      key: 'name',
      type: 'InputBox',
      options: {
        label: 'Nama',
        type: 'text',
        name: 'name',
        isEnabled: true,
        help: 'Nama User'
      }
    }
  ], false);
}

// manageShipName
readData('#shipName', 'ship', [
  { data: "id" },
  { data: "name" },
  {
    data: "id",
    render: (data, type, row, meta) => {
      // generate button edit & delete
      return `
        <button class="btn btn-sm btn-warning" onclick="editData('users','${data}')">Edit</button>
        <button class="btn btn-sm btn-danger" onclick="deleteData('users','${data}')">Hapus</button>
      `;
    }
  },
]);

// manageShipType
readData('#shipType', 'shiptype', [
  { data: "id" },
  { data: "name" },
  {
    data: "id",
    render: (data, type, row, meta) => {
      // generate button edit & delete
      return `
        <button class="btn btn-sm btn-warning" onclick="editData('users','${data}')">Edit</button>
        <button class="btn btn-sm btn-danger" onclick="deleteData('users','${data}')">Hapus</button>
      `;
    }
  },
]);

// manageShipOwner
readData('#shipOwner', 'shipowner', [
  { data: "id" },
  { data: "name" },
  {
    data: "id",
    render: (data, type, row, meta) => {
      // generate button edit & delete
      return `
        <button class="btn btn-sm btn-warning" onclick="editData('users','${data}')">Edit</button>
        <button class="btn btn-sm btn-danger" onclick="deleteData('users','${data}')">Hapus</button>
      `;
    }
  },
]);

// manageBranch
readData('#branch', 'branch', [
  { data: "id" },
  { data: "name" },
  {
    data: "id",
    render: (data, type, row, meta) => {
      // generate button edit & delete
      return `
        <button class="btn btn-sm btn-warning" onclick="editData('users','${data}')">Edit</button>
        <button class="btn btn-sm btn-danger" onclick="deleteData('users','${data}')">Hapus</button>
      `;
    }
  },
]);

// manageShipData
readData('#ships', 'ship', [

]);

// manageShipReceivableData
readData('#shipReceivable', 'ship', [

])


// let editData=(tableName, id) => {
//   $.ajax({
//     url: baseUrl+'api/update/'+id,
//     method: 'POST',
//     beforeSend: (request) => {
//       request.setRequestHeader("session", session);
//       request.setRequestHeader("table", tableName);
//     },
//     success: (res) => {

//     }
//   })
// }

// let deleteData=() => {

// }