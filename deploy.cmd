yarn build

cd ./docs/.vuepress/dist

git init
git add -A
git commit -m 'deploy'

git push -f git@github.com:gzwrrr/Blog-Vuepress.git master:gh-pages