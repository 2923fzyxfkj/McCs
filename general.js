function commandResultProcesser(command) {
    alert("命令:" + command + '\n命令已复制到剪贴板')
    navigator.clipboard.writeText(command);
    console.log(command);
}