import { world } from "mojang-minecraft";
const overworld = world.getDimension("overworld");
var tps = 0
var lastTime = 0
//var timea = Date.now()
var msptArray = []
var mspta = 100
var msptb = 0
var mspt = 0





let msg4addTags = (msg, tags, want, send) => {
    if (msg.message.toLowerCase() == want) {
        tags.forEach(tag => {
            msg.sender.runCommand(`tag @s add ${tag}`);
        });

        msg.message = send || tags.join(",") + " => true";
        msg.targets = [msg.sender];
        msg.sendToTargets = true;
    }
}


let msg4removeTags = (msg, tags, want, send) => {
    if (msg.message.toLowerCase() == want) {
        tags.forEach(tag => {
            msg.sender.runCommand(`tag @s remove ${tag}`);
        });

        msg.message = send || tags.join(",") + " => true";
        msg.targets = [msg.sender];
        msg.sendToTargets = true;
    }
}

world.events.tick.subscribe(i2 => {
    tps++

    mspt = (i2.deltaTime*1000).toFixed(0)
    //Date.now() - timea
    msptArray.push(mspt)
    if (mspt > msptb) { msptb = mspt }
    if (mspt < mspta) { mspta = mspt }
    // timea = Date.now()


    let lastLastTime = ("" + Date.now()).slice(-4, -3)
    if (lastLastTime != lastTime) {

        lastTime = ("" + Date.now()).slice(-4, -3)
        try {
            overworld.runCommand(`title @a[tag=tps_] actionbar §e§lTPS:§3${tps}`);
            // overworld.runCommand(`title @a[tag=mspt_] actionbar §e§lTPS:§3${tps}§0#§4MSPT:§e${mspta}-${msptb}§0#§4${msptArray.join(",").replaceAll(mspta,"§e"+mspta+"§4").replaceAll(msptb,"§e"+msptb+"§4")}`);
            overworld.runCommand(`title @a[tag=mspt_] actionbar §e§lTPS:§3${tps}§0#§4MSPT:§e${mspta}-${msptb}§0#§4${msptArray.join(",")}`);
    
            overworld.runCommand(`scoreboard players set tps tps ${tps}`);
        } catch (err) {
            //眼不见心不烦
        }
        tps = 0

        mspta = 100
        msptb = 0
        mspt = 0
        msptArray = []
    }
    
// timea = Date.now()

})

world.events.beforeChat.subscribe(msg => {
    {
        msg4removeTags(msg, ['tps_'], "tps关", "TPS显示已关");
        msg4removeTags(msg, ['tps_'], "tps off", "TPS-Display-OFF");

        msg4addTags(msg, ['tps_'], "tps开", "TPS显示已开")
        msg4addTags(msg, ['tps_'], "tps on", "TPS-Display-ON")
    }

    {
        msg4removeTags(msg, ['mspt_'], "mspt关", "TPS显示已关");
        msg4removeTags(msg, ['mspt_'], "mspt_ off", "MSPT-Display-OFF");

        msg4addTags(msg, ['mspt_'], "mspt开", "mspt显示已开")
        msg4addTags(msg, ['mspt_'], "mspt on", "MSPT-Display-ON")

        msg4removeTags(msg, ['tps_'], "mspt开", "TPS独立显示已关");
        msg4removeTags(msg, ['tps_'], "mspt on", "TPS-ONLY-Display-OFF");
    }
})



