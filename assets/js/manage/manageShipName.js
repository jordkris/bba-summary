// manageShipName
readData('#shipName', 'shipname', [
  {
    data: "id",
    render: (data, type, row, meta) => {
      return meta.row+1;
    }
  },
  { data: "name" },
  {
    data: "id",
    render: (data, type, row, meta) => {
      return `
        <button class="btn btn-sm btn-primary" onclick="showData('Detail Nama Kapal', 'shipname', '${data}', false)"><i class='bx bx-info-circle'></i></button>
        <button class="btn btn-sm btn-warning" onclick="showData('Edit Nama Kapal', 'shipname', '${data}', true)"><i class='bx bx-edit'></i></button>
        <button class="btn btn-sm btn-danger" onclick="deleteData('Hapus Nama Kapal', 'shipname', '${data}')"><i class="bx bx-trash"></i></button>
      `;
    }
  },
]);