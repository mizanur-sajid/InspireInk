// Writing prompts organized by genre
const prompts = {
  fantasy: [
    "Write about a wizard who can only cast spells through interpretive dance.",
    "Describe a magical library where books come alive at night.",
    "Tell a story about a dragon who hoards memories instead of gold.",
    "Write about a fairy who grants wishes with unexpected consequences.",
    "Describe a world where magic is powered by laughter.",
  ],
  
  sciFi: [
    "Write about a character who discovers they can control time, but only for 60 seconds at a time.",
    "Describe a world where memories can be traded like currency.",
    "Tell a story about the last AI on Earth discovering human art.",
    "Write about a colony on Mars receiving a mysterious signal from Earth.",
    "Describe a future where dreams are downloadable.",
  ],
  
  mystery: [
    "Write about finding a mysterious package on your doorstep with your name in your handwriting.",
    "Tell a story about a detective who can only solve crimes in their dreams.",
    "Describe a crime scene where nothing was stolen, but something was added.",
    "Write about a person who receives letters from their future self.",
    "Tell a story about a town where everyone's shadows start disappearing.",
  ],
  
  romance: [
    "Write about two people who fall in love through post-it notes.",
    "Tell a story about soulmates who can only meet in their dreams.",
    "Describe a love story that spans multiple lifetimes.",
    "Write about a dating app that matches people based on their biggest fears.",
    "Tell a story about two rivals who fall in love while competing.",
  ],
  
  horror: [
    "Write about a house that rearranges itself every night.",
    "Tell a story about a mirror that shows a different reflection each time.",
    "Describe a character who starts receiving text messages from themselves.",
    "Write about a town where everyone's nightmares start coming true.",
    "Tell a story about a diary that writes itself with future events.",
  ],
  
  personal: [
    "Describe your perfect day, but with an unexpected twist at the end.",
    "Write about a memory you wish you had.",
    "Tell a story about your biggest fear coming true, but with a positive outcome.",
    "Describe a moment that changed your perspective on life.",
    "Write about a conversation you wish you could have.",
  ],
  
  adventure: [
    "Write about a treasure map that changes based on the reader's greatest desire.",
    "Tell a story about a global scavenger hunt with impossible clues.",
    "Describe an expedition to find a mythical creature in modern times.",
    "Write about a journey through a city where each street leads to a different time period.",
    "Tell a story about an ordinary object that becomes a key to extraordinary adventures.",
  ]
};

// Get all available genres
export function getGenres() {
  return Object.keys(prompts);
}

// Get a random prompt from a specific genre
export function getRandomPromptByGenre(genre) {
  if (!prompts[genre]) return null;
  const genrePrompts = prompts[genre];
  const randomIndex = Math.floor(Math.random() * genrePrompts.length);
  return genrePrompts[randomIndex];
}

// Get a random prompt from any genre
export function getRandomPrompt() {
  const genres = getGenres();
  const randomGenre = genres[Math.floor(Math.random() * genres.length)];
  return getRandomPromptByGenre(randomGenre);
}

// Search through prompts across all genres
export function searchPrompts(query) {
  if (!query) return [];
  
  const normalizedQuery = query.toLowerCase().trim();
  const results = [];
  
  Object.entries(prompts).forEach(([genre, genrePrompts]) => {
    const matchingPrompts = genrePrompts.filter(prompt => 
      prompt.toLowerCase().includes(normalizedQuery)
    ).map(prompt => ({
      genre,
      prompt
    }));
    results.push(...matchingPrompts);
  });
  
  return results;
}

// Get all prompts from a specific genre
export function getPromptsByGenre(genre) {
  return prompts[genre] || [];
}

// Get total number of prompts
export function getPromptCount() {
  return Object.values(prompts).reduce((total, genrePrompts) => 
    total + genrePrompts.length, 0
  );
}

// Get multiple random prompts from a specific genre
export function getRandomPromptsByGenre(genre, count = 3) {
  if (!prompts[genre]) return [];
  
  const genrePrompts = new Set();
  const availablePrompts = prompts[genre];
  
  while (genrePrompts.size < count && genrePrompts.size < availablePrompts.length) {
    const randomIndex = Math.floor(Math.random() * availablePrompts.length);
    genrePrompts.add(availablePrompts[randomIndex]);
  }
  
  return Array.from(genrePrompts);
}
