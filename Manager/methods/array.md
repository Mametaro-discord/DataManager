# Manager#array
Map#entriesで得られるiterableオブジェクトを配列に変換しただけです、おもしろいでしょう？  
  
**Return**: *Array*\<[*K*, *V*]\>

#### 例を見てください
```js  
manager.set('key', 'value');  
manager.set('otherKey', 'otherValue');  
console.log(manager.array());  
```  
以下が出力されます。  
```js  
[['key', 'value'], ['otherKey', 'otherValue']]  
```