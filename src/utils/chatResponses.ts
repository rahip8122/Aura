import { ChatMessage } from '../types';

const supportiveResponses = [
  "I hear you, and your feelings are completely valid. It takes courage to share what you're going through.",
  "Thank you for opening up. Remember that seeking support is a sign of strength, not weakness.",
  "It sounds like you're dealing with a lot right now. How are you taking care of yourself today?",
  "Your mental health matters, and you deserve support and care. What's been helping you feel better recently?",
  "I'm here to listen. Sometimes just expressing our thoughts and feelings can provide some relief.",
  "You're not alone in this journey. Many young people face similar challenges, and there are ways to work through them.",
  "It's okay to have difficult days. What's one small thing you could do today to be kind to yourself?",
  "Remember that healing isn't linear. Be patient with yourself as you navigate these feelings.",
  "Your awareness of your mental health shows great self-understanding. That's an important first step.",
  "Have you considered reaching out to a mental health professional? They can provide personalized support for what you're experiencing."
];

const keywordResponses: { [key: string]: string[] } = {
  'anxious|anxiety|worried|worry|stress|stressed': [
    "Anxiety can feel overwhelming, but there are techniques that can help. Try the 4-7-8 breathing technique: breathe in for 4, hold for 7, exhale for 8.",
    "When anxiety strikes, grounding techniques can help. Try naming 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, and 1 you can taste.",
    "Stress and anxiety are common experiences. Consider writing down your worries - sometimes getting them out of your head and onto paper can provide relief."
  ],
  'sad|depressed|depression|down|low': [
    "I'm sorry you're feeling this way. Depression can make everything feel harder, but you don't have to face it alone.",
    "Feeling sad or low is part of the human experience. If these feelings persist, consider talking to a counselor or trusted adult.",
    "Small steps can make a difference. Even something as simple as taking a walk or listening to music you enjoy can help lift your mood a little."
  ],
  'lonely|alone|isolated': [
    "Feeling lonely is more common than you might think, especially among young people. You're not truly alone - there are people who care about you.",
    "Social connection is important for mental health. Consider reaching out to a friend, family member, or joining a community group or online forum.",
    "Loneliness can be painful, but it's temporary. There are ways to build meaningful connections, starting with small steps."
  ],
  'sleep|tired|insomnia': [
    "Sleep problems can really affect our mental health. Try creating a bedtime routine: no screens an hour before bed, dim lighting, and maybe some calming music.",
    "Good sleep hygiene can make a big difference. Try to go to bed and wake up at the same time each day, even on weekends.",
    "If sleep issues persist, it might be worth talking to a healthcare provider. Sleep and mental health are closely connected."
  ]
};

export const generateChatResponse = (userMessage: string): string => {
  const lowerMessage = userMessage.toLowerCase();
  
  // Check for keyword matches
  for (const [keywords, responses] of Object.entries(keywordResponses)) {
    const keywordPattern = new RegExp(keywords, 'i');
    if (keywordPattern.test(lowerMessage)) {
      return responses[Math.floor(Math.random() * responses.length)];
    }
  }
  
  // Return a general supportive response
  return supportiveResponses[Math.floor(Math.random() * supportiveResponses.length)];
};