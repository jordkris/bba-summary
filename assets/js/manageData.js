let session=localStorage.getItem("session");
let baseUrl=localStorage.getItem("baseUrl");

let dataConfig=new Promise((resolve, reject) => {
  try {
    $.getJSON(baseUrl+'/assets/dataConfig.json', (allData) => {
      resolve(allData);
    });
  } catch (error) {
    reject(error);
  }
});

/**
 * Serializes the given data array to a JSON object.
 *
 * @param {Array} data - An array of objects containing name-value pairs.
 * @return {Object} - A JSON object with the names as keys and values as values.
 */
let serializeToJson=(data) => {
  let newData={};
  data.forEach((item) => {
    newData[item.name]=item.value;
  });
  return newData;
};

/**
 * Generates an alert message and appends it to the specified DOM element.
 *
 * @param {string} alertDom - The DOM element to which the alert message will be appended.
 * @param {string} color - The color of the alert message. Valid values are "success", "info", "warning", or "danger".
 * @param {string} message - The message to be displayed in the alert.
 */
let showAlert=(alertDom, color, message) => {
  $(alertDom).append(`
	<div class="alert alert-${color} alert-dismissible" role="alert">
		${message} <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
	</div>
`);
}

/**
 * Reads data from the specified DOM element and populates a DataTable with the retrieved data.
 *
 * @param {string} dtDom - The DOM element containing the DataTable.
 * @param {string} table - The name of the table to retrieve data from.
 * @param {array} columnsConfig - The configuration for the columns of the DataTable.
 * @return {void} 
 */
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

/**
 * Shows data in a modal based on the given parameters.
 *
 * @param {string} title - The title of the modal.
 * @param {string} table - The table name.
 * @param {string} id - The ID of the data.
 * @param {boolean} [editMode=false] - Flag indicating whether the modal is in edit mode.
 * @return {Promise<void>} A promise that resolves when the data is successfully loaded and displayed.
 */
let showData=async (title, table, id, editMode=false) => {
  $('#bbaModalTitle').html(title);
  $('#bbaModalBody').empty();
  $('#bbaModalFooter').empty();
  $('#bbaModal').modal('show');
  let intervalUpdatedDate;
  let data=(await dataConfig)[table].inputConfig;
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
        let form=new FormBuilder(data, response.output, editMode, table);
        $('#bbaModalBody').html(form.generate());
      } else {
        showAlert('#bbaModalBody', 'danger', `(${response.status}) ${response.message}`);
      }
      if (editMode) {
        $('#bbaModalFooter').html(`
          <button id="submitEdit" type="button" class="btn btn-primary" style="float: right;" onclick="submitEdit('${table}', '${response.output.id}')">
            Simpan <i class="bx bx-save"></i>
          </button>
        `);
        clearInterval(intervalUpdatedDate);
        intervalUpdatedDate=setInterval(() => {
          const currentMoment=moment();
          const localMoment=currentMoment.local();
          const localDateTime=localMoment.format('YYYY-MM-DDTHH:mm:ss');
          $('#updatedDate').val(localDateTime);
        }, 1000)
      }
    }, error: (error) => {
      console.error(error);
      showAlert('#bbaModalBody', 'danger', error.responseJSON.message);
    }
  });

}

/**
 * Adds data to the specified table.
 *
 * @param {string} title - The title for the modal.
 * @param {string} table - The table name to add data to.
 * @return {Promise<void>} - A promise that resolves when the data is successfully added.
 */
let addData=async (title, table) => {
  $('#bbaModalTitle').html(title);
  $('#bbaModalBody').empty();
  $('#bbaModalFooter').empty();
  $('#bbaModal').modal('show');
  let intervalDate;
  let data=(await dataConfig)[table].inputConfig;
  let form=new FormBuilder(data, (await dataConfig)[table].outputConfig, table);
  $('#bbaModalBody').html(form.generate());
  $('#bbaModalFooter').html(`
    <button id="submitAdd" type="button" class="btn btn-primary" style="float: right;" onclick="submitAdd('${table}')">
      Simpan <i class="bx bx-save"></i>
    </button>
  `);
  clearInterval(intervalDate);
  intervalDate=setInterval(() => {
    const currentMoment=moment();
    const localMoment=currentMoment.local();
    const localDateTime=localMoment.format('YYYY-MM-DDTHH:mm:ss');
    $('#createdDate').val(localDateTime);
    $('#updatedDate').val(localDateTime);
  }, 1000);
  $('#createdDate').prop('disabled', false);
}

/**
 * Submits an add request to the server.
 *
 * @param {string} table - The table to add the data to.
 * @return {void} The function does not return a value.
 */
let submitAdd=(table) => {
  let formData=JSON.stringify(
    serializeToJson($("#formBbaModal").serializeArray())
  );
  let htmlButtonCache;

  $.ajax({
    url: baseUrl+"/api/add",
    type: "POST",
    data: formData,
    dataType: "json",
    contentType: "application/json",
    beforeSend: (request) => {
      request.setRequestHeader("session", session);
      request.setRequestHeader("table", table);
      $('#submitAdd').prop('disabled', true);
      htmlButtonCache=$('#submitAdd').html();
      $('#submitAdd').html(`
        <div class="spinner-border text-success" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      `);
    },
    success: (response) => {
      if (response.status==200) {
        showAlert('#bbaModalFooter', 'success', response.message);
      } else {
        showAlert('#bbaModalFooter', 'danger', response.message);
      }
      $('#submitAdd').html(htmlButtonCache);
      $('#submitAdd').prop('disabled', false);
      $('#bbaModal').on('hidden.bs.modal', () => {
        location.reload();
      });
    },
    error: (error) => {
      console.error(error);
      showAlert('#bbaModalFooter', 'danger', error.responseJSON.message);
      $('#submitAdd').html(htmlButtonCache);
    },
  });
}

/**
 * Submits the edited data to the server.
 *
 * @param {string} table - The table name.
 * @param {string} id - The id of the record.
 * @return {void}
 */
let submitEdit=(table, id) => {
  let formData=JSON.stringify(
    serializeToJson($("#formBbaModal").serializeArray())
  );
  let htmlButtonCache;

  $.ajax({
    url: baseUrl+"/api/update/"+id,
    type: "POST",
    data: formData,
    dataType: "json",
    contentType: "application/json",
    beforeSend: (request) => {
      request.setRequestHeader("session", session);
      request.setRequestHeader("table", table);
      $('#submitEdit').prop('disabled', true);
      htmlButtonCache=$('#submitEdit').html();
      $('#submitEdit').html(`
        <div class="spinner-border text-success" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      `);
    },
    success: (response) => {
      if (response.status==200) {
        showAlert('#bbaModalFooter', 'success', response.message);
      } else {
        showAlert('#bbaModalFooter', 'danger', response.message);
      }
      $('#submitEdit').html(htmlButtonCache);
      $('#submitEdit').prop('disabled', false);
      $('#bbaModal').on('hidden.bs.modal', () => {
        location.reload();
      });
    },
    error: (error) => {
      console.error(error);
      showAlert('#bbaModalFooter', 'danger', error.responseJSON.message);
      $('#submitEdit').html(htmlButtonCache);
    },
  });
}

/**
 * Deletes data from a table based on the provided title, table name, and id.
 *
 * @param {string} title - The title to be displayed in the modal.
 * @param {string} table - The name of the table.
 * @param {string} id - The id of the data to be deleted.
 * @return {undefined} This function does not return a value.
 */
let deleteData=(title, table, id) => {
  $('#bbaModalTitle').html(title);
  $('#bbaModalBody').empty();
  $('#bbaModalFooter').empty();
  $('#bbaModal').modal('show');
  $('#bbaModalBody').html('Apakah yakin menghapus data ini?');
  $('#bbaModalFooter').html(`
    <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
      Tidak <i class="bx bx-x"></i>
    </button>
    <button id="submitDelete" type="button" class="btn btn-primary" style="float: right;" onclick="submitDelete('${table}', '${id}')">
      Ya <i class="bx bx-trash"></i>
    </button>
  `);
}

/**
 * Submits a delete request to the API.
 *
 * @param {string} table - The name of the table.
 * @param {number} id - The ID of the record to delete.
 * @return {undefined} No return value.
 */
let submitDelete=(table, id) => {
  let htmlButtonCache;

  $.ajax({
    url: baseUrl+"/api/delete/"+id,
    type: "DELETE",
    beforeSend: (request) => {
      request.setRequestHeader("session", session);
      request.setRequestHeader("table", table);
      $('#submitDelete').prop('disabled', true);
      htmlButtonCache=$('#submitDelete').html();
      $('#submitDelete').html(`
        <div class="spinner-border text-success" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      `);
    },
    success: (response) => {
      if (response.status==200) {
        showAlert('#bbaModalFooter', 'success', response.message);
      } else {
        showAlert('#bbaModalFooter', 'danger', response.message);
      }
      $('#submitDelete').html(htmlButtonCache);
      $('#submitDelete').prop('disabled', false);
      $('#bbaModal').on('hidden.bs.modal', () => {
        location.reload();
      });
    },
    error: (error) => {
      console.error(error);
      showAlert('#bbaModalFooter', 'danger', error.responseJSON.message);
      $('#submitDelete').html(htmlButtonCache);
    },
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
      return `
        <button class="btn btn-sm btn-primary" onclick="showData('Detail User', 'users', '${data}', false)"><i class='bx bx-info-circle'></i></button>
        <button class="btn btn-sm btn-warning" onclick="showData('Edit User', 'users', '${data}', true)"><i class='bx bx-edit'></i></button>
        <button class="btn btn-sm btn-danger" onclick="deleteData('Hapus User', 'users', '${data}')"><i class="bx bx-trash"></i></button>
      `;
    }
  },
]);

// manageShipName
readData('#shipName', 'shipname', [
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
      return `
        <button class="btn btn-sm btn-primary" onclick="showData('Detail Nama Kapal', 'shipname', '${data}', false)"><i class='bx bx-info-circle'></i></button>
        <button class="btn btn-sm btn-warning" onclick="showData('Edit Nama Kapal', 'shipname', '${data}', true)"><i class='bx bx-edit'></i></button>
        <button class="btn btn-sm btn-danger" onclick="deleteData('Hapus Nama Kapal', 'shipname', '${data}')"><i class="bx bx-trash"></i></button>
      `;
    }
  },
]);

// manageShipType
readData('#shipType', 'shiptype', [
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
      return `
        <button class="btn btn-sm btn-primary" onclick="showData('Detail Tipe Kapal', 'shiptype', '${data}', false)"><i class='bx bx-info-circle'></i></button>
        <button class="btn btn-sm btn-warning" onclick="showData('Edit Tipe Kapal', 'shiptype', '${data}', true)"><i class='bx bx-edit'></i></button>
        <button class="btn btn-sm btn-danger" onclick="deleteData('Hapus Tipe Kapal', 'shiptype', '${data}')"><i class="bx bx-trash"></i></button>
      `;
    }
  },
]);

// manageShipOwner
readData('#shipOwner', 'shipowner', [
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
      return `
        <button class="btn btn-sm btn-primary" onclick="showData('Detail Pemilik Kapal', 'shipowner', '${data}', false)"><i class='bx bx-info-circle'></i></button>
        <button class="btn btn-sm btn-warning" onclick="showData('Edit Pemilik Kapal', 'shipowner', '${data}', true)"><i class='bx bx-edit'></i></button>
        <button class="btn btn-sm btn-danger" onclick="deleteData('Hapus Pemilik Kapal', 'shipowner', '${data}')"><i class="bx bx-trash"></i></button>
      `;
    }
  },
]);

// manageBranch
readData('#branch', 'branch', [
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
      return `
        <button class="btn btn-sm btn-primary" onclick="showData('Detail Cabang', 'branch', '${data}', false)"><i class='bx bx-info-circle'></i></button>
        <button class="btn btn-sm btn-warning" onclick="showData('Edit Cabang', 'branch', '${data}', true)"><i class='bx bx-edit'></i></button>
        <button class="btn btn-sm btn-danger" onclick="deleteData('Hapus Cabang', 'branch', '${data}')"><i class="bx bx-trash"></i></button>
      `;
    }
  },
]);

// manageShipData
readData('#ships', 'ship', [

]);

// manageShipReceivableData
readData('#shipReceivable', 'ship', [

]);