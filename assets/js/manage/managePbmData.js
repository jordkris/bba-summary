// managePbmData
readData('#pbmData', 'pbmdata', [
  {
    data: "id",
    render: (data, type, row, meta) => {
      return meta.row+1;
    }
  },
  { data: "shipId" },
  { data: "voyage" },
  { data: "shipTypeId", visible: false },
  { data: "grt", visible: false },
  { data: "activityId", visible: false },
  { data: "cargoQuantity", visible: false },
  { data: "branchId" },
  { data: "totalHours" },
  {
    data: "id",
    render: (data, type, row, meta) => {
      return `
        <button class="btn btn-sm btn-primary" onclick="showData('Detail Data PBM', 'pbmdata', '${data}', false)"><i class='bx bx-info-circle'></i></button>
        <button class="btn btn-sm btn-warning" onclick="showData('Edit Data PBM', 'pbmdata', '${data}', true)"><i class='bx bx-edit'></i></button>
        <button class="btn btn-sm btn-success" onclick="showActivityTime('${data}')"><i class="bx bx-timer"></i></button>
        <button class="btn btn-sm btn-danger" onclick="deleteData('Hapus Data PBM', 'pbmdata', '${data}')"><i class="bx bx-trash"></i></button>
      `;
    }
  },
], [{
  table: 'shipname',
  column: 'name',
  sourceColumn: 'shipId'
}, {
  table: 'shiptype',
  column: 'name',
  sourceColumn: 'shipTypeId'
}, {
  table: 'activity',
  column: 'name',
  sourceColumn: 'activityId'
}, {
  table: 'branch',
  column: 'name',
  sourceColumn: 'branchId'
}], {
  buttons: [
    {
      extend: 'csv',
      text: `<i class="bx bxs-cloud-download"></i> Export to CSV`,
      title: 'Data PBM '+moment().format('YYYY-MM-DD HH.mm'),
      exportOptions: {
        columns: (n => Array.from({ length: n+1 }, (_, i) => i))(8)
      }
    }, {
      extend: 'excel',
      text: `<i class="bx bxs-cloud-download"></i> Export to Excel`,
      title: 'Data PBM '+moment().format('YYYY-MM-DD HH.mm'),
      exportOptions: {
        columns: (n => Array.from({ length: n+1 }, (_, i) => i))(8)
      }
    },
    'colvis'
  ]
});