export const facilities = ["Hive Vancouver", "Hive Heights"];
export const scheduleDays = ["today", "tomorrow", "overmorrow"];

export const links = {
  "Hive Vancouver":
    "https://app.rockgympro.com/b/widget/?a=offering&offering_guid=1c7052e4cd1c44469569ef7fea299ddd&widget_guid=2224a8b95d0e4ca7bf20012ec34b8f3e&random=63cf60713e8cf&iframeid=&mode=p",
  "Hive Heights":
    "https://app.rockgympro.com/b/widget/?a=offering&offering_guid=c112d8a9eedd430bad088b8e3c48aa18&widget_guid=91c5bcbedbe649dfb8cba1bae36c8d89&random=63d7502211e87&iframeid=&mode=p",
};

export const getRequestData = (facility, date) => {
  if (facility === "Hive Vancouver") {
    return `PreventChromeAutocomplete=&widget_guid=2224a8b95d0e4ca7bf20012ec34b8f3e&random=63c74bfb31034&iframeid=&mode=p&fctrl_1=offering_guid&offering_guid=1c7052e4cd1c44469569ef7fea299ddd&fctrl_2=course_guid&course_guid=&fctrl_3=limited_to_course_guid_for_offering_guid_1c7052e4cd1c44469569ef7fea299ddd&limited_to_course_guid_for_offering_guid_1c7052e4cd1c44469569ef7fea299ddd=&fctrl_4=show_date&show_date=${date}&ftagname_0_pcount-pid-1-751460=pcount&ftagval_0_pcount-pid-1-751460=1&ftagname_1_pcount-pid-1-751460=pid&ftagval_1_pcount-pid-1-751460=751460&fctrl_5=pcount-pid-1-751460&pcount-pid-1-751460=0&ftagname_0_pcount-pid-1-1190943=pcount&ftagval_0_pcount-pid-1-1190943=1&ftagname_1_pcount-pid-1-1190943=pid&ftagval_1_pcount-pid-1-1190943=1190943&fctrl_6=pcount-pid-1-1190943&pcount-pid-1-1190943=0&ftagname_0_pcount-pid-1-4455667=pcount&ftagval_0_pcount-pid-1-4455667=1&ftagname_1_pcount-pid-1-4455667=pid&ftagval_1_pcount-pid-1-4455667=4455667&fctrl_7=pcount-pid-1-4455667&pcount-pid-1-4455667=0&ftagname_0_pcount-pid-1-4582326=pcount&ftagval_0_pcount-pid-1-4582326=1&ftagname_1_pcount-pid-1-4582326=pid&ftagval_1_pcount-pid-1-4582326=4582326&fctrl_8=pcount-pid-1-4582326&pcount-pid-1-4582326=0`;
  } else {
    return `PreventChromeAutocomplete=&widget_guid=91c5bcbedbe649dfb8cba1bae36c8d89&random=63d7523b94f94&iframeid=&mode=p&fctrl_1=offering_guid&offering_guid=c112d8a9eedd430bad088b8e3c48aa18&fctrl_2=course_guid&course_guid=&fctrl_3=limited_to_course_guid_for_offering_guid_c112d8a9eedd430bad088b8e3c48aa18&limited_to_course_guid_for_offering_guid_c112d8a9eedd430bad088b8e3c48aa18=&fctrl_4=show_date&show_date=${date}&ftagname_0_pcount-pid-1-2525=pcount&ftagval_0_pcount-pid-1-2525=1&ftagname_1_pcount-pid-1-2525=pid&ftagval_1_pcount-pid-1-2525=2525&fctrl_5=pcount-pid-1-2525&pcount-pid-1-2525=0&ftagname_0_pcount-pid-1-2533=pcount&ftagval_0_pcount-pid-1-2533=1&ftagname_1_pcount-pid-1-2533=pid&ftagval_1_pcount-pid-1-2533=2533&fctrl_6=pcount-pid-1-2533&pcount-pid-1-2533=0&ftagname_0_pcount-pid-1-2529=pcount&ftagval_0_pcount-pid-1-2529=1&ftagname_1_pcount-pid-1-2529=pid&ftagval_1_pcount-pid-1-2529=2529&fctrl_7=pcount-pid-1-2529&pcount-pid-1-2529=0&ftagname_0_pcount-pid-1-38063=pcount&ftagval_0_pcount-pid-1-38063=1&ftagname_1_pcount-pid-1-38063=pid&ftagval_1_pcount-pid-1-38063=38063&fctrl_8=pcount-pid-1-38063&pcount-pid-1-38063=0&ftagname_0_pcount-pid-1-2586=pcount&ftagval_0_pcount-pid-1-2586=1&ftagname_1_pcount-pid-1-2586=pid&ftagval_1_pcount-pid-1-2586=2586&fctrl_9=pcount-pid-1-2586&pcount-pid-1-2586=0`;
  }
};
