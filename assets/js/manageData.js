let session=localStorage.getItem("session");
let baseUrl=localStorage.getItem("baseUrl");
let roleId=localStorage.getItem("roleId");
let branchId=localStorage.getItem("branchId");

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

let formatCurrency=(number) => {
  const options={
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 2,
  };
  return number.toLocaleString('ID', options);
}

// remove dots
let toFloat=(number) => parseFloat(number.replace(/[^0-9]/g, ''));

let modalFunc=() => {
  // calculate wasting time
  $('#issuedTimeSPB,#finishLoad').change((e) => {
    let startTime=moment($('#finishLoad').val());
    let endTime=moment($('#issuedTimeSPB').val());
    let duration=moment.duration(endTime.diff(startTime));
    let durationAsMinutes=duration.asMinutes();
    $('#wastingTimeNumber').val(durationAsMinutes);
    let years=Math.floor(duration.asYears());
    duration.subtract(moment.duration(years, 'years'));
    let months=Math.floor(duration.asMonths());
    duration.subtract(moment.duration(months, 'months'));
    let weeks=Math.floor(duration.asWeeks());
    duration.subtract(moment.duration(weeks, 'weeks'));
    let days=Math.floor(duration.asDays());
    duration.subtract(moment.duration(days, 'days'));
    let hours=Math.floor(duration.asHours());
    duration.subtract(moment.duration(hours, 'hours'));
    let minutes=Math.floor(duration.asMinutes());
    duration.subtract(moment.duration(minutes, 'minutes'));
    let seconds=Math.floor(duration.asSeconds());
    let intervalTime='';
    if (years!=0) {
      intervalTime=`${years} tahun${months==0? '':' '+months+' bulan'}`;
    } else if (months!=0) {
      intervalTime=`${months} bulan${weeks==0? '':' '+weeks+' minggu'}`;
    } else if (weeks!=0) {
      intervalTime=`${weeks} minggu${days==0? '':' '+days+' hari'}`;
    } else if (days!=0) {
      intervalTime=`${days} hari${hours==0? '':' '+hours+' jam'}`;
    } else if (hours!=0) {
      intervalTime=`${hours} jam${minutes==0? '':' '+minutes+' menit'}`;
    } else if (minutes!=0) {
      intervalTime=`${minutes} menit${seconds==0? '':' '+seconds+' detik'}`;
    } else {
      intervalTime=`${seconds} detik`;
    }
    $('#wastingTime').val(intervalTime);
  });

  // set Receivable Alert
  $('#invoiceDeliveryTime').change((e) => {
    let invoiceDeliveryTime=moment($('#invoiceDeliveryTime').val());
    $('#dueDate').val(moment(invoiceDeliveryTime).add(7, 'days').format('YYYY-MM-DDTHH:mm'));
    $('#firstAlert').val(moment(invoiceDeliveryTime).add(9, 'days').format('YYYY-MM-DDTHH:mm'));
    $('#secondAlert').val(moment(invoiceDeliveryTime).add(11, 'days').format('YYYY-MM-DDTHH:mm'));
    $('#thirdAlert').val(moment(invoiceDeliveryTime).add(13, 'days').format('YYYY-MM-DDTHH:mm'));
  });

  // set Admin privileges as All Branch
  $('#roleId').change((e) => {
    if ($('#branchId').val()!='1'&&$('#roleId').val()=='1') {
      $('#branchId').val('1');
    } if ($('#branchId').val()=='1'&&$('#roleId').val()!='1') {
      $('#branchId').val('');
    }
  });
  $('#branchId').change((e) => {
    if ($('#branchId').val()=='1'&&$('#roleId').val()!='1') {
      $('#roleId').val('1');
    } else if ($('#branchId').val()!='1'&&$('#roleId').val()=='1') {
      $('#roleId').val('');
    }
  });

  // calculate PPN
  $('#agencyFee').change((e) => {
    let agencyFee=toFloat($('#agencyFee').val());
    $('#ppn').val(formatCurrency(agencyFee*0.11));
  });

  // calculate Receivable
  $('#totalFDA,#dp,#payment,#pph').change((e) => {
    let totalFDA=toFloat($('#totalFDA').val());
    let dp=toFloat($('#dp').val());
    let payment=toFloat($('#payment').val());
    let pph=toFloat($('#pph').val());
    $('#receivable').val(formatCurrency(totalFDA-dp-payment-pph));
  });

  // pointing 3 digits
  $('#totalFDA,#ops,#agencyFee,#ppn,#pph,#dp,#payment,#receivable').change((e) => {
    e.target.value=formatCurrency(toFloat(e.target.value));
  });

}

let getRelationData=async (id, table, column) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: baseUrl+"/api/getById/"+id,
      type: "GET",
      beforeSend: (request) => {
        request.setRequestHeader("session", session);
        request.setRequestHeader("table", table);
      },
      success: (response) => {
        if (response.status==200) {
          if (table=='flag') {
            response.output[column]=`<span class="fi fi-${id.toLowerCase()}"></span> `+response.output[column];
          }
          resolve(response.output[column]);
        } else {
          reject(response.message);
        }
      },
      error: (error) => {
        reject(error.responseJSON.message);
      },
    });
  });
}

/**
 * Reads data from the API and populates a DataTable with the retrieved data.
 *
 * @param {string} dtDom - The DOM element where the DataTable will be rendered.
 * @param {string} table - The name of the table to fetch data from.
 * @param {object[]} columnsConfig - An array of column configuration objects.
 * @param {object[]|null} relationConfig - An optional array of relation configuration objects.
 * @return {Promise<void>} A promise that resolves when the DataTable is populated.
 */
let readData=async (dtDom, table, columnsConfig, relationConfig=null, exportConfig=null, customFilter=null) => {
  let data=await new Promise((resolve, reject) => {
    $.ajax({
      url: baseUrl+'/api/getAll',
      type: "GET",
      beforeSend: (request) => {
        request.setRequestHeader("session", session);
        request.setRequestHeader("table", table);
      },
      success: (response) => {
        if (response.status==200) {
          resolve(response.output);
        } else {
          reject(response.message);
        }
      },
      error: (error) => {
        reject(error.responseJSON.message);
      },
    });
  });
  if (branchId!='1') {
    console.log(data);
    data=data.filter(d => d.branchId==branchId);
  }
  if (relationConfig) {
    let current=0;
    let end=relationConfig.length*Object.keys(data).length;
    for (rc of relationConfig) {
      for (d of data) {
        $('#datatableProgress > div').css('width', `${current/end*100}%`);
        d[rc.sourceColumn]=await getRelationData(d[rc.sourceColumn], rc.table, rc.column);
        current++;
      }
    }
  }
  $('#datatableProgress > div').css('width', '100%');
  $(dtDom).DataTable({
    dom: `
      <'row'<'col-lg-3'l><'col-lg-6 text-center'B><'col-lg-3'f>>
      <'row'<'col-lg-12't>>
      <'row'<'col-lg-5'i><'col-lg-7'p>>
    `,
    buttons: exportConfig? exportConfig.buttons:['colvis'],
    data: data,
    columns: columnsConfig,
    initComplete: () => {
      $('#datatableProgress').remove();
    }
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
    success: async (response) => {
      if (response.status==200) {
        let form=new FormBuilder(data, response.output, editMode, table);
        $('#bbaModalBody').html(await form.generate());
        modalFunc();
      } else {
        showAlert('#bbaModalBody', 'danger', `(${response.status}) ${response.message}`);
      }
      if (editMode) {
        $('#bbaModalFooter').html(`
          <button id="submitEdit" type="button" class="btn btn-success" style="float: right;" onclick="submitEdit('${table}', '${response.output.id}')">
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
  $('#bbaModalBody').html(await form.generate());
  modalFunc();
  $('#bbaModalFooter').html(`
    <button id="submitAdd" type="button" class="btn btn-success" style="float: right;" onclick="submitAdd('${table}')">
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

/**
 * Publishes ship data for a given ID.
 *
 * @param {number} id - The ID of the ship data to be published.
 * @return {undefined} This function does not return a value.
 */
let publishShipData=(id) => {
  $.ajax({
    url: baseUrl+"/api/update/"+id,
    type: "POST",
    beforeSend: (request) => {
      request.setRequestHeader("session", session);
      request.setRequestHeader("table", 'shipdata');
    },
    data: JSON.stringify({
      isPublished: 1
    }),
    dataType: "json",
    contentType: "application/json",
    success: (response) => {
      if (response.status==200) {
        location.reload();
      } else {
        console.error(response.message);
      }
    },
    error: (error) => {
      console.error(error.responseJSON.message);
    },
  });
}