// import FloatingAdd from './FloatingAdd.js';
// import FloatingDateChange from './FloatingDateChange.js';
import { useState, useEffect } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { SafeAreaView, View, FlatList, StyleSheet, StatusBar, Pressable, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedPlannerDate, set_showFAB as setShow, setSeeModal, setModalEvent } from './../store/eventSlice.js';
import { formatDate, formatTime } from './../utils.js';
import { Text, Card, Divider, FAB, Modal, Portal } from 'react-native-paper'
import MyModal from './Modal.js';



const emojis = [
  '😄', '😃', '😀', '😊', '☺', '😉', '😍', '😘', '😚', '😗', '😙', '😜', '😝', '😛', '😳', '😁', '😔', '😌', '😒', '😞', '😣', '😢', '😂', '😭', '😪', '😥', '😰', '😅', '😓', '😩', '😫', '😨', '😱', '😠', '😡', '😤', '😖', '😆', '😋', '😷', '😎', '😴', '😵', '😲', '😟', '😦', '😧', '😈', '👿', '😮', '😬', '😐', '😕', '😯', '😶', '😇', '😏', '😑', '👲', '👳', '👮', '👷', '💂', '👶', '👦', '👧', '👨', '👩', '👴', '👵', '👱', '👼', '👸', '😺', '😸', '😻', '😽', '😼', '🙀', '😿', '😹', '😾', '👹', '👺', '🙈', '🙉', '🙊', '💀', '👽', '💩', '🔥', '✨', '🌟', '💫', '💥', '💢', '💦', '💧', '💤', '💨', '👂', '👀', '👃', '👅', '👄', '👍', '👎', '👌', '👊', '✊', '✌', '👋', '✋', '👐', '👆', '👇', '👉', '👈', '🙌', '🙏', '☝', '👏', '💪', '🚶', '🏃', '💃', '👫', '👪', '👬', '👭', '💏', '💑', '👯', '🙆', '🙅', '💁', '🙋', '💆', '💇', '💅', '👰', '🙎', '🙍', '🙇', '🎩', '👑', '👒', '👟', '👞', '👡', '👠', '👢', '👕', '👔', '👚', '👗', '🎽', '👖', '👘', '👙', '💼', '👜', '👝', '👛', '👓', '🎀', '🌂', '💄', '💛', '💙', '💜', '💚', '❤', '💔', '💗', '💓', '💕', '💖', '💞', '💘', '💌', '💋', '💍', '💎', '👤', '👥', '💬', '👣', '💭', '🐶', '🐺', '🐱', '🐭', '🐹', '🐰', '🐸', '🐯', '🐨', '🐻', '🐷', '🐽', '🐮', '🐗', '🐵', '🐒', '🐴', '🐑', '🐘', '🐼', '🐧', '🐦', '🐤', '🐥', '🐣', '🐔', '🐍', '🐢', '🐛', '🐝', '🐜', '🐞', '🐌', '🐙', '🐚', '🐠', '🐟', '🐬', '🐳', '🐋', '🐄', '🐏', '🐀', '🐃', '🐅', '🐇', '🐉', '🐎', '🐐', '🐓', '🐕', '🐖', '🐁', '🐂', '🐲', '🐡', '🐊', '🐫', '🐪', '🐆', '🐈', '🐩', '🐾', '💐', '🌸', '🌷', '🍀', '🌹', '🌻', '🌺', '🍁', '🍃', '🍂', '🌿', '🌾', '🍄', '🌵', '🌴', '🌲', '🌳', '🌰', '🌱', '🌼', '🌐', '🌞', '🌝', '🌚', '🌑', '🌒', '🌓', '🌔', '🌕', '🌖', '🌗', '🌘', '🌜', '🌛', '🌙', '🌍', '🌎', '🌏', '🌋', '🌌', '🌠', '⭐', '☀', '⛅', '☁', '⚡', '☔', '❄', '⛄', '🌀', '🌁', '🌈', '🌊', '🎍', '💝', '🎎', '🎒', '🎓', '🎏', '🎆', '🎇', '🎐', '🎑', '🎃', '👻', '🎅', '🎄', '🎁', '🎋', '🎉', '🎊', '🎈', '🎌', '🔮', '🎥', '📷', '📹', '📼', '💿', '📀', '💽', '💾', '💻', '📱', '☎', '📞', '📟', '📠', '📡', '📺', '📻', '🔊', '🔉', '🔈', '🔇', '🔔', '🔕', '📢', '📣', '⏳', '⌛', '⏰', '⌚', '🔓', '🔒', '🔏', '🔐', '🔑', '🔎', '💡', '🔦', '🔆', '🔅', '🔌', '🔋', '🔍', '🛁', '🛀', '🚿', '🚽', '🔧', '🔩', '🔨', '🚪', '🚬', '💣', '🔫', '🔪', '💊', '💉', '💰', '💴', '💵', '💷', '💶', '💳', '💸', '📲', '📧', '📥', '📤', '✉', '📩', '📨', '📯', '📫', '📪', '📬', '📭', '📮', '📦', '📝', '📄', '📃', '📑', '📊', '📈', '📉', '📜', '📋', '📅', '📆', '📇', '📁', '📂', '✂', '📌', '📎', '✒', '✏', '📏', '📐', '📕', '📗', '📘', '📙', '📓', '📔', '📒', '📚', '📖', '🔖', '📛', '🔬', '🔭', '📰', '🎨', '🎬', '🎤', '🎧', '🎼', '🎵', '🎶', '🎹', '🎻', '🎺', '🎷', '🎸', '👾', '🎮', '🃏', '🎴', '🀄', '🎲', '🎯', '🏈', '🏀', '⚽', '⚾', '🎾', '🎱', '🏉', '🎳', '⛳', '🚵', '🚴', '🏁', '🏇', '🏆', '🎿', '🏂', '🏊', '🏄', '🎣', '☕', '🍵', '🍶', '🍼', '🍺', '🍻', '🍸', '🍹', '🍷', '🍴', '🍕', '🍔', '🍟', '🍗', '🍖', '🍝', '🍛', '🍤', '🍱', '🍣', '🍥', '🍙', '🍘', '🍚', '🍜', '🍲', '🍢', '🍡', '🍳', '🍞', '🍩', '🍮', '🍦', '🍨', '🍧', '🎂', '🍰', '🍪', '🍫', '🍬', '🍭', '🍯', '🍎', '🍏', '🍊', '🍋', '🍒', '🍇', '🍉', '🍓', '🍑', '🍈', '🍌', '🍐', '🍍', '🍠', '🍆', '🍅', '🌽', '🏠', '🏡', '🏫', '🏢', '🏣', '🏥', '🏦', '🏪', '🏩', '🏨', '💒', '⛪', '🏬', '🏤', '🌇', '🌆', '🏯', '🏰', '⛺', '🏭', '🗼', '🗾', '🗻', '🌄', '🌅', '🌃', '🗽', '🌉', '🎠', '🎡', '⛲', '🎢', '🚢', '⛵', '🚤', '🚣', '⚓', '🚀', '✈', '💺', '🚁', '🚂', '🚊', '🚉', '🚞', '🚆', '🚄', '🚅', '🚈', '🚇', '🚝', '🚋', '🚃', '🚎', '🚌', '🚍', '🚙', '🚘', '🚗', '🚕', '🚖', '🚛', '🚚', '🚨', '🚓', '🚔', '🚒', '🚑', '🚐', '🚲', '🚡', '🚟', '🚠', '🚜', '💈', '🚏', '🎫', '🚦', '🚥', '⚠', '🚧', '🔰', '⛽', '🏮', '🎰', '♨', '🗿', '🎪', '🎭', '📍', '🚩', '⬆', '⬇', '⬅', '➡', '🔠', '🔡', '🔤', '↗', '↖', '↘', '↙', '↔', '↕', '🔄', '◀', '▶', '🔼', '🔽', '↩', '↪', 'ℹ', '⏪', '⏩', '⏫', '⏬', '⤵', '⤴', '🆗', '🔀', '🔁', '🔂', '🆕', '🆙', '🆒', '🆓', '🆖', '📶', '🎦', '🈁', '🈯', '🈳', '🈵', '🈴', '🈲', '🉐', '🈹', '🈺', '🈶', '🈚', '🚻', '🚹', '🚺', '🚼', '🚾', '🚰', '🚮', '🅿', '♿', '🚭', '🈷', '🈸', '🈂', 'Ⓜ', '🛂', '🛄', '🛅', '🛃', '🉑', '㊙', '㊗', '🆑', '🆘', '🆔', '🚫', '🔞', '📵', '🚯', '🚱', '🚳', '🚷', '🚸', '⛔', '✳', '❇', '❎', '✅', '✴', '💟', '🆚', '📳', '📴', '🅰', '🅱', '🆎', '🅾', '💠', '➿', '♻', '♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓', '⛎', '🔯', '🏧', '💹', '💲', '💱', '©', '®', '™', '〽', '〰', '🔝', '🔚', '🔙', '🔛', '🔜', '❌', '⭕', '❗', '❓', '❕', '❔', '🔃', '🕛', '🕧', '🕐', '🕜', '🕑', '🕝', '🕒', '🕞', '🕓', '🕟', '🕔', '🕠', '🕕', '🕖', '🕗', '🕘', '🕙', '🕚', '🕡', '🕢', '🕣', '🕤', '🕥', '🕦', '✖', '➕', '➖', '➗', '♠', '♥', '♣', '♦', '💮', '💯', '✔', '☑', '🔘', '🔗', '➰', '🔱', '🔲', '🔳', '◼', '◻', '◾', '◽', '▪', '▫', '🔺', '⬜', '⬛', '⚫', '⚪', '🔴', '🔵', '🔻', '🔶', '🔷', '🔸', '🔹'
];
const getEmoji = () => emojis[Math.floor(Math.random() * emojis.length)];
const colors = ['#c1e1ec', '#d4ebf2', '#e8f4f8'];
const dayArray = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
const createHourArray = (activeTrip) => {
  const hourArray = [];
  const startDate = new Date(activeTrip.start_date);
  const endDate = new Date(activeTrip.end_date);
  let nowDate = new Date(startDate);
  const eventArray = createEventArray(activeTrip);
  while (nowDate < endDate) {
    hourArray.push(nowDate);
    nowDate = new Date(nowDate.getTime() + 3600000)
  }
  const dataArray = hourArray.map((hour, id) => {
    const currHour = hour.getHours();
    const currDay = hour.getDay();
    const currDate = formatDate(hour.toISOString());
    let hasEvent = false;
    const eventOccuring = eventArray.findIndex((event) => {
      if ((hour < new Date(event.start_time))) {
        if (new Date(hour.getTime() + 3600000) > new Date(event.start_time))
          return true
      } else if ((hour > new Date(event.start_time)) && (hour < new Date(event.end_time)))
        return true
      else if ((hour > new Date(event.end_time)))
        if (new Date(hour.getTime() - 3600000) < new Date(event.end_time))
          return true;
    })
    if (eventOccuring !== -1) hasEvent = true;

    let hourString = "";
    if (currHour < 12) {
      if (currHour === 0) hourString = `12:00 AM`;
      else hourString = `${currHour}:00 AM`
    }
    else {
      if (currHour === 12) hourString = `${currHour}:00 PM`
      else hourString = `${currHour - 12}:00 PM`
    }
    if (currHour === 0) hourString += `, ${dayArray[currDay]}, ${currDate}`
    const dataObj = {
      dateString: hourString,
      hourObj: hour,
      id,
      event: (hasEvent && eventArray[eventOccuring])
    }
    return dataObj
  })
  return dataArray;
}

const createEventArray = (activeTrip) => {
  const eventArray = [...activeTrip.events];
  return eventArray;
}

export default function Planner({ navigation }) {

  const activeTrip = useSelector(state => state.trip.activeTrip);
  const dispatch = useDispatch();
  const [selectedId, setSelectedId] = useState(null);
  // const [visible, setVisible] = useState(false);

  const _renderHour = ({ item }) => {
    const backgroundColor = colors[item.id % 3];
    const emojifi = `${getEmoji()} ${item.dateString}`

    return (
      <>
        <Card style={[styles.item, { backgroundColor: "#F5F5DA", }]} mode="elevated">
          <Card.Title title={emojifi} titleStyle={styles.title} />
        </Card>
        {item.event &&
          <>
            <Pressable style={styles.eventCard} mode="elevated" onPress={() => {
              dispatch(setSeeModal(true))
              dispatch(setModalEvent(item.event))
            }}>
              <View>
                <Text style={styles.title}>{item.event.name}</Text>
                <Text>{item.event.location}</Text>
              </View>
              <View style={{ top: 30 }}>
                <Text style={{ textAlign: "right" }}>Start: {formatTime(item.event.start_time)}</Text>
                <Text style={{ textAlign: "right" }}>End: {formatTime(item.event.end_time)}</Text>
              </View>
            </Pressable>
          </>
        }
      </>
    )
  }

  useEffect(() => {
    if (activeTrip) {
      dispatch(setSelectedPlannerDate(activeTrip.start_date))
    }
  }, [activeTrip],);

  return (
    <>
      <DatePicker {...{ activeTrip }} />
      <View style={styles.container}>
        <FlatList
          data={createHourArray(activeTrip)}
          renderItem={_renderHour}
          keyExtractor={hour => hour.id}
          extraData={selectedId}
        />
        <MyModal />
      </View>
      <FAB
        icon="map-plus"
        style={styles.fab}
        onPress={() => navigation.navigate("CreateNewEvent")}
      />
      <FAB
        icon="calendar-range"
        style={[styles.fab, { right: 80 }]}
        onPress={() => { dispatch(setShow(true)) }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    // top: 100,
    flex: 1,
    height: 1000,
    backgroundColor: "#CABB80",
  },
  item: {
    padding: 10,
    marginVertical: 4,
    marginHorizontal: 10,
    height: 124,
  },
  title: {
    fontSize: 17,
    fontWeight: 900,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0
  },
  eventCard: {
    marginVertical: 4,
    marginHorizontal: 16,
    left: 50,
    top: 45,
    height: 70,
    width: 300,
    position: "absolute",
    justifyContent: "center",
    border: "solid",
    borderColor: "black",
    borderWidth: 1,
    backgroundColor: "white",
    flexDirection: "row"
  },
  modalContainer: {
    marginTop: 150,
    marginBottom: 150,
    marginLeft: 35,
    marginRight: 35,
    backgroundColor: "#D09786",

  }
});

const DatePicker = ({ activeTrip }) => {

  const dispatch = useDispatch();
  const [date, setDate] = useState(new Date(activeTrip.start_date));
  const show = useSelector(state => state.event._showFAB)
  const mode = useSelector(state => state.event._modeFAB)

  const onChange = (event, selectedDate) => {
    dispatch(setSelectedPlannerDate(selectedDate.toISOString()))
    dispatch(setShow(false));
    setDate(selectedDate);
  };

  return (
    <SafeAreaView>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          maximumDate={new Date(activeTrip.end_date)}
          minimumDate={new Date(activeTrip.start_date)}
          onChange={onChange}
        />
      )}
    </SafeAreaView>
  );
};