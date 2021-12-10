# Manager#deleteAll
引数で渡されたキーに対する要素(複数)を削除します。  
  
**param**|**type**|**description**|**default**  
---|---|---|---  
keys|[Spread](https://github.com/Mametaro-discord/DataManager/blob/docs/types/Spread.md)\<*K*\>|削除する要素のキー達|none  
  
**Return**: Manager\<*K*, *V*\>(=*this*)

#### 例を見てください
```js  
manager.deleteAll('key', 'otherKey');  
```  
配列でもいいですよ。  
```js  
manager.deleteAll(['key', 'otherKey']);