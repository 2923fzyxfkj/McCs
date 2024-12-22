# McCs
## Minecraft Command Summon
- `McCs`是一个对于《我的世界》命令生成器
    * `McCs`使用`Python`驱动,使用`HTML`网页
    * `McCs`使用`Python`开服后请进入127.0.0.1:8080访问
* `McCs`源代码
#### 请 把 这 篇 README 看 完
##### 当然源代码你想看就看,后面是重点
".py":
```python
# 保存为 server.py
import http.server
import socketserver
from urllib.parse import urlunparse

PORT = 8080

class RedirectHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path == "/":
            # 构建重定向URL
            redirect_url = urlunparse(('', '', '/McCs/main.html', '', '', ''))
            self.send_response(302)
            self.send_header('Location', redirect_url)
            self.end_headers()
        else:
            super().do_GET()

with socketserver.TCPServer(("0.0.0.0", PORT), RedirectHandler) as httpd:
    print("serving at port", PORT)
    httpd.serve_forever()
```
"main.html":
```html
<!DOCTYPE html>
<html lang="zh-CN">
    <head>
        <meta charset="UTF-8">
        <title>主页</title>
    </head>
    <body>
        <h1>这是一个测试Python服务器的HTML</h1>
        <p>指令生成器↓</p>
        <a href="Cs.html">Main</a>
    </body>
</html>
```
"Cs.html":
```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>测试</title>
        <script>
            // function errorTip() {
            //     var error = prompt("请输入错误信息:");
            //     if (error) {
            //         var mailto_link = 'mailto:2605368981@qq.com?subject=McCs错误报告&body=' + encodeURIComponent(error);
            //         window.location.href = mailto_link; // 我用的是VSCode的自动注释,所以使用的是html注释
            //     }       // 这里原本我用的是html注释(VSCode自动注释),但我发现不行,所以我就改成了js注释
            // }
        </script>
    </head>
    <body>
        <a href="setblock.html">/setblock(请先看这个指令了解规则)</a>
        <a href="fill.html">/fill</a>
        <a href="gamemode.html">/gamemode</a>
        <!-- <button onclick="errorTip()">报错</button> -->
    </body>
</html>
```
"fill.html":
```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Summon command - /fill</title>
        <script>
            function summon() {
                // 获取输入框的值
                var id = document.getElementsByTagName("input")[0].value;
                var start = document.getElementsByTagName("input")[1].value;
                var end = document.getElementsByTagName("input")[2].value;
                // 拼接命令
                var command = "/fill " + start + " " + end + " "("minecraft:" + id);
                switch (id, start, end) {
                    case (id == ""):
                        alert("ID不能为空")
                        console.error("Variable \"ID\" is null")
                    
                    case (start == ""):
                        alert("起始不能为空")
                        console.error("Variable \"Start\" is null")
                    case (end == ""):arguments[1]
                        alert("结束不能为空")
                        console.error("Variable \"End\" is null")
                    default:
                        break
                }
                // 输出命令
                alert("命令:" + command)
                console.log(command)
                console.log(id)
                console.log(start)
                console.log(end)
            }
        </script>
    </head>
    <body>
        <!-- 输入框，背景文字为 "ID" -->
        <input type="text" placeholder="ID">
        
        <!-- 输入框，背景文字为 "Position/坐标" -->
        <input type="text" placeholder="开始位置:">
        <input type="text" placeholder="结束位置:">
        
        <!-- 按钮，文字为 "Summon/生成"，点击时调用 summon() 函数 -->
        <button onclick="summon()">Summon/生成</button>
        <a href="Cs.html">Main</a>
    </body>
</html>
```
"gamemode.html":
```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Summon command - /gamemode</title>
        <script>
            function summon() {
                // 获取输入框的值
                var mode = getElementsByTagName("input")[0].value;
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
                alert("命令:" + command)
                console.log(command)
                console.log(mode)
            }
        </script>
    </head>
    <body>
        <!-- 输入框，背景文字为 "ID" -->
        <input type="text" placeholder="模式(1为生存(Survive),2为创造(Creative),3为冒险(Adventure),4为旁观(Spectator))">
        
        <!-- 按钮，文字为 "Summon/生成"，点击时调用 summon() 函数 -->
        <button onclick="summon()">Summon/生成</button>
        <a href="Cs.html">Main</a>
    </body>
</html>
```
"setblock.html":
```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Summon command - /setblock</title>
        <script>
            function summon() {
                // 获取输入框的值
                var id = document.getElementsByTagName("input")[0].value;
                var position = document.getElementsByTagName("input")[1].value;
                // 拼接命令
                var command = "/summon " + position + " " + ("minecraft:" + id);
                switch (id, position) {
                    case (id == ""):
                        alert("ID不能为空")
                        console.error("Variable \"ID\" is null")
                    
                    case (position == ""):
                        alert("坐标不能为空")
                        console.error("Variable \"Position\" is null")
                    default:
                        break
                }
                // 输出命令
                alert("命令:" + command)
                console.log(command)
                console.log(id)
                console.log(position)
            }
        </script>
    </head>
    <body>
        <!-- 输入框，背景文字为 "ID" -->
        <input type="text" placeholder="ID(不用加minecraft:前缀)">
        
        <!-- 输入框，背景文字为 "Position/坐标" -->
        <input type="text" placeholder="Position/坐标(~为玩家位置)">
        
        <!-- 按钮，文字为 "Summon/生成"，点击时调用 summon() 函数 -->
        <button onclick="summon()">Summon/生成</button>
        <a href="Cs.html">Main</a>
    </body>
</html>
```
- 源代码展示纯乱序,不存在时间排序
- 灵感[来源](https://github.com/kzyqq00-Player/mccg):Github用户kzyqq00-Player的[mccg项目](https://github.com/kzyqq00-Player/mccg)
### 当前版本:1.0.0  2024/12/21
- 已制作的指令:
    * /setblock
    * /fill
    * /gamemode
    * /summon
- 运行:
    * 必备
        * Python
        * 浏览器
    * 可选
        * Minecraft
    * 操作:
        * 运行".py"文件
        * 打开网址"127.0.0.1:8080"(这里必须加端口)
        * 点击带下滑线的"Main"按钮
- 指令
    * /setblock
        * 设置方块
    * /fill
        * 填充方块
    * /gamemode
        * 设置游戏模式
    * /summon
        * 生成实体
- 指令使用
    * /setblock
        * ID:方块ID
        * Position:坐标
    * /fill
        * ID:方块ID
        * Start:起始坐标
        * End:结束坐标
    * /gamemode
        * Mode:模式
    * /summon
        * ID:实体ID
        * Position:坐标
- 此处写的名称为变量名称
- 提示:
    * 原本直接输入127.0.0.1:8080是跳转到C盘
    * 我用了一点魔法,虽然127.0.0.1:8080还是跳转到C盘,但是我的魔法设置进入127.0.0.1:8080后,会自动跳转到main.html页面
    * 还有一个...em...我不想说了
- (
    * 这次总能火了吧
    * )
* 谁能帮我写写README呀!
### 更新:1.0.1  2024/12/22
- 已更新
    * 修复了一个BUG
        * 用户还是可以访问127.0.0.1:8080的除C盘以外的目录
            * Log:
            * 修复用户还是可以访问127.0.0.1:8080的除C盘以外的目录,但是会出现定向错误
            * 修复用户还是可以访问127.0.0.1:8080的除C盘以外的目录,不会出现定向错误   <=   当前

版本列表:[访问](https://github.com/2923fzyxfkj/McCs/releases)
