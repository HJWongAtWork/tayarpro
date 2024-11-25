import { messageStore } from "@/stores/messageStore";
import axios from "axios";

export const messageComposable = () => {
  const message_store = messageStore();
  const { messages } = toRefs(message_store);
  const emailInput = ref("");
  const subjectInput = ref("");
  const contentInput = ref("");
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  const fetchMessage = async () => {
    await message_store.fetchMessage();
  };

  const addMessage = async () => {
    if (
      emailInput.value.trim() !== "" &&
      subjectInput.value.trim() !== "" &&
      contentInput.value.trim() !== ""
    ) {
      try {
        console.log(emailInput);
        console.log(subjectInput);
        console.log(contentInput);
        await axios.post(
          `${baseUrl}/send_feedback`,
          {
            email: emailInput.value,
            subject: subjectInput.value,
            content: contentInput.value,
          },
          {
            headers: {
              accept: "application/json",
              "Content-Type": "application/json",
            },

          }
        );
        return true;
      } catch (error) {
        console.error("Error adding message:", error);
      }
      const newMessage = {
        id: messages.value.length + 1,
        email: emailInput.value,
        subject: subjectInput.value,
        content: contentInput.value,
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
    contentInput,
  };
};
