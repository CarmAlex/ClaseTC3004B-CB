import ChatBot from 'react-chatbotify'
import LlmConnector, { GeminiProvider } from '@rcb-plugins/llm-connector';

export const MyChatBot = () => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY || "";
  const plugins = [LlmConnector()];

  const flow = apiKey
    ? {
        start: {
          message: "Hola, pregúntame sobre un perro.",
          transition: 0,
          path: "gemini",
        },
        gemini: {
          llmConnector: {
            provider: new GeminiProvider({
              mode: 'direct',
              model: 'gemini-2.5-flash',
              responseFormat: 'text',
              apiKey,
            }),
            outputType: 'text',
          },
          message: async (params) => {
            try {
              const response = await params.injectMessage(params.userInput);
            } catch (error) {
              console.error('Error:', error);
              return "Hubo un error al procesar tu pregunta";
            }
          }
        },
      }
    : {
        start: {
          message:
            'No se encontró la API key',
          chatDisabled: true,
        },
      };

  const settings = {
    chatHistory: {
      storageKey: 'example_single_theme',
    },
  };

  const themes = [{ id: 'terminal', version: '0.1.0' }];

  return (
    <ChatBot themes={themes} settings={settings} plugins={plugins} flow={flow} />
  );
};
