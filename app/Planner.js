// import FloatingAdd from './FloatingAdd.js';
// import FloatingDateChange from './FloatingDateChange.js';
import { useState, useEffect } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { SafeAreaView, View, FlatList, StyleSheet, StatusBar } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedPlannerDate, set_showFAB as setShow } from './../store/eventSlice.js';
import { formatDate } from './../utils.js';
import { Text, Card, Divider, FAB } from 'react-native-paper'


const emojis = [
	'😄','😃','😀','😊','☺','😉','😍','😘','😚','😗','😙','😜','😝','😛','😳','😁','😔','😌','😒','😞','😣','😢','😂','😭','😪','😥','😰','😅','😓','😩','😫','😨','😱','😠','😡','😤','😖','😆','😋','😷','😎','😴','😵','😲','😟','😦','😧','😈','👿','😮','😬','😐','😕','😯','😶','😇','😏','😑','👲','👳','👮','👷','💂','👶','👦','👧','👨','👩','👴','👵','👱','👼','👸','😺','😸','😻','😽','😼','🙀','😿','😹','😾','👹','👺','🙈','🙉','🙊','💀','👽','💩','🔥','✨','🌟','💫','💥','💢','💦','💧','💤','💨','👂','👀','👃','👅','👄','👍','👎','👌','👊','✊','✌','👋','✋','👐','👆','👇','👉','👈','🙌','🙏','☝','👏','💪','🚶','🏃','💃','👫','👪','👬','👭','💏','💑','👯','🙆','🙅','💁','🙋','💆','💇','💅','👰','🙎','🙍','🙇','🎩','👑','👒','👟','👞','👡','👠','👢','👕','👔','👚','👗','🎽','👖','👘','👙','💼','👜','👝','👛','👓','🎀','🌂','💄','💛','💙','💜','💚','❤','💔','💗','💓','💕','💖','💞','💘','💌','💋','💍','💎','👤','👥','💬','👣','💭','🐶','🐺','🐱','🐭','🐹','🐰','🐸','🐯','🐨','🐻','🐷','🐽','🐮','🐗','🐵','🐒','🐴','🐑','🐘','🐼','🐧','🐦','🐤','🐥','🐣','🐔','🐍','🐢','🐛','🐝','🐜','🐞','🐌','🐙','🐚','🐠','🐟','🐬','🐳','🐋','🐄','🐏','🐀','🐃','🐅','🐇','🐉','🐎','🐐','🐓','🐕','🐖','🐁','🐂','🐲','🐡','🐊','🐫','🐪','🐆','🐈','🐩','🐾','💐','🌸','🌷','🍀','🌹','🌻','🌺','🍁','🍃','🍂','🌿','🌾','🍄','🌵','🌴','🌲','🌳','🌰','🌱','🌼','🌐','🌞','🌝','🌚','🌑','🌒','🌓','🌔','🌕','🌖','🌗','🌘','🌜','🌛','🌙','🌍','🌎','🌏','🌋','🌌','🌠','⭐','☀','⛅','☁','⚡','☔','❄','⛄','🌀','🌁','🌈','🌊','🎍','💝','🎎','🎒','🎓','🎏','🎆','🎇','🎐','🎑','🎃','👻','🎅','🎄','🎁','🎋','🎉','🎊','🎈','🎌','🔮','🎥','📷','📹','📼','💿','📀','💽','💾','💻','📱','☎','📞','📟','📠','📡','📺','📻','🔊','🔉','🔈','🔇','🔔','🔕','📢','📣','⏳','⌛','⏰','⌚','🔓','🔒','🔏','🔐','🔑','🔎','💡','🔦','🔆','🔅','🔌','🔋','🔍','🛁','🛀','🚿','🚽','🔧','🔩','🔨','🚪','🚬','💣','🔫','🔪','💊','💉','💰','💴','💵','💷','💶','💳','💸','📲','📧','📥','📤','✉','📩','📨','📯','📫','📪','📬','📭','📮','📦','📝','📄','📃','📑','📊','📈','📉','📜','📋','📅','📆','📇','📁','📂','✂','📌','📎','✒','✏','📏','📐','📕','📗','📘','📙','📓','📔','📒','📚','📖','🔖','📛','🔬','🔭','📰','🎨','🎬','🎤','🎧','🎼','🎵','🎶','🎹','🎻','🎺','🎷','🎸','👾','🎮','🃏','🎴','🀄','🎲','🎯','🏈','🏀','⚽','⚾','🎾','🎱','🏉','🎳','⛳','🚵','🚴','🏁','🏇','🏆','🎿','🏂','🏊','🏄','🎣','☕','🍵','🍶','🍼','🍺','🍻','🍸','🍹','🍷','🍴','🍕','🍔','🍟','🍗','🍖','🍝','🍛','🍤','🍱','🍣','🍥','🍙','🍘','🍚','🍜','🍲','🍢','🍡','🍳','🍞','🍩','🍮','🍦','🍨','🍧','🎂','🍰','🍪','🍫','🍬','🍭','🍯','🍎','🍏','🍊','🍋','🍒','🍇','🍉','🍓','🍑','🍈','🍌','🍐','🍍','🍠','🍆','🍅','🌽','🏠','🏡','🏫','🏢','🏣','🏥','🏦','🏪','🏩','🏨','💒','⛪','🏬','🏤','🌇','🌆','🏯','🏰','⛺','🏭','🗼','🗾','🗻','🌄','🌅','🌃','🗽','🌉','🎠','🎡','⛲','🎢','🚢','⛵','🚤','🚣','⚓','🚀','✈','💺','🚁','🚂','🚊','🚉','🚞','🚆','🚄','🚅','🚈','🚇','🚝','🚋','🚃','🚎','🚌','🚍','🚙','🚘','🚗','🚕','🚖','🚛','🚚','🚨','🚓','🚔','🚒','🚑','🚐','🚲','🚡','🚟','🚠','🚜','💈','🚏','🎫','🚦','🚥','⚠','🚧','🔰','⛽','🏮','🎰','♨','🗿','🎪','🎭','📍','🚩','⬆','⬇','⬅','➡','🔠','🔡','🔤','↗','↖','↘','↙','↔','↕','🔄','◀','▶','🔼','🔽','↩','↪','ℹ','⏪','⏩','⏫','⏬','⤵','⤴','🆗','🔀','🔁','🔂','🆕','🆙','🆒','🆓','🆖','📶','🎦','🈁','🈯','🈳','🈵','🈴','🈲','🉐','🈹','🈺','🈶','🈚','🚻','🚹','🚺','🚼','🚾','🚰','🚮','🅿','♿','🚭','🈷','🈸','🈂','Ⓜ','🛂','🛄','🛅','🛃','🉑','㊙','㊗','🆑','🆘','🆔','🚫','🔞','📵','🚯','🚱','🚳','🚷','🚸','⛔','✳','❇','❎','✅','✴','💟','🆚','📳','📴','🅰','🅱','🆎','🅾','💠','➿','♻','♈','♉','♊','♋','♌','♍','♎','♏','♐','♑','♒','♓','⛎','🔯','🏧','💹','💲','💱','©','®','™','〽','〰','🔝','🔚','🔙','🔛','🔜','❌','⭕','❗','❓','❕','❔','🔃','🕛','🕧','🕐','🕜','🕑','🕝','🕒','🕞','🕓','🕟','🕔','🕠','🕕','🕖','🕗','🕘','🕙','🕚','🕡','🕢','🕣','🕤','🕥','🕦','✖','➕','➖','➗','♠','♥','♣','♦','💮','💯','✔','☑','🔘','🔗','➰','🔱','🔲','🔳','◼','◻','◾','◽','▪','▫','🔺','⬜','⬛','⚫','⚪','🔴','🔵','🔻','🔶','🔷','🔸','🔹'
];
const getEmoji = () => emojis[Math.floor(Math.random() * emojis.length)];
const colors = ['#c1e1ec','#d4ebf2', '#e8f4f8'];
const dayArray = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
const createHourArray = (activeTrip) => {
  const hourArray = [];
  const startDate = new Date(activeTrip.start_date);
  const endDate = new Date(activeTrip.end_date);
  let nowDate = new Date(startDate);
  const eventArray = createEventArray(activeTrip);
  while ( nowDate < endDate ) {
    hourArray.push(nowDate);
    nowDate = new Date(nowDate.getTime() + 3600000)
  }
  const dataArray = hourArray.map((hour, id) => {
    const currHour = hour.getHours();
    const currDay = hour.getDay();
    const currDate = formatDate(hour.toISOString());

    let hasEvent = false;
    const eventOccuring = eventArray.findIndex((event) => {
      if ((hour < new Date(event.start_time))) 
        if (new Date(hour.getTime() + 3600000) > new Date(event.start_time))
          return true
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
    console.log(dataObj)
    return dataObj
  })
  return dataArray;
}

const createEventArray = (activeTrip) => {
  const eventArray = [...activeTrip.events];
  return eventArray;
}

const _renderHour = ({ item }) => {
  const backgroundColor = colors[item.id % 3];
  const emojifi = `${getEmoji()} ${item.dateString}`
  return (
    <Card style={[styles.item, {backgroundColor}]} mode="elevated">
      <Card.Title title={emojifi} titleStyle={styles.title}/>
      {item.event && <Text>{item.event.name}</Text>}
    </Card>
  )
}

export default function Planner({ navigation }) {

  const activeTrip = useSelector(state => state.trip.activeTrip);
  const dispatch = useDispatch();
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    if (activeTrip) {
      dispatch(setSelectedPlannerDate(activeTrip.start_date))
    }
  }, [activeTrip],);

  return (
    <>
      <DatePicker {...{activeTrip}}/>
      <View style={styles.container}>
        <FlatList 
          data = {createHourArray(activeTrip)}
          renderItem = { _renderHour }
          keyExtractor = {hour => hour.id}
          extraData = { selectedId }
        />
      </View>
      <FAB 
        icon="map-plus"
        style={styles.fab}
        onPress={() => navigation.navigate("CreateNewEvent")}
      />
      <FAB 
        icon="calendar-range"
        style={[styles.fab, {right: 80}]}
        onPress={() => {dispatch(setShow(true))}}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    // top: 100,
    flex: 1,
    height: 1000,
  },
  item: {
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    borderWidth: 2,
    borderColor: "#000000",
    borderStyle:"solid",
    height: 200
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
});



















const DatePicker = ({activeTrip}) => {

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
          maximumDate = {new Date(activeTrip.end_date)}
          minimumDate = {new Date(activeTrip.start_date)}
          onChange={onChange}
        />
      )}
    </SafeAreaView>
  );
};