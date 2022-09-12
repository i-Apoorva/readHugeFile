# Nektar task - provide statistics of a huge document file.

# Steps to run the project:
1. Clone the repo using-> git clone https://github.com/i-Apoorva/readHugeFile.git
2. Run npm install
3. Run npm start
4. In your browser, access localhost:8080


# APIs listed:
1. /totalWords => Provides the count of total number of words in the file. http://localhost:8080/totalWords
2. /totalSentences => Total number of sentences in file. http://localhost:8080/totalSentences
3. /totalOccurences?word={} => Number of occurrences of a particular word provided in query. e.g http://localhost:8080/totalOccurences?word=sint
4. /wordFrequency?freq={least/most} => 10 most/least frequently occurring words from file. On passing freq=least it returns 10 least frequent words with their count. Similary, for freq=most, returns 10 most frequest words. e.g http://localhost:8080/wordFrequency?freq=most

