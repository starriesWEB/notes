const baiduCode = require('./config/baiduCode.js'); // 百度统计hm码
const htmlModules = require('./config/htmlModules.js');
// const path = require('path')

module.exports = {

    theme: 'vdoing', // 使用依赖包主题
    // theme: require.resolve('../../vdoing'), // 使用本地主题 (先将vdoing主题文件下载到本地：https://github.com/xugaoyi/vuepress-theme-vdoing)

    title: "notes",
    description: '知识管理',
    head: [ // 注入到页面<head> 中的标签，格式[tagName, { attrName: attrValue }, innerHTML?]
        ['link', {rel: 'icon', href: '/img/favicon.ico'}], //favicons，资源放在public文件夹
        ['meta', {name: 'keywords', content: 'vuepress,theme,blog,vdoing'}],
        ['meta', {name: 'theme-color', content: '#3eaf7c'}], // 移动浏览器主题颜色
    ],

    // 主题配置
    themeConfig: {
        nav: [
            {text: '首页', link: '/'},
            {text: 'test', link: '/01.dir/03.test'},
            {
                text: '测试',
                // link: '/pages/13829e/',
                items: [
                    {text: 'HashSet源码分析', link: '/dir/HashSet源码分析/'},
                    {text: 'Q&A.md', link: '/dir/Q&A/'},
                    {text: 'test', link: '/dir/test/'},
                ]
            },
            {text: '赞助', link: '/pages/1b12ed/'},
        ],
        sidebarDepth: 2, // 侧边栏显示深度，默认1，最大2（显示到h3标题）
        logo: '/img/logo.png', // 导航栏logo
        repo: 'starriesWEB/geektime', // 导航栏右侧生成Github链接
        searchMaxSuggestions: 10, // 搜索结果显示最大数
        lastUpdated: '上次更新', // 更新的时间，及前缀文字   string | boolean (取值为git提交时间)

        // docsDir: 'docs', // 编辑的文件夹
        // editLinks: true, // 编辑链接
        // editLinkText: '编辑',

        // 以下配置是Vdoing主题改动的和新增的配置
        // sidebar: {mode: 'structuring', collapsable: false}, // 侧边栏  'structuring' | { mode: 'structuring', collapsable: Boolean} | 'auto' | 自定义    温馨提示：目录页数据依赖于结构化的侧边栏数据，如果你不设置为'structuring',将无法使用目录页
        sidebar: {mode: 'structuring', collapsable: false}, // 侧边栏  'structuring' | { mode: 'structuring', collapsable: Boolean} | 'auto' | 自定义    温馨提示：目录页数据依赖于结构化的侧边栏数据，如果你不设置为'structuring',将无法使用目录页

        sidebarOpen: true, // 初始状态是否打开侧边栏，默认true
        updateBar: { // 最近更新栏
            showToArticle: false, // 显示到文章页底部，默认true
            // moreArticle: '/archives' // “更多文章”跳转的页面，默认'/archives'
        },
        // titleBadge: false, // 文章标题前的图标是否显示，默认true
        // titleBadgeIcons: [ // 文章标题前图标的地址，默认主题内置图标
        //   '图标地址1',
        //   '图标地址2'
        // ],

        pageStyle: 'line', // 页面风格，可选值：'card'卡片 | 'line' 线（未设置bodyBgImg时才生效）， 默认'card'。 说明：card时背景显示灰色衬托出卡片样式，line时背景显示纯色，并且部分模块带线条边框

        // contentBgStyle: 1,

        category: false,
        tag: false,
        archive: false,

        author: { // 文章默认的作者信息，可在md文件中单独配置此信息 String | {name: String, href: String}
            name: 'starry', // 必需
            // href: 'https://github.com/xugaoyi' // 可选的
        },
        social: { // 社交图标，显示于博主信息栏和页脚栏
            // iconfontCssFile: '//at.alicdn.com/t/font_1678482_u4nrnp8xp6g.css', // 可选，阿里图标库在线css文件地址，对于主题没有的图标可自由添加
            icons: [
                {
                    iconClass: 'icon-youjian',
                    title: '发邮件',
                    link: 'mailto:starries@aliyun.com'
                },
                {
                    iconClass: 'icon-github',
                    title: 'GitHub',
                    link: 'https://github.com/starriesWEB'
                },
            ]
        },
        footer: { // 页脚信息
            createYear: 2023, // 博客创建年份
            copyrightInfo: 'Starry | MIT License', // 博客版权信息，支持a标签
        },
        htmlModules,
    },

    // 插件
    plugins: [
        ['fulltext-search'], // 全文搜索
        ['vuepress-plugin-mermaidjs'],
        ['one-click-copy', { // 代码块复制按钮
            copySelector: ['div[class*="language-"] pre', 'div[class*="aside-code"] aside'], // String or Array
            copyMessage: '复制成功', // default is 'Copy successfully and then paste it for use.'
            duration: 1000, // prompt message display time.
            showInMobile: false // whether to display on the mobile side, default: false.
        }],
        [
            'vuepress-plugin-zooming', // 放大图片
            {
                selector: '.theme-vdoing-content img:not(.no-zoom)',
                options: {
                    bgColor: 'rgba(0,0,0,0.6)'
                },
            },
        ],
        [
            '@vuepress/last-updated', // "上次更新"时间格式
            {
                transformer: (timestamp, lang) => {
                    const dayjs = require('dayjs') // https://day.js.org/
                    return dayjs(timestamp).format('YYYY/MM/DD, HH:mm:ss')
                },
            }
        ]
    ],

    markdown: {
        extendMarkdown: md => {
            md.set({html: true});                    // required by mermaid
        },
        extractHeaders: ['h2', 'h3', 'h4', 'h5', 'h6'], // 提取标题到侧边栏的级别，默认['h2', 'h3']
    },

    // 监听文件变化并重新构建
    extraWatchFiles: [
        '.vuepress/config.js',
        '.vuepress/config/htmlModules.js',
    ]
}
