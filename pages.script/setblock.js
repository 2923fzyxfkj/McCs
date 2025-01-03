import { commandResultProcesser } from "index";

export default function summon() {
    // 获取输入框的值
    var id = document.getElementsByTagName("input")[0].value;
    var position = document.getElementsByTagName("input")[1].value;
    // 拼接命令
    var command = "/summon " + position + " " + "minecraft:" + id;
    if (id === '' || position === '') {
        if (id == "") {
            alert("ID不能为空");
            console.error("Variable \"id\" is null");
        } else if (position == "") {
            alert("坐标不能为空");
            console.error("Variable \"position\" is null");
        }
        return;
    }

    // 输出命令
    commandResultProcesser(command, id, position);
}