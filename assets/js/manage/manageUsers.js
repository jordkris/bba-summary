// manageUsers
readData('#users', 'users', [
  {
    data: "id",
    render: (data, type, row, meta) => {
      return meta.row+1;
    }
  },
  { data: "name" },
  { data: "username", visible: false },
  { data: "roleId", visible: false },
  { data: "branchId", visible: false },
  { data: "createdDate", visible: false },
  { data: "updatedDate", visible: false },
  {
    data: "id",
    render: (data, type, row, meta) => {
      return `
        <button class="btn btn-sm btn-primary" onclick="showData('Detail User', 'users', '${data}', false)"><i class='bx bx-info-circle'></i></button>
        <button class="btn btn-sm btn-warning" onclick="showData('Edit User', 'users', '${data}', true)"><i class='bx bx-edit'></i></button>
        <button class="btn btn-sm btn-danger" onclick="deleteData('Hapus User', 'users', '${data}')"><i class="bx bx-trash"></i></button>
      `;
    }
  },
], [{
  table: 'role',
  column: 'name',
  sourceColumn: 'roleId'
},{
  table: 'branch',
  column: 'name',
  sourceColumn: 'branchId'
}]);