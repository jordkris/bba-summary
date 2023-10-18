// manageShipReceivableData
readData('#shipReceivable', 'shipreceivabledata', [
  {
    data: "id",
    render: (data, type, row, meta) => {
      return meta.row+1;
    }
  },
  { data: "shipId" },
  { data: "voyage" },
  { data: "ownerId" },
  { data: "branchId" },
  { data: "invoiceTime", visible: false },
  {
    data: "invoiceStatusId",
    render: (data, type, row, meta) => {
      return `<span class="badge rounded-pill bg-${data=='BELUM DIKIRIM'? 'warning':'success'}">${data}</span>`
    }
  },
  { data: "invoiceDeliveryTime", visible: false },
  { data: "dueDate", visible: false },
  { data: "firstAlert", visible: false },
  { data: "secondAlert", visible: false },
  { data: "thirdAlert", visible: false },
  {
    data: "id",
    render: (data, type, row, meta) => {
      return `
          <button class="btn btn-sm btn-primary" onclick="showData('Detail Data Piutang Kapal', 'shipreceivabledata', '${data}', false)"><i class='bx bx-info-circle'></i></button>
          <button class="btn btn-sm btn-warning" onclick="showData('Edit Data Piutang Kapal', 'shipreceivabledata', '${data}', true)"><i class='bx bx-edit'></i></button>
          <button class="btn btn-sm btn-danger" onclick="deleteData('Hapus Data Piutang Kapal', 'shipreceivabledata', '${data}')"><i class="bx bx-trash"></i></button>
        `;
    }
  },
], [{
  table: 'shipname',
  column: 'name',
  sourceColumn: 'shipId'
}, {
  table: 'shipowner',
  column: 'name',
  sourceColumn: 'ownerId'
}, {
  table: 'invoicestatus',
  column: 'name',
  sourceColumn: 'invoiceStatusId'
}], {
  buttons: [
    {
      extend: 'csv',
      text: `<i class="bx bxs-cloud-download"></i> Export to CSV`,
      title: 'Data Piutang Kapal '+moment().format('YYYY-MM-DD HH.mm'),
      exportOptions: {
        columns: (n => Array.from({ length: n+1 }, (_, i) => i))(10)
      }
    }, {
      extend: 'excel',
      text: `<i class="bx bxs-cloud-download"></i> Export to Excel`,
      title: 'Data Piutang Kapal '+moment().format('YYYY-MM-DD HH.mm'),
      exportOptions: {
        columns: (n => Array.from({ length: n+1 }, (_, i) => i))(10),
        modifier: {
          page: 'current'
        }
      }
    },
    'colvis'
  ]
});