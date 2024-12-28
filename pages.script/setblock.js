McCs.summon = () => {
    // 获取输入框的值
    var id = document.getElementsByTagName("input")[0].value;
    var position = document.getElementsByTagName("input")[1].value;
    // 拼接命令
    var command = "/summon " + position + " " + "minecraft:" + id;
    switch (undefined) {
        case (id == ""):
            alert("ID不能为空")
            console.error("Variable \"ID\" is null")
            break
        case (position == ""):
            alert("坐标不能为空")
            console.error("Variable \"Position\" is null")
            break
        default:
            return
    }
    // 输出命令
    McCs.commandResultProcesser(command, id, position);
}