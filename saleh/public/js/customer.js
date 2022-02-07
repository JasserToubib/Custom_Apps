frappe.ui.form.on('Customer', {
    validate: function(frm){
	var regex = /[^0-9]/g;
	if (regex.test(frm.doc.custom_customer_mobile) === true){
		frappe.msgprint(__("Customer Mobile: Only numbers are allowed."));
		frappe.validated = false;
	}
    }
})
