# manager.nodejs
## インストール
```
npm i manager.nodejs
```  

## 概要
[Map](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Map)を継承したdiscord.jsの[Collection](https://github.com/discordjs/collection)のようなパワフルでユニークなデータオブジェクトです。(discord, discord.jsとは関係ありません)

## Managerの特徴 
### freeze, seal  
[Object](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Object)  の静的メソッドであるfreeze, sealと意味は同じですが、仕様が少し異なります。(詳しくは[Manager#freeze](https://github.com/Mametaro-discord/DataManager/blob/docs/Manager/topics/freeze.md), [Manager#seal](https://github.com/Mametaro-discord/DataManager/blob/docs/Manager/topics/seal.md)をご覧ください)

### strict
JavaScript標準の[strict(厳格)モード](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Strict_mode)とは別のものです。  
有効だとManagerが細かいことでエラーを投げてきます。  
詳しくは[Manager#strict](https://github.com/Mammetaro-discord/DataManager/blob/docs/Manager/topics/strict.md)

### その他たくさん！

## チュートリアル  
##### モジュールの参照とインスタンスの作成    
```js
const Manager = require('manager.nodejs');
const manager = new Manager();
```  
##### 基本的なデータの操作
```js
manager.set('key', 'value');
console.log(manager.get('key')); // output 'value'
```
##### 配列メソッドのようなものも使えます！
```js
manager.map((val) => val.id);
manager.forEach((val, key) => console.log(`${key}: ${val}`));
```  
  
**より詳しい情報は...[docs](https://github.com/Mametaro-discord/DataManager/tree/docs)