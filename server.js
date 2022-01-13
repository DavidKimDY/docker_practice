// Express 모듈 불러오기
const express = require('express');

//redis 모듈 불러오기
const redis = require("redis");

//create redis client
const client = redis.createClient({
	host: "redis-server",
	port: 6379
})

// Express 서버를 위한 포트 설정
const PORT = 8080;

// 새로운 Express 애플리케이션 생성
const app = express();

// 숫자는 0부터 시작합니다
client.set("number" , 0);

app.get('/', (req, res) => {
	client.get("number", (err, number) => {
	//현재 숫자를 가져온 후 1씩 올립니다.
		res.send("숫자가 1씩 올라갑니다. 숫자:" + number);
		client.set("number", parseInt(number) + 1);
	})
})

// 해당 포트에서 애플리케이션을 시작
app.listen(PORT, () => {
	console.log('application begun');
})
