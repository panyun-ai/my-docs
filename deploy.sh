# /bin/bash

# 确保脚本抛出遇到的错误
set -e

# 输入提交的变更
echo "请输入您的姓名："
read commitMsg

# 打印用户输入的内容
echo "您输入的内容是：$commitMsg, 请确认是否提交?(y/n)"
read userConfirmation
if [ "$userConfirmation" == "n"]; then
    # 退出程序
    exit 1
fi

# 打包生成静态文件
pnpm docs:build

# 进入待发布的 dist/ 目录
cd dist

# 提交打包静态网站到 github-pages 分支
git init
git add .
git commit -m $commitMsg

# 部署到 https://<username>.github.io/<repo>
git push -f git@github.com:panyun-ai/my-docs.git master:github-pages

# 提交所有代码到github
cd ../
git add .
git commit -m $commitMsg
git push
