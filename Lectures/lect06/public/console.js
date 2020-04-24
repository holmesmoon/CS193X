arr
// => Array(6) [ 10, 20, 30, 40, 50, 60 ]
arr.splice(2, 1)
// => Array [ 30 ]
arr
// => Array(5) [ 10, 20, 40, 50, 60 ]
arr.splice(3, 0, 193)
// => Array []
arr
// => Array(6) [ 10, 20, 40, 193, 50, 60 ]

obj = {binky: 1, winky: 2}
// => Object { binky: 1, winky: 2 }
x = "binky"
// => "binky"
obj[x]
// => 1
"binky" in obj
// => true
obj.dinky
// => undefined
for (let key of Object.keys(obj)) console.log(key)
// => binky
// => winky
for (let key of Object.values(obj)) console.log(key)
// => 1
// => 2
for (let entry of Object.entries(obj)) console.log(entry)
// => Array [ "binky", 1 ]
// => Array [ "winky", 2 ]
for (let [key, val] of Object.entries(obj)) console.log(key, val)
// => binky 1
// => winky 2
for (let [key, val] of Object.entries(obj)) console.log(key + ": " + val)
// => binky: 1
// => winky: 2
for (let [key, val] of Object.entries(obj)) console.log(`${key}: ${val}`)
// => binky: 1
// => winky: 2

