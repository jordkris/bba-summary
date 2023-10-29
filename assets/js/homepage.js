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
function randomColor() {
  let characters='0123456789abcdef';
  let randomString='';

  for (let i=0; i<6; i++) {
    let randomIndex=Math.floor(Math.random()*characters.length);
    randomString+=characters.charAt(randomIndex);
  }

  return '#'+randomString;
}

$('#homeModal').on('hidden.bs.modal', function () {
  $('#homeModalTitle').empty();
  $('#homeModalBody').empty();
  $('#homeModalFooter').empty();
});

let chart;
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
          let currentSingleData, percentData, pieceLabel;
          currentSingleData=res.output.reduce((a, b) => a+parseInt(b.count), 0);
          switch (feature) {
            case 'totalShips':
              percentData=round(currentSingleData/parseInt(targets[feature])*100);
              pieceLabel=`${currentSingleData} of ${targets[feature]} Ships`;
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
              pieceLabel=`${Math.round(currentSingleData/60)} of ${targets[feature]} Hours`;
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
              pieceLabel=`${currentSingleData} of ${targets[feature]} Tons`;
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
              pieceLabel=`${Math.round(currentSingleData/60)} of ${targets[feature]} Hours`;
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
              pieceLabel=`${currentSingleData} of ${targets[feature]} Ships`;
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
              pieceLabel=`${Math.round(currentSingleData/60)} of ${targets[feature]} Hours`;
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
          $(`#${feature} > div`).html(percentData+'%');
          $(`#${feature}Percent`).html(pieceLabel);

          $(`#${feature}Detail`).click(() => {
            let branchLabels=[], branchData=[], branchColors=[], branchTooltips, branchTotal;
            $('#homeModal').modal('show');
            switch (feature) {
              case 'totalShips':
                $('#homeModalTitle').html('Number of Ships details');
                res.output.forEach((r) => {
                  branchLabels.push('Cabang '+r.name);
                  branchData.push(parseInt(r.count));
                  branchColors.push(randomColor());
                });
                branchTooltips=(context) => {
                  return ` ${context.parsed} Ships`;
                };
                break;
              case 'wastingTime':
                $('#homeModalTitle').html('Wasting Time details');
                res.output.forEach((r) => {
                  branchLabels.push('Cabang '+r.name);
                  branchData.push(parseInt(r.count));
                  branchColors.push(randomColor());
                });
                branchTooltips=(context) => {
                  return ` ${Math.round(context.parsed/60)} jam (${calculateDiff(moment.duration(context.parsed, 'minutes'))})`;
                };
                break;
              case 'totalTonage':
                $('#homeModalTitle').html('Total Tonnage details');
                res.output.forEach((r) => {
                  branchLabels.push('Cabang '+r.name);
                  branchData.push(parseInt(r.count));
                  branchColors.push(randomColor());
                });
                branchTooltips=(context) => {
                  return ` ${context.parsed} Ton`;
                };
                break;
              case 'loadingRate':
                $('#homeModalTitle').html('Loading / Discharging Rate details');
                res.output.forEach((r) => {
                  branchLabels.push('Cabang '+r.name);
                  branchData.push(parseInt(r.count));
                  branchColors.push(randomColor());
                });
                branchTooltips=(context) => {
                  return ` ${Math.round(context.parsed/60)} jam (${calculateDiff(moment.duration(context.parsed, 'minutes'))})`;
                };
                break;
              case 'totalShipsAssist':
                $('#homeModalTitle').html('Number of Ship\'s Assist details');
                $('#homeModalTitle').html('Total Tonnage details');
                res.output.forEach((r) => {
                  branchLabels.push('Cabang '+r.name);
                  branchData.push(parseInt(r.count));
                  branchColors.push(randomColor());
                });
                branchTooltips=(context) => {
                  return ` ${context.parsed} Ships`;
                };
                break;
              case 'totalAssistTime':
                $('#homeModalTitle').html('Total Assist Time details');
                res.output.forEach((r) => {
                  branchLabels.push('Cabang '+r.name);
                  branchData.push(parseInt(r.count));
                  branchColors.push(randomColor());
                });
                branchTooltips=(context) => {
                  return ` ${Math.round(context.parsed/60)} jam (${calculateDiff(moment.duration(context.parsed, 'minutes'))})`;
                };
                break;
              default:
                break;
            }
            $('#homeModalFooter').html(`
              <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
                Close <i class="bx bx-x"></i>
              </button>
            `);
            $('#homeModalBody').html(`
              <div class="row">
                <div class="col-lg-12" style="width: 80%;margin: 0 auto;">
                  <canvas id="chartDetails"></canvas>
                </div>
                <div class="col-lg-12">
                  <br />
                  <h4 class="text text-primary text-center">${pieceLabel}</h4>
                </div>
              </div>
            `);
            let canvas=$('#chartDetails');
            chart=new Chart(canvas, {
              type: 'pie',
              data: {
                labels: branchLabels,
                datasets: [{
                  data: branchData,
                  backgroundColor: branchColors
                }]
              },
              options: {
                plugins: {
                  tooltip: {
                    callbacks: {
                      label: branchTooltips
                    }
                  }
                }
              }
            });
          });
        } else {
          showAlert('.content-wrapper', 'danger', `(${res.status}) ${res.message}`);
        }
      },
      error: (error) => {
        console.error(error);
      }
    });
  });
})();