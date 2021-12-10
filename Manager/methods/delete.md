# Manager#delete
Map#deleteです。
引数で渡されたキーに対する要素を削除します。

**param**|**type**|**description**|**default**  
---|---|---|---  
key|*K*|削除する要素のキーです。|none  
  
**Return**: *boolean*

#### 例を見てください
```js  
manager.delete('key'); //'key'の要素は抹消されます。  
```  
要素が存在していた場合は*true*、見つからなかった場合は*false*を返します。