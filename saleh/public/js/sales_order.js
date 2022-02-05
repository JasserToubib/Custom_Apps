frappe.ui.form.on("Sales Order", {
	setup: function(frm) {
		
		frm.set_query("custom_payment_entry", function() {
			if (!frm.doc.sub_customer){
				return {
					filters: [
						["Payment Entry","party", "=", frm.doc.customer],
						["Payment Entry","unallocated_amount",">=",1000],
						["Payment Entry","payment_type","=","Receive"],
						["Payment Entry","docstatus","!=",2]
					]
				}
			}else{
				return {
                                        filters: [
                                                ["Payment Entry","party", "=", frm.doc.sub_customer],
                                                ["Payment Entry","unallocated_amount",">=",1000],
                                                ["Payment Entry","payment_type","=","Receive"],
                                                ["Payment Entry","docstatus","!=",2]
                                        ]
                                }
			
			}
		});
	}
});
