from erpnext.selling.doctype.sales_order.sales_order import SalesOrder
import frappe
class CustomSalesOrder(SalesOrder):

	def before_save(self):
#		super(SalesOrder, self).before_save()
		frappe.msgprint("test sales order");
		if self.sub_customer:
			cutom_num=frappe.get_all("Customer",fields=["custom_customer_mobile"],filters={"name": self.sub_customer})
			if len(num) >= 1 :
				self.custom_customer_mobile=frappe.get_all("Customer",fields=["custom_customer_mobile"],filters={"name": self.sub_customer})[0].custom_customer_mobile

