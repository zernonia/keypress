<br />
<p align="center">
  <a href="https://github.com/zernonia/keypress">
    <img src="public/logo.svg" alt="KeyPress's Logo" width="80">
  </a>
  <br />

  <p align="center">
    A keyboard-first blogging platform. <br> 
    Finally write your blog post only with keys 🎹
  </p>

  <p align="center"> 
    <a href="https://keypress.blog/">View Demo</a>
    ·
    <a href="https://github.com/zernonia/keypress/issues">Report Bug</a>
    ·
    <a href="https://github.com/zernonia/keypress/issues">Request Feature</a>
  </p>
</p>

<br/>

![KeyPress - open-source blogging platform that focused on keyboard-first experience](public/hero.png)

## Introduction

KeyPress is an open-source blogging platform that focused on keyboard-first experience. It was inspired by Vercel's Platform Starter Kit.

I always wanted to build a multi-tenant platform using [Nuxt3](https://v3.nuxtjs.org/), and I finally did it! - in `nuxt-rc11`.

If you are interested to implement the same, checkout

1. [`server/middleware/subdomain.ts`](https://github.com/zernonia/keypress/blob/main/server/middleware/subdomain.ts) - check the current domain and set srr context.
2. [`app/router.option.ts`](https://github.com/zernonia/keypress/blob/main/app/router.options.ts) - based on the ssr context, map a new route.
3. [`pages/user/[siteId]`](https://github.com/zernonia/keypress/tree/main/pages/user/%5BsiteId%5D) - this will now be your new router root

## 🚀 Features

- 🤩 Free
- 📖 Open-Source
- 🚀 Free custom domain
- 🌌 Auto OG image (using [Satori](https://github.com/vercel/satori))

### 🔨 Built With

- [Nuxt 3](https://v3.nuxtjs.org/)
- [Supabase](https://supabase.com)
- [UnoCss](https://uno.antfu.me/)
- [Vercel - Hosting & Domain](https://vercel.com)

## 🌎 Local Development

### Prerequisites

Yarn

- ```sh
  npm install --global yarn
  ```

### Development

1. Clone the repo
   ```sh
   git clone https://github.com/zernonia/keypress.git
   ```
2. Install NPM packages
   ```sh
   cd keypress
   yarn install
   ```
3. Run local development instance
   ```sh
   yarn dev
   ```

## ➕ Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Acknowledgement

1. [Nuxt 3 - Awesome framework](https://v3.nuxtjs.org/)
1. [Supabase - Super easy setup (as always)](https://supabase.com)
1. [Tiptap - Awesome editor](https://tiptap.dev/)
1. [Vercel's Platform Starter Kit - Subdomain/Custom domain](https://github.com/vercel/platforms)
1. [Vercel's new og generation](https://github.com/vercel/satori)

## Author

- Zernonia ([@zernonia](https://twitter.com/zernonia))

Also, if you like my work, please buy me a coffee ☕😳

<a href="https://www.buymeacoffee.com/zernonia" target="_blank">
    <img src="https://www.buymeacoffee.com/assets/img/custom_images/yellow_img.png" alt="Logo" >
  </a>

## 🔥 Contributors

<a href="https://github.com/zernonia/keypress/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=zernonia/keypress" />
</a>

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.
