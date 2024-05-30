import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  TouchableOpacity,
  Modal,
  StyleSheet,
} from "react-native";

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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shared Notes</Text>

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
          setTitle("Title");
          setContent("Notes here");
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
            value={title}
            onChangeText={setTitle}
          />

          <TextInput
            style={styles.contentInput}
            multiline
            placeholder="Enter note content"
            value={content}
            onChangeText={setContent}
          />

          <View style={styles.buttonContainer}>
            <Button
              title="Save"
              onPress={handleSaveNote}
              color="#007BFF"
            />
            <Button
              title="Cancel"
              onPress={() =>
                setModalVisible(false)
              }
              color="#FF3B30"
            />
            {selectedNote && (
              <Button
                title="Delete"
                onPress={() =>
                  handleDeleteNote(
                    selectedNote
                  )
                }
                color="#FF9500"
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
    padding: 40,
    backgroundColor: "#e6e6e6",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  noteList: {
    flex: 1,
  },
  noteTitle: {
    fontSize: 15,
    marginBottom: 10,
    fontWeight: "bold",
    color: "black",
    backgroundColor: "white",
    height: 40,
    width: "100%",
    padding: 10,
    borderRadius: 8,
  },
  addButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#007BFF",
    paddingVertical: 12,
    borderRadius: 5,
    marginTop: 10,
  },
  addButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    padding: 50,
    backgroundColor: "white",
  },
  input: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  contentInput: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
    height: 150,
    textAlignVertical: "top",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default Memos;
