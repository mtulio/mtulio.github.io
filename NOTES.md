
## Test

To test your changes you can run `python -m SimpleHTTPServer 8000` and open the url [http://localhost:8000](http://localhost:8000)

## TODO

The main idea is that we can call all previos repos and show the dash of it, pending PR, issues and last update

All of this is returned from a public GITHUB API.

The code to get all repos from me is
`curl https://api.github.com/users/mtulio/repos `

We can parse it json with an css loaded by client web browser

## FYK

* [Pandoc Converter - HTML, Markdown, etc](http://pandoc.org/try)
