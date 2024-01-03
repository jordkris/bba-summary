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
    minimumFractionDigits: 0
  };
  return number.toLocaleString('ID', options);
}

// remove dots
let toFloat=(number) => parseFloat(number.replace(/[^0-9]/g, ''));

/**
 * Calculates the time difference between the given duration and the current time.
 *
 * @param {moment.Duration} duration - The duration to calculate the difference from.
 * @return {string} - The time difference in human-readable format.
 */
let calculateDiff=(duration) => {
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
  return intervalTime;
}

/**
 * Generates a function comment for the given function body.
 *
 * @return {undefined} - No return value
 */
let modalFunc=() => {
  // calculate wasting time
  $('#issuedTimeSPB,#finishLoad').change((e) => {
    let startTime=moment($('#finishLoad').val());
    let endTime=moment($('#issuedTimeSPB').val());
    let duration=moment.duration(endTime.diff(startTime));
    let durationAsMinutes=duration.asMinutes();
    $('#wastingTimeNumber').val(durationAsMinutes);
    $('#wastingTime').val(calculateDiff(duration));
  });

  // calculate assist duration
  $('#connectTime,#disconnectTime').change((e) => {
    let startTime=moment($('#connectTime').val());
    let endTime=moment($('#disconnectTime').val());
    let duration=moment.duration(endTime.diff(startTime));
    let durationAsMinutes=duration.asMinutes();
    $('#assistDurationNumber').val(durationAsMinutes);
    $('#assistDuration').val(calculateDiff(duration));
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
      $('#branchId').val('1').trigger('change');
    } if ($('#branchId').val()=='1'&&$('#roleId').val()!='1') {
      $('#branchId').val('').trigger('change');
    }
  });
  $('#branchId').change((e) => {
    if ($('#branchId').val()=='1'&&$('#roleId').val()!='1') {
      $('#roleId').val('1').trigger('change');
    } else if ($('#branchId').val()!='1'&&$('#roleId').val()=='1') {
      $('#roleId').val('').trigger('change');
    }
  });

  // calculate PPN
  $('#agencyFee').keyup((e) => {
    let agencyFee=toFloat($('#agencyFee').val());
    $('#ppn').val(formatCurrency(agencyFee*0.11));
  });

  // calculate Receivable
  $('#totalFDA,#dp,#payment,#pph').keyup((e) => {
    let totalFDA=toFloat($('#totalFDA').val());
    let dp=toFloat($('#dp').val());
    let payment=toFloat($('#payment').val());
    let pph=toFloat($('#pph').val());
    $('#receivable').val(formatCurrency(totalFDA-dp-payment-pph));
  });

  // pointing 3 digits
  $('#totalFDA,#ops,#agencyFee,#ppn,#pph,#dp,#payment,#receivable').keyup((e) => {
    e.target.value=formatCurrency(toFloat(e.target.value));
  });

  // change to select2
  $('.form-select').select2({
    dropdownParent: $("#bbaModal .modal-content")
  });
}

/**
 * Retrieves relation data from the API.
 *
 * @param {string} id - The ID of the data to retrieve.
 * @param {string} table - The table to retrieve the data from.
 * @param {string} column - The column of the data to retrieve.
 * @return {Promise} A promise that resolves with the retrieved data or rejects with an error message.
 */
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
      url: baseUrl+'/api/getAll'+(relationConfig? '?relationConfig='+encodeURI(JSON.stringify(relationConfig)):''),
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
    data=data.filter(d => d.branchId==branchId);
  }
  // if (relationConfig) {
  //   let current=0;
  //   let end=relationConfig.length*Object.keys(data).length;
  //   for (rc of relationConfig) {
  //     for (d of data) {
  //       d[rc.sourceColumn]=await getRelationData(d[rc.sourceColumn], rc.table, rc.column);
  //       current++;
  //       $('#datatableProgress > div').css('width', `${current/end*100}%`);
  //     }
  //   }
  // }
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

let activityTimeTemplate=(id='', start='', stop='') => {
  return `
    <div class="row">
      <div class="col-lg-5">
        <div class="form-floating">
          <input name="start-${id}" type="datetime-local" class="form-control activityTimeInput" aria-describedby="floatingInputHelp" value="${start? start:moment().format('YYYY-MM-DDTHH:mm')}" />
          <label>Jam Start${id? '':' <span class="text text-warning newActivityTime"><i class="bx bxs-star"></i> NEW</span>'}</label>
          <div class="form-text">
            <i class="bx bx-info-circle"></i> Jam Start Loading/Discharging Kapal
          </div>
        </div>
      </div>
      <div class="col-lg-5">
        <div class="form-floating">
          <input name="stop-${id}" type="datetime-local" class="form-control activityTimeInput" aria-describedby="floatingInputHelp" value="${stop? stop:moment().format('YYYY-MM-DDTHH:mm')}" />
          <label>Jam Stop${id? '':' <span class="text text-warning newActivityTime"><i class="bx bxs-star"></i> NEW</span>'}</label>
          <div class="form-text">
            <i class="bx bx-info-circle"></i> Jam Stop Loading/Discharging Kapal
          </div>
        </div>
      </div>
      <div class="col-lg-2">
        <button class="btn btn-sm btn-danger w-100 deleteActivityTime"><i class="bx bx-trash"></i></button>
      </div>
      <div class="dropdown-divider" style="border: 1px solid #000000 !important"></div>
    </div>
  `;
}

let calculateActivityTime=() => {
  let duration=moment.duration(), startTime, stopTime;
  $('.activityTimeInput').each((i, input) => {
    if (i%2==0) {
      startTime=moment(input.value);
    } else {
      stopTime=moment(input.value);
      duration=duration.add(moment.duration(stopTime.diff(startTime)));
    }
  });
  let durationAsMinutes=duration.asMinutes();
  $('#totalHoursNumber').val(durationAsMinutes);
  $('#totalHours').val(calculateDiff(duration));
}

//showActivityTime
let showActivityTime=async (pbmId) => {
  $('#activityTimeModalTitle').html('Kelola Jam Kegiatan');
  $('#activityTimeModal').modal('show');
  $.ajax({
    url: baseUrl+'/api/getById/'+pbmId,
    type: "GET",
    beforeSend: (request) => {
      request.setRequestHeader("session", session);
      request.setRequestHeader("table", 'activitytime');
      request.setRequestHeader("column", 'pbmId');
    },
    success: async (response) => {
      let form='<form id="formActivityTime">';
      if (response.status==200) {
        if (response.output) {
          response.output.forEach((res) => {
            form+=activityTimeTemplate(res.id, res.start, res.stop);
          });
        } else {
          form+=activityTimeTemplate();
        }
      } else {
        showAlert('#activityTimeModalBody', 'warning', `(${response.status}) ${response.message}`);
        form+=activityTimeTemplate();
      }
      form+='</form>';
      $('#activityTimeModalBody').html(form);
      $('.deleteActivityTime').click((e) => {
        let rowToDelete=e.target.parentElement.parentElement;
        if (rowToDelete) {
          rowToDelete.remove();
        }
        calculateActivityTime();
      });
      $('.activityTimeInput').change(() => {
        calculateActivityTime();
      });
      calculateActivityTime();
      let oldData=response.output? JSON.stringify(response.output):JSON.stringify([]);
      localStorage.setItem('oldData', oldData);
      $('#activityTimeModalFooter').html(`
        <div class="form-floating w-100">
          <input id="totalHours" type="text" class="form-control" aria-describedby="floatingInputHelp" readonly />
          <label>Total Jam Kegiatan</label>
          <div class="form-text">
            <i class="bx bx-info-circle"></i> Total jam kegiatan
          </div>
        </div>
        <div class="form-floating w-100">
          <input id="totalHoursNumber" type="text" class="form-control" aria-describedby="floatingInputHelp" readonly />
          <label>Total Jam Kegiatan (Menit)</label>
          <div class="form-text">
            <i class="bx bx-info-circle"></i> Total jam kegiatan dalam menit
          </div>
        </div>
        <button id="addActivityTime" type="button" class="btn btn-primary"><i class="bx bx-plus"></i></button>
        <button id="submitActivityTime" type="button" class="btn btn-success" style="float: right;" onclick="submitActivityTime(${pbmId})">
          Simpan <i class="bx bx-save"></i>
        </button>
      `);
      $('#addActivityTime').click(() => {
        $('#formActivityTime').append(activityTimeTemplate());
        $('.deleteActivityTime').click((e) => {
          let rowToDelete=e.target.parentElement.parentElement;
          if (rowToDelete) {
            rowToDelete.remove();
          }
          calculateActivityTime();
        });
        calculateActivityTime();
        $('.activityTimeInput').change(() => {
          calculateActivityTime();
        });
      });
    }, error: (error) => {
      console.error(error);
      showAlert('#activityTimeModalBody', 'danger', error.responseJSON.message);
    }
  });
}

let submitActivityTime=(pbmId) => {
  new Promise((resolve, reject) => {
    let htmlButtonCache=$('#submitActivityTime').html();
    $('#submitActivityTime').html(`
      <div class="spinner-border text-success" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    `);
    $('#submitActivityTime').prop('disabled', true);
    let table='activitytime';
    try {
      let newData=$("#formActivityTime").serializeArray();
      let oldData=JSON.parse(localStorage.getItem('oldData'));
      // validate new data
      newData.forEach((nd) => {
        if (!nd.value) {
          throw new Error('Start dan Stop tidak boleh kosong!');
        }
      })
      // for updating/deleting old to new data
      let found;
      oldData.forEach((od) => {
        found=false;
        newData.forEach((nd) => {
          let ndNameSplitted=nd.name.split('-');
          if (od.id==ndNameSplitted[1]) {
            found=true;
            let inputData={};
            inputData[ndNameSplitted[0]=='start'? 'start':'stop']=nd.value;
            $.ajax({
              url: baseUrl+"/api/update/"+od.id,
              type: "POST",
              data: JSON.stringify(inputData),
              dataType: "json",
              contentType: "application/json",
              beforeSend: (request) => {
                request.setRequestHeader("session", session);
                request.setRequestHeader("table", table);
              },
              success: (response) => {
                if (response.status!=200) {
                  reject({ htmlButtonCache: htmlButtonCache, message: response.message });
                }
              },
              error: (error) => {
                reject({ htmlButtonCache: htmlButtonCache, message: error });
              },
            });
          }
        });
        // delete activity time
        if (!found) {
          $.ajax({
            url: baseUrl+"/api/delete/"+od.id,
            type: "DELETE",
            beforeSend: (request) => {
              request.setRequestHeader("session", session);
              request.setRequestHeader("table", table);
            },
            success: (response) => {
              if (response.status!=200) {
                reject({ htmlButtonCache: htmlButtonCache, message: response.message });
              }
            },
            error: (error) => {
              reject({ htmlButtonCache: htmlButtonCache, message: error });
            },
          });
        }
      });
      // for adding new data
      let temp={};
      newData.filter(nd => nd.name.split('-')[1]=='').forEach((nd) => {
        if (nd.name.split('-')[0]=='start') {
          temp.start=nd.value;
        } else {
          temp.stop=nd.value;
          $.ajax({
            url: baseUrl+"/api/add",
            type: "POST",
            data: JSON.stringify({
              pbmId: pbmId,
              start: temp.start,
              stop: temp.stop
            }),
            dataType: "json",
            contentType: "application/json",
            beforeSend: (request) => {
              request.setRequestHeader("session", session);
              request.setRequestHeader("table", table);
            },
            success: (response) => {
              if (response.status!=200) {
                reject({ htmlButtonCache: htmlButtonCache, message: response.message });
              }
            },
            error: (error) => {
              reject({ htmlButtonCache: htmlButtonCache, message: error });;
            },
          });
        }
      });
      // update totalHours
      $.ajax({
        url: baseUrl+"/api/update/"+pbmId,
        type: "POST",
        data: JSON.stringify({
          totalHours: $("#totalHours").val(),
          totalHoursNumber: $("#totalHoursNumber").val()
        }),
        dataType: "json",
        contentType: "application/json",
        beforeSend: (request) => {
          request.setRequestHeader("session", session);
          request.setRequestHeader("table", 'pbmdata');
        },
        success: (response) => {
          if (response.status!=200) {
            reject({ htmlButtonCache: htmlButtonCache, message: response.message });
          }
        },
        error: (error) => {
          reject({ htmlButtonCache: htmlButtonCache, message: error });
        },
      });
    } catch (error) {
      reject({ htmlButtonCache: htmlButtonCache, message: error });
    }
    resolve({ htmlButtonCache: htmlButtonCache, message: 'Success' });
  }).then((response) => {
    showAlert('#activityTimeModalFooter', 'success', response.message);
    $('#submitActivityTime').html(response.htmlButtonCache);
    $('#submitActivityTime').prop('disabled', false);
    $('.newActivityTime').remove();
    $('#activityTimeModal').on('hidden.bs.modal', () => {
      location.reload();
    });
  }).catch((response) => {
    console.error(response.message);
    showAlert('#activityTimeModalFooter', 'danger', response.message);
    $('#submitActivityTime').html(response.htmlButtonCache);
    $('#submitActivityTime').prop('disabled', false);
  });;
}

(async () => {
  // auto update target per Month
  let thisMonth=moment().format('YYYY-MM')+'-00';
  await $.ajax({
    url: baseUrl+"/api/getById/"+thisMonth,
    type: "GET",
    beforeSend: (request) => {
      request.setRequestHeader("session", session);
      request.setRequestHeader("table", 'target');
      request.setRequestHeader("column", 'month');
    },
    success: (response) => {
      if (!response.output) {
        $.ajax({
          url: baseUrl+"/api/add",
          type: "POST",
          data: JSON.stringify({
            month: thisMonth,
            totalShips: 0,
            wastingTime: 0,
            totalTonage: 0,
            loadingRate: 0,
            totalShipsAssist: 0,
            totalAssistTime: 0
          }),
          dataType: "json",
          contentType: "application/json",
          beforeSend: (request) => {
            request.setRequestHeader("session", session);
            request.setRequestHeader("table", 'target');
          },
          success: (response) => {
            if (response.status!=200) {
              console.error(response.message);
            }
          },
          error: (error) => {
            console.error(error);
          },
        });
      }
    },
    error: (error) => {
      console.error(error);
    }
  });

  // target
  await $.ajax({
    url: baseUrl+"/api/getById/"+moment().format('YYYY-MM')+'-00',
    type: "GET",
    beforeSend: (request) => {
      request.setRequestHeader("session", session);
      request.setRequestHeader("table", 'target');
      request.setRequestHeader("column", 'month');
    },
    success: (response) => {
      if (response.status==200) {
        for (let key in response.output[0]) {
          $(`input[name="${key}"]`).val(response.output[0][key]);
          if (key=='id') {
            localStorage.setItem('targetId', response.output[0][key]);
          }
        }
      } else {
        console.error(response.message);
      }
    },
    error: (error) => {
      console.error(error.responseJSON.message);
    },
  });

  $('#submitTarget').click(() => {
    let formData=JSON.stringify(
      serializeToJson($("#monthlyTarget").serializeArray())
    );
    $.ajax({
      url: baseUrl+"/api/update/"+localStorage.getItem('targetId'),
      type: "POST",
      data: formData,
      dataType: "json",
      contentType: "application/json",
      beforeSend: (request) => {
        request.setRequestHeader("session", session);
        request.setRequestHeader("table", 'target');
      },
      success: (response) => {
        if (response.status==200) {
          showAlert('#monthlyTarget', 'success', response.message);
          setTimeout(() => {
            location.reload();
          }, 2000);
        } else {
          showAlert('#monthlyTarget', 'danger', response.message);
        }
      },
      error: (error) => {
        showAlert('#monthlyTarget', 'danger', error);
      }
    });
  });
})()