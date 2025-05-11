const writingQuotes = [
  {
    quote: "The first draft is just you telling yourself the story.",
    author: "Terry Pratchett"
  },
  {
    quote: "You can't wait for inspiration. You have to go after it with a club.",
    author: "Jack London"
  },
  {
    quote: "Write what disturbs you, what you fear, what you have not been willing to speak about.",
    author: "Natalie Goldberg"
  },
  {
    quote: "The scariest moment is always just before you start.",
    author: "Stephen King"
  },
  {
    quote: "You can always edit a bad page. You can't edit a blank page.",
    author: "Jodi Picoult"
  },
  {
    quote: "Start writing, no matter what. The water does not flow until the faucet is turned on.",
    author: "Louis L'Amour"
  },
  {
    quote: "If you want to be a writer, you must do two things above all others: read a lot and write a lot.",
    author: "Stephen King"
  },
  {
    quote: "The only way to do great work is to love what you do.",
    author: "Maya Angelou"
  },
  {
    quote: "There is no greater agony than bearing an untold story inside you.",
    author: "Maya Angelou"
  },
  {
    quote: "Writing is the painting of the voice.",
    author: "Voltaire"
  },
  {
    quote: "A professional writer is an amateur who didn't quit.",
    author: "Richard Bach"
  },
  {
    quote: "The purpose of a writer is to keep civilization from destroying itself.",
    author: "Albert Camus"
  },
  {
    quote: "Write drunk, edit sober.",
    author: "Ernest Hemingway"
  },
  {
    quote: "Either write something worth reading or do something worth writing.",
    author: "Benjamin Franklin"
  },
  {
    quote: "If there's a book that you want to read, but it hasn't been written yet, then you must write it.",
    author: "Toni Morrison"
  }
];

export function getRandomQuote() {
  const randomIndex = Math.floor(Math.random() * writingQuotes.length);
  return writingQuotes[randomIndex];
}
