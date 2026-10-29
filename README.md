# Lulu Liu — Portfolio

一个使用 React、Vite 和 Node.js 构建的个人作品集网站，可直接部署到 GitHub Pages。

## 本地开发

```bash
pnpm install
pnpm dev
```

生产构建：

```bash
pnpm build
pnpm preview
```

## 更新个人内容

主要内容都集中在 `src/content.js`：

- `profile`：姓名、简介、邮箱和社交链接
- `projects`：精选项目
- `capabilities`：工作方式或服务能力
- `experience`：工作与教育经历

视觉样式位于 `src/styles.css`。

## 部署到 GitHub Pages

仓库已包含 `.github/workflows/deploy.yml`。推送到 `main` 后，在 GitHub 仓库的 **Settings → Pages → Build and deployment** 中将 Source 设为 **GitHub Actions**。之后每次推送都会自动构建并发布。
