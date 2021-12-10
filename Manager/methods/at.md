# Manager#at
引数の数番目の要素の値を返します。(負の数だと後ろから数えます)  
*Array*#atみたいですね。  
  
**param**|**type**|**description**|**default**  
---|---|---|---  
index?|*number*|数える数|0  
  
**Return**: *V*

###### 例を見てください
```js  
manager.set('key', 'value');  
manager.set('otherKey', 'otherValue');  
manager.set('surprise', '?!');  
console.log(manager.at(1)); //output 'otherValue'  
console.log(manager.at(-2)); //output 'otherValue'  
```