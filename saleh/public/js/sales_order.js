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
	},
	customer: function(frm){
		frappe.call({
        		'method': 'frappe.client.get_value',
        		'args': {
            		'doctype': 'Customer',
            		'filters': [
                		['Customer', 'name', '=',frm.doc.customer]
            		],
           		'fieldname':'bank_customer'
        		},
        		'callback': function(res){
            			if (res.message.bank_customer == 1){
            				frm.toggle_reqd('custom_payment_entry', res.message.bank_customer === 1);
            				console.log(res.message.bank_customer);
				}
        		}
    		});
	}
});
