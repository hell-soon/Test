export interface Order {
  manager_notice: number;
  fi_child: string;
  address: string;
  phone: string;
  fio_payer: string;
  photo_size: string;
  low_fi_child: string;
  low_fio_payer: string;
  email_payer: string;
  id: string;
  psid: number;
  full_id: number;
  uid: number;
  status: number;
  type: string;
  type_data: string;
  sum: number;
  unload: number;
  closed: number;
  type_pay: string;
  closed_date: number;
  unload_date: string;
  date_receiving: number;
  disbursement_date: number;
  client: string;
  discount: string;
  change_sum: string;
  change_status: string;
  in_work: string;
  in_work_date: string;
  receiving: string;
  receiving_email: string;
  value: string;
  s_group: string;
  ps_type: string;
  ps_status: string;
  c_date: string;
  date: string;
  c_date_pay: string;
  date_pay: string;
}

export interface OrderParams {
  id_orders: string
}
