let baseUrl=localStorage.getItem('baseUrl');
let round=(num) => {
  return Math.round(num*100)/100
}

let showAlert=(alertDom, color, message) => {
  $(alertDom).append(`
	<div class="alert alert-${color} alert-dismissible" role="alert">
		${message} <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
	</div>
`);
}

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

$('#homeModal').on('hidden.bs.modal', function () {
  $('#homeModalTitle').empty();
  $('#homeModalBody').empty();
  $('#homeModalFooter').empty();
});

(async () => {
  let targets=await new Promise((resolve, reject) => {
    $.ajax({
      url: baseUrl+'/api/getById/'+moment().format('YYYY-MM')+'-00',
      type: "GET",
      beforeSend: (request) => {
        request.setRequestHeader("table", 'target');
        request.setRequestHeader("column", 'month');
      },
      success: (response) => {
        if (response.status==200) {
          resolve(response.output[0]);
        } else {
          reject(res.message);
        }
      },
      error: (error) => {
        reject(error);
      },
    });
  });
  ['totalShips', 'wastingTime', 'totalTonage', 'loadingRate', 'totalShipsAssist', 'totalAssistTime'].forEach((feature) => {
    $.ajax({
      url: baseUrl+'/api/homepage/'+feature,
      type: "GET",
      success: (res) => {
        if (res.status==200) {
          let currentSingleData, percentData;
          currentSingleData=res.output.reduce((a, b) => a+parseInt(b.count), 0);
          switch (feature) {
            case 'totalShips':
              percentData=round(currentSingleData/parseInt(targets[feature])*100);
              if (percentData>0&&percentData<33) {
                $(`#${feature} > div`).addClass('bg-danger');
              } else if (percentData>=33&&percentData<66) {
                $(`#${feature} > div`).addClass('bg-warning');
              } else {
                $(`#${feature} > div`).addClass('bg-success');
              }
              break;
            case 'wastingTime':
              percentData=round(currentSingleData/(parseInt(targets[feature])*60)*100);
              if (percentData>0&&percentData<33) {
                $(`#${feature} > div`).addClass('bg-success');
              } else if (percentData>=33&&percentData<66) {
                $(`#${feature} > div`).addClass('bg-warning');
              } else {
                $(`#${feature} > div`).addClass('bg-danger');
              }
              break;
            case 'totalTonage':
              percentData=round(currentSingleData/parseInt(targets[feature])*100);
              if (percentData>0&&percentData<33) {
                $(`#${feature} > div`).addClass('bg-danger');
              } else if (percentData>=33&&percentData<66) {
                $(`#${feature} > div`).addClass('bg-warning');
              } else {
                $(`#${feature} > div`).addClass('bg-success');
              }
              break;
            case 'loadingRate':
              percentData=round(currentSingleData/(parseInt(targets[feature])*60)*100);
              if (percentData>0&&percentData<33) {
                $(`#${feature} > div`).addClass('bg-success');
              } else if (percentData>=33&&percentData<66) {
                $(`#${feature} > div`).addClass('bg-warning');
              } else {
                $(`#${feature} > div`).addClass('bg-danger');
              }
              break;
            case 'totalShipsAssist':
              percentData=round(currentSingleData/parseInt(targets[feature])*100);
              if (percentData>0&&percentData<33) {
                $(`#${feature} > div`).addClass('bg-danger');
              } else if (percentData>=33&&percentData<66) {
                $(`#${feature} > div`).addClass('bg-warning');
              } else {
                $(`#${feature} > div`).addClass('bg-success');
              }
              break;
            case 'totalAssistTime':
              percentData=round(currentSingleData/(parseInt(targets[feature])*60)*100);
              if (percentData>0&&percentData<33) {
                $(`#${feature} > div`).addClass('bg-success');
              } else if (percentData>=33&&percentData<66) {
                $(`#${feature} > div`).addClass('bg-warning');
              } else {
                $(`#${feature} > div`).addClass('bg-danger');
              }
              break;
            default:
              break;
          }
          $(`#${feature} > div`).css('width', percentData+'%');
          $(`#${feature}Percent`).html(percentData+'%');
          $(`#${feature}Detail`).click(() => {
            $('#homeModal').modal('show');
            let content='';
            switch (feature) {
              case 'totalShips':
                $('#homeModalTitle').html('Number of Ships details');
                content+='<div class="list-group">';
                res.output.forEach((r) => {
                  content+=`
                    <a
                      href="javascript:void(0);"
                      class="list-group-item list-group-item-action flex-column align-items-start"
                    >
                      <div class="d-flex justify-content-between w-100">
                        <h6>Cabang ${r.name}</h6>
                        <p>${r.count} Kapal</p>
                      </div>
                    </a>
                  `;
                });
                content+='</div>';
                break;
              case 'wastingTime':
                $('#homeModalTitle').html('Wasting Time details');
                content+='<div class="list-group">';
                res.output.forEach((r) => {
                  content+=`
                    <a
                      href="javascript:void(0);"
                      class="list-group-item list-group-item-action flex-column align-items-start"
                    >
                      <div class="d-flex justify-content-between w-100">
                        <h6>Cabang ${r.name}</h6>
                        <p>${calculateDiff(moment.duration(r.count, 'minutes'))}</p>
                      </div>
                    </a>
                  `;
                });
                content+='</div>';
                break;
              case 'totalTonage':
                $('#homeModalTitle').html('Total Tonnage details');
                content+='<div class="list-group">';
                res.output.forEach((r) => {
                  content+=`
                    <a
                      href="javascript:void(0);"
                      class="list-group-item list-group-item-action flex-column align-items-start"
                    >
                      <div class="d-flex justify-content-between w-100">
                        <h6>Cabang ${r.name}</h6>
                        <p>${r.count} ton</p>
                      </div>
                    </a>
                  `;
                });
                content+='</div>';
                break;
              case 'loadingRate':
                $('#homeModalTitle').html('Loading / Discharging Rate details');
                content+='<div class="list-group">';
                res.output.forEach((r) => {
                  content+=`
                    <a
                      href="javascript:void(0);"
                      class="list-group-item list-group-item-action flex-column align-items-start"
                    >
                      <div class="d-flex justify-content-between w-100">
                        <h6>Cabang ${r.name}</h6>
                        <p>${calculateDiff(moment.duration(r.count, 'minutes'))}</p>
                      </div>
                    </a>
                  `;
                });
                content+='</div>';
                break;
              case 'totalShipsAssist':
                $('#homeModalTitle').html('Number of Ship\'s Assist details');
                content+='<div class="list-group">';
                res.output.forEach((r) => {
                  content+=`
                    <a
                      href="javascript:void(0);"
                      class="list-group-item list-group-item-action flex-column align-items-start"
                    >
                      <div class="d-flex justify-content-between w-100">
                        <h6>Cabang ${r.name}</h6>
                        <p>${r.count} Kapal</p>
                      </div>
                    </a>
                  `;
                });
                content+='</div>';
                break;
              case 'totalAssistTime':
                $('#homeModalTitle').html('Total Assist Time details');
                content+='<div class="list-group">';
                res.output.forEach((r) => {
                  content+=`
                    <a
                      href="javascript:void(0);"
                      class="list-group-item list-group-item-action flex-column align-items-start"
                    >
                      <div class="d-flex justify-content-between w-100">
                        <h6>Cabang ${r.name}</h6>
                        <p>${calculateDiff(moment.duration(r.count, 'minutes'))}</p>
                      </div>
                    </a>
                  `;
                });
                content+='</div>';
                break;
              default:
                break;
            }
            $('#homeModalFooter').html(`
              <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
                Close <i class="bx bx-x"></i>
              </button>
            `);
            $('#homeModalBody').html(content);
          });
        } else {
          showAlert('#bbaModalBody', 'danger', `(${res.status}) ${res.message}`);
        }
      },
      error: (error) => {
        console.error(error);
      }
    });
  });
})();