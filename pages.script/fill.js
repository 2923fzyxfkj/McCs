McCs.summon = () => {
    // 获取输入框的值
    var id = document.getElementsByTagName("input")[0].value;
    var start = document.getElementsByTagName("input")[1].value;
    var end = document.getElementsByTagName("input")[2].value;
    // 拼接命令
    var command = "/fill " + start + " " + end + " minecraft:" + id;
    switch (undefined) {
        case (id == ""):
            alert("ID不能为空")
            console.error("Variable \"ID\" is null")
            break
        case (start == ""):
            alert("起始不能为空")
            console.error("Variable \"Start\" is null")
            break
        case (end == ""):
            alert("结束不能为空")
            console.error("Variable \"End\" is null")
            break
        default:
            return
    }
    // 输出命令
    McCs.commandResultProcesser(command, id, start, end)
}
