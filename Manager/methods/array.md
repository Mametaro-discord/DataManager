# Manager#array
[Map#entries](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Map/entries)で得られるiterableオブジェクトを配列に変換しただけです、おもしろいでしょう？  
  
**Return**: *Array*\<[*K*, *V*]\>

#### 例を見てください
```js  
const manager = new Manager([
		['key', 'value'],
		['otherKey', 'otherValue']
	]);  
console.log(manager.array());  
```  
以下が出力されます。  
```js  
[['key', 'value'], ['otherKey', 'otherValue']]  
```  
  
### [Overview](https://github.com/Mametaro-discord/DataManager/blob/docs/Manager/overview.md)