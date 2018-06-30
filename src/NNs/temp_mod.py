#requires paralleldots
#install withpip install paralleldots

import paralleldots

paralleldots.set_api_key(ngoBXgeWGnNClZKoWHn5P4jEZfnnLqlS6nyESKWyVQo)

#text
sentiment("text");
abuse("text");

#image

path = "/path"
paralleldots.nsfw( path )
url ="url"
paralleldots.nsfw_url( url )