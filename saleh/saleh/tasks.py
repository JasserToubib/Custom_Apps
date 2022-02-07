import frappe
from frappe.utils import date_diff
def daily():
	from frappe.utils.background_jobs import enqueue
	enqueue('saleh.tasks.change_sales_order_statues', timeout=2000, queue="long")
def change_sales_order_statues():
	draft_sales_orders = frappe.get_all("Sales Order",fields=["name","creation","customer"],filters={"status":"Draft"})
	for sales_order in draft_sales_orders:
		check_date=date_diff(frappe.utils.nowdate(), sales_order.creation)
		if check_date >= 7:
			check_customer= frappe.get_all("Customer",fields=["bank_customer"],filters={"name":sales_order.customer},limit=1)
			if check_customer[0]["bank_customer"] != 0:
				get_serial_no=frappe.get_all("Sales Order Item",fields=["serial_no"],filters={"parent": sales_order.name,"parenttype": "Sales Order"},order_by= "idx")
				for serial_no in get_serial_no:
					if serial_no.serial_no != None:
						get_reservation_status= frappe.get_all("Serial No",fields=["reservation_status"],filters={"name":serial_no.serial_no})
						if get_reservation_status[0]["reservation_status"] == "Reserved":
							doc=frappe.get_doc("Serial No",serial_no.serial_no)
							doc.reservation_status = "Available"
							doc.save()
							frappe.db.commit()
