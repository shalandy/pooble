#PooBLe
is the new frontend for PBL Links

# Technologies
its an angular project. uses the new PBL Open API

# Authentication
PBL's Open API uses token-based authentication. for PooBLe to work, we need an api token at all times. 

PooBLe reads the token from url parameters, so your url must have ?token={{your token}} somewhere. The best way to get this is from http://pbl.link/pooble, which will let the portal redirect you.

you can find your api token by visiting "http://testing.berkeley-pbl.com/api/api_key"

# Running PooBLe
simply serve the mainpage.html file

you can run "sh run.sh" to use a python SimpleHTTPServer
