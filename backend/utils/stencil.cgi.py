#!/usr/bin/python3

from Crypto.Cipher import AES
import base64
import os


# key and iv must match to the .env file in backend

def _pad(s): return s + (AES.block_size - len(s) % AES.block_size) * chr(AES.block_size - len(s) % AES.block_size) 
def _cipher():
    key = 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'
    iv = 'AAAAAAAAAAAAAAAA'
    return AES.new(key=key, mode=AES.MODE_CBC, IV=iv)

def encrypt_token(data):
    return _cipher().encrypt(_pad(data))
    
def decrypt_token(data):
    return _cipher().decrypt(data)

if __name__ == '__main__':
    USER = os.getenv('REMOTE_USER')
    if (USER):
        tokenStr = base64.b64encode(encrypt_token(USER)).decode("utf-8")
    else:
        tokenStr = ""
    #print('Python encrypt: ' + base64.b64encode(encrypt_token('qs24')).decode("utf-8"))
    #print('Python decrypt: ' + decrypt_token(base64.b64decode(tokenStr)).decode("utf-8"))
    print (f"""<html>
<body>
<form id="myform" name="myform" action="https://stencil.biohpc.cornell.edu:8081/
login" method="post">
    <p>
        <input type="hidden" name="token" value="{tokenStr}" />
    </p>
    <input type="submit" value="Click to start Stencil">
    <script>
        document.getElementById("myform").submit();
    </script>
</form>
</body>
</html>""")





