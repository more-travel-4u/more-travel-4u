import React, { useState } from "react";
import { View, Text, TextInput, Button, ScrollView, TouchableOpacity, Modal, StyleSheet }
  from "react-native";

// export function Notes() {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Memos!</Text>
//     </View>
//   );
// }

const Memos = () => {

  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const handleSaveNote = () => {
    if (selectedNote) {

      const updatedNotes = notes.map((note) =>
        note.id === selectedNote.id
          ? { ...note, title, content }
          : note
      );
      setNotes(updatedNotes);
      setSelectedNote(null);
    } else {

      const newNote = {
        id: Date.now(),
        title,
        content,
      };
      setNotes([...notes, newNote]);
    }
    setTitle("");
    setContent("");
    setModalVisible(false);
  };

  const handleEditNote = (note) => {
    setSelectedNote(note);
    setTitle(note.title);
    setContent(note.content);
    setModalVisible(true);
  };

  const handleDeleteNote = (note) => {
    const updatedNotes = notes.filter(
      (item) => item.id !== note.id
    );
    setNotes(updatedNotes);
    setSelectedNote(null);
    setModalVisible(false);
  };

  const dateAndTime = new Date().toLocaleString();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shared Notes</Text>
      <Text style={styles.title}>{dateAndTime}</Text>

      <ScrollView style={styles.noteList}>
        {notes.map((note) => (
          <TouchableOpacity
            key={note.id}
            onPress={() => handleEditNote(note)}
          >
            <Text style={styles.noteTitle}>
              {note.title}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => {
          setTitle("");
          setContent("");
          setModalVisible(true);
        }}
      >
        <Text style={styles.addButtonText}>
          Add Note
        </Text>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={false}
      >
        <View style={styles.modalContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter note title"
            placeholderTextColor="#884c5e"
            value={title}
            onChangeText={setTitle}
          />

          <TextInput
            style={styles.contentInput}
            multiline
            placeholder="Enter note content"
            placeholderTextColor="#884c5e"
            value={content}
            onChangeText={setContent}
          />

          <View style={styles.buttonContainer}>
            <Button
              title="Save"
              onPress={handleSaveNote}
              color="#4c8775"
            />
            <Button
              title="Cancel"
              onPress={() =>
                setModalVisible(false)
              }
              color="#6667AB"
            />
            {selectedNote && (
              <Button
                title="Delete"
                onPress={() =>
                  handleDeleteNote(
                    selectedNote
                  )
                }
                color="#E60101"
              />
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 45,
    backgroundColor: "#884c5e",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "sans-serif",
    marginTop: 20,
    marginBottom: 10,
    color: "#e5c3c3",
    textAlign: "center",
  },
  noteList: {
    flex: 1,
  },
  noteTitle: {
    fontSize: 20,
    marginTop: 10,
    marginBottom: 10,
    fontFamily: "georgia",
    color: "#884c5e",
    // fontWeight: "bold",
    backgroundColor: "#C3ADB3",
    textAlign: "center",
    height: 40,
    width: "100%",
    padding: 10,
    borderRadius: 8,
    borderColor: "#FFF8E7",
    borderWidth: 1,
  },
  addButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#C3ADB3",
    paddingVertical: 12,
    borderRadius: 5,
    marginTop: 10,
  },
  addButtonText: {
    color: "white",
    fontSize: 18,
    fontFamily: "georgia",
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    padding: 50,
    backgroundColor: "#C3ADB3",
  },
  input: {
    borderWidth: 2,
    borderColor: "#884c5e",
    padding: 10,
    marginTop: 90,
    marginBottom: 10,
    borderRadius: 5,
    color: "#884c5e",
    fontSize: 18,
    fontFamily: "georgia",
  },
  contentInput: {
    borderWidth: 2,
    borderColor: "#884c5e",
    padding: 10,
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 5,
    color: "#884c5e",
    fontSize: 18,
    fontFamily: "georgia",
    height: 220,
    textAlignVertical: "top",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default Memos;
