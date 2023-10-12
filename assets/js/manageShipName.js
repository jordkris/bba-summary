$("#shipName").DataTable({
	ajax: {
		url: localStorage.getItem("baseUrl")+'api/getAll',
		type: "GET",
		beforeSend: (request) => {
			request.setRequestHeader("session", localStorage.getItem("session"));
			request.setRequestHeader("table", "ship");
		},
		dataSrc: "output",
	},
	columns: [
		{ data: "id" },
		{ data: "name" },
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