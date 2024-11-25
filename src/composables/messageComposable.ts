import { messageStore } from "@/stores/messageStore";
import axios, { AxiosError, AxiosResponse } from "axios";
import { ref, toRefs } from "vue";

interface MessageForm {
  email: string;
  subject: string;
  content: string;
}

interface Message extends MessageForm {
  id: number;
}

interface ErrorResponse {
  message: string;
  status: number;
}

export const messageComposable = () => {
  const message_store = messageStore();
  const { messages } = toRefs(message_store);
  const emailInput = ref<string>("");
  const subjectInput = ref<string>("");
  const contentInput = ref<string>("");
  const baseUrl = import.meta.env.VITE_API_BASE_URL || 'https://tayar.pro';

  const fetchMessage = async (): Promise<void> => {
    await message_store.fetchMessage();
  };

  const addMessage = async (): Promise<boolean | void> => {
    if (
      emailInput.value.trim() &&
      subjectInput.value.trim() &&
      contentInput.value.trim()
    ) {
      try {
        const messageForm: MessageForm = {
          email: emailInput.value,
          subject: subjectInput.value,
          content: contentInput.value,
        };

        const config = {
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
          },
        };

        // Log the equivalent cURL command
        console.log('Equivalent cURL command:');
        console.log(`curl -X 'POST' \\
  '${baseUrl}/send_feedback' \\
  -H 'accept: application/json' \\
  -H 'Content-Type: application/json' \\
  -d '${JSON.stringify(messageForm, null, 2)}'`);

        // Log axios request details
        console.log('Sending request with axios:');
        console.log('URL:', `${baseUrl}/send_feedback`);
        console.log('Headers:', config.headers);
        console.log('Payload:', messageForm);

        const response: AxiosResponse = await axios.post(
          `${baseUrl}/send_feedback`,
          messageForm,
          config
        );

        // Log response
        console.log('Response received:');
        console.log('Status:', response.status);
        console.log('Data:', response.data);
        console.log('Headers:', response.headers);

        if (response.data) {
          console.log("Message sent successfully");

          const newMessage: Message = {
            id: messages.value.length + 1,
            email: emailInput.value,
            subject: subjectInput.value,
            content: contentInput.value,
          };
          messages.value.push(newMessage);

          emailInput.value = "";
          subjectInput.value = "";
          contentInput.value = "";
          return true;
        }
      } catch (error) {
        console.log("Message sending failed");
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError<ErrorResponse>;
          if (axiosError.response) {
            console.log("Error response data:", axiosError.response.data);
            console.log("Error response status:", axiosError.response.status);
            console.log("Error response headers:", axiosError.response.headers);
          } else if (axiosError.request) {
            console.log("Error request:", axiosError.request);
          } else {
            console.log("Error message:", axiosError.message);
          }
          console.log("Error config:", axiosError.config);
        } else {
          console.log("Non-Axios error:", error);
        }
      }
    }
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
