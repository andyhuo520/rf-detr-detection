# 部署指南

本文档详细介绍如何将 RF-DETR 目标检测项目部署到 GitHub 和 GitHub Pages。

---

## 📋 目录

- [前置准备](#前置准备)
- [创建 GitHub 仓库](#创建-github-仓库)
- [推送代码到 GitHub](#推送代码到-github)
- [部署到 GitHub Pages](#部署到-github-pages)
- [自定义域名](#自定义域名可选)
- [故障排除](#故障排除)

---

## 前置准备

### 1. 安装 Git

确保已安装 Git：

```bash
git --version
```

如果未安装，请访问 [git-scm.com](https://git-scm.com/) 下载安装。

### 2. 配置 Git

```bash
# 设置用户名
git config --global user.name "你的用户名"

# 设置邮箱
git config --global user.email "你的邮箱@example.com"
```

### 3. GitHub 账号

确保你有 GitHub 账号，如果没有请访问 [github.com](https://github.com) 注册。

---

## 创建 GitHub 仓库

### 方法 1: 通过 GitHub 网站创建

1. 登录 GitHub
2. 点击右上角的 `+` 号，选择 `New repository`
3. 填写仓库信息：
   - **Repository name**: `rf-detr-detection`
   - **Description**: `基于 RF-DETR 的浏览器端实时目标检测应用`
   - **Public/Private**: 选择 `Public`（GitHub Pages 需要公开仓库，或 Pro 账号）
   - **不要勾选** "Initialize this repository with a README"
4. 点击 `Create repository`

### 方法 2: 使用 GitHub CLI

```bash
# 安装 GitHub CLI (如果未安装)
# macOS: brew install gh
# Windows: winget install GitHub.cli

# 登录
gh auth login

# 创建仓库
gh repo create rf-detr-detection --public --description "基于 RF-DETR 的浏览器端实时目标检测应用"
```

---

## 推送代码到 GitHub

### 1. 关联远程仓库

```bash
# 进入项目目录
cd rf-detr-detection

# 添加远程仓库（替换为你的 GitHub 用户名）
git remote add origin https://github.com/你的用户名/rf-detr-detection.git

# 验证远程仓库
git remote -v
```

### 2. 提交代码

```bash
# 查看状态
git status

# 添加所有文件
git add .

# 提交
git commit -m "Initial commit: RF-DETR 目标检测应用"

# 推送到 GitHub
git push -u origin main
```

如果遇到分支名称问题（`master` vs `main`），可以重命名分支：

```bash
git branch -M main
git push -u origin main
```

---

## 部署到 GitHub Pages

### 方法 1: 使用 GitHub Actions (推荐)

#### 步骤 1: 创建 GitHub Actions 工作流

创建文件 `.github/workflows/deploy.yml`：

```bash
mkdir -p .github/workflows
```

然后创建 `deploy.yml` 文件，内容如下：

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm install

      - name: Build
        run: npm run build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

#### 步骤 2: 启用 GitHub Pages

1. 进入 GitHub 仓库页面
2. 点击 `Settings` > `Pages`
3. 在 `Source` 下选择 `GitHub Actions`
4. 保存设置

#### 步骤 3: 推送工作流文件

```bash
git add .github/workflows/deploy.yml
git commit -m "Add GitHub Actions workflow for deployment"
git push
```

#### 步骤 4: 查看部署状态

1. 进入仓库的 `Actions` 标签页
2. 查看工作流运行状态
3. 部署成功后，访问 `https://你的用户名.github.io/rf-detr-detection/`

---

### 方法 2: 使用 gh-pages 包

#### 步骤 1: 安装 gh-pages

```bash
npm install -D gh-pages
```

#### 步骤 2: 添加部署脚本

在 `package.json` 中添加：

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "deploy": "npm run build && gh-pages -d dist"
  }
}
```

#### 步骤 3: 配置 Vite base

在项目根目录创建 `vite.config.js`：

```javascript
import { defineConfig } from 'vite';

export default defineConfig({
  base: '/rf-detr-detection/',  // 替换为你的仓库名
});
```

#### 步骤 4: 部署

```bash
npm run deploy
```

#### 步骤 5: 启用 GitHub Pages

1. 进入 GitHub 仓库页面
2. 点击 `Settings` > `Pages`
3. 在 `Source` 下选择 `gh-pages` 分支
4. 点击 `Save`
5. 访问 `https://你的用户名.github.io/rf-detr-detection/`

---

### 方法 3: 手动部署

#### 步骤 1: 构建项目

```bash
npm run build
```

#### 步骤 2: 推送到 gh-pages 分支

```bash
# 使用 git subtree
git subtree push --prefix dist origin gh-pages

# 或者手动创建 gh-pages 分支
cd dist
git init
git add .
git commit -m "Deploy to GitHub Pages"
git branch -M gh-pages
git remote add origin https://github.com/你的用户名/rf-detr-detection.git
git push -f origin gh-pages
```

#### 步骤 3: 启用 GitHub Pages

同方法 2 的步骤 5。

---

## 自定义域名（可选）

### 1. 购买域名

从域名注册商（如 Namecheap, GoDaddy, Cloudflare）购买域名。

### 2. 配置 DNS

在域名注册商的 DNS 设置中添加以下记录：

```
类型: CNAME
名称: www (或 @)
值: 你的用户名.github.io
```

### 3. 在 GitHub 配置自定义域名

1. 进入仓库 `Settings` > `Pages`
2. 在 `Custom domain` 输入你的域名（如 `www.yourdomain.com`）
3. 点击 `Save`
4. 等待 DNS 检查通过（可能需要几分钟到几小时）

### 4. 添加 CNAME 文件

在 `public` 目录创建 `CNAME` 文件：

```bash
mkdir -p public
echo "www.yourdomain.com" > public/CNAME
```

重新部署：

```bash
npm run deploy
```

---

## 故障排除

### 问题 1: 页面显示 404

**原因**: Vite 的 base 路径配置不正确

**解决方案**: 确保 `vite.config.js` 中的 `base` 设置正确：

```javascript
export default defineConfig({
  base: '/rf-detr-detection/',  // 必须与仓库名一致
});
```

### 问题 2: 模型加载失败

**原因**: CORS 或路径问题

**解决方案**:
1. 确保使用 HTTPS 访问
2. 检查浏览器控制台的错误信息
3. 确认 WebGPU 支持

### 问题 3: GitHub Actions 部署失败

**原因**: 权限或配置问题

**解决方案**:
1. 检查 `Settings` > `Actions` > `General` > `Workflow permissions`
2. 确保选择了 "Read and write permissions"
3. 检查 `Settings` > `Pages` 的 Source 设置为 "GitHub Actions"

### 问题 4: 推送被拒绝

**原因**: 认证问题

**解决方案**:
```bash
# 使用 SSH 代替 HTTPS
git remote set-url origin git@github.com:你的用户名/rf-detr-detection.git

# 或使用 Personal Access Token
# 在 GitHub Settings > Developer settings > Personal access tokens 创建 token
# 推送时使用 token 作为密码
```

### 问题 5: 构建失败

**原因**: 依赖或 Node 版本问题

**解决方案**:
```bash
# 清除缓存
rm -rf node_modules package-lock.json
npm install

# 确保 Node.js 版本 >= 16
node --version
```

---

## 验证部署

部署成功后，访问以下 URL 验证：

- **GitHub Pages**: `https://你的用户名.github.io/rf-detr-detection/`
- **自定义域名**: `https://www.yourdomain.com/`

检查清单：
- ✅ 页面正常加载
- ✅ 模型开始下载
- ✅ 可以上传图片
- ✅ 检测功能正常工作
- ✅ 控制台无错误

---

## 更新部署

每次修改代码后，重新部署：

### 使用 GitHub Actions

```bash
git add .
git commit -m "Update: 描述你的更改"
git push
```

GitHub Actions 会自动构建和部署。

### 使用 gh-pages

```bash
npm run deploy
```

---

## 监控和分析

### 添加 Google Analytics（可选）

在 `index.html` 的 `<head>` 中添加：

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

---

## 总结

现在你的 RF-DETR 目标检测应用已经成功部署到 GitHub Pages！

- 📦 代码托管在 GitHub
- 🌐 应用可通过 GitHub Pages 访问
- 🔄 支持自动部署
- 🚀 完全免费

如有问题，请查看 [GitHub Pages 文档](https://docs.github.com/en/pages) 或提交 Issue。

---

**下一步:**
- 分享你的项目链接
- 添加更多功能
- 优化性能
- 收集用户反馈

祝你使用愉快！🎉
