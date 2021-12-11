# Manager#sweep
引数で渡されたテスト関数を満たす要素を削除して削除した要素の数を返します。  
[Manager#deleteBy](https://github.com/Mametaro-discord/DataManager/blob/docs/Manager/methods/deleteBy.md)と全く同じです、返り値が異なるだけです。    
sweepは[Collection](https://github.com/discordjs/collection)にあったので実装しました。まめたろうは用途をいまひとつわかっていません。  
ぶっちゃけ[Manager#deleteBy](https://github.com/Mametaro-discord/DataManager/blob/docs/Manager/methods/deleteBy.md)はいらないかもしれないです。  
  
**param**|**type**|**description**|**default**  
---|---|---|---  
fn|[ManagerFn](https://github.com/Mametaro-discord/DataManager/blob/docs/Manager/types/ManagerFn.md)\<*boolean*\>|テスト関数|none  
thisArg?|*any*|テスト関数の中で*this*として使う値|none  
  
**Return**: number

#### 例を見てください
```js  
const manager = new Manager([  
		['key', 'value'],  
		['otherKey', 'otherValue'],  
		['warosuKey', 'warosuValue'],  
		['powerfulKey', 'powerfulValue']  
	]);  
manager.sweep(val => val.toLowerCase().match('value')); //output 4  
```  
この場合、全要素が削除されます。  
  
### [Overview](https://github.com/Mametaro-discord/DataManager/blob/docs/Manager/overview.md)