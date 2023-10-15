let baseUrl=localStorage.getItem('baseUrl');
let cardColor, headingColor, axisColor, shadeColor, borderColor;
cardColor=config.colors.white;
headingColor=config.colors.headingColor;
axisColor=config.colors.axisColor;
borderColor=config.colors.borderColor;

let getTodayDate=() => {
  const monthNames=[
    'Januari', 'Februari', 'Maret', 'April',
    'Mei', 'Juni', 'Juli', 'Agustus',
    'September', 'Oktober', 'November', 'Desember'
  ];
  const dayNames=[
    'Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'
  ];
  const today=new Date();
  const day=today.getDate();
  const month=today.getMonth();
  const year=today.getFullYear();
  const dayOfWeek=today.getDay();
  const formattedDate=`${dayNames[dayOfWeek]}, ${day} ${monthNames[month]} ${year}`;
  return formattedDate;
}
$('#todayDate').html(getTodayDate());

$.ajax({
  url: baseUrl+'/api/getMonthlyGrowth',
  type: "GET",
  success: (response) => {
    if (response.status==200) {
      let monthlyGrowth=response.output.filter(m => m.month===new Date().toISOString().slice(0, 7))[0]['growth'];
      $('#monthlyGrowth').html(monthlyGrowth);

      // Growth Chart - Radial Bar Chart
      // --------------------------------------------------------------------
      const growthChartEl=document.querySelector('#growthChart'),
        growthChartOptions={
          series: [monthlyGrowth],
          labels: ['Growth'],
          chart: {
            height: 240,
            type: 'radialBar'
          },
          plotOptions: {
            radialBar: {
              size: 150,
              offsetY: 10,
              startAngle: -150,
              endAngle: 150,
              hollow: {
                size: '55%'
              },
              track: {
                background: cardColor,
                strokeWidth: '100%'
              },
              dataLabels: {
                name: {
                  offsetY: 15,
                  color: headingColor,
                  fontSize: '15px',
                  fontWeight: '600',
                  fontFamily: 'Public Sans'
                },
                value: {
                  offsetY: -25,
                  color: headingColor,
                  fontSize: '22px',
                  fontWeight: '500',
                  fontFamily: 'Public Sans'
                }
              }
            }
          },
          colors: [config.colors.primary],
          fill: {
            type: 'gradient',
            gradient: {
              shade: 'dark',
              shadeIntensity: 0.5,
              gradientToColors: [
                config.colors.primary,
                config.colors.secondary,
                config.colors.success,
                config.colors.info,
                config.colors.warning,
                config.colors.danger
              ],
              inverseColors: true,
              opacityFrom: 1,
              opacityTo: 0.6,
              stops: [30, 70, 100]
            }
          },
          stroke: {
            dashArray: 5
          },
          grid: {
            padding: {
              top: -35,
              bottom: -10
            }
          },
          states: {
            hover: {
              filter: {
                type: 'none'
              }
            },
            active: {
              filter: {
                type: 'none'
              }
            }
          }
        };
      if (typeof growthChartEl!==undefined&&growthChartEl!==null) {
        const growthChart=new ApexCharts(growthChartEl, growthChartOptions);
        growthChart.render();
      }

      // Total Revenue Report Chart - Bar Chart
      // --------------------------------------------------------------------

      let monthlyGraphData=response.output.reduce((result, item) => {
        let [year, month]=item.month.split('-');
        let index=result.findIndex(entry => entry.name===year);

        if (index===-1) {
          let newData=Array(12).fill(0);
          newData[parseInt(month, 10)-1]=parseFloat(item.total);
          result.push({ name: year, data: newData });
        } else {
          result[index].data[parseInt(month, 10)-1]=parseFloat(item.total);
        }

        return result;
      }, []);
      console.log(monthlyGraphData);
      const totalRevenueChartEl=document.querySelector('#montlyGraph'),
        totalRevenueChartOptions={
          series: monthlyGraphData,
          chart: {
            height: 300,
            stacked: true,
            type: 'bar',
            toolbar: { show: false }
          },
          plotOptions: {
            bar: {
              horizontal: false,
              columnWidth: '33%',
              borderRadius: 12,
              startingShape: 'rounded',
              endingShape: 'rounded'
            }
          },
          colors: [
            config.colors.primary,
            config.colors.secondary,
            config.colors.success,
            config.colors.info,
            config.colors.warning,
            config.colors.danger
          ],
          dataLabels: {
            enabled: false
          },
          stroke: {
            curve: 'smooth',
            width: 6,
            lineCap: 'round',
            colors: [cardColor]
          },
          legend: {
            show: true,
            horizontalAlign: 'left',
            position: 'top',
            markers: {
              height: 8,
              width: 8,
              radius: 12,
              offsetX: -3
            },
            labels: {
              colors: axisColor
            },
            itemMargin: {
              horizontal: 10
            }
          },
          grid: {
            borderColor: borderColor,
            padding: {
              top: 0,
              bottom: -8,
              left: 20,
              right: 20
            }
          },
          xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            labels: {
              style: {
                fontSize: '13px',
                colors: axisColor
              }
            },
            axisTicks: {
              show: false
            },
            axisBorder: {
              show: false
            }
          },
          yaxis: {
            labels: {
              style: {
                fontSize: '13px',
                colors: axisColor
              }
            }
          },
          responsive: [
            {
              breakpoint: 1700,
              options: {
                plotOptions: {
                  bar: {
                    borderRadius: 10,
                    columnWidth: '32%'
                  }
                }
              }
            },
            {
              breakpoint: 1580,
              options: {
                plotOptions: {
                  bar: {
                    borderRadius: 10,
                    columnWidth: '35%'
                  }
                }
              }
            },
            {
              breakpoint: 1440,
              options: {
                plotOptions: {
                  bar: {
                    borderRadius: 10,
                    columnWidth: '42%'
                  }
                }
              }
            },
            {
              breakpoint: 1300,
              options: {
                plotOptions: {
                  bar: {
                    borderRadius: 10,
                    columnWidth: '48%'
                  }
                }
              }
            },
            {
              breakpoint: 1200,
              options: {
                plotOptions: {
                  bar: {
                    borderRadius: 10,
                    columnWidth: '40%'
                  }
                }
              }
            },
            {
              breakpoint: 1040,
              options: {
                plotOptions: {
                  bar: {
                    borderRadius: 11,
                    columnWidth: '48%'
                  }
                }
              }
            },
            {
              breakpoint: 991,
              options: {
                plotOptions: {
                  bar: {
                    borderRadius: 10,
                    columnWidth: '30%'
                  }
                }
              }
            },
            {
              breakpoint: 840,
              options: {
                plotOptions: {
                  bar: {
                    borderRadius: 10,
                    columnWidth: '35%'
                  }
                }
              }
            },
            {
              breakpoint: 768,
              options: {
                plotOptions: {
                  bar: {
                    borderRadius: 10,
                    columnWidth: '28%'
                  }
                }
              }
            },
            {
              breakpoint: 640,
              options: {
                plotOptions: {
                  bar: {
                    borderRadius: 10,
                    columnWidth: '32%'
                  }
                }
              }
            },
            {
              breakpoint: 576,
              options: {
                plotOptions: {
                  bar: {
                    borderRadius: 10,
                    columnWidth: '37%'
                  }
                }
              }
            },
            {
              breakpoint: 480,
              options: {
                plotOptions: {
                  bar: {
                    borderRadius: 10,
                    columnWidth: '45%'
                  }
                }
              }
            },
            {
              breakpoint: 420,
              options: {
                plotOptions: {
                  bar: {
                    borderRadius: 10,
                    columnWidth: '52%'
                  }
                }
              }
            },
            {
              breakpoint: 380,
              options: {
                plotOptions: {
                  bar: {
                    borderRadius: 10,
                    columnWidth: '60%'
                  }
                }
              }
            }
          ],
          states: {
            hover: {
              filter: {
                type: 'none'
              }
            },
            active: {
              filter: {
                type: 'none'
              }
            }
          }
        };
      if (typeof totalRevenueChartEl!==undefined&&totalRevenueChartEl!==null) {
        const totalRevenueChart=new ApexCharts(totalRevenueChartEl, totalRevenueChartOptions);
        totalRevenueChart.render();
      }

    } else {
      console.error(response.message);
    }
  },
  error: (error) => {
    console.error(error);
  },
});

// branch statistics
$.ajax({
  url: baseUrl+"/api/getShipBranchDaily",
  type: "GET",
  success: (response) => {
    if (response.status==200) {
      let branch=[];
      let shipTotal=[];
      let shipTotalPercent=[];
      response.output.forEach((r) => {
        branch.push(r.branch);
        shipTotal.push(parseInt(r.total));
      });
      let total=shipTotal.reduce((total, num) => total+num, 0);
      shipTotal.forEach((r) => {
        shipTotalPercent.push(parseInt((r/total)*100));
      });
      $('#totalShipBranch').html(total);

      // all bracnh
      let allBranch='';
      response.output.forEach((r) => {
        allBranch+=`
          <li class="d-flex mb-4 pb-1">
            <div class="avatar flex-shrink-0 me-3">
              <span class="avatar-initial rounded bg-label-primary"><i class="bx bxs-ship"></i></span>
            </div>
            <div class="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
              <div class="me-2">
                <h6 class="mb-0">${r.branch}</h6>
              </div>
              <div class="user-progress">
                <small class="fw-semibold">${r.total}</small>
              </div>
            </div>
          </li>  
        `;
      });
      $('#allBranch').html(allBranch);

      const chartOrderStatistics=document.querySelector('#shipBranchDaily'),
        orderChartConfig={
          chart: {
            height: 165,
            width: 130,
            type: 'donut'
          },
          labels: branch,
          series: shipTotalPercent,
          colors: [
            config.colors.primary,
            config.colors.secondary,
            config.colors.success,
            config.colors.info,
            config.colors.warning,
            config.colors.danger
          ],
          stroke: {
            width: 5,
            colors: cardColor
          },
          dataLabels: {
            enabled: false,
            formatter: function (val, opt) {
              return parseInt(val)+'%';
            }
          },
          legend: {
            show: false
          },
          grid: {
            padding: {
              top: 0,
              bottom: 0,
              right: 15
            }
          },
          plotOptions: {
            pie: {
              donut: {
                size: '75%',
                labels: {
                  show: true,
                  value: {
                    fontSize: '1.5rem',
                    fontFamily: 'Public Sans',
                    color: headingColor,
                    offsetY: -15,
                    formatter: function (val) {
                      return parseInt(val)+'%';
                    }
                  },
                  name: {
                    offsetY: 20,
                    fontFamily: 'Public Sans'
                  },
                  total: {
                    show: true,
                    fontSize: '0.8125rem',
                    color: axisColor,
                    label: 'Daily',
                    formatter: function (w) {
                      return '100%';
                    }
                  }
                }
              }
            }
          }
        };
      if (typeof chartOrderStatistics!==undefined&&chartOrderStatistics!==null) {
        const statisticsChart=new ApexCharts(chartOrderStatistics, orderChartConfig);
        statisticsChart.render();
      }
    } else {
      console.error(response.message);
    }
  },
  error: (error) => {
    console.error(error);
  },
});