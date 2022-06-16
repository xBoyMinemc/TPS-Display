import { world} from "mojang-minecraft";
var tps = 0
var time = (""+Date.now()).slice(-4,-3)

world.events.tick.subscribe(i2 => {
tps++
let bbb = (""+Date.now()).slice(-4,-3)
if(bbb != time){

time = (""+Date.now()).slice(-4,-3)
try{
world.getDimension("overworld").runCommand(`title @a[tag=!tps_] actionbar §e§lTPS:§3${tps}`);
}catch(err){
//眼不见心不烦
}
tps = 0
}

})


world.events.beforeChat.subscribe(msg => {

let M = msg.message

if(M == "tps关"){
msg.message = "TPS显示已关"
msg.sender.runCommand(`tag @a[name="${msg.sender.nameTag}"] add tps_`)

msg.targets = [msg.sender]
msg.sendToTargets = true
}
if(M == "tps off"){
msg.message = "TPS-Display-off"
msg.sender.runCommand(`tag @a[name="${msg.sender.nameTag}"] add tps_`)

msg.targets = [msg.sender]
//msg.sendToTargets = true
}
if(M == "tps开"){
msg.message = "TPS显示已开"
msg.sender.runCommand(`tag @a[name="${msg.sender.nameTag}"] remove tps_`)

msg.targets = [msg.sender]
msg.sendToTargets = true
}
if(M == "tps on"){
msg.message = "TPS-Display-ON"
msg.sender.runCommand(`tag @a[name="${msg.sender.nameTag}"] remove tps_`)

msg.targets = [msg.sender]
msg.sendToTargets = true
}

})




