import { commandResultProcesser } from "index";

export default function summon() {
    // 获取输入框的值
    var player1 = document.getElementsByTagName("input")[0].value;
    var player2 = document.getElementsByTagName("input")[1].value;
    // 拼接命令
    var command = "/tp " + player1 + " " + player2;
    switch (undefined) {
        case (player1 == ""):
            alert("玩家1不能为空")
            console.error("Variable \"player1\" is null")
            break
        case (player2 == ""):
            alert("玩家2不能为空")
            console.error("Variable \"player2\" is null")
            break
        default:
            return
    }
    // 输出命令
    commandResultProcesser(command, player1, player2);
}