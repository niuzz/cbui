/**
 * vue-cli3的全局配置文件 详情见https://cli.vuejs.org/zh/config/#%E5%85%A8%E5%B1%80-cli-%E9%85%8D%E7%BD%AE
 * 
 */
const isProduction = process.env.NODE_ENV === 'production'
const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

function resolve (dir) {
    return path.join(__dirname, dir)
}

function wrapCustomClass (render) {
    return function (...args) {
        return render(...args)
            .replace('<code class="', '<code class="hljs ')
            .replace('<code>', '<code class="hljs">')
    }
}

module.exports = {
    publicPath: isProduction ? './' : '/',
    devServer: {
        overlay: { //Show eslink error information on Browser
            warnings: true,
            errors: true
        },
        open: true,
        port:3000
    },
    productionSourceMap: false,
    chainWebpack: config => {
        config.module
            .rule('md')
            .test(/\.md$/)
            .use('vue-loader')
            .loader('vue-loader')
            .end()
            .use('vue-markdown-loader')
            .loader('vue-markdown-loader/lib/markdown-compiler')
            .options({
                raw: true,
                preprocess: (MarkdownIt, source) => {
                    MarkdownIt.renderer.rules.table_open = function () {
                        return '<table class="table">'
                    }
                    MarkdownIt.renderer.rules.fence = wrapCustomClass(MarkdownIt.renderer.rules.fence)
                    const code_inline = MarkdownIt.renderer.rules.code_inline
                    MarkdownIt.renderer.rules.code_inline = function (...args) {
                        args[0][args[1]].attrJoin('class', 'code-show')
                        return code_inline(...args)
                    }
                    return source
                },
                use: [
                    [
                        require('markdown-it-container'), 'code', {
                        validate: params => params.trim().match(/^code\s*(.*)$/),
                        render: function (tokens, idx) {
                            if (tokens[idx].nesting === 1) {
                                return `<code-show>
                                    <div slot="highlight">`
                            }
                            return '</div></code-show>'
                        }
                    }
                    ]
                ]
            })
    },
    configureWebpack: config => {
        config.resolve = {
            extensions: ['.js', '.vue', '.json', '.css'],
            alias: {
                'vue$': 'vue/dist/vue.esm.js',
                '@': resolve('src'),
                '&': resolve('libs')
            }
        }
        //删除console插件
        let plugins = [
            new UglifyJsPlugin({
                uglifyOptions: {
                    compress: {
                        warnings: false,// 在UglifyJs删除没有用到的代码时不输出警告
                        drop_console: true,// 是否删除 console.log
                        drop_debugger: true,// 是否删除 debugger
                        collapse_vars: true// 内嵌定义了但是只用到一次的变量
                    },
                    output: {
                        // 去掉注释内容
                        comments: false
                    }
                },
                sourceMap: false,
                parallel: true
            })
        ]
        //只有打包生产环境才需要将console删除
        if (isProduction) {
            config.plugins = [...config.plugins, ...plugins]
        }
    }
}

