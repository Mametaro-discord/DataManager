# Manager#deleteBy
引数で渡された関数に当てはまる要素を削除します。  
[Manager#sweep](https://github.com/Mametaro-discord/DataManager/blob/docs/Manager/methods/sweep.md)と同じです、すみません；；
簡単にいうと逆フィルターみたいなもんです、わかりにくいですね。  
  
**param**|**type**|**description**|**default**  
---|---|---|---  
fn|[ManagerFn](https://github.com/Mametaro-discord/DataManager/blob/docs/Manager/types/ManagerFn.md)\<*boolean*\>|テスト関数|none  
thisArg?|*any*|テスト関数の中で*this*として使う値|none  
  
**Return**: Manager\<*K*, *V*\>(=*this*)

#### 例を見てください
```js  
manager.deleteBy((val, key, src) => val === src.get(key));  
```  
このコードだと、テスト関数は常に*true*を返すのですべての要素が削除されます。  
  
### [Overview](https://github.com/Mametaro-discord/DataManager/blob/docs/Manager/overview.md)