frappe.ui.form.on('Customer', 'validate',function(frm){
	console.log("hello");
	var regex = /[^0-9]/g;
	if (regex.test(frm.doc.custom_customer_mobile) === true){
		msgprint(__("Customer Mobile: Only numbers are allowed."));
		validated = false;
	}
    }
});
