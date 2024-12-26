import http.server
import socketserver
from urllib.parse import urlunparse

PORT = 8080

class RedirectHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path.endswith(".html"):
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
