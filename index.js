import http from 'http';
import path from 'path';
import getUrl, {fileURLToPath} from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import {totalWords, 
       totalSentences,
       totalWordOccurences, 
       wordFrequency} from './controllers/parseLogs.js';
const port = process.env.PORT || 8080

const requestListener = async function (req, res) {
  res.writeHead(200,{'Content-Type': 'application/json'});

  const url = req.url;
const queryObject = getUrl.parse(req.url,true).query;

  const fileUrl = __dirname+"/logs/example.txt";
  const urlBeforeParams = url.split("?")

//server listening
if(url=="/"){
    res.write('Hello!, Server is Listening'); 
    res.end(); 

}

//route to get totalWords
if(url=="/totalWords"){
    try{
    const totalWordss = await totalWords(fileUrl) 
    res.write(JSON.stringify({success:true, totalWords:totalWordss}))
    res.end()
    }catch(err){
        console.log(err)
    }
}

//route to get total number of Sentences
if(url=="/totalSentences"){
    try{
  const totalSentencess = await totalSentences(fileUrl)
  res.write(JSON.stringify({success:true, totalSentences:totalSentencess}))
  res.end();
    } catch(err){
        console.log(err)
    }
}


//route to get total occurence of the word send from query parameter
if(urlBeforeParams[0]=="/totalOccurences"){
    try{
    const word = queryObject.word;
    if(word){
      const totalOccurences = await totalWordOccurences(fileUrl,word)
      res.write(JSON.stringify({success:true,totalOccurences:{[word]:totalOccurences}}))
      res.end();
    }else{
        res.write(JSON.stringify({success:false, errorMessage : "Error please key value to search occurence with word=value"}));
        res.end();
    }
   }catch(err){
    console.log(err)
   }
}

//route to get top 10 most frequency words & lowest top 10 words frequency
if(urlBeforeParams[0]=="/wordFrequency"){
    try{
    const query = queryObject.freq  // least or most
    if(query){
        const result = await wordFrequency(fileUrl,query)
        res.write(JSON.stringify({success:true, topFrequent: {[query]:result}}))
        res.end();
    } else{
        res.write(JSON.stringify({success:false, errorMessage : "Error! please provide query to search occurence with query=least/most"}));
        res.end(); 
    }
   } catch(err){
    console.log(err)
   }  
}
}

const server = http.createServer(requestListener);
server.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
});