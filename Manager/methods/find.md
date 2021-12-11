# Manager#find
[*Array*#find](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/find)風。  
引数で渡されたテスト関数を満たす要素の値を一つ返します。(ランダムではなく、はじめに見つかった要素です)  
  
**param**|**type**|**description**|**default**  
---|---|---|---  
fn|[ManagerFn](https://github.com/Mametaro-discord/DataManager/blob/docs/Manager/types/ManagerFn.md)\<*boolean*\>|テスト関数|none  
thisArg?|*any*|テスト関数の中で*this*として使う値|none  
  
**Return**: *V*

#### 例を見てください
```js  
const manager = new Manager([　　
		['key', 'value'],
		['number', 1000]  
	]);　　
console.log(manager.find(val => typeof val === 'string')); //output 'value'  
```  
↓でも得られる要素は同じです。
```js  
manager.filter(val => typeof val === 'string').first();  
```    
  
### [Overview](https://github.com/Mametaro-discord/DataManager/blob/docs/Manager/overview.md)