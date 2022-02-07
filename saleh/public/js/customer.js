frappe.ui.form.on('Customer', {
    customer_type: function(frm){
        if (frm.doc.customer_type == "Company") {
            frm.set_df_property('tax_id', 'reqd', 1);
        }else{
            frm.set_df_property('tax_id', 'reqd', 0);
        }
        frm.refresh_field('tax_id');
    },
    onload: function(frm){
        if (frm.doc.customer_type == "Company") {
            frm.set_df_property('tax_id', 'reqd', 1);
        }else{
            frm.set_df_property('tax_id', 'reqd', 0);
        }
        frm.refresh_field('tax_id');
    },
    validate: function(frm){
        console.log("hello");
        var regex = /[^0-9]/g;
        if (regex.test(frm.doc.custom_customer_mobile) === true){
                msgprint(__("Customer Mobile: Only numbers are allowed."));
                validated = false;
        }

    }
});
