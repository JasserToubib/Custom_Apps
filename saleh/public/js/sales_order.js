frappe.ui.form.on("Sales Order", {
	custom_payment_entry: function(frm){
		frappe.call({
                        'method': 'frappe.client.get_value',
                        'args': {
                        'doctype': 'Sales Order',
                        'filters': [
                                ['Sales Order', 'custom_payment_entry', '=',cur_frm.doc.custom_payment_entry]
                        ],
                        'fieldname':'custom_payment_entry'
                        },
                        'callback': function(res){
                                if (res.message.custom_payment_entry){
					msgprint(__("Payment Entery: This payment entry is already assined with another sales order."));
                			frappe.validated = false;
                                        
                                }
                        }
                });
	},
	sub_customer: function(frm){
		console.log("hello 5")
                frappe.call({
                        'method': 'frappe.client.get_value',
                        'args': {
                        'doctype': 'Customer',
                        'filters': [
                                ['Customer', 'name', '=',frm.doc.sub_customer]
                        ],
                        'fieldname':'custom_customer_mobile'
                        },
                        'callback': function(res){
                                if (res.message.custom_customer_mobile){
                                        frm.set_value("custom_customer_mobile", res.message.custom_customer_mobile || '');
                                        frm.doc.custom_customer_mobile = res.message.custom_customer_mobile;
                                }
                        }
                });
	},
	validate: function(frm){
		frappe.call({
                        'method': 'frappe.client.get_value',
                        'args': {
                        'doctype': 'Sales Order',
                        'filters': [
                                ['Sales Order', 'custom_payment_entry', '=',cur_frm.doc.custom_payment_entry]
                        ],
                        'fieldname':'custom_payment_entry'
                        },
                        'callback': function(res){
                                if (res.message.custom_payment_entry){
                                        msgprint(__("Payment Entery: This payment entry is already assined with another sales order."));
                                        frappe.validated = false;

                                }
                        }
                });
	},
	setup: function(frm) {
		
		frm.set_query("custom_payment_entry", function() {
			if (!frm.doc.sub_customer){
				return {
					filters: [
						["Payment Entry","party", "=", frm.doc.customer],
						["Payment Entry","unallocated_amount",">=",1000],
						["Payment Entry","payment_type","=","Receive"],
						["Payment Entry","status","=","Submitted"],
						["Payment Entry","docstatus","!=",2]
					]
				}
			}else{
				return {
                                        filters: [
                                                ["Payment Entry","party", "=", frm.doc.sub_customer],
                                                ["Payment Entry","unallocated_amount",">=",1000],
						["Payment Entry","status","=","Submitted"],
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
            			if (res.message.bank_customer == 0){
            				frm.toggle_reqd('custom_payment_entry', res.message.bank_customer === 0);
					frm.add_fetch('customer','custom_customer_mobile','custom_customer_mobile');
            				console.log(res.message.bank_customer);
				}
        		}
    		});
	}

});
