frappe.ui.form.on('Delivery Note', {
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
                                        frm.add_fetch('customer','custom_customer_mobile','custom_customer_mobile');
                                        console.log(res.message.bank_customer);
                                }
                        }
                });
        },
    sub_customer: function(frm){
		console.log("hello delivery");
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
                                }
                        }
                });
                //frm.add_fetch('sub_customer','custom_customer_mobile','custom_customer_mobile');
     }

});
