// manageBranch
readData('#branch', 'branch', [
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
        <button class="btn btn-sm btn-primary" onclick="showData('Detail Cabang', 'branch', '${data}', false)"><i class='bx bx-info-circle'></i></button>
        <button class="btn btn-sm btn-warning" onclick="showData('Edit Cabang', 'branch', '${data}', true)"><i class='bx bx-edit'></i></button>
        <button class="btn btn-sm btn-danger" onclick="deleteData('Hapus Cabang', 'branch', '${data}')"><i class="bx bx-trash"></i></button>
      `;
    }
  },
]);