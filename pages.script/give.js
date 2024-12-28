import { commandResultProcesser } from "index";

export default function summon() {
    // 获取输入框的值
    var id = document.getElementsByTagName("input")[0].value;
    var player = document.getElementsByTagName("input")[1].value;
    var nbt = document.getElementsByTagName("input")[2].value;
    // 拼接命令
    var command = "/give " + player + " " + id + " " + nbt;
    switch (undefined) {  // 虽然不用nbt但是我还要写上以便维护
        case (id == ""):
            alert("ID不能为空")
            console.error("Variable \"id\" is null")
            break
        case (player == ""):
            alert("玩家不能为空")
            console.error("Variable \"player\" is null")
            break
        default:
            return
    }
    // 输出命令
    commandResultProcesser(command, id, player, nbt);
}