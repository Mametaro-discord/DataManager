# Manager#clone
クローンを作成します。その際、任意の要素を追加することもできます。  
  
**param**|**type**|**description**|**default**  
---|---|---|---  
data?|*Array*\<[*K*, *V*]\>|追加するデータ|none  
  
**Return**: Manager\<*K*, *V*\>

#### 例を見てください
```js  
const manager = new Manager([  
		['key', 'value']  
	]);   
const clone1 = manager.clone();  
console.log(clone1.array()); //output [['key', 'value']]  
const clone2 = manager.clone([  
		['otherKey', 'otherValue']  
	]);  
console.log(clone2.array()); //output [['key', 'value'], ['otherKey', 'otherValue']]  
```  
  
### [Overview](https://github.com/Mametaro-discord/DataManager/blob/docs/Manager/overview.md)