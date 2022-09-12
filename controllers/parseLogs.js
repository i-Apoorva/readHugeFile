import fs from "fs";
import readline from "readline"

//query to get totalWords
export const totalWords = (fileUrl) => {
    return new Promise(async (resolve, reject) => {
    let readStream = fs.createReadStream(fileUrl);
    const rl = readline.createInterface({
        input: readStream,
        crlfDelay: Infinity
      });
       let totalWords = 0;
      for await (const line of rl) {
        // Each line in input.txt will be successively available here as `line`.
        totalWords+= line.split(" ").length
      }
      console.log('Read and processed total number of words',totalWords);
      resolve(totalWords)
 })
    
}

//query to get totalSentences
export const totalSentences = (fileUrl) => {
    return new Promise(async(resolve, reject) => {
    let readStream = fs.createReadStream(fileUrl);
    const rl = readline.createInterface({
        input: readStream,
        crlfDelay: Infinity
      });
    let totalSentences = 0;
    for await (const line of rl) {
        totalSentences+= line.split(/[.!?]+\s/).length
      }
      console.log('Read and processed total number of sentences',totalSentences);
      resolve(totalSentences)
    })
}

//query to get totalWordOccurences of given word
export const totalWordOccurences = (fileUrl, word) => {
    return new Promise(async (resolve,reject) => {
        if(word){
            let readStream = fs.createReadStream(fileUrl);
            const rl = readline.createInterface({
                input: readStream,
                crlfDelay: Infinity
              });
            const wrd = word.toLowerCase()
            let totalOccurences = 0;
            for await (const line of rl) {
                let arr = line.split(" ")
                for(let w of arr){
                    w = w.replace(/[.,! ]/g, '').toLowerCase()
                    if(w==wrd){
                        totalOccurences++;
                    }
                }
              }

              console.log(`Read and processed total number of occurence of ${word} is ${totalOccurences}`);
              resolve(totalOccurences)
        }
    })
}

//Lists top 10 most/least frequently occuring words
export const wordFrequency = (fileUrl,query) => {
    return new Promise(async (resolve, reject) => {
        let readStream = fs.createReadStream(fileUrl);
        const rl = readline.createInterface({
            input: readStream,
            crlfDelay: Infinity
          });
        let freq = {}
        for await (const line of rl) {
            let arr = line.split(/[" " | "."]/);
            for(let w of arr){
                w= w.replace(/[.,!]/g, '').toLowerCase()
                if(w.length){
                freq[w] = (freq[w] || 0) +1
                }
            }
          }

           let sortable = []
            sortable = Object.entries(freq)
            sortable.sort((a,b) =>  query == "least" ? a[1]-b[1] : b[1]-a[1])
            let result = sortable.slice(0,10)
            console.log(`Top 10 ${query} occuring words are ${result}`);
            resolve(result)
    })
}