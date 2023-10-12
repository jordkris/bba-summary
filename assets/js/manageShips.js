$("#ships").DataTable({
	ajax: {
		url: localStorage.getItem("baseUrl")+'api/getAll',
		type: "GET",
		beforeSend: (request) => {
			request.setRequestHeader("session", localStorage.getItem("session"));
			request.setRequestHeader("table", "shipData");
		},
		dataSrc: "output",
	},
	columns: [
		{ data: "id" },
		{ data: "shipsId" },
		{ data: "shipTypeId" },
		{ data: "flagId" },
		{ data: "grt" },
		{ data: "ownerId" },
		{ data: "activity" },
		{ data: "cargoQuantity" },
		{ data: "branchId" },
		{ data: "eta" },
		{ data: "dockTime" },
		{ data: "finishLoad" },
		{ data: "issuedTimeSPB" },
		{ data: "wastingTime" },
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
	scrollX: true
});