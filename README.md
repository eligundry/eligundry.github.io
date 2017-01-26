# [eligundry.com](https://eligundry.com)

My personal website.

## Built With

* [Lektor](https://www.getlektor.com/)
* [Webpack](https://webpack.github.io/)

## CLI

In order to get the dev server running, run:

```sh
$ pip install -r requirements.txt
$ lektor server -f webpack
```

In order to deploy the site to production, run:

```sh
$ lektor build -f webpack
$ lektor deploy
```

## Docker

This site also provides a [public Docker image][1] so it can be integrated with my
Docker setup. An automatic build is run when commits are pushed to master on
GitHub.

Below are some commands so you can test the image locally.

```sh
# Add the virtual host to hosts file so it redirects
$ echo '127.0.0.1 eligundry.dev' | sudo tee --append /etc/hosts
# Build the image
$ docker build -t eligundry/eligundry.com:local .
# Run the local build server on eligundry.dev:8080.
$ docker run eligundry/eligundry.com:local
```

[1]: https://hub.docker.com/r/eligundry/eligundry.com/