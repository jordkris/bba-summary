let session=localStorage.getItem("session");
let baseUrl=localStorage.getItem("baseUrl");
let t=$("#users").DataTable({
	ajax: {
		url: baseUrl+'api/getAll',
		type: "GET",
		beforeSend: (request) => {
			request.setRequestHeader("session", session);
			request.setRequestHeader("table", "users");
		},
		dataSrc: "output",
	},
	columns: [
		{ data: "id" },
		{ data: "name" },
		{ data: "username" },
		{
			data: "roleId",
			render: (data, type, row, meta) => {
				switch (data) {
					case "1":
						return "Admin";
					case "2":
						return "Supervisor";
					case "3":
						return "Employee";
				}
			},
		},
		{ data: "createdDate" },
		{ data: "updatedDate" },
		{
			data: "id",
			render: (data, type, row, meta) => {
				// generate button edit & delete
				return `
					<button class="btn btn-sm btn-warning" onclick="editData('users','${data}')">Edit</button>
					<button class="btn btn-sm btn-danger" onclick="deleteData('users','${data}')">Hapus</button>
				`;
			}
		},
	],
});

let editData=(tableName, id) => {
	$.ajax({
		url: baseUrl+'api/update/'+id,
		method: 'POST',
		beforeSend: (request) => {
			request.setRequestHeader("session", session);
			request.setRequestHeader("table", tableName);
		},
		success: (res) => {
			
		}
	})
}

let deleteData=() => {

}