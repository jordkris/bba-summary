// manageTugData
readData('#tugData', 'tugdata', [
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
  { data: "branchId" },
  { data: "connectTime", visible: false },
  { data: "disconnectTime", visible: false },
  { data: "assistDuration", visible: false },
  {
    data: "id",
    render: (data, type, row, meta) => {
      return `
        <button class="btn btn-sm btn-primary" onclick="showData('Detail Data Tug', 'tugdata', '${data}', false)"><i class='bx bx-info-circle'></i></button>
        <button class="btn btn-sm btn-warning" onclick="showData('Edit Data Tug', 'tugdata', '${data}', true)"><i class='bx bx-edit'></i></button>
        <button class="btn btn-sm btn-danger" onclick="deleteData('Hapus Data Tug', 'tugdata', '${data}')"><i class="bx bx-trash"></i></button>
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
      title: 'Data Tug '+moment().format('YYYY-MM-DD HH.mm'),
      exportOptions: {
        columns: (n => Array.from({ length: n+1 }, (_, i) => i))(9)
      }
    }, {
      extend: 'excel',
      text: `<i class="bx bxs-cloud-download"></i> Export to Excel`,
      title: 'Data Tug '+moment().format('YYYY-MM-DD HH.mm'),
      exportOptions: {
        columns: (n => Array.from({ length: n+1 }, (_, i) => i))(9)
      }
    },
    'colvis'
  ]
});