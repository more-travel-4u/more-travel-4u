import { Text, StyleSheet } from 'react-native';
import { formatTime, formatDate } from './../utils.js';
import { Divider, Modal, Portal } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux'
import { setSeeModal, setModalEvent } from './../store/eventSlice.js';
import ModalMap from "./ModalMap.js";

const MyModal = () => {

  const dispatch = useDispatch();
  const {seeModal: visible, modalEvent: event }= useSelector(state => state.event)

  console.log("I AM EVENT", event)

  const Attendees = ({user}) => {
    console.log(user)
    return (
        <Text key={user.id}>{user.username}</Text>
    )
  }

  return (
    <> 
      {event &&
        <Portal>
          <Modal useNativeDriver={true} visible={visible} onDismiss={() => dispatch(setSeeModal(false))} style={styles.modalContainer}>
            <Text style={{fontSize: 25, fontWeight: 900}}>{event.name}</Text>
            <Divider />
            <Text style={{fontSize: 18}}>Description:</Text>
            <Text>{event.description}</Text>
            <Divider />
            <Text>Date: {formatDate(event.date)}</Text>
            <Text>Start Time: {formatTime(event.start_time)}</Text>
            <Text>End Time: {formatTime(event.end_time)}</Text>
            <Divider />
            <Text style={{fontSize: 18}}>Location:</Text>
            <Text>{event.location}</Text>
            <ModalMap />
            <Text style={{fontSize: 18}}>Attending:</Text>
            {event.users.map((user) => {
              return <Attendees {...{user}}/>
            })}
          </Modal>
        </Portal>
      }
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    // top: 100,
    flex: 1,
    height: 1000,
  },
  item: {
    padding: 10,
    marginVertical: 4,
    marginHorizontal: 16,
    height: 125,
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
    backgroundColor: "white",

  }
});

export default MyModal