import { ChatGPTAPI } from 'chatgpt'

export async function generatePoem(words, style, length, person) {
  const api = new ChatGPTAPI({
    apiKey: process.env.OPENAI_API_KEY
  })
  // if(words === '') {
  //   words = 
  // }

  // if(words !== '') {
    const res = await api.sendMessage('Write a Valentine\'s Day poem including the words ${words} and mentioning Palash in the style of Rumi. Make it 4 stanzas long. Write it in first person and refer to Palashas as "you" after mentioning Palash in the first stanza.')
  // }
  return res.text;
  // console.log(res.text)
}

// module.exports = {
//   generatePoem
// }

// generatePoem('love funny happy smile', 'Rumi', 4, 'Palash')