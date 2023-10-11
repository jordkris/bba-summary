let baseUrl = localStorage.getItem("baseUrl");
$("#formAuthentication").submit((e) => {
	e.preventDefault();
	var formData = JSON.stringify(
		serializeToJson($("#formAuthentication").serializeArray())
	);

	$.ajax({
		url: baseUrl + "api/login",
		type: "POST",
		data: formData,
		dataType: "json",
		contentType: "application/json",
		success: (response) => {
			if (response.status == 200) {
				window.location.href = baseUrl + "api/processLogin/" + response.output;
			} else {
				showAlert('danger', response.message);
			}
		},
		error: (error) => {
			console.error(error);
			showAlert('danger', error.responseJSON.message);
		},
	});
});

let serializeToJson = (data) => {
	let newData = {};
	data.forEach((item) => {
		newData[item.name] = item.value;
	});
	return newData;
};

let showAlert = (color, message) => {
	$("#alertsPlaceholder").append(`
	<div class="alert alert-${color} alert-dismissible" role="alert">
		${message}
		<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
	</div>
`);
};
