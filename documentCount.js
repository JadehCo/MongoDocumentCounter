const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/testMe', {
  useNewUrlParser: true
})
  .then(() => console.log("Connected to DB"))
  .catch(e => console.log(e))

// const User = mongoose.model('user', new mongoose.Schema({
//   name: String
// }))

const Bar = mongoose.model('bar', new mongoose.Schema({
  title: String,
  user: String
}))

async function main() {
  let repeat = {}
  let moreThan = []
  let bars = await Bar.find({})
  bars.map(b => repeat[b.user] = repeat[b.user] ? repeat[b.user] + 1 : 1)
  for (let x in repeat) {
    if (repeat[x] > 5) {
      moreThan.push({
        userId: x,
        bars: repeat[x]
      })
    }
  }

  return moreThan
}



main().then(bi => {
  console.log("more than 5 = ", bi)
}).catch(e => console.log(e))