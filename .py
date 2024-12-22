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
    httpd.serve_forever() # V1.0.0
