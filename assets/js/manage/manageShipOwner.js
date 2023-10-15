// manageShipOwner
readData('#shipOwner', 'shipowner', [
  {
    data: "id",
    render: (data, type, row, meta) => {
      return meta.row+1;
    }
  },
  { data: "name" },
  { data: "pic", visible: false },
  { data: "contact", visible: false },
  {
    data: "id",
    render: (data, type, row, meta) => {
      return `
        <button class="btn btn-sm btn-primary" onclick="showData('Detail Pemilik Kapal', 'shipowner', '${data}', false)"><i class='bx bx-info-circle'></i></button>
        <button class="btn btn-sm btn-warning" onclick="showData('Edit Pemilik Kapal', 'shipowner', '${data}', true)"><i class='bx bx-edit'></i></button>
        <button class="btn btn-sm btn-danger" onclick="deleteData('Hapus Pemilik Kapal', 'shipowner', '${data}')"><i class="bx bx-trash"></i></button>
      `;
    }
  },
]);