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

let createChart=(id, labels, data, tooltipFn) => {
  new Chart($(id), {
    type: 'pie',
    data: {
      labels: labels,
      datasets: [{
        data: data,
        backgroundColor: ['Blue', 'DarkRed']
      }]
    },
    options: {
      plugins: {
        tooltip: {
          callbacks: {
            label: tooltipFn
          }
        }
      }
    }
  });
}

let getAllBranch=async () => {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: baseUrl+"/api/getAll",
      type: "GET",
      beforeSend: (request) => {
        request.setRequestHeader("table", 'branch');
      },
      success: (response) => {
        if (response.status==200) {
          resolve(response.output);
        }
      },
      error: (error) => {
        reject(error.message);
      }
    })
  })
}

let generateChart=(data, targets, branchTarget, feature, unit, tooltipFn, toMinutes=false) => {
  $('#homeModalBody').append('<div id="charts" class="row"></div>');
  data.forEach((d) => {
    branchData=[];
    branchLabels=[];
    branchTarget=targets.filter(t => t.branchId==d.id)[0];
    let achieved=parseInt(d.count);
    let target=toMinutes? parseInt(branchTarget[feature])*60:parseInt(branchTarget[feature]);
    let remaining;
    if (target-achieved>0) {
      remaining=target-achieved
    } else {
      remaining=0
    }
    branchData.push(achieved);
    branchData.push(remaining);
    $('#charts').append(`
      <div class="col-lg-4">
        <div class="row">
          <div class="col-lg-12" style="width: 80%;margin: 0 auto;">
            <canvas id="chart${d.name.replaceAll(' ', '')}"></canvas>
          </div>
          <div class="col-lg-12">
            <br />
            <p class="text text-success text-center">(${toMinutes? Math.round(achieved/60):achieved} of ${toMinutes? Math.round(target/60):target} ${unit})</p>
            <h4 class="text text-primary text-center">${d.name}</h4>
          </div>
          <div class="col-lg-12">
            <div class="dropdown-divider"></div>
          </div>
        </div>
      </div>
    `);
    branchLabels.push('Achieved');
    branchLabels.push('Remaining');
    createChart(`#chart${d.name.replaceAll(' ', '')}`, branchLabels, branchData, tooltipFn);
  });
}

let generateSummaryChart=(id, data, yLabel) => {
  console.log(data, `#${id}Summary`)
  new Chart($(`#${id}Summary`), {
    type: 'bar',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: data
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        tooltip: {
          callbacks: {
            label: (context) => {
              return `${context.parsed.y} ${yLabel}`;
            }
          }
        }
      },
      scales: {
        x: {
          title: {
            display: true,
            text: "Month"
          }
        },
        y: {
          title: {
            display: true,
            text: yLabel
          }
        }
      }
    },
  })
}

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
          resolve(response.output);
        } else {
          reject(res.message);
        }
      },
      error: (error) => {
        reject(error);
      },
    });
  });
  let allBranch=(await getAllBranch()).filter((b) => b.id!=1);
  let allBranchTarget={};
  let currentSingleData, percentData, pieceLabel;
  ['totalShips', 'wastingTime', 'totalTonage', 'loadingRate', 'totalShipsAssist', 'totalAssistTime'].forEach((feature) => {
    $.ajax({
      url: baseUrl+'/api/homepage/'+feature,
      type: "GET",
      success: (res) => {
        if (res.status==200) {
          allBranchTarget[feature]=0;
          targets.forEach((target) => {
            allBranchTarget[feature]+=parseInt(target[feature]);
          });
          currentSingleData=res.output.reduce((a, b) => a+parseInt(b.count), 0);
          switch (feature) {
            case 'totalShips':
              percentData=round(currentSingleData/parseInt(allBranchTarget[feature])*100);
              pieceLabel=`${currentSingleData} of ${allBranchTarget[feature]} Ships`;
              if (percentData>0&&percentData<33) {
                $(`#${feature} > div`).addClass('bg-danger');
              } else if (percentData>=33&&percentData<66) {
                $(`#${feature} > div`).addClass('bg-warning');
              } else {
                $(`#${feature} > div`).addClass('bg-success');
              }
              break;
            case 'wastingTime':
              percentData=round(currentSingleData/(parseInt(allBranchTarget[feature])*60)*100);
              pieceLabel=`${Math.round(currentSingleData/60)} of ${allBranchTarget[feature]} Hours`;
              if (percentData>0&&percentData<33) {
                $(`#${feature} > div`).addClass('bg-success');
              } else if (percentData>=33&&percentData<66) {
                $(`#${feature} > div`).addClass('bg-warning');
              } else {
                $(`#${feature} > div`).addClass('bg-danger');
              }
              break;
            case 'totalTonage':
              percentData=round(currentSingleData/parseInt(allBranchTarget[feature])*100);
              pieceLabel=`${currentSingleData} of ${allBranchTarget[feature]} Tons`;
              if (percentData>0&&percentData<33) {
                $(`#${feature} > div`).addClass('bg-danger');
              } else if (percentData>=33&&percentData<66) {
                $(`#${feature} > div`).addClass('bg-warning');
              } else {
                $(`#${feature} > div`).addClass('bg-success');
              }
              break;
            case 'loadingRate':
              percentData=round(currentSingleData/(parseInt(allBranchTarget[feature])*60)*100);
              pieceLabel=`${Math.round(currentSingleData/60)} of ${allBranchTarget[feature]} Hours`;
              if (percentData>0&&percentData<33) {
                $(`#${feature} > div`).addClass('bg-success');
              } else if (percentData>=33&&percentData<66) {
                $(`#${feature} > div`).addClass('bg-warning');
              } else {
                $(`#${feature} > div`).addClass('bg-danger');
              }
              break;
            case 'totalShipsAssist':
              percentData=round(currentSingleData/parseInt(allBranchTarget[feature])*100);
              pieceLabel=`${currentSingleData} of ${allBranchTarget[feature]} Ships`;
              if (percentData>0&&percentData<33) {
                $(`#${feature} > div`).addClass('bg-danger');
              } else if (percentData>=33&&percentData<66) {
                $(`#${feature} > div`).addClass('bg-warning');
              } else {
                $(`#${feature} > div`).addClass('bg-success');
              }
              break;
            case 'totalAssistTime':
              percentData=round(currentSingleData/(parseInt(allBranchTarget[feature])*60)*100);
              pieceLabel=`${Math.round(currentSingleData/60)} of ${allBranchTarget[feature]} Hours`;
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
          allBranch.forEach((branch) => {
            if (res.output.filter((r) => r.id==branch.id).length==0) {
              res.output.push({
                id: branch.id,
                name: branch.name,
                count: 0
              });
            }
          });
          $(`#${feature}Detail`).click(() => {
            let branchLabels, branchData, branchColors=[], branchTarget;
            $('#homeModal').modal('show');

            switch (feature) {
              case 'totalShips':
                $('#homeModalTitle').html('Number of Ships details');
                generateChart(res.output, targets, branchTarget, feature, 'Ships', (context) => {
                  return `${context.parsed} Ships`;
                });
                break;
              case 'wastingTime':
                $('#homeModalTitle').html('Wasting Time details');
                generateChart(res.output, targets, branchTarget, feature, 'Hours', (context) => {
                  return ` ${Math.round(context.parsed/60)} jam (${calculateDiff(moment.duration(context.parsed, 'minutes'))})`;
                }, true);
                break;
              case 'totalTonage':
                $('#homeModalTitle').html('Total Tonnage details');
                generateChart(res.output, targets, branchTarget, feature, 'Ton', (context) => {
                  return ` ${context.parsed} Tons`;
                });
                break;
              case 'loadingRate':
                $('#homeModalTitle').html('Loading / Discharging Rate details');
                generateChart(res.output, targets, branchTarget, feature, 'Hours', (context) => {
                  return ` ${Math.round(context.parsed/60)} jam (${calculateDiff(moment.duration(context.parsed, 'minutes'))})`;
                }, true);
                break;
              case 'totalShipsAssist':
                $('#homeModalTitle').html('Number of Ship\'s Assist details');
                generateChart(res.output, targets, branchTarget, feature, 'Ships', (context) => {
                  return ` ${context.parsed} Ships`;
                });
                break;
              case 'totalAssistTime':
                $('#homeModalTitle').html('Total Assist Time details');
                generateChart(res.output, targets, branchTarget, feature, 'Hours', (context) => {
                  return ` ${Math.round(context.parsed/60)} jam (${calculateDiff(moment.duration(context.parsed, 'minutes'))})`;
                }, true);
                break;
              default:
                break;
            }
            $('#homeModalFooter').html(`
              <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
                Close <i class="bx bx-x"></i>
              </button>
            `);
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
  ['totalShips', 'totalTonage', 'totalShipsAssist'].forEach((feature) => {
    $.ajax({
      url: baseUrl+'/api/summary/'+feature,
      type: "GET",
      success: (res) => {
        if (res.status==200) {
          let years=[];
          let seriesData=[];
          res.output.forEach((r) => {
            if (!years.includes(r.year)) {
              years.push(r.year);
            }
          });
          let monthData;
          years.forEach((y) => {
            monthData=Array(12).fill(0);
            res.output.filter(r => r.year==y).forEach((r) => {
              if (parseInt(r.monthInt)>0) {
                monthData[parseInt(r.monthInt)-1]=parseFloat(r.count);
              }
            });
            // seriesData.push({
            //   name: y,
            //   data: monthData
            // });
            seriesData.push({
              label: y,
              data: monthData,
              borderColor: '#ffffff',
              backgroundColor: randomColor(),
              borderWidth: 2,
              borderRadius: Number.MAX_VALUE,
              borderSkipped: false,
            });
          });
          switch (feature) {
            case 'totalShips':
              generateSummaryChart(feature, seriesData, 'Ships');
              break;
            case 'totalTonage':
              generateSummaryChart(feature, seriesData, 'Tons');
              break;
            case 'totalShipsAssist':
              generateSummaryChart(feature, seriesData, 'Ships');
              break;
          }
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