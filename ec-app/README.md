### Install npm （react, redux, firebase, material-ui packages）

###### hisotyに関してはhistory@4.10.1でないとconnected-react-routerのpushメソッドでルーティングした際にエラーとなるためバージョンを指定する。

npm install --save @material-ui/core @material-ui/icons @material-ui/styles connected-react-router firebase history@4.10.1 react-redux react-router redux redux-actions redux-logger redux-thunk reselect

### タブのフォーマットにはvscodeのフォーマットを使っている。prettierを使っていたがメソッドチェーンが改行されてしまったり、jsxのmap