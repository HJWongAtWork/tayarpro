import { messageStore } from "@/stores/messageStore";

export const messageComposable = () => {
  const message_store  = messageStore();
  const { messages } = toRefs(message_store);
  const emailInput = ref("");
  const subjectInput = ref("");
  const contentInput = ref("");

  const fetchMessage = async () => {
    await message_store.fetchMessage();
  };

  const addMessage = () => {
    if (emailInput.value.trim() !== "" 
    && subjectInput.value.trim() !== ""
    && contentInput.value.trim() !== "") {
      //call api to get latest id
      //set new id
      const newMessage = {
        id: messages.value.length + 1,
        email: emailInput.value,
        subject: subjectInput.value,
        content: contentInput.value
      };
      messages.value.push(newMessage);
    }
    emailInput.value = "";
    subjectInput.value = "";
    contentInput.value = "";
  };

  return {
    messages,
    fetchMessage, 
    addMessage,
    emailInput,
    subjectInput,
    contentInput
  }
}