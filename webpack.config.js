const path = require("path");
//import path from "path"; error!!
//웹팩 자체는 node가 돌려주어서 es 문법 사용 시 에러 난다.
//그러나 웹팩이 설정된 후 다른 곳들은 바벨에 의해 import도 사용가능해짐.

module.exports={
  entry:"./src/index.jsx", 
  output:{
    path:path.resolve(__dirname, "build"),
    // publicPath:"/build/",  //설정하면 서버가 이 디렉토리내에서 번들파일을 찾음. 즉, url에 포함시켜야된다.
    filename:"build.js"
  },
  module:{
    rules:[
      {
        test:/\.css$/, 
        // 이것도 entry로 지정한 경로에서 .css 확장자를 찾나보다
        use:[
					'style-loader',   
          'css-loader'   
        ]
      },
      {
				test:/\.jsx?/,
				loader:'babel-loader',
				options:{
          presets:['@babel/preset-env', '@babel/preset-react'],
          plugins: ["@babel/plugin-proposal-class-properties"]
          
				}
			}
    ]
  },
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom'
    }
  },
  devServer:{
    historyApiFallback: true,
    contentBase:path.resolve(__dirname,'public'),
    port:4000,
    proxy: {"/auth":"http://localhost:3000"}
  },
}