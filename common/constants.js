export const facilities = {
  hiveVancouver: "Hive Vancouver: Bouldering",
  hiveHeights: "Hive Heights: Climbing",
  hiveHathaYoga: "Hive NV: Hatha Yoga",
  hiveYinYoga: "Hive NV: Yin Yoga",
  hiveYinMassage: "Hive NV: Yin + Massage",
  hivePowerYoga: "Hive NV: Power Yoga",
  hiveFuncMobility: "Hive NV: Functional Mobility",
  hivePilates: "Hive NV: Hive Pilates",
  hiveFit: "Hive NV: Hive Fit",
};

export const scheduleDays = ["today", "tomorrow", "overmorrow"];

export const facilityColors = {
  [facilities[0]]: "default",
  [facilities[1]]: "blue",
};

export const bookingLinks = {
  [facilities.hiveVancouver]:
    "https://app.rockgympro.com/b/widget/?a=offering&offering_guid=1c7052e4cd1c44469569ef7fea299ddd&widget_guid=2224a8b95d0e4ca7bf20012ec34b8f3e&random=63cf60713e8cf&iframeid=&mode=p",
  [facilities.hiveHeights]:
    "https://app.rockgympro.com/b/widget/?a=offering&offering_guid=c112d8a9eedd430bad088b8e3c48aa18&widget_guid=91c5bcbedbe649dfb8cba1bae36c8d89&random=63d7502211e87&iframeid=&mode=p",
  [facilities.hivePowerYoga]:
    "https://app.rockgympro.com/b/widget/?a=offering&offering_guid=271de7ba581c4aca9907bd0623f3f8c0&widget_guid=b8424ec2fad54a829699e199b6b9abb0&random=63d875b7a1b10&iframeid=&mode=p",
  [facilities.hiveHathaYoga]:
    "https://app.rockgympro.com/b/widget/?a=offering&offering_guid=ca875fd5f94f4050b15e22d0ebaa873e&widget_guid=b8424ec2fad54a829699e199b6b9abb0&random=63d875cb31389&iframeid=&mode=p",
  [facilities.hiveYinYoga]:
    "https://app.rockgympro.com/b/widget/?a=offering&offering_guid=b9d92725eed440dc989df75227da2b72&widget_guid=b8424ec2fad54a829699e199b6b9abb0&random=63d875df116d1&iframeid=&mode=p",
  [facilities.hiveYinMassage]:
    "https://app.rockgympro.com/b/widget/?a=offering&offering_guid=6000fdecca4d4d4bb455402553471a55&widget_guid=b8424ec2fad54a829699e199b6b9abb0&random=63d875f019e1f&iframeid=&mode=p",
  [facilities.hiveFuncMobility]:
    "https://app.rockgympro.com/b/widget/?a=offering&offering_guid=0d5ae422203d4807ab65fa9fe4321afb&widget_guid=b8424ec2fad54a829699e199b6b9abb0&random=63d8759c23ecf&iframeid=&mode=p",
  [facilities.hiveFit]:
    "https://app.rockgympro.com/b/widget/?a=offering&offering_guid=5504094c43384331b08a5db0656f1346&widget_guid=b8424ec2fad54a829699e199b6b9abb0&random=63d875fde9998&iframeid=&mode=p",
  [facilities.hivePilates]:
    "https://app.rockgympro.com/b/widget/?a=offering&offering_guid=3a473e8b25804a69abc1feeac25570a4&widget_guid=b8424ec2fad54a829699e199b6b9abb0&random=63d86f86f2eef&iframeid=&mode=p",
};

export const facilityIcons = {
  [facilities.hiveVancouver]: "carabiner",
  [facilities.hiveHeights]: "carabiner",
  [facilities.hiveHathaYoga]: "meditation",
  [facilities.hiveYinYoga]: "meditation",
  [facilities.hiveYinMassage]: "meditation",
  [facilities.hivePowerYoga]: "yoga",
  [facilities.hiveFuncMobility]: "yoga",
  [facilities.hivePilates]: "yoga",
  [facilities.hiveFit]: "kettlebell",
};

export const getRequestData = (facility, date) => {
  switch (facility) {
    case facilities.hiveVancouver:
      return `PreventChromeAutocomplete=&widget_guid=2224a8b95d0e4ca7bf20012ec34b8f3e&random=63c74bfb31034&iframeid=&mode=p&fctrl_1=offering_guid&offering_guid=1c7052e4cd1c44469569ef7fea299ddd&fctrl_2=course_guid&course_guid=&fctrl_3=limited_to_course_guid_for_offering_guid_1c7052e4cd1c44469569ef7fea299ddd&limited_to_course_guid_for_offering_guid_1c7052e4cd1c44469569ef7fea299ddd=&fctrl_4=show_date&show_date=${date}&ftagname_0_pcount-pid-1-751460=pcount&ftagval_0_pcount-pid-1-751460=1&ftagname_1_pcount-pid-1-751460=pid&ftagval_1_pcount-pid-1-751460=751460&fctrl_5=pcount-pid-1-751460&pcount-pid-1-751460=0&ftagname_0_pcount-pid-1-1190943=pcount&ftagval_0_pcount-pid-1-1190943=1&ftagname_1_pcount-pid-1-1190943=pid&ftagval_1_pcount-pid-1-1190943=1190943&fctrl_6=pcount-pid-1-1190943&pcount-pid-1-1190943=0&ftagname_0_pcount-pid-1-4455667=pcount&ftagval_0_pcount-pid-1-4455667=1&ftagname_1_pcount-pid-1-4455667=pid&ftagval_1_pcount-pid-1-4455667=4455667&fctrl_7=pcount-pid-1-4455667&pcount-pid-1-4455667=0&ftagname_0_pcount-pid-1-4582326=pcount&ftagval_0_pcount-pid-1-4582326=1&ftagname_1_pcount-pid-1-4582326=pid&ftagval_1_pcount-pid-1-4582326=4582326&fctrl_8=pcount-pid-1-4582326&pcount-pid-1-4582326=0`;
    case facilities.hiveHeights:
      return `PreventChromeAutocomplete=&widget_guid=91c5bcbedbe649dfb8cba1bae36c8d89&random=63d7523b94f94&iframeid=&mode=p&fctrl_1=offering_guid&offering_guid=c112d8a9eedd430bad088b8e3c48aa18&fctrl_2=course_guid&course_guid=&fctrl_3=limited_to_course_guid_for_offering_guid_c112d8a9eedd430bad088b8e3c48aa18&limited_to_course_guid_for_offering_guid_c112d8a9eedd430bad088b8e3c48aa18=&fctrl_4=show_date&show_date=${date}&ftagname_0_pcount-pid-1-2525=pcount&ftagval_0_pcount-pid-1-2525=1&ftagname_1_pcount-pid-1-2525=pid&ftagval_1_pcount-pid-1-2525=2525&fctrl_5=pcount-pid-1-2525&pcount-pid-1-2525=0&ftagname_0_pcount-pid-1-2533=pcount&ftagval_0_pcount-pid-1-2533=1&ftagname_1_pcount-pid-1-2533=pid&ftagval_1_pcount-pid-1-2533=2533&fctrl_6=pcount-pid-1-2533&pcount-pid-1-2533=0&ftagname_0_pcount-pid-1-2529=pcount&ftagval_0_pcount-pid-1-2529=1&ftagname_1_pcount-pid-1-2529=pid&ftagval_1_pcount-pid-1-2529=2529&fctrl_7=pcount-pid-1-2529&pcount-pid-1-2529=0&ftagname_0_pcount-pid-1-38063=pcount&ftagval_0_pcount-pid-1-38063=1&ftagname_1_pcount-pid-1-38063=pid&ftagval_1_pcount-pid-1-38063=38063&fctrl_8=pcount-pid-1-38063&pcount-pid-1-38063=0&ftagname_0_pcount-pid-1-2586=pcount&ftagval_0_pcount-pid-1-2586=1&ftagname_1_pcount-pid-1-2586=pid&ftagval_1_pcount-pid-1-2586=2586&fctrl_9=pcount-pid-1-2586&pcount-pid-1-2586=0`;
    case facilities.hivePowerYoga:
      return `PreventChromeAutocomplete=&widget_guid=b8424ec2fad54a829699e199b6b9abb0&random=63d867617cf81&iframeid=&mode=p&fctrl_1=offering_guid&offering_guid=271de7ba581c4aca9907bd0623f3f8c0&fctrl_2=course_guid&course_guid=&fctrl_3=limited_to_course_guid_for_offering_guid_271de7ba581c4aca9907bd0623f3f8c0&limited_to_course_guid_for_offering_guid_271de7ba581c4aca9907bd0623f3f8c0=&fctrl_4=show_date&show_date=${date}&ftagname_0_pcount-pid-1-1307=pcount&ftagval_0_pcount-pid-1-1307=1&ftagname_1_pcount-pid-1-1307=pid&ftagval_1_pcount-pid-1-1307=1307&fctrl_5=pcount-pid-1-1307&pcount-pid-1-1307=0&ftagname_0_pcount-pid-1-66734=pcount&ftagval_0_pcount-pid-1-66734=1&ftagname_1_pcount-pid-1-66734=pid&ftagval_1_pcount-pid-1-66734=66734&fctrl_6=pcount-pid-1-66734&pcount-pid-1-66734=0&ftagname_0_pcount-pid-1-66735=pcount&ftagval_0_pcount-pid-1-66735=1&ftagname_1_pcount-pid-1-66735=pid&ftagval_1_pcount-pid-1-66735=66735&fctrl_7=pcount-pid-1-66735&pcount-pid-1-66735=0&ftagname_0_pcount-pid-1-1969338=pcount&ftagval_0_pcount-pid-1-1969338=1&ftagname_1_pcount-pid-1-1969338=pid&ftagval_1_pcount-pid-1-1969338=1969338&fctrl_8=pcount-pid-1-1969338&pcount-pid-1-1969338=0`;
    case facilities.hiveHathaYoga:
      return `PreventChromeAutocomplete=&widget_guid=b8424ec2fad54a829699e199b6b9abb0&random=63d86ed72fffb&iframeid=&mode=p&fctrl_1=offering_guid&offering_guid=ca875fd5f94f4050b15e22d0ebaa873e&fctrl_2=course_guid&course_guid=&fctrl_3=limited_to_course_guid_for_offering_guid_ca875fd5f94f4050b15e22d0ebaa873e&limited_to_course_guid_for_offering_guid_ca875fd5f94f4050b15e22d0ebaa873e=&fctrl_4=show_date&show_date=${date}&ftagname_0_pcount-pid-1-1307=pcount&ftagval_0_pcount-pid-1-1307=1&ftagname_1_pcount-pid-1-1307=pid&ftagval_1_pcount-pid-1-1307=1307&fctrl_5=pcount-pid-1-1307&pcount-pid-1-1307=0&ftagname_0_pcount-pid-1-66734=pcount&ftagval_0_pcount-pid-1-66734=1&ftagname_1_pcount-pid-1-66734=pid&ftagval_1_pcount-pid-1-66734=66734&fctrl_6=pcount-pid-1-66734&pcount-pid-1-66734=0&ftagname_0_pcount-pid-1-66735=pcount&ftagval_0_pcount-pid-1-66735=1&ftagname_1_pcount-pid-1-66735=pid&ftagval_1_pcount-pid-1-66735=66735&fctrl_7=pcount-pid-1-66735&pcount-pid-1-66735=0&ftagname_0_pcount-pid-1-1969338=pcount&ftagval_0_pcount-pid-1-1969338=1&ftagname_1_pcount-pid-1-1969338=pid&ftagval_1_pcount-pid-1-1969338=1969338&fctrl_8=pcount-pid-1-1969338&pcount-pid-1-1969338=0`;
    case facilities.hiveYinYoga:
      return `PreventChromeAutocomplete=&widget_guid=b8424ec2fad54a829699e199b6b9abb0&random=63d86e9431678&iframeid=&mode=p&fctrl_1=offering_guid&offering_guid=b9d92725eed440dc989df75227da2b72&fctrl_2=course_guid&course_guid=&fctrl_3=limited_to_course_guid_for_offering_guid_b9d92725eed440dc989df75227da2b72&limited_to_course_guid_for_offering_guid_b9d92725eed440dc989df75227da2b72=&fctrl_4=show_date&show_date=${date}&ftagname_0_pcount-pid-1-1307=pcount&ftagval_0_pcount-pid-1-1307=1&ftagname_1_pcount-pid-1-1307=pid&ftagval_1_pcount-pid-1-1307=1307&fctrl_5=pcount-pid-1-1307&pcount-pid-1-1307=0&ftagname_0_pcount-pid-1-66734=pcount&ftagval_0_pcount-pid-1-66734=1&ftagname_1_pcount-pid-1-66734=pid&ftagval_1_pcount-pid-1-66734=66734&fctrl_6=pcount-pid-1-66734&pcount-pid-1-66734=0&ftagname_0_pcount-pid-1-66735=pcount&ftagval_0_pcount-pid-1-66735=1&ftagname_1_pcount-pid-1-66735=pid&ftagval_1_pcount-pid-1-66735=66735&fctrl_7=pcount-pid-1-66735&pcount-pid-1-66735=0&ftagname_0_pcount-pid-1-1969338=pcount&ftagval_0_pcount-pid-1-1969338=1&ftagname_1_pcount-pid-1-1969338=pid&ftagval_1_pcount-pid-1-1969338=1969338&fctrl_8=pcount-pid-1-1969338&pcount-pid-1-1969338=0`;
    case facilities.hiveYinMassage:
      return `PreventChromeAutocomplete=&widget_guid=b8424ec2fad54a829699e199b6b9abb0&random=63d86e5017250&iframeid=&mode=p&fctrl_1=offering_guid&offering_guid=6000fdecca4d4d4bb455402553471a55&fctrl_2=course_guid&course_guid=&fctrl_3=limited_to_course_guid_for_offering_guid_6000fdecca4d4d4bb455402553471a55&limited_to_course_guid_for_offering_guid_6000fdecca4d4d4bb455402553471a55=&fctrl_4=show_date&show_date=${date}&ftagname_0_pcount-pid-1-1307=pcount&ftagval_0_pcount-pid-1-1307=1&ftagname_1_pcount-pid-1-1307=pid&ftagval_1_pcount-pid-1-1307=1307&fctrl_5=pcount-pid-1-1307&pcount-pid-1-1307=0&ftagname_0_pcount-pid-1-66734=pcount&ftagval_0_pcount-pid-1-66734=1&ftagname_1_pcount-pid-1-66734=pid&ftagval_1_pcount-pid-1-66734=66734&fctrl_6=pcount-pid-1-66734&pcount-pid-1-66734=0&ftagname_0_pcount-pid-1-66735=pcount&ftagval_0_pcount-pid-1-66735=1&ftagname_1_pcount-pid-1-66735=pid&ftagval_1_pcount-pid-1-66735=66735&fctrl_7=pcount-pid-1-66735&pcount-pid-1-66735=0&ftagname_0_pcount-pid-1-1969338=pcount&ftagval_0_pcount-pid-1-1969338=1&ftagname_1_pcount-pid-1-1969338=pid&ftagval_1_pcount-pid-1-1969338=1969338&fctrl_8=pcount-pid-1-1969338&pcount-pid-1-1969338=0`;
    case facilities.hiveFuncMobility:
      return `PreventChromeAutocomplete=&widget_guid=b8424ec2fad54a829699e199b6b9abb0&random=63d86defb44a6&iframeid=&mode=p&fctrl_1=offering_guid&offering_guid=0d5ae422203d4807ab65fa9fe4321afb&fctrl_2=course_guid&course_guid=&fctrl_3=limited_to_course_guid_for_offering_guid_0d5ae422203d4807ab65fa9fe4321afb&limited_to_course_guid_for_offering_guid_0d5ae422203d4807ab65fa9fe4321afb=&fctrl_4=show_date&show_date=${date}&ftagname_0_pcount-pid-1-1307=pcount&ftagval_0_pcount-pid-1-1307=1&ftagname_1_pcount-pid-1-1307=pid&ftagval_1_pcount-pid-1-1307=1307&fctrl_5=pcount-pid-1-1307&pcount-pid-1-1307=0&ftagname_0_pcount-pid-1-66734=pcount&ftagval_0_pcount-pid-1-66734=1&ftagname_1_pcount-pid-1-66734=pid&ftagval_1_pcount-pid-1-66734=66734&fctrl_6=pcount-pid-1-66734&pcount-pid-1-66734=0&ftagname_0_pcount-pid-1-66735=pcount&ftagval_0_pcount-pid-1-66735=1&ftagname_1_pcount-pid-1-66735=pid&ftagval_1_pcount-pid-1-66735=66735&fctrl_7=pcount-pid-1-66735&pcount-pid-1-66735=0&ftagname_0_pcount-pid-1-1969338=pcount&ftagval_0_pcount-pid-1-1969338=1&ftagname_1_pcount-pid-1-1969338=pid&ftagval_1_pcount-pid-1-1969338=1969338&fctrl_8=pcount-pid-1-1969338&pcount-pid-1-1969338=0`;
    case facilities.hiveFit:
      return `PreventChromeAutocomplete=&widget_guid=b8424ec2fad54a829699e199b6b9abb0&random=63d86f299aff4&iframeid=&mode=p&fctrl_1=offering_guid&offering_guid=5504094c43384331b08a5db0656f1346&fctrl_2=course_guid&course_guid=&fctrl_3=limited_to_course_guid_for_offering_guid_5504094c43384331b08a5db0656f1346&limited_to_course_guid_for_offering_guid_5504094c43384331b08a5db0656f1346=&fctrl_4=show_date&show_date=${date}&ftagname_0_pcount-pid-1-1307=pcount&ftagval_0_pcount-pid-1-1307=1&ftagname_1_pcount-pid-1-1307=pid&ftagval_1_pcount-pid-1-1307=1307&fctrl_5=pcount-pid-1-1307&pcount-pid-1-1307=0&ftagname_0_pcount-pid-1-66734=pcount&ftagval_0_pcount-pid-1-66734=1&ftagname_1_pcount-pid-1-66734=pid&ftagval_1_pcount-pid-1-66734=66734&fctrl_6=pcount-pid-1-66734&pcount-pid-1-66734=0&ftagname_0_pcount-pid-1-66735=pcount&ftagval_0_pcount-pid-1-66735=1&ftagname_1_pcount-pid-1-66735=pid&ftagval_1_pcount-pid-1-66735=66735&fctrl_7=pcount-pid-1-66735&pcount-pid-1-66735=0&ftagname_0_pcount-pid-1-1969338=pcount&ftagval_0_pcount-pid-1-1969338=1&ftagname_1_pcount-pid-1-1969338=pid&ftagval_1_pcount-pid-1-1969338=1969338&fctrl_8=pcount-pid-1-1969338&pcount-pid-1-1969338=0`;
    case facilities.hivePilates:
      return `PreventChromeAutocomplete=&widget_guid=b8424ec2fad54a829699e199b6b9abb0&random=63d870e27314e&iframeid=&mode=p&fctrl_1=offering_guid&offering_guid=3a473e8b25804a69abc1feeac25570a4&fctrl_2=course_guid&course_guid=&fctrl_3=limited_to_course_guid_for_offering_guid_3a473e8b25804a69abc1feeac25570a4&limited_to_course_guid_for_offering_guid_3a473e8b25804a69abc1feeac25570a4=&fctrl_4=show_date&show_date=${date}&ftagname_0_pcount-pid-1-1307=pcount&ftagval_0_pcount-pid-1-1307=1&ftagname_1_pcount-pid-1-1307=pid&ftagval_1_pcount-pid-1-1307=1307&fctrl_5=pcount-pid-1-1307&pcount-pid-1-1307=0&ftagname_0_pcount-pid-1-66734=pcount&ftagval_0_pcount-pid-1-66734=1&ftagname_1_pcount-pid-1-66734=pid&ftagval_1_pcount-pid-1-66734=66734&fctrl_6=pcount-pid-1-66734&pcount-pid-1-66734=0&ftagname_0_pcount-pid-1-66735=pcount&ftagval_0_pcount-pid-1-66735=1&ftagname_1_pcount-pid-1-66735=pid&ftagval_1_pcount-pid-1-66735=66735&fctrl_7=pcount-pid-1-66735&pcount-pid-1-66735=0&ftagname_0_pcount-pid-1-1969338=pcount&ftagval_0_pcount-pid-1-1969338=1&ftagname_1_pcount-pid-1-1969338=pid&ftagval_1_pcount-pid-1-1969338=1969338&fctrl_8=pcount-pid-1-1969338&pcount-pid-1-1969338=0`;
    default:
      return "";
  }
};
