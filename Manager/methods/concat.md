# Manager#concat
[*Array*#concat](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/concat)風。  
Managerをつなげます。  
もとのManagerがもってないものを追加する感じです。  
もとのManagerはいじらずに新しいManagerを返します。  
  
**param**|**type**|**description**|**default**  
---|---|---|---  
managers|[Spread](https://github.com/Mametaro-discord/DataManager/blob/docs/Manager/types/Spread.md)\<Manager\<*K*, *V*\>\>|つなげるやつ|none  
  
**Return**: Manager\<*K*, *V*\>

#### 例を見てください
```js  
const manager = new Manager([  
		['key', 'value']  
	]);  
const clone = manager.clone();  
clone.set('key', 'warosuValue');  
clone.set('otherKey', 'otherValue');  
```  
この場合
```js  
manager.concat(clone);  
```  
だとmanagerとcloneの要素が新しいManagerにsetされ、keyが同じ要素があったときはmanagerのほうが優先されます。  
```js
clone.concat(manager);  
```  
だとcloneのほうが優先されます。  
そんな感じです。  
  
### [Overview](https://github.com/Mametaro-discord/DataManager/blob/docs/Manager/overview.md)