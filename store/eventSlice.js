import { createSlice } from "@reduxjs/toolkit";

export const eventSlice = createSlice({
  name: "event",
  initialState: {
    selectedPlannerDate: "",
    _modeFAB: "date",
    _showFAB: false,
    newEventDate: null,
    eventLocation: "",
    checkedAddress: false,
    newEventDateEnd: null,
    selectedUsers: [],
    seeModal: false,
    modalEvent: null,
  },
  reducers: {
    setSelectedPlannerDate: (state, action) => {
      state.selectedPlannerDate = action.payload;
    },
    set_modeFAB: (state, action) => {
      state._modeFAB = action.payload;
    },
    set_showFAB: (state, action) => {
      state._showFAB = action.payload;
    },
    setNewEventDate: (state, action) => {
      state.newEventDate = action.payload;
    },
    setNewEventDateEnd: (state, action) => {
      state.newEventDateEnd = action.payload;
    },
    setEventLocation: (state, action) => {
      state.eventLocation = action.payload;
    },
    setCheckedAddress: (state, action) => {
      state.checkedAddress = action.payload;
    },
    setSelectedUsers: (state, action) => {
      state.selectedUsers = action.payload;
    },
    setSeeModal: (state, action) => {
      state.seeModal = action.payload;
    },
    setModalEvent: (state, action) => {
      state.modalEvent = action.payload;
    }
  }
})

export const {
  setSelectedPlannerDate,
  set_modeFAB,
  set_showFAB,
  setNewEventDate,
  setEventLocation,
  setCheckedAddress,
  setNewEventDateEnd,
  setSelectedUsers,
  setSeeModal,
  setModalEvent
} = eventSlice.actions;
export default eventSlice.reducer;