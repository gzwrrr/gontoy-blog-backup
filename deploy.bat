yarn build && cd ./docs/.vuepress/dist && git init && git add -A && git commit -m 'deploy' && git push -f git@github.com:gzwrrr/gzwrrr.github.io.git master:gh-pages && start https://github.com/gzwrrr/gzwrrr.github.io/settings/pages

pause