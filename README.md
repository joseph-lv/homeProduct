# homeProduct

官网项目（Vite + Vue 3）。

## 线上地址

启用 GitHub Pages 后，访问：

`https://joseph-lv.github.io/homeProduct/`

## 本地运行

```bash
npm install
npm run dev
```

## 自动部署

项目已配置 GitHub Actions 工作流：`.github/workflows/deploy-pages.yml`

每次推送到 `master` / `main` 会自动构建并发布到 GitHub Pages。

## 首次启用（只做一次）

1. 打开仓库 `Settings` -> `Pages`
2. `Source` 选择 **GitHub Actions**
3. 等待 `Actions` 里的 `Deploy to GitHub Pages` 首次成功
