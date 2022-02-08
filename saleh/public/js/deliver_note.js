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
                frm.add_fetch('sub_customer','custom_customer_mobile','custom_customer_mobile');
     }

});
