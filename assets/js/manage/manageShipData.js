// manageShipData
readData('#shipData', 'shipdata', [
  {
    data: "id",
    render: (data, type, row, meta) => {
      return meta.row+1;
    }
  },
  { data: "shipId" },
  { data: "voyage" },
  { data: "shipTypeId", visible: false },
  { data: "flagId" },
  { data: "grt", visible: false },
  { data: "ownerId", visible: false },
  { data: "activityId", visible: false },
  { data: "cargoQuantity", visible: false },
  { data: "branchId" },
  { data: "eta", visible: false },
  { data: "dockTime", visible: false },
  { data: "finishLoad", visible: false },
  { data: "issuedTimeSPB" },
  { data: "wastingTime", visible: false },
  {
    data: "isPublished",
    render: (data, type, row, meta) => {
      return `<span class="badge rounded-pill bg-${data=='0'? 'warning':'success'}">${data=='0'? 'PENDING':'PUBLISHED'}</span>`
    }
  },
  {
    data: "id",
    render: (data, type, row, meta) => {
      let publishedButton='';
      let modifyButton='';
      if (roleId!=3) {
        publishedButton=`
          <button class="btn btn-sm btn-success" onclick="publishShipData('${data}')" ${row.isPublished==1? 'disabled':''}><i class="bx bxs-cloud-upload"></i></button>
        `;
      }
      if (roleId==3&&row['isPublished']==0||roleId!=3) {
        modifyButton=`
          <button class="btn btn-sm btn-warning" onclick="showData('Edit Data Kapal', 'shipdata', '${data}', true)"><i class='bx bx-edit'></i></button>
          <button class="btn btn-sm btn-danger" onclick="deleteData('Hapus Data Kapal', 'shipdata', '${data}')"><i class="bx bx-trash"></i></button>  
        `;
      }
      return `
        <button class="btn btn-sm btn-primary" onclick="showData('Detail Data Kapal', 'shipdata', '${data}', false)"><i class='bx bx-info-circle'></i></button>
      `+modifyButton+publishedButton;
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
  table: 'flag',
  column: 'name',
  sourceColumn: 'flagId'
}, {
  table: 'shipowner',
  column: 'name',
  sourceColumn: 'ownerId'
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
      title: 'Data Kapal '+moment().format('YYYY-MM-DD HH.mm'),
      exportOptions: {
        columns: (n => Array.from({ length: n+1 }, (_, i) => i))(15)
      }
    }, {
      extend: 'excel',
      text: `<i class="bx bxs-cloud-download"></i> Export to Excel`,
      title: 'Data Kapal '+moment().format('YYYY-MM-DD HH.mm'),
      exportOptions: {
        columns: (n => Array.from({ length: n+1 }, (_, i) => i))(15)
      }
    },
    'colvis'
  ]
});