import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as RNP from "react-native-paper";
import axios from "axios";
import { Provider as PaperProvider } from "react-native-paper";
import { useAppTheme } from "./theme";
import * as Linking from "expo-linking";

export default function Main() {
  const [isNotifyOn, setIsNotifyOn] = useState(false);
  const [isVisibleSnack, setIsVisibleSnack] = useState(false);
  const [currentSchedule, setCurrentSchedule] = useState([]);
  const [dateToShow, setDateToShow] = useState("today");
  const theme = useAppTheme();

  const toggleNotifications = () => {
    setIsNotifyOn(!isNotifyOn);
    setIsVisibleSnack(true);
  };

  const onBookPress = () => {
    Linking.openURL(
      "https://app.rockgympro.com/b/widget/?a=offering&offering_guid=1c7052e4cd1c44469569ef7fea299ddd&widget_guid=2224a8b95d0e4ca7bf20012ec34b8f3e&random=63cf60713e8cf&iframeid=&mode=p"
    );
  };

  const onDismissSnackBar = () => setIsVisibleSnack(false);

  function parseAvailability(str) {
    const regex =
      /<td class='offering-page-schedule-list-time-column'>\n(.*?) to\s+(.*?)\n<\/td>\n<td>\n<strong>Availability<\/strong><br>(.*?)\n<\/td>/g;
    let match;
    const availability = [];
    while ((match = regex.exec(str))) {
      availability.push({
        date: match[1] + "-" + match[2],
        availability: match[3],
      });
    }
    return availability;
  }

  function getOvermorrowDate() {
    var today = new Date();
    var overmorrow = new Date(today.getTime() + 2 * 24 * 60 * 60 * 1000);
    var options = { month: "short", day: "numeric" };
    return overmorrow.toLocaleDateString("en-US", options);
  }

  const formattedDate = (date) => {
    const localized = date
      .toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
      .split("/");
    return `${localized[2]}-${localized[0]}-${localized[1]}`;
  };

  useEffect(() => {
    getSchedule(dateToShow);
  }, [dateToShow]);

  const getSchedule = async (parseDate) => {
    let date = formattedDate(new Date());
    if (parseDate === "tomorrow") {
      date = formattedDate(
        new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
      );
    } else if (parseDate === "overmorrow") {
      date = formattedDate(
        new Date(new Date().getTime() + 48 * 60 * 60 * 1000)
      );
    }

    const options = {
      method: "POST",
      headers: {
        Accept: "*/*",
        "Accept-Language": "en-GB,en-US;q=0.9,en;q=0.8",
        Connection: "keep-alive",
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        Origin: "https://app.rockgympro.com",
        Referer:
          "https://app.rockgympro.com/b/widget/?a=offering&offering_guid=1c7052e4cd1c44469569ef7fea299ddd&widget_guid=2224a8b95d0e4ca7bf20012ec34b8f3e&random=63c7488de2194&iframeid=&mode=p",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-origin",
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36",
        "X-Requested-With": "XMLHttpRequest",
        "sec-ch-ua":
          '"Not_A Brand";v="99", "Google Chrome";v="109", "Chromium";v="109"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"macOS"',
      },
      data: `PreventChromeAutocomplete=&widget_guid=2224a8b95d0e4ca7bf20012ec34b8f3e&random=63c74bfb31034&iframeid=&mode=p&fctrl_1=offering_guid&offering_guid=1c7052e4cd1c44469569ef7fea299ddd&fctrl_2=course_guid&course_guid=13e877b67fb3b247cb7c18f2015b08a8a2271830&fctrl_3=limited_to_course_guid_for_offering_guid_1c7052e4cd1c44469569ef7fea299ddd&limited_to_course_guid_for_offering_guid_1c7052e4cd1c44469569ef7fea299ddd=&fctrl_4=show_date&show_date=${date}&ftagname_0_pcount-pid-1-751460=pcount&ftagval_0_pcount-pid-1-751460=1&ftagname_1_pcount-pid-1-751460=pid&ftagval_1_pcount-pid-1-751460=751460&fctrl_5=pcount-pid-1-751460&pcount-pid-1-751460=0&ftagname_0_pcount-pid-1-1190943=pcount&ftagval_0_pcount-pid-1-1190943=1&ftagname_1_pcount-pid-1-1190943=pid&ftagval_1_pcount-pid-1-1190943=1190943&fctrl_6=pcount-pid-1-1190943&pcount-pid-1-1190943=0&ftagname_0_pcount-pid-1-4455667=pcount&ftagval_0_pcount-pid-1-4455667=1&ftagname_1_pcount-pid-1-4455667=pid&ftagval_1_pcount-pid-1-4455667=4455667&fctrl_7=pcount-pid-1-4455667&pcount-pid-1-4455667=0&ftagname_0_pcount-pid-1-4582326=pcount&ftagval_0_pcount-pid-1-4582326=1&ftagname_1_pcount-pid-1-4582326=pid&ftagval_1_pcount-pid-1-4582326=4582326&fctrl_8=pcount-pid-1-4582326&pcount-pid-1-4582326=0`,
    };

    try {
      const response = await axios(
        "https://app.rockgympro.com/b/widget/?a=equery",
        options
      );
      const resp = response.data.event_list_html;
      const resp_array = parseAvailability(resp);
      const result = resp_array.map((item) => {
        item.slot = item.date.split(",")[2].trim();
        item.date =
          item.date.split(",")[0].trim() +
          ", " +
          item.date.split(",")[1].trim();
        if (item.availability.search("Full") > 0) {
          item.availability = "Full";
        }
        return item;
      });
      setCurrentSchedule(result);
    } catch (error) {
      console.error(error);
    }
  };

  const availabilityColorMap = (availability) => {
    switch (availability) {
      case "Full":
        return "red";
      case "Available":
        return "green";
      default:
        return "orange";
    }
  };

  const availabilityIconMap = (availability) => {
    switch (availability) {
      case "Full":
        return "block-helper";
      case "Available":
        return "check-circle";
      default:
        return "alert-circle";
    }
  };

  const onTabChange = (day) => {
    setDateToShow(day);
    onDismissSnackBar();
  };

  console.log(theme);

  return (
    <PaperProvider theme={theme}>
      <SafeAreaProvider>
        <RNP.Appbar.Header
          style={{
            backgroundColor: theme.colors.primary,
          }}
        >
          <RNP.Appbar.Content
            title="Hive Vancouver Availability"
            color="#fff"
          />
          <RNP.Appbar.Action icon="cog" color="#fff" onPress={() => {}} />
        </RNP.Appbar.Header>
        <View style={styles.container}>
          <View style={styles.flex}>
            <RNP.SegmentedButtons
              value={dateToShow}
              onValueChange={onTabChange}
              buttons={[
                {
                  label: "Today",
                  value: "today",
                  icon: dateToShow === "today" ? "reload" : "",
                },
                {
                  label: "Tomorrow",
                  value: "tomorrow",
                  icon: dateToShow === "tomorrow" ? "reload" : "",
                },
                {
                  label: getOvermorrowDate(),
                  value: "overmorrow",
                  icon: dateToShow === "overmorrow" ? "reload" : "",
                },
              ]}
            />
          </View>
          <View style={styles.flex}>
            <RNP.Text style={{ color: theme.colors.primary, paddingLeft: 10 }}>
              Notify me when new spots become available
            </RNP.Text>
            <RNP.Switch
              value={isNotifyOn}
              onValueChange={toggleNotifications}
            />
          </View>
          {currentSchedule?.length > 0 ? (
            <ScrollView>
              <RNP.List.Section>
                {currentSchedule.map((item, index) => {
                  return (
                    <RNP.List.Item
                      style={
                        item.availability === "Full" ? { opacity: 0.5 } : {}
                      }
                      key={index}
                      title={item.slot}
                      description={item.availability}
                      left={(props) => (
                        <RNP.List.Icon
                          {...props}
                          color={availabilityColorMap(item.availability)}
                          icon={availabilityIconMap(item.availability)}
                        />
                      )}
                      // right={(props) =>
                      //   item.availability !== "Full" && (
                      //     <RNP.Button {...props} onPress={onBookPress}>
                      //       Book
                      //     </RNP.Button>
                      //   )
                      // }
                    />
                  );
                })}
              </RNP.List.Section>
            </ScrollView>
          ) : (
            <View style={styles.noResults}>
              <RNP.Text variant="bodyLarge">No availabilities to show</RNP.Text>
            </View>
          )}
          <RNP.Snackbar
            visible={isVisibleSnack}
            onDismiss={onDismissSnackBar}
            action={{
              label: "Undo",
              onPress: () => {
                setIsNotifyOn(!isNotifyOn);
                setIsVisibleSnack(false);
              },
            }}
          >
            <RNP.Text style={styles.light}>
              Notifications for {dateToShow} are {isNotifyOn ? "on" : "off"}
            </RNP.Text>
          </RNP.Snackbar>
          <StatusBar style="auto" />
        </View>
      </SafeAreaProvider>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 20,
  },
  flex: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingLeft: 10,
    paddingRight: 10,
  },
  light: {
    color: "#fff",
  },
  listHeader: {
    alignItems: "center",
  },
  noResults: {
    alignItems: "center",
    padding: 20,
  },
});
