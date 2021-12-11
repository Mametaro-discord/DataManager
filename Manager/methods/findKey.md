# Manager#findKey
引数で渡されたテスト関数を満たす要素のキーを一つ返します。(ランダムではなく、はじめに見つかった要素です)  

**param**|**type**|**description**|**default**  
---|---|---|---  
fn|[ManagerFn](https://github.com/Mametaro-discord/DataManager/blob/docs/Manager/types/ManagerFn.md)\<*boolean*\>|テスト関数|none  
thisArg?|*any*|テスト関数の中で*this*として使う値|none  
  
**Return**: *K*

#### 例を見てください
```js  
const manager = new Manager([  
		['key', 'value'],  
		['number', 1000]  
	]);  
console.log(manager.findKey(val => typeof val === 'string')); //output 'key'
```    
  
### [Overview](https://github.com/Mametaro-discord/DataManager/blob/docs/Manager/overview.md)