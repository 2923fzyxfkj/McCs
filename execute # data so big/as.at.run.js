import { commandResultProcesser } from "index";

var player = localStorage.getItem("as.player");
var command = document.getElementById("command");
var dimension = document.getElementById("dimension");

function check() {
    if (player == undefined) {
        alert("请先输入玩家/Player");
        console.groupCollapsed("Error")
        console.log("Error: 玩家/Player 未输入");
        console.log("INFO: Variable \"\"player\" is uninputed")
        console.log("INFO: Please input player/Player");
        console.groupEnd();
    } else if (command == undefined) {
        alert("请先输入指令/Command");
        console.groupCollapsed("Error")
        console.log("Error: 指令/command 未输入");
        console.log("INFO: Variable \"command\" is uninputed")
        console.log("INFO: Please input command/Command");
        console.groupEnd();
    } else if (command[0] != "/") {
        alert("指令必须以 / 开头");
        console.groupCollapsed("Error")
        console.log("Error: 指令必须以 / 开头");
        console.log("INFO: Command must start with /");
        console.groupEnd();
    } else if (dimension == undefined) {
        alert("请先选择维度/Dimension");
        console.groupCollapsed("Error")
        console.log("Error: 维度/Dimension 未选择");
        console.log("INFO: Variable \"dimension\" is uninputed")
        console.log("INFO: Please select dimension/Dimension");
    } else {
        console.groupCollapsed("Successfully!")
        console.log("INFO: 正在生成指令");
        console.log("INFO: Summoning command");
        console.groupEnd();
        summon()
    }
}
export default function summon() {
    var compileCommand = "/execute as" + player + " at" + dimension + " run" + command;
    commandResultProcesser(compileCommand);
    console.groupCollapsed("Successfully!")
    console.log("INFO: 指令已生成");
    console.log("INFO: Command has been compiled");
    console.log("INFO: " + compileCommand);
    console.groupEnd();
}