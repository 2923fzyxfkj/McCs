import { commandResultProcesser } from "index";
function end(runFunc) {
    const checkSessionStorage = () => {
        try {
            sessionStorage.getItem("as.player");
        }
        catch {
            return true;
        }
        return false;
    }
    var checkValue = checkSessionStorage();
    if (checkValue == true) {
    } else {
        sessionStorage.removeItem("as.player");
    }
    /**
     * @type {HTMLInputElement}
     */
    // @ts-expect-error
    var player = document.getElementById("player");
    sessionStorage.setItem("as.player", player.value);
    if (runFunc == 1) {
        run()
    } else if (runFunc == 2) {
        at()
    }
}
function run() {
    window.location.href = "./as.run.html";
}
function at() {
    window.location.href = "./as.at.html";
}