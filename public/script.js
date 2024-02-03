let a=document.getElementById("usnames")
let b=document.getElementById("ussurname")
let c=document.getElementById("usmail")
let d=document.getElementById("usname")
let e=document.getElementById("usepass")
let f=document.getElementById("usphone")

function f1(){


         fetch("http://localhost:3000/addInfo", {
        method: "POST",
        headers: {
        "Content-Type": "application/json"
        },
        body: JSON.stringify({name:a.value,surname:b.value,email:c.value,login:d.value,pass:e.value,phone:f.value})
        })
        }
