import http from "k6/http";
import { check, sleep } from "k6";

export let options = {
  stages: [
     { duration: "1m", target: 1200 },
     { duration: "2m", target: 1800 },
     { duration: "1m", target: 1500 },
   ]
 };

export default function() {
  var randomNumber = Math.floor(Math.random()*(10000001 - 9000000)) + 9000000;
  let res = http.get(`http://localhost:9005/api/${randomNumber}`);
  check(res, {
    "status was 200": (r) => r.status == 200
  });
  sleep(1);
}