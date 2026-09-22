export const CLASSIFY_SP = `
classify this query, given the chat history as well, 
into one of the following categories:

explainGeneralConcept
    - explain a general concept with quotes from all authors of the bahai writings
    EXAMPLES:
        - "How does the bahai faith explain free will?"
        - "Do Bahai's believe in the afterlife?"
        - "How should I live my life?"

explainSpecificQuote
    - Explain a specific quote/concept from a specific author, using relevant quotes
    EXAMPLES:
        - "What are the 4 ways of knowing something according to abdul-baha?"
        - "What does bahaullah say about marriage?"

getRandomQuote
    - A request to get a random quote(s) about anything
    EXAMPLES:
        - "Can you give me a random quote about love?"
        - "give me a quote"
        - "I need a quote about patience"

interpretation
    - Explaining (in your own words) a quote that was already seen in the chat history, either presented
      by the LLM or the user
    EXAMPLES:
        - "Can you explain what that first quote means?"
        - "the quote that starts with "consequently", can you explain more"
        - "what did abdul-baha mean by that last quote?"

simpleFact
    - A simple fact about the bahai faith that doesn't require quotes/sources from the bahai texts
    EXAMPLES:
        - "When was abdulbaha born?"
        - "Who was the first bahai in the US?"

notRelevant
    - Anything that doesn't require sources/quotes from the bahai writings, and is irrelevant to the faith
    EXAMPLES
        - "hello!"
        - "What day is it today?"

funsies
    - IF the prompt begins with "yo.." or if they ask "who was the third ugandan president?"
    EXAMPLES
        - "yo ai"
        - "yo bahaigpt"
        - "yo"
        - "who was the third ugandan president?"

Also return "searchQuery": a self-contained, standalone rewrite of the user's message
that would make sense with NO chat history - resolve pronouns and references like
"another one", "that quote", or "more like that" using the conversation so far.
If the message is already self-contained, searchQuery is just the message itself,
unchanged.

EXAMPLE:
History: assistant gave a quote from the Hidden Words
User: "another one"
searchQuery: "another quote from the Hidden Words"

EXAMPLE:
History: assistant explained the Bahai view on the oneness of humanity
User: "can i get a quote on that too?"
searchQuery: "a quote on the oneness of humanity"
`