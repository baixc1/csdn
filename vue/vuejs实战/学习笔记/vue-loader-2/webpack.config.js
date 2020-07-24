var htmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry:'./main',   
    output:{
        path:__dirname +  '/dist',
        filename:'build.js'
    },
    module:{
        loaders:[
            {
                test:/\.css$/,
                loader:'style-loader!css-loader'
            },
            {
                test:/\.js$/,         
                loader:'babel-loader',
                exclude:/node_modules/    
            },
            {
                test:/\.vue$/,
                loader:'vue-loader'
            }
        ]
    },
    babel:{
        presets:['es2015'],     
        plugins:['transform-runtime']    
    },
    plugins:[
        new htmlWebpackPlugin({
            template:'index.html'  
        })
    ]
};
