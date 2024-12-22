"""# 保存为 server.py
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
    httpd.serve_forever()""" # V1.0.0
import http.server
import socketserver
from urllib.parse import urlunparse
import os

PORT = 8080
DIRECTORY = "/c:/McCs"

class RedirectHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path == "/McCs/main.html" or (self.path.endswith(".html") and os.path.isfile(os.path.join(DIRECTORY, self.path[1:]))):
            super().do_GET()
        else:
            # 构建重定向URL
            redirect_url = urlunparse(('', '', '/McCs/main.html', '', '', ''))
            self.send_response(302)
            self.send_header('Location', redirect_url)
            self.end_headers()

with socketserver.TCPServer(("0.0.0.0", PORT), RedirectHandler) as httpd:
    print("serving at port", PORT)
    httpd.serve_forever()
