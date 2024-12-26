import { commandResultProcesser } from "../index.js";

function summon() {
    // 获取输入框的值
    var mode = document.getElementsByTagName("input")[0].value;
    // 拼接命令
    var command = "/gamemode " + mode;
    if (mode == "") {
        alert("模式不能为空")
        console.error("Variable \"mode\" is null")
        // } else if ((mode != "1" || mode != "2" || mode != "3" || mode != "4") || (mode != "survive" || mode != "creative" || mode != "adventure" || mode != "spectator")) {
        //     alert("模式错误(模式不能为标示除外的字符)")
        //     console.warn("Variable \"mode\" is not gamemode")    // 这里有问题，我不知道怎么解决，所以先注释掉了
    }
    // 输出命令
    commandResultProcesser(command, mode);
}